import { IsString, Length } from 'class-validator';

export class CreateDto {
  @IsString()
  postId: string;

  @IsString()
  @Length(1, 1000)
  comment: string;
}
