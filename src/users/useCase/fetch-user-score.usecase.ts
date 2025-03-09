import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Score } from 'src/domain/entities/score.entity';

@Injectable()
export class FetchUserScoreUseCase {
  constructor(
    @InjectRepository(Score)
    private scoreRepo: Repository<Score>,
  ) {}

  async execute(id: string) {
    const scores = await this.scoreRepo
      .createQueryBuilder('score')
      .leftJoin('score.user', 'user')
      .where('user.id = :id', { id })
      .select(`TO_CHAR(score.createdAt, 'TMMonth-YYYY')`, 'month')
      .addSelect('json_agg(score.points)', 'points')
      .groupBy("TO_CHAR(score.createdAt, 'TMMonth-YYYY')")
      .orderBy('MIN(score.createdAt)', 'ASC')
      .getRawMany();

    return scores;
  }
}
