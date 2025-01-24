import {
  Entity,
  Column,
  Index,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Notifications } from './notifications.entity';

@Entity()
export class UserTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  userId: string;

  @ManyToOne(() => Notifications, (notification) => notification.taskId)
  @JoinColumn()
  notifications?: Notifications[];

  @Column()
  @Index()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  time: Date;

  @Column()
  isCompleted: boolean;

  @Column()
  notificationTime: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;
}
