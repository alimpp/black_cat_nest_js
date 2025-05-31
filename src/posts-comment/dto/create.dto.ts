import { IsString, Length } from 'class-validator';

export class CreateDto {
  @IsString()
  postId: string;

  @IsString()
  @Length(1, 30)
  comment: string;
}
