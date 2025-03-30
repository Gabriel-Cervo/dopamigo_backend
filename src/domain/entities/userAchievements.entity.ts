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
  user: User;

  @ManyToOne(() => Achievements, (achievement) => achievement.userAchievements)
  @JoinColumn()
  achievement: Achievements;

  @CreateDateColumn()
  unlockedAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;

  constructor(props?: Partial<UserAchievements>) {
    Object.assign(this, props);
  }
}
