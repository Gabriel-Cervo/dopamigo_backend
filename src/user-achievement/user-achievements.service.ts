import { Inject, Injectable } from '@nestjs/common';
import { Achievements } from 'src/domain/entities/achievements.entity';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { SaveAchievementUseCase } from './useCase/save-achievement.usecase';
import { FetchAchievementsUseCase } from './useCase/fetch-achievements.usecase';
import { FetchUserTasksForUserUseCase } from 'src/user-tasks/useCase/fetch-userTasks-for-user.usecase';
import { SaveUserAchievementUseCase } from './useCase/save-user-achievement.usecase';
import { UserAchievements } from 'src/domain/entities/userAchievements.entity';
import { FetchUserAchievementsUseCase } from './useCase/fetch-user-achievements.usecase';

@Injectable()
export class UserAchievementsService {
  constructor(
    @Inject(ExceptionsService)
    private readonly exceptionService: ExceptionsService,

    @Inject(SaveAchievementUseCase)
    private readonly saveAchievementUseCase: SaveAchievementUseCase,

    @Inject(FetchAchievementsUseCase)
    private readonly fetchAchievementsUseCase: FetchAchievementsUseCase,

    @Inject(FetchUserTasksForUserUseCase)
    private readonly fetchUserTasksForUserUseCase: FetchUserTasksForUserUseCase,

    @Inject(SaveUserAchievementUseCase)
    private readonly saveUserAchievementUseCase: SaveUserAchievementUseCase,

    @Inject(FetchUserAchievementsUseCase)
    private readonly fetchUserAchievementsUseCase: FetchUserAchievementsUseCase,
  ) {}

  async verifyIfUserFinishedAchievent(
    userId: string,
  ): Promise<UserAchievements | null> {
    const achievements = await this.getAllAchievements();

    if (achievements.length === 0) {
      return null;
    }

    let completedUserTasks = await this.fetchUserTasksForUserUseCase.execute(
      userId,
      null,
    );

    completedUserTasks = completedUserTasks.filter((task) => task.isCompleted);

    if (completedUserTasks.length == 0) {
      return null;
    }

    const unlockedUserAchievements =
      await this.fetchUserAchievementsUseCase.execute(userId);

    const numberOfCompletedUserTasks = completedUserTasks.length + 1;

    for (const achievement of achievements) {
      if (
        unlockedUserAchievements.find((u) => {
          return u.achievementId == achievement.id;
        })
      ) {
        console.log('Already unlocked this achievement');
        continue;
      }

      const condition = JSON.parse(achievement.criteria);

      if (!condition.tasks) {
        return;
      }

      if (
        condition.tasks.finishedNumber &&
        condition.tasks.finishedNumber <= numberOfCompletedUserTasks
      ) {
        return await this.saveUserAchievementUseCase.execute(
          achievement,
          userId,
        );
      }
    }
  }

  private async getAllAchievements(): Promise<Achievements[]> {
    return await this.fetchAchievementsUseCase.execute();
  }
}
