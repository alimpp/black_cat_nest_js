import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class SkillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skill: string;

  @ManyToOne(() => UserEntity, (user) => user.skills)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: number;
}
