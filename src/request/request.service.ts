import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestEntity } from 'src/entities/request.entity';

interface ICreateRequest {
    to: number;
    from: number;
}
@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(RequestEntity)
        private readonly requestRepository: Repository<RequestEntity>,
    ) {}

    async getRequests(id: number) {
        return await this.requestRepository.find({ where: { to: id } });
    }

    async createRequest(body: ICreateRequest) {
        const existingRequest = await this.requestRepository.findOne({ where: { to: body.to, from: body.from } });
        if (existingRequest) {
            return {
                message: 'Request Failed',
                statusCode : 400
            }
        } else {
            const request = this.requestRepository.create(body);
            await this.requestRepository.save(request);
            return {
                message: 'Request Success',
                statusCode : 200
            }
        }
    }    async removeRequest(id: number) {
        return await this.requestRepository.delete(id);
    }
}
