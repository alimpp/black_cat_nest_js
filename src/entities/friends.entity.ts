import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FriendsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  friendRequestedBy: number;

  @Column()
  from: number;

  @Column()
  to: number;
}
