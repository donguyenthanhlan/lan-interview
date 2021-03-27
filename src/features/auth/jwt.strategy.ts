import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { jwtSecret } from '../../app.config';
import * as _users from "../../../seeds/users.json";
import { JwtPayload } from './models/jwt.model';
import { User } from 'src/domains/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const users = _users.map(x=> User.fromJson(x));
    const user = users.find(x=>x.email == payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
