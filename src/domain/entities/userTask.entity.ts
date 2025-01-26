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
  user: User;

  @ManyToOne(() => Notifications, (notification) => notification.task)
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

  @Column({ nullable: true })
  notificationTime?: number | null;

  @Column()
  difficultLevel: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;

  constructor(props: {
    title: string;
    description: string;
    time: Date;
    isCompleted: boolean;
    difficultLevel: number;
  }) {
    Object.assign(this, props);
  }
}
