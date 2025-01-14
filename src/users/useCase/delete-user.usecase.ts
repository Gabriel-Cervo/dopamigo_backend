import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/domain/dto/defaultResponse.dto';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async execute(input: string) {
    const user = await this.userRepo.findOneOrFail({
      where: { id: input },
    });

    user.deletedAt = new Date();
    this.userRepo.save(user);

    return new DefaultResponseDto('User deleted with success!');
  }
}
