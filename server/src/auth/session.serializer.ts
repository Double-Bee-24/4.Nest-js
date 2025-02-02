import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(@Inject() private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: Users, done: (err: unknown, user: Users) => void) {
    done(null, user);
  }

  async deserializeUser(
    user: Users,
    done: (err: unknown, user: Users) => void,
  ) {
    const userDB = await this.usersService.findOne(user.username);
    done(null, userDB);
  }
}
