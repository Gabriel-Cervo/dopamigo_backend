import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAchievements } from 'src/domain/entities/userAchievements.entity';
import { Achievements } from 'src/domain/entities/achievements.entity';
import {
  UserAchievementSortedDTO,
  UserAchievementsSortedResponseDTO,
} from '../dto/fetch-user-achievement-sorted-response.dto';

@Injectable()
export class FetchUserAchievementsSorted {
  constructor(
    @InjectRepository(UserAchievements)
    private readonly userAchievementRepo: Repository<UserAchievements>,

    @InjectRepository(Achievements)
    private readonly achivementsRepo: Repository<Achievements>,
  ) {}

  async execute(userId: string): Promise<UserAchievementsSortedResponseDTO> {
    const allAchievements = await this.achivementsRepo.find();

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
      .getRawMany();

    const unlocked = userAchievements.map(UserAchievementSortedDTO.fromRaw);

    const unlockedIds = new Set(unlocked.map((u) => u.achievementId));
    const blocked = allAchievements
      .filter((a) => !unlockedIds.has(a.id))
      .map(
        (a) =>
          new UserAchievementSortedDTO({
            id: a.id,
            unlockedAt: null,
            name: a.name,
            description: a.description,
          }),
      );

    return new UserAchievementsSortedResponseDTO(unlocked, blocked);
  }
}
