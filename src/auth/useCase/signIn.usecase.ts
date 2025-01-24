import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { SignInDto } from '../dto/signIn.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { IException } from 'src/infra/exceptions/exceptions.interface';

@Injectable()
export class SignInUseCase {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    private jwtService: JwtService,

    @Inject(ExceptionsService)
    private readonly exceptionService: IException,
  ) {}

  async execute(input: SignInDto) {
    const user = await this.userRepo.findOneOrFail({
      where: { email: input.email },
    });

    const doesPasswordMatch = await bcrypt.compare(
      input.password,
      user.password,
    );

    if (!doesPasswordMatch) {
      throw this.exceptionService.UnauthorizedException({ message: '' });
    }

    // I choosed a property name of sub to hold our userId value to be consistent with JWT standards.
    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        userName: user.name,
      }),
    };
  }
}
