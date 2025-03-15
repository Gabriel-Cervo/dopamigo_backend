import { PartialType } from '@nestjs/swagger';
import { VirtualPet } from 'src/domain/entities/virtualPet.entity';

export class EditPetDto extends PartialType(VirtualPet) {}
