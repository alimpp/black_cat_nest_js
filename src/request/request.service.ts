import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestEntity } from 'src/entities/request.entity';
import { FriendsEntity } from 'src/entities/friends.entity';
interface ICreateRequest {
  to: number;
  from: number;
}
@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>,
    @InjectRepository(FriendsEntity)
    private readonly friendsRepository: Repository<FriendsEntity>,
  ) {}

  async getRequests(id: number) {
    return await this.requestRepository.find({ where: { to: id } });
  }

  async createRequest(body: ICreateRequest) {
    const existDuplicated = await this.requestRepository.findOne({
      where: { to: body.from, from: body.to },
    });
    const existingRequest = await this.requestRepository.findOne({
      where: { to: body.to, from: body.from },
    });
    const existingFriend = await this.friendsRepository.findOne({
      where: { friend: body.to},
    });
    if (existingRequest || existDuplicated) {
      return {
        message: 'Request duplicated',
        statusCode: 400,
      };
    } else if(existingFriend) {
      return {
        message: 'This user is your friend',
        statusCode: 400,
      };
    } else {
      const request = this.requestRepository.create(body);
      await this.requestRepository.save(request);
      return {
        message: 'Request Success',
        statusCode: 200,
      };
    }
  }
  async removeRequest(id: number) {
    return await this.requestRepository.delete(id);
  }
}
