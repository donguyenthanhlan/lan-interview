import {
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
import { PostSignInRequest, PostSignInResponse } from './models/sign-in.model';
import * as _users from "../../../seeds/users.json";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './models/jwt.model';
import { User } from 'src/domains/user';
import { tokenExpired } from 'src/app.config';

  @Injectable()
  export class AuthService {
    constructor(
      private readonly jwtService: JwtService,
    ) {}
  
    async signIn(request: PostSignInRequest): Promise<PostSignInResponse> {
      const users = _users.map(x=> User.fromJson(x));
      const user = users.find(x=>x.email == request.email);
      if (request.password !== user.password) {
        throw new UnauthorizedException();
      }
      
      return this.getResponse(user);
    }
  
    private getResponse(user: User): PostSignInResponse {
      const jwt = this.createJwtPayload(user);
      return {
        token: jwt,
        expiredIn: tokenExpired,
      };
    }

    private createJwtPayload(user): string {
      const data: JwtPayload = {
        email: user.email,
      };
      return this.jwtService.sign(data);
    }
  }
  