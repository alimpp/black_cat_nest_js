import { IsInt } from 'class-validator';

export class CreateRequestDto {
  @IsInt()
  to: number;
}
