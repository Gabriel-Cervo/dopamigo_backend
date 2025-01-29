/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateUserTaskDto } from '../dto/update-userTask.dto';
import { UserTask } from 'src/domain/entities/userTask.entity';

@Injectable()
export class EditUserTaskUseCase {
  constructor(
    @InjectRepository(UserTask)
    private taskRepo: Repository<UserTask>,
  ) {}

  async execute(id: string, input: UpdateUserTaskDto) {
    const task = await this.taskRepo.findOneOrFail({ where: { id } });

    input.title && (task.title = input.title);
    input.description && (task.description = input.description);
    input.difficultLevel && (task.difficultLevel = input.difficultLevel);

    return this.taskRepo.save(task);
  }
}
