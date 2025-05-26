import { Module, ValidationPipe } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { RequestService } from 'src/request/request.service';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsEntity } from 'src/entities/friends.entity';
import { RequestEntity } from 'src/entities/request.entity';

import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendsEntity, RequestEntity, UserEntity])],
  controllers: [FriendsController],
  providers: [
    FriendsService,
    RequestService,
    UsersService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class FriendsModule {}
