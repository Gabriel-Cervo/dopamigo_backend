import { Controller, Get, Inject, UseGuards, Request } from '@nestjs/common';
import { FetchSuggestionUseCase } from './useCase/fetch-suggestion-useCase';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user-pattern')
export class UserPatternController {
  constructor(
    @Inject(FetchSuggestionUseCase)
    private readonly fetchSuggestionUseCase: FetchSuggestionUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Get('suggestions')
  fetchSuggestions(@Request() req: any) {
    return this.fetchSuggestionUseCase.execute(req.user.sub);
  }
}
