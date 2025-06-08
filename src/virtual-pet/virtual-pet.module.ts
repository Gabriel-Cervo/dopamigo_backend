import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { VirtualPet } from 'src/domain/entities/virtualPet.entity';
import { VirtualPetController } from './virtual-pet.controller';
import { CreatePetUseCase } from './useCase/createPet.usecase';
import { FetchPetUseCase } from './useCase/fetchPet.usecase';
import { DeletePetUseCase } from './useCase/deletePet.usecase';
import { EditPetUseCase } from './useCase/editPet.usecase';
import { VirtualPetService } from './virtual-pet.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, VirtualPet]), AuthModule],
  controllers: [VirtualPetController],
  providers: [
    CreatePetUseCase,
    FetchPetUseCase,
    DeletePetUseCase,
    EditPetUseCase,
    VirtualPetService,
  ],
})
export class VirtualPetModule {}
