import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { VirtualPet } from 'src/domain/entities/virtualPet.entity';
import { VirtualPetController } from './virtual-pet.controller';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { CreatePetUseCase } from './useCase/createPet.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User, VirtualPet])],
  controllers: [VirtualPetController],
  providers: [ExceptionsService, CreatePetUseCase],
})
export class VirtualPetModule {}
