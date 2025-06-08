import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { LoggerModule } from './infra/logger/logger.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Achievements } from './domain/entities/achievements.entity';
import { Notifications } from './domain/entities/notifications.entity';
import { Reports } from './domain/entities/reports.entity';
import { Score } from './domain/entities/score.entity';
import { User } from './domain/entities/user.entity';
import { UserAchievements } from './domain/entities/userAchievements.entity';
import { UserTask } from './domain/entities/userTask.entity';
import { VirtualPet } from './domain/entities/virtualPet.entity';
import { UserTasksModule } from './user-tasks/user-tasks.module';
import { VirtualPetModule } from './virtual-pet/virtual-pet.module';
import { UserPatternModule } from './user-pattern/user-pattern.module';
import { UserSuggestion } from './domain/entities/userSuggestion.entity';
import { UserImprovement } from './domain/entities/userImprovement.entity';
import { UserAchievementModule } from './user-achievement/user-achievement.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Achievements,
        Notifications,
        Reports,
        Score,
        User,
        UserAchievements,
        UserTask,
        VirtualPet,
        UserSuggestion,
        UserImprovement,
      ],
      synchronize: true, // DONT USE THIS TRUE IN PROD
    }),

    LoggerModule,
    ExceptionsModule,
    AuthModule,
    UsersModule,
    UserTasksModule,
    VirtualPetModule,
    UserPatternModule,
    UserAchievementModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
