import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum ReportType {
  weekly,
  monthly,
  historic,
}

@Entity()
export class Reports {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  userId: string;

  @Column({
    type: 'enum',
    enum: ReportType,
    default: ReportType.weekly,
  })
  role: ReportType;

  @Column()
  content: string;

  @CreateDateColumn()
  generatedAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;
}
