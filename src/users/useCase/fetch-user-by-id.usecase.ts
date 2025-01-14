import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserFetchResponseDTO } from '../dto/user-fetch-response.dto';

@Injectable()
export class FetchUserByIdUseCase {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async execute(input: string) {
    const user: UserFetchResponseDTO | undefined = await this.userRepo.findOne({
      where: { id: input },
      select: {
        email: true,
        name: true,
        nickname: true,
        birthDate: true,
      },
    });

    return user;
  }
}
