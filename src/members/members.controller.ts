import { Controller, Get, UseGuards, Req, Post, Body, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CreateDto } from './dto/create.dto';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getMembers(@Req() req, @Param('id') projectId: string) {
        return await this.membersService.getMembers(projectId)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    async addProject(@Req() req, @Body() body: CreateDto) {
        return await this.membersService.add({
        ...body,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeProject(@Req() req, @Param('id') id: string) {
        return await this.membersService.remove(id);
    }
}
