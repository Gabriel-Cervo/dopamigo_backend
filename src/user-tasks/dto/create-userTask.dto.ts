import { IsNotEmpty } from 'class-validator';

export class CreateUserTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  difficultLevel: number;

  isCompleted?: boolean | null;
}
