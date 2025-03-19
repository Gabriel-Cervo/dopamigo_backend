import { Inject, Injectable } from '@nestjs/common';
import { UserPatternAnalysisService } from '../user-pattern-analysis.service';
import { OpenRouterService } from '../open-router.service';

@Injectable()
export class FetchSuggestionUseCase {
  constructor(
    @Inject(UserPatternAnalysisService)
    private readonly userPatternAnalysisService: UserPatternAnalysisService,

    @Inject(OpenRouterService)
    private readonly openRouterService: OpenRouterService,
  ) {}

  async execute(id: string) {
    const userPattern = this.userPatternAnalysisService.getUserPatterns(id);

    console.log(userPattern);
    return userPattern;
  }
}
