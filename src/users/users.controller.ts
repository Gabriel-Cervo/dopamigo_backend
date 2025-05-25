import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  UseGuards,
  Put,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserUseCase } from './useCase/create-user.usecase';
import { FetchAllUsersUseCase } from './useCase/fetch-all-users.usecase';
import { FetchUserByIdUseCase } from './useCase/fetch-user-by-id.usecase';
import { EditUserUseCase } from './useCase/edit-user.usecase';
import { DeleteUserUseCase } from './useCase/delete-user.usecase';
import { FetchUserScoreUseCase } from './useCase/fetch-user-score.usecase';
import { FetchUserTotalScoreUseCase } from './useCase/fetch-user-total-score.usecase';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,

    @Inject(FetchAllUsersUseCase)
    private readonly fetchAllUsersUseCase: FetchAllUsersUseCase,

    @Inject(FetchUserByIdUseCase)
    private readonly fetchUserByIdUseCase: FetchUserByIdUseCase,

    @Inject(EditUserUseCase)
    private readonly editUserUseCase: EditUserUseCase,

    @Inject(DeleteUserUseCase)
    private readonly deleteUserUseCase: DeleteUserUseCase,

    @Inject(FetchUserScoreUseCase)
    private readonly fetchUserScoreUseCase: FetchUserScoreUseCase,

    @Inject(FetchUserTotalScoreUseCase)
    private readonly fetchTotalUserScoreUseCase: FetchUserTotalScoreUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.fetchAllUsersUseCase.execute();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.fetchUserByIdUseCase.execute(id);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  findMe(@Request() req: any) {
    return this.fetchUserByIdUseCase.execute(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Put('me')
  update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.editUserUseCase.execute(req.user.sub, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('me')
  remove(@Request() req: any) {
    return this.deleteUserUseCase.execute(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('me/scores/history')
  getScore(@Request() req: any) {
    return this.fetchUserScoreUseCase.execute(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('me/scores/total')
  getTotalScore(@Request() req: any) {
    return this.fetchTotalUserScoreUseCase.execute(req.user.sub);
  }
}
