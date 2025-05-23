import { IsEmail, IsString, Length } from 'class-validator';

export class CreateDto {
  @IsString()
  avatar: string;

  @IsString()
  @Length(3, 30)
  name: string;

  @IsString()
  @Length(10, 300)
  description: string;
}
