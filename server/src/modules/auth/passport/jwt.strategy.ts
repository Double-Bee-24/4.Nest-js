import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
dotenv.config();

type Payload = {
  sub: string;
  username: string;
  role: string;
};

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default_secret_key',
    });
  }

  validate(payload: Payload) {
    console.log(payload, 'payload');
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
