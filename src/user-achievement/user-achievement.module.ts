import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievements } from 'src/domain/entities/achievements.entity';
import { User } from 'src/domain/entities/user.entity';
import { UserAchievements } from 'src/domain/entities/userAchievements.entity';
import { UserTask } from 'src/domain/entities/userTask.entity';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { FetchAchievementsUseCase } from './useCase/fetch-achievements.usecase';
import { SaveAchievementUseCase } from './useCase/save-achievement.usecase';
import { SaveUserAchievementUseCase } from './useCase/save-user-achievement.usecase';
import { AchievementsController } from './achievement.controller';
import { FetchUserAchievementsUseCase } from './useCase/fetch-user-achievements.usecase';
import { UserAchievementsController } from './user-achievements.controller';
import { FetchUserAchievementsSorted } from './useCase/fetch-user-achievements-sorted.usecase';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTask, User, Achievements, UserAchievements]),
    AuthModule,
  ],
  providers: [
    ExceptionsService,
    FetchAchievementsUseCase,
    SaveAchievementUseCase,
    SaveUserAchievementUseCase,
    FetchUserAchievementsUseCase,
    FetchUserAchievementsSorted,
  ],
  controllers: [AchievementsController, UserAchievementsController],
})
export class UserAchievementModule {}
