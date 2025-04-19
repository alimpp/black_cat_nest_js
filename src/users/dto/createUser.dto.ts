import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 30)
  fristname: string;

  @IsString()
  @Length(3, 30)
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  avatarUrl: string;

  @IsString()
  @Length(8, 16)
  password: string;
}
