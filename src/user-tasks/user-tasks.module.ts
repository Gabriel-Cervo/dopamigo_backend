import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTask } from 'src/domain/entities/userTask.entity';
import { UserTasksController } from './user-tasks.controller';
import { CreateUserTaskUseCase } from './useCase/create-userTask.usecase';
import { User } from 'src/domain/entities/user.entity';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { FetchUserTasksForUserUseCase } from './useCase/fetch-userTasks-for-user.usecase';
import { FetchUserTasksByWeekUseCase } from './useCase/fetch-usertasks-by-week.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserTask, User])],
  controllers: [UserTasksController],
  providers: [
    CreateUserTaskUseCase,
    FetchUserTasksForUserUseCase,
    FetchUserTasksByWeekUseCase,
    ExceptionsService,
  ],
})
export class UserTasksModule {}
