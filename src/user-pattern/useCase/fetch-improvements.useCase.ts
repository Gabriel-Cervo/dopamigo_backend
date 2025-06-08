import { Inject, Injectable } from '@nestjs/common';
import { UserPatternAnalysisService } from '../user-pattern-analysis.service';
import { OpenRouterService } from '../open-router.service';
import { FetchUserTasksByWeekUseCase } from 'src/user-tasks/useCase/fetch-usertasks-by-week.usecase';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { IException } from 'src/infra/exceptions/exceptions.interface';
import { FetchImprovementsWithinOneWeekUseCase } from './fetch-improvements-within-one-week.usecase';
import { SaveImprovementUseCase } from './save-improvement.usecase';

@Injectable()
export class FetchImprovementsUseCase {
  constructor(
    @Inject(UserPatternAnalysisService)
    private readonly userPatternAnalysisService: UserPatternAnalysisService,

    @Inject(OpenRouterService)
    private readonly openRouterService: OpenRouterService,

    @Inject(FetchUserTasksByWeekUseCase)
    private readonly fetchUserTasksUseCase: FetchUserTasksByWeekUseCase,

    @Inject(FetchImprovementsWithinOneWeekUseCase)
    private readonly fetchImprovementsWithinOneWeekUseCase: FetchImprovementsWithinOneWeekUseCase,

    @Inject(SaveImprovementUseCase)
    private readonly saveImprovementUseCase: SaveImprovementUseCase,

    @Inject(ExceptionsService)
    private readonly exceptionService: IException,
  ) {}

  async execute(id: string) {
    const lastActiveImprovement =
      await this.fetchImprovementsWithinOneWeekUseCase.execute(id);

    if (lastActiveImprovement) {
      return lastActiveImprovement.content;
    }

    const userPattern =
      await this.userPatternAnalysisService.getUserPatterns(id);

    const userTasksThisWeek = await this.fetchUserTasksUseCase.execute(
      id,
      new Date(),
    );

    const prompt = `O usuário conclui ${userPattern.completionPercentage}% das tarefas, levando em média ${userPattern.averageCompletionTime} para concluir uma tarefa. Ele possui ${userTasksThisWeek.length} tarefas em aberto para essa semana. Sugira estratégias de produtividade e/ou melhorias na organização pessoal.`;

    try {
      const result = await this.openRouterService.sendMessage(prompt);

      if (result.error) {
        throw this.exceptionService.internalServerErrorException({
          message: 'Houve um erro ao fazer a request para a IA',
        });
      }

      const message =
        result.choices[0]?.message.content ??
        `Não foi possível carregar uma sugestão de melhoria. Por favor, conclua mais tarefas.`;
      await this.saveImprovementUseCase.execute(id, message);
      return message;
    } catch (error) {
      throw this.exceptionService.internalServerErrorException({
        message: error,
      });
    }
  }
}
