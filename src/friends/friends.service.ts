import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendsEntity } from 'src/entities/friends.entity';

interface ICreateFriendDto {
  friendRequestedBy: number,
  from: number,
  to: number,
}

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendsEntity)
    private readonly friendsRepository: Repository<FriendsEntity>,
  ) {}

  async getFriends(id: number) {
    return await this.friendsRepository.find({
      where: [
        {from: id},
        {to: id}
      ]
    });
  }

  async addFriend(body: ICreateFriendDto) {
    const friend = this.friendsRepository.create(body);
    return await this.friendsRepository.save(friend);
  }

  async removeFriend(id: number) {
    return await this.friendsRepository.delete(id);
  }
}
