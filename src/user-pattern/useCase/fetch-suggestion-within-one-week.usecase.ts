import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSuggestion } from 'src/domain/entities/userSuggestion.entity';

@Injectable()
export class FetchSuggestionWithinOneWeekUseCase {
  constructor(
    @InjectRepository(UserSuggestion)
    private readonly suggestionRepo: Repository<UserSuggestion>,
  ) {}

  async execute(userId: string): Promise<UserSuggestion | null> {
    const startDate = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return this.suggestionRepo
      .createQueryBuilder('suggestion')
      .leftJoin('suggestion.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('suggestion.createdAt BETWEEN :oneWeekAgo AND :startDate', {
        oneWeekAgo,
        startDate,
      })
      .orderBy('suggestion.createdAt', 'DESC')
      .getOne();
  }
}
