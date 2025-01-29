import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTask } from 'src/domain/entities/userTask.entity';
import { UserTaskFetchResponseDto } from '../dto/userTask-fetch-response.dto';

@Injectable()
export class FetchUserTasksByWeekUseCase {
  constructor(
    @InjectRepository(UserTask)
    private taskRepo: Repository<UserTask>,
  ) {}

  async execute(id: string, date: Date) {
    const queryResult = await this.taskRepo
      .createQueryBuilder('userTask')
      .select([
        'userTask.id',
        'userTask.title',
        'userTask.description',
        'userTask.time',
        'userTask.difficultLevel',
        'userTask.isCompleted',
        "DATE_PART('week', userTask.time) AS week",
        "DATE_PART('year', userTask.time) AS year",
      ])
      .leftJoin('userTask.user', 'user')
      .where('user.id = :id', { id })
      .andWhere('userTask.deletedAt IS NULL')
      .andWhere('userTask.time >= :startDate', { startDate: date })
      .andWhere("userTask.time < (:startDate + interval '7 days')", {
        startDate: date,
      })
      .getMany();

    const response: UserTaskFetchResponseDto[] | null = queryResult.map(
      (item) => new UserTaskFetchResponseDto(item),
    );

    return response;
  }
}
