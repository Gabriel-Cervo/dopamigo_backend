import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VirtualPet } from 'src/domain/entities/virtualPet.entity';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { IException } from 'src/infra/exceptions/exceptions.interface';
import { DefaultResponseDto } from 'src/domain/dto/defaultResponse.dto';

@Injectable()
export class DeletePetUseCase {
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
    activePet.deletedAt = new Date();
    await this.petRepo.save(activePet);
    return new DefaultResponseDto('Pet deletado com sucesso!');
  }
}
