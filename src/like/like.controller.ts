import { Controller, Get, UseGuards, Req, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { LikeService } from './like.service';
import { CreateDto } from './dto/create.dto';

@Controller('like')
export class LikeController {
    constructor(
        private readonly likeService: LikeService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getLikes(@Req() req, @Param('id') id: string) {
        return this.likeService.getLikes(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/liked')
    async liked(@Req() req, @Body() body: CreateDto) {
        return this.likeService.liked({...body, likedBy: req.user.id})
    }

    @UseGuards(JwtAuthGuard)
    @Post('/dislike')
    async disLike(@Req() req, @Body() body: {postId: string}) {
        return await this.likeService.disLike({postId: body.postId, likedBy: req.user.id})
    }}
