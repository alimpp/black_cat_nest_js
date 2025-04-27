import { Module, ValidationPipe } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsEntity } from 'src/entities/friends.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendsEntity])],
  controllers: [FriendsController],
  providers: [FriendsService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ]
})
export class FriendsModule {}
