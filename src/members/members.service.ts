import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class MembersService {
    constructor(
        @InjectRepository(MembersEntity)
        private readonly membersRepository: Repository<MembersEntity>
    ) {}

    async getAll() {
        return await this.membersRepository.find();   
    }

    async getMembers(id: string) {
        return await this.membersRepository.find({ where: { projectId: id } });   
    }

    async joinedProjects(id: number) {
        return await this.membersRepository.find({ where: { memberId: id } });   
    }

    async add(body: CreateDto): Promise<MembersEntity> {
        const member = this.membersRepository.create(body);
        return await this.membersRepository.save(member);
    }

    async remove(id: string): Promise<void> {
        await this.membersRepository.delete(id);
    }
}
