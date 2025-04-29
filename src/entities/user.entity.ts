import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SkillEntity } from './skills.entity';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fristname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  avatarUrl: string;

  @Column()
  bio: string;

  @Column()
  password: string;

  @OneToMany(() => SkillEntity, (skill) => skill.user)
  skills: SkillEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
