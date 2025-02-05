/* eslint-disable @typescript-eslint/no-unused-expressions */
import { IsNull, Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateUserTaskDto } from '../dto/update-userTask.dto';
import { UserTask } from 'src/domain/entities/userTask.entity';
import { Score } from 'src/domain/entities/score.entity';
import {
  UpdateUserTaskResponseDto,
  UpdateUserTaskScoreResponseDto,
} from '../dto/update-userTask-response.dto';

@Injectable()
export class EditUserTaskUseCase {
  constructor(
    @InjectRepository(UserTask)
    private taskRepo: Repository<UserTask>,

    @InjectRepository(Score)
    private scoreRepo: Repository<Score>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async execute(id: string, input: UpdateUserTaskDto) {
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

    if ((input.isCompleted, input.userId != null)) {
      const score = await this.distributePoints(
        input.userId,
        task.difficultLevel,
      );

      response.newScore = new UpdateUserTaskScoreResponseDto(
        score.id,
        score.points,
      );
    }

    await this.taskRepo.save(task);
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
}
