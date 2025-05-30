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
import { RequestService } from '../request/request.service';
import { FriendsService } from 'src/friends/friends.service';
import { SkillService } from 'src/skill/skill.service';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly requestService: RequestService,
    private readonly friendsService: FriendsService,
    private readonly skillService: SkillService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllUsers(@Req() req) {
    const allUsersList = await this.usersService.getAllUsers();
    const allRequest = await this.requestService.getAllRequests();
    const yourFriends = await this.friendsService.getFriends(req.user.id);
    const filterCurrentUser = allUsersList.filter((user) => {
      return user.id != req.user.id;
    });
    let result: any = [];
    for (let key of filterCurrentUser) {
      const isFriend = yourFriends.find((item) => {
        return item.to == key.id || item.from == key.id;
      });
      const youSendRequest = allRequest.find((item) => {
        return item.to == key.id && item.from == req.user.id;
      });
      const hasFriendRequest = allRequest.find((item) => {
        return item.from == key.id && item.to == req.user.id;
      });
      const obj: any = {
        ...key,
        youSendRequest: youSendRequest ? true : false,
        hasFriendRequest: hasFriendRequest ? true : false,
        isFriend: isFriend ? true : false,
      };
      result.push(obj);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getUserProfile(@Req() req) {
    return await this.usersService.getUserById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Req() req, @Param('id') id: number) {
    const allRequest = await this.requestService.getAllRequests();
    const yourFriends = await this.friendsService.getFriends(req.user.id);
    const userInfo = await this.usersService.getUserById(id);
    const skills = await this.skillService.getSkills(id);
    const isFriend = yourFriends.find((item) => {
      return item.to == id || item.from == id;
    });
    const youSendRequest = allRequest.find((item) => {
      return item.to == id && item.from == req.user.id;
    });
    const hasFriendRequest = allRequest.find((item) => {
      return item.from == id && item.to == req.user.id;
    });
    const result = {
      userInfo: userInfo,
      skills: skills,
      youSendRequest: youSendRequest ? true : false,
      hasFriendRequest: hasFriendRequest ? true : false,
      isFriend: isFriend ? true : false,
    };
    return result;
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
