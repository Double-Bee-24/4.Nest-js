import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);

    if (user.password === password) {
      const { password: _password, ...result } = user;
      return result;
    }

    return null;
  }
}
