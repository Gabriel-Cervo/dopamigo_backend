import { Inject, Injectable } from '@nestjs/common';
import { UserPatternAnalysisService } from '../user-pattern-analysis.service';
import { OpenRouterService } from '../open-router.service';
import { FetchUserTasksByWeekUseCase } from 'src/user-tasks/useCase/fetch-usertasks-by-week.usecase';
import { FetchSuggestionWithinOneWeekUseCase } from './fetch-suggestion-within-one-week.usecase';
import { SaveSuggestionUseCase } from './save-suggestion.usecase';

@Injectable()
export class FetchSuggestionUseCase {
  constructor(
    @Inject(UserPatternAnalysisService)
    private readonly userPatternAnalysisService: UserPatternAnalysisService,

    @Inject(OpenRouterService)
    private readonly openRouterService: OpenRouterService,

    @Inject(FetchUserTasksByWeekUseCase)
    private readonly fetchUserTasksUseCase: FetchUserTasksByWeekUseCase,

    @Inject(FetchSuggestionWithinOneWeekUseCase)
    private readonly fetchSuggestionWithinOneWeekUseCase: FetchSuggestionWithinOneWeekUseCase,

    @Inject(SaveSuggestionUseCase)
    private readonly saveSugestionUseCase: SaveSuggestionUseCase,
  ) {}

  async execute(id: string) {
    const lastActiveSuggestion =
      await this.fetchSuggestionWithinOneWeekUseCase.execute(id);

    if (lastActiveSuggestion) {
      return lastActiveSuggestion;
    }

    const userPattern =
      await this.userPatternAnalysisService.getUserPatterns(id);

    const userTasksThisWeek = await this.fetchUserTasksUseCase.execute(
      id,
      new Date(),
    );

    const prompt = `O usuário costuma concluir tarefas com mais frequência às ${userPattern.averageCompletionTime}. Ele é mais produtivo nos dias (em ordem) [${userPattern.mostProductiveDays}]. Ele leva em média ${userPattern.averageCompletionTime} para concluir uma tarefa. Sugira uma rotina diária para otimizar seu tempo, considerando que ele possui as seguintes tarefas ativas para essa semana: ${userTasksThisWeek}`;

    try {
      const result = await this.openRouterService.sendMessage(prompt);
      const message =
        result.choices[0]?.message.content ??
        `\\boxed{Não foi possível carregar uma sugestão. Por favor, conclua mais tarefas}`;
      const matchedMessage = message.match(/\\boxed\{(.*?)\}/)[1];
      await this.saveSugestionUseCase.execute(id, matchedMessage);
      return matchedMessage;
    } catch (error) {
      return error;
    }
  }
}
