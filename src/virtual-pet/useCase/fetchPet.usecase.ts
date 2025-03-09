import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VirtualPet } from 'src/domain/entities/virtualPet.entity';
import { PetResponseDto } from '../dto/pet-response.dto';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { IException } from 'src/infra/exceptions/exceptions.interface';

@Injectable()
export class FetchPetUseCase {
  constructor(
    @InjectRepository(VirtualPet)
    private readonly petRepo: Repository<VirtualPet>,

    @Inject(ExceptionsService)
    private readonly exceptionService: IException,
  ) {}

  async execute(id: string) {
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
