import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VirtualPet } from 'src/domain/entities/virtualPet.entity';
import { User } from 'src/domain/entities/user.entity';
import { CreatePetDto } from '../dto/create-pet.dto';
import { PetResponseDto } from '../dto/pet-response.dto';

@Injectable()
export class CreatePetUseCase {
  constructor(
    @InjectRepository(VirtualPet)
    private readonly petRepo: Repository<VirtualPet>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async execute(input: CreatePetDto, userId: string) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });

    const pet = new VirtualPet(input.name);
    pet.user = user;

    const savedPet = await this.petRepo.save(pet);

    const response = new PetResponseDto(
      savedPet.id,
      savedPet.name,
      savedPet.level,
      savedPet.hapinessLevel,
      savedPet.lastInteraction,
    );
    return response;
  }
}
