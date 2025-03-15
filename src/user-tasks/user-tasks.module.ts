import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTask } from 'src/domain/entities/userTask.entity';
import { UserTasksController } from './user-tasks.controller';
import { CreateUserTaskUseCase } from './useCase/create-userTask.usecase';
import { User } from 'src/domain/entities/user.entity';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { FetchUserTasksForUserUseCase } from './useCase/fetch-userTasks-for-user.usecase';
import { FetchUserTasksByWeekUseCase } from './useCase/fetch-usertasks-by-week.usecase';
import { EditUserTaskUseCase } from './useCase/edit-userTask.usecase';
import { DeleteUserTaskUseCase } from './useCase/delete-userTask.usecase';
import { Score } from 'src/domain/entities/score.entity';
import { VirtualPetService } from 'src/virtual-pet/virtual-pet.service';
import { FetchPetUseCase } from 'src/virtual-pet/useCase/fetchPet.usecase';
import { EditPetUseCase } from 'src/virtual-pet/useCase/editPet.usecase';
import { VirtualPet } from 'src/domain/entities/virtualPet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTask, User, Score, VirtualPet])],
  controllers: [UserTasksController],
  providers: [
    CreateUserTaskUseCase,
    FetchUserTasksForUserUseCase,
    FetchUserTasksByWeekUseCase,
    EditUserTaskUseCase,
    DeleteUserTaskUseCase,
    ExceptionsService,
    FetchPetUseCase,
    EditPetUseCase,
    VirtualPetService,
  ],
})
export class UserTasksModule {}
