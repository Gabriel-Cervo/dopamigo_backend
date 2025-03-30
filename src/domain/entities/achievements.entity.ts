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

  @OneToMany(() => UserAchievements, (achievement) => achievement.achievement)
  userAchievements: UserAchievements[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;

  constructor(props?: Partial<Achievements>) {
    Object.assign(this, props);
  }
}
