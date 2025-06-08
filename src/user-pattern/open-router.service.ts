import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenRouterService {
  private readonly API_URL = 'https://openrouter.ai/api/v1/chat/completions';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(ExceptionsService)
    private readonly exceptionService: ExceptionsService,
  ) {}

  async sendMessage(prompt: string): Promise<any> {
    const API_KEY = this.configService.get<string>('OPENROUTER_API_KEY');
    try {
      const headers = {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      };

      const data = {
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [{ role: 'user', content: prompt }],
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
