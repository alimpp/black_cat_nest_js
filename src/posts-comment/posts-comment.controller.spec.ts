import { Test, TestingModule } from '@nestjs/testing';
import { PostsCommentController } from './posts-comment.controller';

describe('PostsCommentController', () => {
  let controller: PostsCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsCommentController],
    }).compile();

    controller = module.get<PostsCommentController>(PostsCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
