/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VirtualPet } from 'src/domain/entities/virtualPet.entity';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { IException } from 'src/infra/exceptions/exceptions.interface';
import { EditPetDto } from '../dto/edit-pet.dto';
import { PetResponseDto } from '../dto/pet-response.dto';

@Injectable()
export class EditPetUseCase {
  constructor(
    @InjectRepository(VirtualPet)
    private readonly petRepo: Repository<VirtualPet>,

    @Inject(ExceptionsService)
    private readonly exceptionService: IException,
  ) {}

  async execute(input: EditPetDto, id: string) {
    const savedPets = await this.petRepo
      .createQueryBuilder('pet')
      .leftJoin('pet.user', 'user')
      .where('user.id = :id', { id })
      .andWhere('pet.deletedAt is NULL')
      .getMany();

    if (savedPets.length == 0) {
      throw this.exceptionService.badRequestException({
        message: 'Ops! Você ainda não possui um pet registrado',
      });
    }

    const activePet = savedPets[0];
    input.name && (activePet.name = input.name);
    input.hapinessLevel && (activePet.hapinessLevel = input.hapinessLevel);
    input.lastInteraction &&
      (activePet.lastInteraction = input.lastInteraction);
    input.level && (activePet.level = input.level);
    await this.petRepo.save(activePet);
    const response = new PetResponseDto(
      activePet.id,
      activePet.name,
      activePet.level,
      activePet.hapinessLevel,
      activePet.lastInteraction,
    );
    return response;
  }
}
