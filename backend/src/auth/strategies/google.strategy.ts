import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
  clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
  clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
  callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
  scope: ['email', 'profile'],
  passReqToCallback: false, 
} as StrategyOptions); 
  }

   async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, emails, displayName } = profile;
    const email = emails[0].value;
    
    // Buscar usuario por googleId o por email
    const user = await this.authService.findOrCreateGoogleUser({
      googleId: id,
      email,
      name: displayName,
    });

    return user;
  }
}