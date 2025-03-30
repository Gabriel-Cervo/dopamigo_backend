import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAchievements } from 'src/domain/entities/userAchievements.entity';
import { UserAchievementDTO } from '../dto/fetch-user-achievement-response.dto';

@Injectable()
export class FetchUserAchievementsUseCase {
  constructor(
    @InjectRepository(UserAchievements)
    private readonly userAchievementRepo: Repository<UserAchievements>,
  ) {}

  async execute(userId: string): Promise<UserAchievementDTO[]> {
    const userAchievements = await this.userAchievementRepo
      .createQueryBuilder('userAchievements')
      .select([
        'userAchievements.id',
        'userAchievements.unlockedAt',
        'achievement.id',
        'achievement.name',
        'achievement.description',
      ])
      .leftJoin('userAchievements.user', 'user')
      .where('user.id = :userId', { userId })
      .leftJoin('userAchievements.achievement', 'achievement')
      .where('achievement.id = userAchievements.achievement')
      .getRawMany();

    return userAchievements.map(UserAchievementDTO.fromRaw);
  }
}
