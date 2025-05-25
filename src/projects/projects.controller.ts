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
import { ProjectsService } from './projects.service';
import { MembersService } from 'src/members/members.service';

interface IProject {
  createdBy: number;
  avatar: string;
  name: string;
  description: string;
}

interface Project {
  id: string;
  createdBy: number;
  avatar: string;
  name: string;
  description: string;
  createdAt: Date
}

interface IJoinedProjects {
  id: string,
  projectId: string,
  memberId: number,
  createdAt: string,
  project: Project
}

@Controller('projects')
export class ProjectsController {
  constructor(
     private readonly projectsService: ProjectsService,
     private readonly membersService: MembersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/my-projects')
  async getProjects(@Req() req) {
    return await this.projectsService.getProjects(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/joined')
  async joinedProjects(@Req() req) {
    const projects = await this.membersService.joinedProjects(req.user.id);
    let result: IJoinedProjects[] = [];
    for (let item of projects) {
      const project = await this.projectsService.getProject(item.projectId);
      if (project) {
        const obj: IJoinedProjects = {
          ...item,
          createdAt: item.createdAt.toISOString(),
          project,
        }
        result.push(obj)
      }
    }
    return result;
  }
  
  @UseGuards(JwtAuthGuard)  @Post('/add')
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
