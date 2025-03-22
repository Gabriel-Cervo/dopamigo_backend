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
    return this.suggestionRepo
      .createQueryBuilder('suggestion')
      .where('suggestion.userId = :userId', { userId })
      .andWhere('suggestion.createdAt >= :date', {
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      })
      .orderBy('suggestion.createdAt', 'DESC')
      .getOne();
  }
}
