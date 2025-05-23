import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/updatedto';
import { ProjectsService } from './projects.service';

interface IProject {
  createdBy: number;
  avatar: string;
  name: string;
  description: string;
}

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  async getProjects(@Req() req) {
    return await this.projectsService.getProjects(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async addProject(@Req() req, @Body() body: CreateDto) {
    return await this.projectsService.addProject({
      ...body,
      createdBy: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeProject(@Req() req, @Param('id') id: number) {
    return await this.projectsService.removeProject(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProject(
    @Req() req,
    @Param('id') id: number,
    @Body() body: IProject,
  ) {
    return await this.projectsService.updateProject(id, body);
  }
}
