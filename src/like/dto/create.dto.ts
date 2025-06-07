import { IsString, Length } from 'class-validator';

export class CreateDto {
  @IsString()
  postId: string;
}
