/* eslint-disable @typescript-eslint/no-unused-expressions */
import { IsNull, Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserTaskDto } from '../dto/update-userTask.dto';
import { UserTask } from 'src/domain/entities/userTask.entity';
import { Score } from 'src/domain/entities/score.entity';
import {
  UpdateUserTaskAchievementResponseDto,
  UpdateUserTaskResponseDto,
  UpdateUserTaskScoreResponseDto,
} from '../dto/update-userTask-response.dto';
import { VirtualPetService } from 'src/virtual-pet/virtual-pet.service';
import { UserAchievementsService } from 'src/user-achievement/user-achievements.service';

@Injectable()
export class EditUserTaskUseCase {
  constructor(
    @InjectRepository(UserTask)
    private taskRepo: Repository<UserTask>,

    @InjectRepository(Score)
    private scoreRepo: Repository<Score>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @Inject(VirtualPetService)
    private readonly virtualPetService: VirtualPetService,

    @Inject(UserAchievementsService)
    private readonly userAchievementsService: UserAchievementsService,
  ) {}

  async execute(id: string, input: UpdateUserTaskDto, userId: string) {
    const task = await this.taskRepo.findOneOrFail({ where: { id } });

    input.title && (task.title = input.title);
    input.description && (task.description = input.description);
    input.difficultLevel && (task.difficultLevel = input.difficultLevel);
    input.isCompleted && (task.isCompleted = input.isCompleted);

    const response = new UpdateUserTaskResponseDto(
      input.title,
      input.description,
      input.date,
      input.isCompleted,
      input.difficultLevel,
    );

    if ((input.isCompleted, userId != null)) {
      const score = await this.distributePoints(userId, task.difficultLevel);

      response.newScore = new UpdateUserTaskScoreResponseDto(
        score.id,
        score.points,
      );

      this.virtualPetService.didFinishTask(userId, input.difficultLevel);

      const unlockedAchievement =
        await this.userAchievementsService.verifyIfUserFinishedAchievent(
          userId,
        );

      if (unlockedAchievement) {
        response.unlockedAchievement = new UpdateUserTaskAchievementResponseDto(
          unlockedAchievement.achievement.id,
          unlockedAchievement.achievement.name,
          unlockedAchievement.achievement.description,
        );
      }
    }

    await this.taskRepo.save(task);
    await this.virtualPetService.levelUpIfNeeded(
      await this.getUserTotalScore(userId),
      userId,
    );
    return response;
  }

  private async distributePoints(
    userId: string,
    difficultLevel: number,
  ): Promise<Score> {
    const lastScore: Score | null = await this.scoreRepo.findOne({
      select: {
        points: true,
      },
      order: {
        createdAt: 'DESC',
      },
      where: {
        deletedAt: IsNull(),
      },
    });

    const newPoints = this.calculatePoints(
      lastScore?.points ?? 0,
      difficultLevel,
    );

    const newScore = new Score({ points: newPoints });

    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });

    newScore.user = user;
    return this.scoreRepo.save(newScore);
  }

  private calculatePoints(lastPoints: number, difficultLevel: number): number {
    return lastPoints + difficultLevel * 10;
  }

  private async getUserTotalScore(userId: string) {
    return await this.scoreRepo
      .createQueryBuilder('score')
      .leftJoin('score.user', 'user')
      .where('user.id = :userId', { userId })
      .select('SUM(score.points)', 'total')
      .getRawOne();
  }
}
