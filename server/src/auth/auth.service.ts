import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

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

  logout(req: Request, res: Response) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }

      req.session.destroy((error) => {
        if (error) {
          return res.status(500).json({ message: 'Could not destroy session' });
        }
        res.clearCookie('connect.sid'); // Remove cookies
        return res.status(200).json({ message: 'Logout successful' });
      });
    });
  }
}
