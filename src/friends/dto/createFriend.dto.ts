import { IsInt } from 'class-validator';

export class CreateFriendDto {
  @IsInt()
  me: number;

  @IsInt()
  friend: number;
}
