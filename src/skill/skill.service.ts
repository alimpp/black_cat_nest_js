import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillEntity } from 'src/entities/skills.entity';

interface CreateSkillDto {
    skill: string;
    userId: number;
}

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(SkillEntity)
        private readonly skillRepository: Repository<SkillEntity>,
    ) {}

    async getSkills(id: number) {
        return await this.skillRepository.find({ where: { userId: id } });
    }

    async addSkill(body: CreateSkillDto) {
        const skill = this.skillRepository.create(body);
        return await this.skillRepository.save(skill);
    }
}
