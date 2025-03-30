import { PartialType } from '@nestjs/swagger';
import { Achievements } from 'src/domain/entities/achievements.entity';

export class SaveAchievementDto extends PartialType(Achievements) {}
