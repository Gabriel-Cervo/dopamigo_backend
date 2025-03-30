import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievements } from 'src/domain/entities/achievements.entity';
import { User } from 'src/domain/entities/user.entity';
import { UserAchievements } from 'src/domain/entities/userAchievements.entity';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { Repository } from 'typeorm';

@Injectable()
export class SaveUserAchievementUseCase {
  constructor(
    @InjectRepository(UserAchievements)
    private readonly achievementRepo: Repository<UserAchievements>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @Inject(ExceptionsService)
    private readonly exceptionService: ExceptionsService,
  ) {}

  async execute(achievement: Achievements, userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw this.exceptionService.badRequestException({
        message: 'Nenhum usuário para esse id',
      });
    }

    const userAchievement = new UserAchievements({
      user: user,
      achievement: achievement,
    });

    return this.achievementRepo.save(userAchievement);
  }
}
