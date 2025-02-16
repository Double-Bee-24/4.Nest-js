import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { User } from 'src/modules/users/entities/users.entity';
import { UsersService } from 'src/modules/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (user.password === password) {
      const { password: _password, ...result } = user;
      return result;
    }

    return null;
  }

  login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;

    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    let user;

    try {
      user = await this.usersService.findOneByUsername(username);
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
