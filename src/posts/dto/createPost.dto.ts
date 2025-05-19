import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  imageId: string;  

  @IsString()
  @Length(10, 30)
  title: string;

  @IsString()
  @Length(20, 300)
  description: string;
}
