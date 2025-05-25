import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsEntity } from 'src/entities/projects.entity';

interface IProject {
  createdBy: number;
  avatar: string;
  name: string;
  description: string;
}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectsRepository: Repository<ProjectsEntity>,
  ) {}

  async getProjects(id: number) {
    return await this.projectsRepository.find({ where: { createdBy: id } });
  }

  async getProject(id: string) {
    return await this.projectsRepository.findOne({ where: { id: id } });
  }

  async addProject(body: IProject) {
    const project = this.projectsRepository.create(body);
    return await this.projectsRepository.save(project);
  }

  async removeProject(id: number) {
    return await this.projectsRepository.delete(id);
  }

  async updateProject(id: number, body: IProject) {
    return await this.projectsRepository.update(id, body);
  }
}
