import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum NotificationStatus {
  sent,
  read,
}

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  userId: string;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: true })
  @JoinColumn()
  taskId?: string | null;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.sent,
  })
  status: NotificationStatus;

  @Column()
  message: string;

  @CreateDateColumn()
  sentAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;
}
