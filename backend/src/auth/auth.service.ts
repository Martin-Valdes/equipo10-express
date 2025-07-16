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
    email: string;
    name: string;
  }) {
    let user = await this.usersService.findOrCreateGoogleUser(googleUser);

    if (user) return user;

    const foundUser = await this.usersService.findOneByEmail(googleUser.email);

    if (foundUser) {
      foundUser.googleId = googleUser.googleId;
      await this.usersService.update(foundUser.id, {
        googleId: foundUser.googleId,
      });
      return foundUser;
    }

    return this.usersService.create({
      googleId: googleUser.googleId,
      email: googleUser.email,
      lastName: googleUser.name,
      firstName: googleUser.name,
      isVerified: true,
    });
  }
}
