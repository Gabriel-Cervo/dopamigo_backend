import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Achievements } from './achievements.entity';

@Entity()
export class UserAchievements {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  userId: string;

  @ManyToOne(() => Achievements, (achievement) => achievement.userAchievements)
  @JoinColumn()
  achievementId: string;

  @CreateDateColumn()
  unlockedAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;
}
