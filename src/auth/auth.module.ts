import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignInUseCase } from './useCase/signIn.usecase';
import { User } from 'src/domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [SignInUseCase, ExceptionsService],
  controllers: [AuthController],
})
export class AuthModule {}

