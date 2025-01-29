import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/domain/dto/defaultResponse.dto';
import { UserTask } from 'src/domain/entities/userTask.entity';

@Injectable()
export class DeleteUserTaskUseCase {
  constructor(
    @InjectRepository(UserTask)
    private taskRepo: Repository<UserTask>,
  ) {}

  async execute(input: string) {
    const task = await this.taskRepo.findOneOrFail({
      where: { id: input },
    });

    task.deletedAt = new Date();
    this.taskRepo.save(task);

    return new DefaultResponseDto('Task deleted with success!');
  }
}
