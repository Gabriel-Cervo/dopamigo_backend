import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignInUseCase } from './useCase/signIn.usecase';
import { User } from 'src/domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [SignInUseCase, ExceptionsService, AuthGuard],
  exports: [ExceptionsService, AuthGuard, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
