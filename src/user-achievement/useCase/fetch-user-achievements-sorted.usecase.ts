import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievements } from 'src/domain/entities/achievements.entity';
import {
  UserAchievementSortedDTO,
  UserAchievementsSortedResponseDTO,
} from '../dto/fetch-user-achievement-sorted-response.dto';
import { FetchUserAchievementsUseCase } from './fetch-user-achievements.usecase';

@Injectable()
export class FetchUserAchievementsSorted {
  constructor(
    @InjectRepository(Achievements)
    private readonly achivementsRepo: Repository<Achievements>,

    @Inject(FetchUserAchievementsUseCase)
    private readonly fetchUserAchievementsUseCase: FetchUserAchievementsUseCase,
  ) {}

  async execute(userId: string): Promise<UserAchievementsSortedResponseDTO> {
    try {
      const allAchievements = await this.achivementsRepo.find();

      const userAchievements =
        await this.fetchUserAchievementsUseCase.execute(userId);

      const unlocked = userAchievements.map(
        (a) => new UserAchievementSortedDTO(a),
      );
      const unlockedIds = new Set(unlocked.map((u) => u.achievementId));
      console.log(unlockedIds);
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
    } catch {
      return new UserAchievementsSortedResponseDTO([], []);
    }
  }
}
