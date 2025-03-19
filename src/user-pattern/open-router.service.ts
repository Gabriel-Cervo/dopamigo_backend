import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';

@Injectable()
export class OpenRouterService {
  private readonly API_URL = 'https://openrouter.ai/api/v1/chat/completions';
  private readonly API_KEY = process.env.OPENROUTER_API_KEY;

  constructor(
    private readonly httpService: HttpService,
    @Inject(ExceptionsService)
    private readonly exceptionService: ExceptionsService,
  ) {}

  async sendMessage(content: string): Promise<any> {
    try {
      const headers = {
        Authorization: `Bearer ${this.API_KEY}`,
        'Content-Type': 'application/json',
      };

      const data = {
        model: 'deepseek/deepseek-r1-zero:free',
        messages: [{ role: 'user', content: content }],
      };

      const response = await firstValueFrom(
        this.httpService.post(this.API_URL, data, { headers }),
      );

      return response.data;
    } catch (error) {
      throw this.exceptionService.badRequestException({
        message: `Erro ao buscar dados da API: ${error.response?.data || error.message}`,
      });
    }
  }
}
