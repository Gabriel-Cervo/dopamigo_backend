import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTaskDto } from './create-userTask.dto';

export class UpdateUserTaskDto extends PartialType(CreateUserTaskDto) {}
