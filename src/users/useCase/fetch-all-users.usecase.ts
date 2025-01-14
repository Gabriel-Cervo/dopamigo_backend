import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchAllUsersUseCase {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async execute() {
    return this.userRepo.find();
  }
}
