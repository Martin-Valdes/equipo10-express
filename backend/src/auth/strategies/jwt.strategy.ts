import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

export type JwtPayload = {
  id: string;
  email: string;
  name: string;
  roles: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOne(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }
    return {
    id: payload.id,
    email: payload.email,
    roles: payload.roles || ['user'] // 👈 Asegura que siempre haya roles
  };
  }
}
