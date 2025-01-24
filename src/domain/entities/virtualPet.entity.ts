import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class VirtualPet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.tasks)
  userId: string;

  @Column()
  name: string;

  @Column({ type: 'json' })
  appearance: string;

  @Column()
  hapinessLevel: number;

  @Column({ type: 'timestamp' })
  lastInteraction: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;
}
