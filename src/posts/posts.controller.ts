import { Controller, Get, UseGuards, Req, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CreatePostDto } from './dto/createPost.dto';
import { PostsService } from './posts.service';
import { UsersService } from 'src/users/users.service';
import { PostsCommentService } from 'src/posts-comment/posts-comment.service';
import { LikeService } from 'src/like/like.service'
interface User {
    id: number;
    fristname: string;
    lastname: string;
    email: string;
    avatarUrl: string;
    bio: string;
    password: string;
}

interface Posts {
    id: string,
    authorId: number,
    imageId: string,
    title: string,
    description: string,
    created_at: Date,
    commentsCount: number,
    likesCount: number,
    author: User
}

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly usersService: UsersService,
        private readonly postsCommentService: PostsCommentService,
        private readonly likeService: LikeService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    async getAllPosts() {
        const posts = await this.postsService.getAllPosts();
        let result: Posts[] = [];
        for (let key of posts) {
            const author = await this.usersService.getUserById(key.authorId);
            const comments = await this.postsCommentService.getComments(key.id)
            const likes = await this.likeService.getLikes(key.id)
            const obj: Posts = {
                ...key,
                author,
                commentsCount: comments.length,
                likesCount: likes.length
            };
            result.push(obj);
        }
        return result;
    }

    @UseGuards(JwtAuthGuard)    
    @Get('/list')
    async getPosts(@Req() req) {
        const posts = await this.postsService.getPosts(req.user.id);
        let result: Posts[] = [];
        for (let key of posts) {
            const author = await this.usersService.getUserById(key.authorId);
            const comments = await this.postsCommentService.getComments(key.id)
            const likes = await this.likeService.getLikes(key.id)
            const obj: Posts = {
                ...key,
                author,
                commentsCount: comments.length,
                likesCount: likes.length
            };
            result.push(obj);
        }
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    async addPost(@Req() req, @Body() body: CreatePostDto) {
        return await this.postsService.addPost({ ...body, authorId: req.user.id });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removePost(@Req() req, @Param('id') id: number) {
        return await this.postsService.removePost(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updatePost(@Req() req, @Param('id') id: number, @Body() body: CreatePostDto) {
        return await this.postsService.updatePost(id, body);
    }
}
