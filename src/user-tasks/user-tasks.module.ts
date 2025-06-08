import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTask } from 'src/domain/entities/userTask.entity';
import { UserTasksController } from './user-tasks.controller';
import { CreateUserTaskUseCase } from './useCase/create-userTask.usecase';
import { User } from 'src/domain/entities/user.entity';
import { FetchUserTasksForUserUseCase } from './useCase/fetch-userTasks-for-user.usecase';
import { FetchUserTasksByWeekUseCase } from './useCase/fetch-usertasks-by-week.usecase';
import { EditUserTaskUseCase } from './useCase/edit-userTask.usecase';
import { DeleteUserTaskUseCase } from './useCase/delete-userTask.usecase';
import { Score } from 'src/domain/entities/score.entity';
import { VirtualPetService } from 'src/virtual-pet/virtual-pet.service';
import { FetchPetUseCase } from 'src/virtual-pet/useCase/fetchPet.usecase';
import { EditPetUseCase } from 'src/virtual-pet/useCase/editPet.usecase';
import { VirtualPet } from 'src/domain/entities/virtualPet.entity';
import { Achievements } from 'src/domain/entities/achievements.entity';
import { UserAchievementsService } from 'src/user-achievement/user-achievements.service';
import { SaveAchievementUseCase } from 'src/user-achievement/useCase/save-achievement.usecase';
import { FetchAchievementsUseCase } from 'src/user-achievement/useCase/fetch-achievements.usecase';
import { SaveUserAchievementUseCase } from 'src/user-achievement/useCase/save-user-achievement.usecase';
import { FetchUserAchievementsUseCase } from 'src/user-achievement/useCase/fetch-user-achievements.usecase';
import { UserAchievements } from 'src/domain/entities/userAchievements.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserTask,
      User,
      Score,
      VirtualPet,
      Achievements,
      UserAchievements,
    ]),
    AuthModule,
  ],
  controllers: [UserTasksController],
  providers: [
    CreateUserTaskUseCase,
    FetchUserTasksForUserUseCase,
    FetchUserTasksByWeekUseCase,
    EditUserTaskUseCase,
    DeleteUserTaskUseCase,
    FetchPetUseCase,
    EditPetUseCase,
    VirtualPetService,
    UserAchievementsService,
    SaveAchievementUseCase,
    FetchAchievementsUseCase,
    SaveUserAchievementUseCase,
    FetchUserAchievementsUseCase,
  ],
})
export class UserTasksModule {}
