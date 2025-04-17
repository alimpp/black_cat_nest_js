import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(body: CreateUserDto) {
    return await this.usersService.createUser(body);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) throw new UnauthorizedException('Invalid password');
    return { id: user.id };
  }
}
