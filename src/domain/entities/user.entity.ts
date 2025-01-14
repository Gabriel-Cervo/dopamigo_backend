import {
  Entity,
  PrimaryColumn,
  Column,
  Index,
  CreateDateColumn,
} from 'typeorm';
import crypto from 'crypto';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryColumn()
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

  constructor(
    props: {
      name: string;
      nickname: string;
      email: string;
      password: string;
      birthDate: Date;
      deletedAt?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}
