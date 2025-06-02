import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class PostsCommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  postId: string;

  @Column()
  commentFrom: number;

  @Column()
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
