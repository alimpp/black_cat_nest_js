import { IsInt } from 'class-validator';

export class CreateFriendDto {
  @IsInt()
  requestId: number;

  @IsInt()
  friendRequestedBy: number;
}
