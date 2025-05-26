import {
  Controller,
  UseGuards,
  Req,
  Post,
  Get,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/createFriend.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RequestService } from 'src/request/request.service';
import { UsersService } from 'src/users/users.service';

interface User {
  id: number;
  fristname: string;
  lastname: string;
  email: string;
  avatarUrl: string;
  bio: string;
  password: string;
}

interface Friend {
  id: number,
  friendRequestedBy: User,
  from: User,
  to: User,
}

@Controller('friends')
export class FriendsController {
  constructor(
    private readonly friendsService: FriendsService,
    private readonly requestService: RequestService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  async getFriends(@Req() req) {
    const friends = await this.friendsService.getFriends(req.user.id);
    let result : Friend[] = []
    for (let key of friends) {
      const obj : Friend = {
        ...key,
        friendRequestedBy: await this.usersService.getUserById(key.friendRequestedBy),
        from: await this.usersService.getUserById(key.from),
        to: await this.usersService.getUserById(key.to)
      }
      result.push(obj)
    }
    return result
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async addFriend(@Req() req, @Body() body: CreateFriendDto) {
    const result = {
      friendRequestedBy: body.friendRequestedBy,
      from: body.friendRequestedBy,
      to: req.user.id,
    };
    await this.requestService.removeRequest(body.requestId);
    return await this.friendsService.addFriend(result);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeFriend(@Req() req, @Param('id') id: number) {
    return await this.friendsService.removeFriend(id);
  }
}
