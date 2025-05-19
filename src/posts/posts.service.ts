import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/entities/post.entity';

interface CreatePostDto {
    authorId: number;
    imageId: string;
    title: string;
    description: string;
}

interface UpdatePostDto {
    imageId: string;
    title: string;
    description: string;
}

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
    ) {}

    async getAllPosts() {
        return await this.postRepository.find();
    }

    async getPosts(id: number) {
        return await this.postRepository.find({ where: { authorId: id } });
    }


    async addPost(body: CreatePostDto) {
        const post = this.postRepository.create(body);
        return await this.postRepository.save(post);
    }

    async removePost(id: number) {
        return await this.postRepository.delete(id);
    }

    async updatePost(id: number, body: UpdatePostDto) {
        return await this.postRepository.update(id, body);
    }
}
