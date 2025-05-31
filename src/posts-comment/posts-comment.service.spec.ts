import { Test, TestingModule } from '@nestjs/testing';
import { PostsCommentService } from './posts-comment.service';

describe('PostsCommentService', () => {
  let service: PostsCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsCommentService],
    }).compile();

    service = module.get<PostsCommentService>(PostsCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
