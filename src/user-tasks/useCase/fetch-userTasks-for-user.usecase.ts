import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTask } from 'src/domain/entities/userTask.entity';
import { UserTaskFetchResponseDto } from '../dto/userTask-fetch-response.dto';

@Injectable()
export class FetchUserTasksForUserUseCase {
  constructor(
    @InjectRepository(UserTask)
    private taskRepo: Repository<UserTask>,
  ) {}

  private readonly numberOfItensPerPage = 10;

  async execute(id: string, page: number | null) {
    if (page == null || page < 1) {
      page = 1;
    }

    const pageOffset = (page - 1) * this.numberOfItensPerPage;

    const queryResult = await this.taskRepo.find({
      select: {
        id: true,
        title: true,
        description: true,
        time: true,
        difficultLevel: true,
        isCompleted: true,
      },
      relations: {
        user: true,
      },
      where: {
        user: {
          id: id,
        },
      },
      skip: pageOffset,
      take: this.numberOfItensPerPage,
    });

    const response: UserTaskFetchResponseDto[] | null = queryResult.map(
      (item) => new UserTaskFetchResponseDto(item),
    );

    return response;
  }
}
