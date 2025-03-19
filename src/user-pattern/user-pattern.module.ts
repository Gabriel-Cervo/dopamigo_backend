import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTask } from 'src/domain/entities/userTask.entity';
import { User } from 'src/domain/entities/user.entity';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { UserPatternAnalysisService } from './user-pattern-analysis.service';
import { OpenRouterService } from './open-router.service';
import { UserPatternController } from './user-pattern.controller';
import { HttpModule } from '@nestjs/axios';
import { FetchSuggestionUseCase } from './useCase/fetch-suggestion-useCase';

@Module({
  imports: [TypeOrmModule.forFeature([UserTask, User]), HttpModule],
  providers: [
    ExceptionsService,
    UserPatternAnalysisService,
    OpenRouterService,
    FetchSuggestionUseCase,
  ],
  controllers: [UserPatternController],
})
export class UserPatternModule {}
