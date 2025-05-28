import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllUsers(@Req() req) {
    const allUsersList = await this.usersService.getAllUsers()
    const filterCurrentUser = allUsersList.filter((user) => {
      return user.id != req.user.id
    })
    return filterCurrentUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getUserProfile(@Req() req) {
    return await this.usersService.getUserById(req.user.id);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(id);
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return await this.usersService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async update(@Req() req, @Body() body: UpdateUserDto) {
    return await this.usersService.updateUser(req.user.id, body);
  }
}
