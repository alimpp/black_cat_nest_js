import { Controller, Get, UseGuards, Req, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CreatePostDto } from './dto/createPost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    async getAllPosts() {
        return await this.postsService.getAllPosts();
    }

    @UseGuards(JwtAuthGuard)    
    @Get('/list')
    async getPosts(@Req() req) {
        return await this.postsService.getPosts(req.user.id);
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
