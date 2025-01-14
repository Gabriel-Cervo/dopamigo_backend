import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { SignInUseCase } from './useCase/signIn.usecase';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SignInUseCase)
    private readonly signInUseCase: SignInUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto);
  }
}
