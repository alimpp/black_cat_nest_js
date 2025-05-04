import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestEntity } from 'src/entities/request.entity';
import {  CreateRequestDto } from './dto/createRequest.dto';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(RequestEntity)
        private readonly requestRepository: Repository<RequestEntity>,
    ) {}

    async getRequests(id: number) {
        return await this.requestRepository.find({ where: { from: id } });
    }

    async createRequest(body: CreateRequestDto) {
        const request = this.requestRepository.create(body);
        return await this.requestRepository.save(request);
    }

    async removeRequest(id: number) {
        return await this.requestRepository.delete(id);
    }
}
