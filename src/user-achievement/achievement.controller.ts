import { Controller, Get, Inject } from '@nestjs/common';
import { FetchAchievementsUseCase } from './useCase/fetch-achievements.usecase';

@Controller('achievements')
export class AchievementsController {
  constructor(
    @Inject(FetchAchievementsUseCase)
    private readonly fetchAchievementsUseCase: FetchAchievementsUseCase,
  ) {}

  @Get()
  fetch() {
    return this.fetchAchievementsUseCase.execute();
  }
}
