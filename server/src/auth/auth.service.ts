import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    console.log(username, password, 'fish');

    if (user.password === password) {
      const { password: _password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;

    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    let user;

    try {
      user = await this.usersService.findOne(username);
    } catch {
      // If user is not found (NotFoundException is thrown), it means we don't have such username in db
      user = null;
    }

    if (user) {
      throw new ConflictException('User with such login already exists');
    }

    return this.usersService.create(username, password);
  }
}
