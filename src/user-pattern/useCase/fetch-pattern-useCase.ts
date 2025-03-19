import { Inject, Injectable } from '@nestjs/common';
import { UserPatternAnalysisService } from '../user-pattern-analysis.service';

@Injectable()
export class FetchPatternUseCase {
  constructor(
    @Inject(UserPatternAnalysisService)
    private readonly userPatternAnalysisService: UserPatternAnalysisService,
  ) {}

  async execute(id: string) {
    return this.userPatternAnalysisService.getUserPatterns(id);
  }
}
