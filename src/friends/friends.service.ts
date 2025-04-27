import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendsEntity } from 'src/entities/friends.entity';
import { CreateFriendDto } from './dto/createFriend.dto';

@Injectable()
export class FriendsService {
    constructor(
        @InjectRepository(FriendsEntity)
        private readonly friendsRepository: Repository<FriendsEntity>,
    ) {}

    async getFriends(id: number) {
        return await this.friendsRepository.find({ where: { me: id } });
    }

    async addFriend(body: CreateFriendDto) {
        const friend = this.friendsRepository.create(body);
        return await this.friendsRepository.save(friend);
    }

    async removeFriend(id: number) {
        return await this.friendsRepository.delete(id);
    }
}
