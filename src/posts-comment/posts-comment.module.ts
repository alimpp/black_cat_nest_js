import { Module, ValidationPipe } from '@nestjs/common';
import { PostsCommentService } from './posts-comment.service';
import { PostsCommentController } from './posts-comment.controller';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsCommentEntity } from 'src/entities/postsComment.entity';

import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostsCommentEntity, UserEntity])],
  providers: [PostsCommentService, UsersService, 
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
 ],
  controllers: [PostsCommentController]
})
export class PostsCommentModule {}
