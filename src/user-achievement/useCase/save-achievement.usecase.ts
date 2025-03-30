import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievements } from 'src/domain/entities/achievements.entity';
import { Repository } from 'typeorm';
import { SaveAchievementDto } from '../dto/save-achievement.dto';

@Injectable()
export class SaveAchievementUseCase {
  constructor(
    @InjectRepository(Achievements)
    private readonly achievementRepo: Repository<Achievements>,
  ) {}

  async execute(content: SaveAchievementDto): Promise<Achievements | null> {
    const achievement = new Achievements(content);
    return this.achievementRepo.save(achievement);
  }
}
