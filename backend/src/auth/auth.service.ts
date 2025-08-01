import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthEntity } from './entity/auth.entity';
import { parse } from 'path/win32';
import { ContactsService } from '../contacts/contacts.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(
    email: string,
    password: string,
    lastName: string,
    firstName: string,
    roles: string[] = ['USER']
  ) {
    const existUser = await this.usersService.findOneByEmail(email);

    if (existUser) {
      throw new NotFoundException(`User with email ${email} alredy exist`);
    }
    const createdUser = await this.usersService.create({
      email,
      password,
      lastName,
      firstName,
      roles,
    });

    return createdUser;
  }

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.usersService.findOneByEmail(email);

    if (user?.googleId) {
      throw new UnauthorizedException(
        'This user has logged in with Google, please use Google login'
      );
    }

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      accessTocken: this.jwtService.sign({
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        roles: user.roles || ['USER'],
      }),
    };
  }

  async findOrCreateGoogleUser(googleUser: {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
  }) {
    let user = await this.usersService.findOrCreateGoogleUser({
      googleId: googleUser.googleId,
      email: googleUser.email,
      name: googleUser.firstName,
      roles: ['USER'],
    });

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
      lastName: googleUser.lastName,
      firstName: googleUser.firstName,
      isVerified: true,
      roles: ['USER'],
    });
  }
}
