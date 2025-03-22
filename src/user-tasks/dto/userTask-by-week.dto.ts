import { IsNotEmpty } from 'class-validator';

export class UserTaskByWeekDto {
  @IsNotEmpty()
  date: string;
}
