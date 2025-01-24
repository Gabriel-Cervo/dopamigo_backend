import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { UserAchievements } from './userAchievements.entity';

@Entity()
export class Achievements {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  name: string;

  @Column()
  description: string;

  @Column()
  criteria: string;

  @OneToMany(() => UserAchievements, (achievement) => achievement.achievementId)
  userAchievements: UserAchievements[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;
}
