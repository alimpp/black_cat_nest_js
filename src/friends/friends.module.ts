import { Module, ValidationPipe } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { RequestService } from 'src/request/request.service';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsEntity } from 'src/entities/friends.entity';
import { RequestEntity } from 'src/entities/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendsEntity, RequestEntity])],
  controllers: [FriendsController],
  providers: [
    FriendsService,
    RequestService,
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
