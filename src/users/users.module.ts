import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { UsersController } from './users.controller';
import { FetchAllUsersUseCase } from './useCase/fetch-all-users.usecase';
import { CreateUserUseCase } from './useCase/create-user.usecase';
import { FetchUserByIdUseCase } from './useCase/fetch-user-by-id.usecase';
import { DeleteUserUseCase } from './useCase/delete-user.usecase';
import { EditUserUseCase } from './useCase/edit-user.usecase';
import { Score } from 'src/domain/entities/score.entity';
import { FetchUserScoreUseCase } from './useCase/fetch-user-score.usecase';
import { FetchUserTotalScoreUseCase } from './useCase/fetch-user-total-score.usecase';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Score]), AuthModule],
  controllers: [UsersController],
  providers: [
    FetchAllUsersUseCase,
    CreateUserUseCase,
    FetchUserByIdUseCase,
    FetchUserScoreUseCase,
    FetchUserTotalScoreUseCase,
    DeleteUserUseCase,
    EditUserUseCase,
  ],
})
export class UsersModule {}
