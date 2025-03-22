import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class UserSuggestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.suggestions, { eager: true })
  @JoinColumn()
  user: User;

  constructor(props?: Partial<UserSuggestion>) {
    Object.assign(this, props);
  }
}
