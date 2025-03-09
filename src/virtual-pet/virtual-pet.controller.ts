import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreatePetUseCase } from './useCase/createPet.usecase';
import { CreatePetDto } from './dto/create-pet.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('pet')
@UseGuards(AuthGuard)
export class VirtualPetController {
  constructor(
    @Inject(CreatePetUseCase)
    private readonly createPetUseCase: CreatePetUseCase,
  ) {}

  @Post()
  create(@Request() req: any, @Body() createPetDto: CreatePetDto) {
    return this.createPetUseCase.execute(createPetDto, req.user.sub);
  }
}
