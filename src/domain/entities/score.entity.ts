import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  user: User;

  @Column()
  points: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;

  constructor(props: { points: number; deletedAt?: Date | null }) {
    Object.assign(this, props);
  }
}
