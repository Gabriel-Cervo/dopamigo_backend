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

@Controller('userTasks')
export class UserTasksController {
  constructor(
    @Inject(CreateUserTaskUseCase)
    private readonly createUserTaskUseCase: CreateUserTaskUseCase,

    @Inject(FetchUserTasksForUserUseCase)
    private readonly fetchUserTasksUseCase: FetchUserTasksForUserUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserTaskDto: CreateUserTaskDto) {
    return this.createUserTaskUseCase.execute(createUserTaskDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id/:page')
  get(@Param('id') id: string, @Param('page') page: string) {
    return this.fetchUserTasksUseCase.execute(
      id,
      page == null ? null : parseInt(page),
    );
  }
}
