import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
  Get,
  Delete,
  Req,
} from '@nestjs/common';
import { CreatePetUseCase } from './useCase/createPet.usecase';
import { CreatePetDto } from './dto/create-pet.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FetchPetUseCase } from './useCase/fetchPet.usecase';
import { DeletePetUseCase } from './useCase/deletePet.usecase';

@Controller('pet')
@UseGuards(AuthGuard)
export class VirtualPetController {
  constructor(
    @Inject(CreatePetUseCase)
    private readonly createPetUseCase: CreatePetUseCase,

    @Inject(FetchPetUseCase)
    private readonly fetchPetUseCase: FetchPetUseCase,

    @Inject(DeletePetUseCase)
    private readonly deletePetUseCase: DeletePetUseCase,
  ) {}

  @Post()
  create(@Request() req: any, @Body() createPetDto: CreatePetDto) {
    return this.createPetUseCase.execute(createPetDto, req.user.sub);
  }

  @Get()
  get(@Request() req: any) {
    return this.fetchPetUseCase.execute(req.user.sub);
  }

  @Delete()
  delete(@Req() req: any) {
    return this.deletePetUseCase.execute(req.user.sub);
  }
}
