import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CreateUserTaskUseCase } from './useCase/create-userTask.usecase';
import { CreateUserTaskDto } from './dto/create-userTask.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FetchUserTasksForUserUseCase } from './useCase/fetch-userTasks-for-user.usecase';
import { UserTaskByWeekDto } from './dto/userTask-by-week.dto';
import { FetchUserTasksByWeekUseCase } from './useCase/fetch-usertasks-by-week.usecase';
import { EditUserTaskUseCase } from './useCase/edit-userTask.usecase';
import { UpdateUserTaskDto } from './dto/update-userTask.dto';
import { DeleteUserTaskUseCase } from './useCase/delete-userTask.usecase';

@Controller('userTasks')
export class UserTasksController {
  constructor(
    @Inject(CreateUserTaskUseCase)
    private readonly createUserTaskUseCase: CreateUserTaskUseCase,

    @Inject(FetchUserTasksForUserUseCase)
    private readonly fetchUserTasksUseCase: FetchUserTasksForUserUseCase,

    @Inject(FetchUserTasksByWeekUseCase)
    private readonly fetchUserTasksByWeekUseCase: FetchUserTasksByWeekUseCase,

    @Inject(EditUserTaskUseCase)
    private readonly editUserTaskUseCase: EditUserTaskUseCase,

    @Inject(DeleteUserTaskUseCase)
    private readonly deleteUserTaskUseCase: DeleteUserTaskUseCase,
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

  @UseGuards(AuthGuard)
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateUserTaskDto) {
    return this.editUserTaskUseCase.execute(id, updateTaskDto);
  }

  @UseGuards(AuthGuard)
  @Delete('update/:id')
  delete(@Param('id') id: string) {
    return this.deleteUserTaskUseCase.execute(id);
  }
}
