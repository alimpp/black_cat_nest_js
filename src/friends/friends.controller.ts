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

@Controller('friends')
export class FriendsController {
  constructor(
    private readonly friendsService: FriendsService,
    private readonly requestService: RequestService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  async getFriends(@Req() req) {
    return await this.friendsService.getFriends(req.user.id);
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
