import { Module, ValidationPipe } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from 'src/entities/user.entity';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RequestService } from '../request/request.service';
import { FriendsService } from 'src/friends/friends.service';
import { SkillService } from 'src/skill/skill.service';

import { RequestEntity } from 'src/entities/request.entity';
import { FriendsEntity } from 'src/entities/friends.entity';
import { SkillEntity } from 'src/entities/skills.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RequestEntity,
      FriendsEntity,
      SkillEntity,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    RequestService,
    FriendsService,
    SkillService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class UsersModule {}
