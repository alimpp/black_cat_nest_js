import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsCommentEntity } from 'src/entities/postsComment.entity';

interface IComment {
    postId: string,
    commentFrom: number,
    comment: string
}

@Injectable()
export class PostsCommentService {
    constructor(
        @InjectRepository(PostsCommentEntity)
        private readonly commentRepository: Repository<PostsCommentEntity>,
    ) {}

    async getComments(id: string) {
        return await this.commentRepository.find({ where: { postId: id } });
    }

    async addComment(body: IComment) {
        const post = this.commentRepository.create(body);
        return await this.commentRepository.save(post);
    }

    async removeComment(id: string) {
        return await this.commentRepository.delete(id);
    }
}
