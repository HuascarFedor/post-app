import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
//import { AppResource } from 'src/app.roles';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Auth()
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  /*
  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER,
  })
  */
  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }

  @Post(':id/profile')
  createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateProfileDto,
  ) {
    return this.userService.createProfile(id, profile);
  }
}
