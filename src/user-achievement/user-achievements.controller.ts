import { Controller, Get, Inject, UseGuards, Request } from '@nestjs/common';
import { FetchUserAchievementsUseCase } from './useCase/fetch-user-achievements.usecase';
import { AuthGuard } from 'src/auth/auth.guard';
import { FetchUserAchievementsSorted } from './useCase/fetch-user-achievements-sorted.usecase';

@Controller('user-achievements')
export class UserAchievementsController {
  constructor(
    @Inject(FetchUserAchievementsUseCase)
    private readonly fetchUserAchievementsUseCase: FetchUserAchievementsUseCase,

    @Inject(FetchUserAchievementsSorted)
    private readonly fetchUserAchievementsSortedUseCase: FetchUserAchievementsSorted,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  fetch(@Request() req: any) {
    return this.fetchUserAchievementsUseCase.execute(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('grouped')
  fetchByGroup(@Request() req: any) {
    return this.fetchUserAchievementsSortedUseCase.execute(req.user.sub);
  }
}
