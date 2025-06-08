import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTask } from 'src/domain/entities/userTask.entity';
import { User } from 'src/domain/entities/user.entity';
import { UserPatternAnalysisService } from './user-pattern-analysis.service';
import { OpenRouterService } from './open-router.service';
import { UserPatternController } from './user-pattern.controller';
import { HttpModule } from '@nestjs/axios';
import { FetchSuggestionUseCase } from './useCase/fetch-suggestion-useCase';
import { FetchPatternUseCase } from './useCase/fetch-pattern-useCase';
import { FetchUserTasksByWeekUseCase } from 'src/user-tasks/useCase/fetch-usertasks-by-week.usecase';
import { FetchSuggestionWithinOneWeekUseCase } from './useCase/fetch-suggestion-within-one-week.usecase';
import { SaveSuggestionUseCase } from './useCase/save-suggestion.usecase';
import { UserSuggestion } from 'src/domain/entities/userSuggestion.entity';
import { SaveImprovementUseCase } from './useCase/save-improvement.usecase';
import { FetchImprovementsWithinOneWeekUseCase } from './useCase/fetch-improvements-within-one-week.usecase';
import { FetchImprovementsUseCase } from './useCase/fetch-improvements.useCase';
import { UserImprovement } from 'src/domain/entities/userImprovement.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTask, User, UserSuggestion, UserImprovement]),
    HttpModule,
    AuthModule,
  ],
  providers: [
    UserPatternAnalysisService,
    OpenRouterService,
    FetchSuggestionUseCase,
    FetchPatternUseCase,
    FetchUserTasksByWeekUseCase,
    FetchSuggestionWithinOneWeekUseCase,
    SaveSuggestionUseCase,
    FetchImprovementsUseCase,
    FetchImprovementsWithinOneWeekUseCase,
    SaveImprovementUseCase,
  ],
  controllers: [UserPatternController],
})
export class UserPatternModule {}
