import { Controller, UseGuards, Req, Post, Get, Body} from '@nestjs/common';
import { RequestService } from './request.service';
import {  CreateRequestDto } from './dto/createRequest.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('request')
export class RequestController {
   constructor(private readonly requestService: RequestService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/list')
    async getRequests(@Req() req) {
        return await this.requestService.getRequests(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/send')
    async createRequest(@Req() req, @Body() body: CreateRequestDto) {
        return await this.requestService.createRequest(body);
    }
}
