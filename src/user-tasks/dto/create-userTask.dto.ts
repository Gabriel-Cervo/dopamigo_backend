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

  @IsNotEmpty()
  userId: string;

  isCompleted?: boolean | null;
}
