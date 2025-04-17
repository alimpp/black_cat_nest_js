import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param() id: number) {
    return await this.usersService.getUserById(id);
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return await this.usersService.createUser(body);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.usersService.updateUser(id, body);
  }
}
