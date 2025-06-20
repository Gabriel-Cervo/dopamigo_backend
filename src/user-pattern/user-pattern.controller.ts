import { Controller, Get, Inject, UseGuards, Request } from '@nestjs/common';
import { FetchSuggestionUseCase } from './useCase/fetch-suggestion-useCase';
import { AuthGuard } from 'src/auth/auth.guard';
import { FetchPatternUseCase } from './useCase/fetch-pattern-useCase';
import { FetchImprovementsUseCase } from './useCase/fetch-improvements.useCase';

@Controller('user-pattern')
export class UserPatternController {
  constructor(
    @Inject(FetchSuggestionUseCase)
    private readonly fetchSuggestionUseCase: FetchSuggestionUseCase,

    @Inject(FetchPatternUseCase)
    private readonly fetchPatternUseCase: FetchPatternUseCase,

    @Inject(FetchImprovementsUseCase)
    private readonly fetchImprovementsUseCase: FetchImprovementsUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Get('me')
  fetchPatterns(@Request() req: any) {
    return this.fetchPatternUseCase.execute(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('suggestions')
  fetchSuggestions(@Request() req: any) {
    return this.fetchSuggestionUseCase.execute(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('improvements')
  fetchImprovements(@Request() req: any) {
    return this.fetchImprovementsUseCase.execute(req.user.sub);
  }
}
