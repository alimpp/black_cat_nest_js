import { Controller, Get, UseGuards, Req, Post, Body, Param, Delete } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('skill')
export class SkillController {
    constructor(private readonly skillService: SkillService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/list')
    async getSkills(@Req() req) {
        return await this.skillService.getSkills(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    async addSkill(@Req() req, @Body() body: CreateSkillDto) {
        return await this.skillService.addSkill({...body, userId: req.user.id});
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeSkill(@Req() req, @Param('id') id: number) {
        return await this.skillService.removeSkill(id);
    }
}
