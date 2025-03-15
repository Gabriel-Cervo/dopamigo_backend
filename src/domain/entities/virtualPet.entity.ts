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

  @OneToOne(() => User, (user) => user.pet)
  user: User;

  @Column()
  name: string;

  @Column()
  level: number;

  @Column()
  hapinessLevel: number;

  @Column({ type: 'timestamp' })
  lastInteraction: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt?: Date | null;

  constructor(name: string) {
    this.name = name;
    this.level = 0;
    this.hapinessLevel = 100;
    this.lastInteraction = new Date();
  }
}
