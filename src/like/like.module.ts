import { Module, ValidationPipe } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesEntity } from 'src/entities/likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikesEntity])],
  providers: [LikeService, 
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
  controllers: [LikeController]
})
export class LikeModule {}
