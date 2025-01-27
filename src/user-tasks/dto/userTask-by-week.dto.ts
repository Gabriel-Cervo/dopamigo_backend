import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserTaskByWeekDto {
  @IsNotEmpty()
  date: string;
}
