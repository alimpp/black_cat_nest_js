import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class CreateDto {
  @IsString()
  projectId: string;

  @IsNumber()
  memberId: number;
}
