import { IsString, Length, IsInt } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @Length(3, 20)
  skill: string;
}
