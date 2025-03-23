import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSuggestion } from 'src/domain/entities/userSuggestion.entity';
import { User } from 'src/domain/entities/user.entity';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { IException } from 'src/infra/exceptions/exceptions.interface';
import { UserImprovement } from 'src/domain/entities/userImprovement.entity';

@Injectable()
export class SaveImprovementUseCase {
  constructor(
    @InjectRepository(UserImprovement)
    private readonly improvementRepo: Repository<UserImprovement>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @Inject(ExceptionsService)
    private readonly exceptionService: IException,
  ) {}

  async execute(
    userId: string,
    content: string,
  ): Promise<UserSuggestion | null> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw this.exceptionService.badRequestException({
        message: 'Nenhum usuário encontrado para esse ID',
      });
    }

    const suggestion = new UserImprovement({ content: content });
    suggestion.user = user;
    return this.improvementRepo.save(suggestion);
  }
}
