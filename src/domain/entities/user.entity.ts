import {
  Entity,
  Column,
  Index,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserTask } from './userTask.entity';
import { Score } from './score.entity';
import { UserAchievements } from './userAchievements.entity';
import { Reports } from './reports.entity';
import { Notifications } from './notifications.entity';
import { VirtualPet } from './virtualPet.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column({ unique: true })
  @Index({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: 'timestamp' })
  birthDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;

  @OneToMany(() => UserTask, (userTask) => userTask.userId)
  tasks: UserTask[];

  @OneToMany(() => Score, (score) => score.userId)
  scoreHistory: Score[];

  @OneToMany(() => UserAchievements, (achievement) => achievement.userId)
  achievements: UserAchievements[];

  @OneToMany(() => Reports, (report) => report.userId)
  reports: Reports[];

  @OneToMany(() => Notifications, (notification) => notification.userId)
  notifications: Notifications[];

  @OneToOne(() => VirtualPet, (pet) => pet.userId, { nullable: true })
  @JoinColumn()
  petId?: string | null;

  constructor(props: {
    name: string;
    nickname: string;
    email: string;
    password: string;
    birthDate: Date;
    deletedAt?: Date | null;
  }) {
    Object.assign(this, props);
  }
}
