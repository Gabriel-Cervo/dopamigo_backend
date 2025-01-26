import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTask } from 'src/domain/entities/userTask.entity';
import { CreateUserTaskDto } from '../dto/create-userTask.dto';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class CreateUserTaskUseCase {
  constructor(
    @InjectRepository(UserTask)
    private taskRepo: Repository<UserTask>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async execute(input: CreateUserTaskDto) {
    const userTask = new UserTask({
      title: input.title,
      description: input.description,
      time: new Date(input.date),
      isCompleted: false,
      difficultLevel: input.difficultLevel,
    });

    const user = await this.userRepo.findOne({
      where: {
        id: input.userId,
      },
    });

    userTask.user = user;

    return this.taskRepo.save(userTask);
  }
}
