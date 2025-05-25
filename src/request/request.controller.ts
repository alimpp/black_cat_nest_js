import { Controller, UseGuards, Req, Post, Get, Body, Delete, Param} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/createRequest.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    avatarUrl: string;
    bio: string;
    password: string;
}

interface Request {
    id: number;
    from: User;
    to: number; 
}

@Controller('request')
export class RequestController {
   constructor(
    private readonly requestService: RequestService,
    private readonly usersService: UsersService
   ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/list')
    async getRequests(@Req() req) {
        const requests = await this.requestService.getRequests(req.user.id);
        let result : any = []
        for (let key of requests) {
            const obj : any = {
                ...key,
                from: await this.usersService.getUserById(key.from)
            }
            result.push(obj)
        }
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Post('/send')
    async createRequest(@Req() req, @Body() body: CreateRequestDto) {
        const result = {
            from : req.user.id,
            to: body.to
        }
        return await this.requestService.createRequest(result);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeRequest(@Req() req, @Param('id') id: number) {
        return await this.requestService.removeRequest(id);
    }
}
