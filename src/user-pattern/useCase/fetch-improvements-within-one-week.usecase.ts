import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSuggestion } from 'src/domain/entities/userSuggestion.entity';
import { UserImprovement } from 'src/domain/entities/userImprovement.entity';

@Injectable()
export class FetchImprovementsWithinOneWeekUseCase {
  constructor(
    @InjectRepository(UserImprovement)
    private readonly improvementRepo: Repository<UserImprovement>,
  ) {}

  async execute(userId: string): Promise<UserSuggestion | null> {
    const startDate = new Date().toISOString();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return this.improvementRepo
      .createQueryBuilder('improvements')
      .leftJoin('improvements.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('improvements.createdAt > :oneWeekAgo', { oneWeekAgo })
      .andWhere('improvements.createdAt <= :startDate', { startDate })
      .getOne();
  }
}
