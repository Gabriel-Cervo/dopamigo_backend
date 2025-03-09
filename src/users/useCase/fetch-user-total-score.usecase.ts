import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Score } from 'src/domain/entities/score.entity';

@Injectable()
export class FetchUserTotalScoreUseCase {
  constructor(
    @InjectRepository(Score)
    private scoreRepo: Repository<Score>,
  ) {}

  async execute(id: string) {
    const totalPoints: number = await this.scoreRepo
      .createQueryBuilder('score')
      .leftJoin('score.user', 'user')
      .where('user.id = :id', { id })
      .select('SUM(score.points)', 'total')
      .getRawOne();

    return totalPoints;
  }
}
