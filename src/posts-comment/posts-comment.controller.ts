import { Controller, Get, UseGuards, Req, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { PostsCommentService } from './posts-comment.service';
import { UsersService } from 'src/users/users.service';
import { CreateDto } from './dto/create.dto';

interface User {
    id: number;
    fristname: string;
    lastname: string;
    email: string;
    avatarUrl: string;
    bio: string;
    password: string;
}

interface Comment {
    id: string,
    postId: string,
    comment: string,
    created_at: Date
    commentFrom: User
}

@Controller('posts-comment')
export class PostsCommentController {
    constructor(
        private readonly postsCommentService: PostsCommentService,
        private readonly usersService: UsersService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getComments(@Req() req, @Param('id') id: string) {
      const posts = await this.postsCommentService.getComments(id)
      let result: Comment[] = []
      for (let key of posts) {
        const commentFrom = await this.usersService.getUserById(key.commentFrom)
        const obj: Comment = {
            ...key,
            commentFrom: commentFrom
        }
        result.push(obj)
      }
      return result
    }

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    async addComment(@Req() req, @Body() body: CreateDto) {
      return await this.postsCommentService.addComment({...body, commentFrom: req.user.id})
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeComment(id: string) {
      return await this.postsCommentService.removeComment(id)
    }
}
