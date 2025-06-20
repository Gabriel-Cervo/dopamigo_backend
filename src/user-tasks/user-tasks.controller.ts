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
  Request,
  Query,
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
  create(@Body() createUserTaskDto: CreateUserTaskDto, @Request() req: any) {
    return this.createUserTaskUseCase.execute(createUserTaskDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('all/:page')
  get(@Request() req: any, @Param('page') page: string) {
    return this.fetchUserTasksUseCase.execute(
      req.user.sub,
      page == null ? null : parseInt(page),
    );
  }

  @UseGuards(AuthGuard)
  @Get('byWeek')
  getByWeek(@Request() req: any, @Query() body: UserTaskByWeekDto) {
    const date = new Date(body.date);
    return this.fetchUserTasksByWeekUseCase.execute(req.user.sub, date);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateUserTaskDto,
    @Request() req: any,
  ) {
    return this.editUserTaskUseCase.execute(id, updateTaskDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete('update/:id')
  delete(@Param('id') id: string) {
    return this.deleteUserTaskUseCase.execute(id);
  }
}
