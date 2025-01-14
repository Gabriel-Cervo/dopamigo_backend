/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class EditUserUseCase {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async execute(id: string, input: UpdateUserDto) {
    const user = await this.userRepo.findOneOrFail({ where: { id } });

    input.name && (user.name = input.name);
    input.nickname && (user.nickname = input.nickname);
    input.email && (user.email = input.email);
    input.password && (user.password = await bcrypt.hash(input.password, 10));
    input.birthDate && (user.birthDate = new Date(input.birthDate));

    return this.userRepo.save(user);
  }
}
