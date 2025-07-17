import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      acessTocken: this.jwtService.sign({ id: user.id }),
    };
  }

  async findOrCreateGoogleUser(googleUser: {
    googleId: string;
    emails: string;
    givenName: string;
    familyName: string;
  }) {
    let user = await this.usersService.findOrCreateGoogleUser({
      googleId: googleUser.googleId,
      email: googleUser.emails,
      name: `${googleUser.givenName} ${googleUser.familyName}`,
    });

    if (user) return user;

    const foundUser = await this.usersService.findOneByEmail(googleUser.emails);

    if (foundUser) {
      foundUser.googleId = googleUser.googleId;
      await this.usersService.update(foundUser.id, {
        googleId: foundUser.googleId,
      });
      return foundUser;
    }

    return this.usersService.create({
      googleId: googleUser.googleId,
      email: googleUser.emails,
      lastName: googleUser.familyName,
      firstName: googleUser.givenName,
      isVerified: true,
    });
  }
}
