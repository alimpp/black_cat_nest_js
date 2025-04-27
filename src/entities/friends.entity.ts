import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FriendsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  me: number;

  @Column()
  friend: number;
}
