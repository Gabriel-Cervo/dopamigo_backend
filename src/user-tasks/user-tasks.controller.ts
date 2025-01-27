import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserTaskUseCase } from './useCase/create-userTask.usecase';
import { CreateUserTaskDto } from './dto/create-userTask.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FetchUserTasksForUserUseCase } from './useCase/fetch-userTasks-for-user.usecase';
import { UserTaskByWeekDto } from './dto/userTask-by-week.dto';
import { FetchUserTasksByWeekUseCase } from './useCase/fetch-usertasks-by-week.usecase';

@Controller('userTasks')
export class UserTasksController {
  constructor(
    @Inject(CreateUserTaskUseCase)
    private readonly createUserTaskUseCase: CreateUserTaskUseCase,

    @Inject(FetchUserTasksForUserUseCase)
    private readonly fetchUserTasksUseCase: FetchUserTasksForUserUseCase,

    @Inject(FetchUserTasksByWeekUseCase)
    private readonly fetchUserTasksByWeekUseCase: FetchUserTasksByWeekUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserTaskDto: CreateUserTaskDto) {
    return this.createUserTaskUseCase.execute(createUserTaskDto);
  }

  @UseGuards(AuthGuard)
  @Get('all/:id/:page')
  get(@Param('id') id: string, @Param('page') page: string) {
    return this.fetchUserTasksUseCase.execute(
      id,
      page == null ? null : parseInt(page),
    );
  }

  @UseGuards(AuthGuard)
  @Get('byWeek/:id')
  getByWeek(@Param('id') id: string, @Body() body: UserTaskByWeekDto) {
    const date = new Date(body.date);
    return this.fetchUserTasksByWeekUseCase.execute(id, date);
  }
}
