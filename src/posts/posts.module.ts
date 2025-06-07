import { Module, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';

import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/entities/user.entity';

import { PostsCommentService } from 'src/posts-comment/posts-comment.service';
import { PostsCommentEntity } from 'src/entities/postsComment.entity';

import { LikeService } from 'src/like/like.service'
import { LikesEntity } from 'src/entities/likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity, PostsCommentEntity, LikesEntity])],
  providers: [PostsService, UsersService,PostsCommentService, LikeService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
  controllers: [PostsController]
})
export class PostsModule {}
