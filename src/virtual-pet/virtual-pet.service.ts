import { Inject, Injectable } from '@nestjs/common';
import { EditPetUseCase } from './useCase/editPet.usecase';
import { EditPetDto } from './dto/edit-pet.dto';
import { FetchPetUseCase } from './useCase/fetchPet.usecase';

@Injectable()
export class VirtualPetService {
  constructor(
    @Inject(EditPetUseCase)
    private readonly editPetUseCase: EditPetUseCase,

    @Inject(FetchPetUseCase)
    private readonly fetchPetUseCase: FetchPetUseCase,
  ) {}

  async didFinishTask(userId: string, taskDifficultLevel: number) {
    const pet = await this.fetchPetUseCase.execute(userId);
    const newHappinessLevel = pet.hapinessLevel + taskDifficultLevel * 5;
    const cappedHappinessLevel = Math.min(100, newHappinessLevel);
    const dto = new EditPetDto({
      lastInteraction: new Date(),
      hapinessLevel: cappedHappinessLevel,
    });

    await this.editPetUseCase.execute(dto, userId);
  }

  async levelUpIfNeeded(totalPoints: number, userId: string) {
    const newLevel = Math.floor(totalPoints / 10) + 1;

    const pet = await this.petRepo.findOne({
      where: { user: { id: userId } },
    });

    if (!pet) {
      return;
    }

    if (pet.level < newLevel) {
      pet.level = newLevel;
      await this.petRepo.save(pet);
    }
  }
}
