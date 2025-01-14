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
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.fetchAllUsersUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fetchUserByIdUseCase.execute(id);
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
}
