import { IsInt } from 'class-validator';

export class CreateRequestDto {
  @IsInt()
  from: number;

  @IsInt()
  to: number;
}
