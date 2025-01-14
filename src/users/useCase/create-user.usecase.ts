import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from 'src/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async execute(input: CreateUserDto) {
    const user = new User({
      name: input.name,
      nickname: input.nickname,
      email: input.email,
      birthDate: new Date(input.birthDate),
      password: await bcrypt.hash(input.password, 10),
    });

    return this.userRepo.save(user);
  }
}
