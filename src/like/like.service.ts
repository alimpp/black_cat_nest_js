import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikesEntity } from 'src/entities/likes.entity';

interface ILike {
    postId: string,
    likedBy: number,
}

@Injectable()
export class LikeService {
    constructor(
         @InjectRepository(LikesEntity)
         private readonly likesRepository: Repository<LikesEntity>,
    ) {}

    async getLikes(id: string) {
        return await this.likesRepository.find({ where: { postId: id } });
    }

    async liked(body: ILike){
        const existingLike = await this.likesRepository.findOne({ 
            where: { 
              postId: body.postId, 
              likedBy: body.likedBy 
            } 
          });
      
          if (existingLike) {
            throw new ConflictException('User has already liked this post');
          }
          const like = this.likesRepository.create(body);
          return await this.likesRepository.save(like);
        
    }

    async disLike(body: ILike) {
        const row = await this.likesRepository.findOne({ 
            where: { 
              postId: body.postId, 
              likedBy: body.likedBy 
            } 
          });
          if(row) {
            return await this.likesRepository.delete(row.id)
          } else {
            throw new NotFoundException()
          }
    }
}
