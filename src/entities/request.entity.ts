import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: number;

  @Column()
  to: number;
}
