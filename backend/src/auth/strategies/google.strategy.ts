import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const callbackURL = process.env.GOOGLE_CALLBACK_URL;
    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Google OAuth environment variables are not set');
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }
  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any
  ): Promise<any> {
    const email = profile.emails[0].value;

  return {
    email,
    googleId: profile.id,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    picture: profile.photos[0].value,
    emailVerified: profile._json.email_verified,
    accessToken,
    roles: 'USER', 
  };
}
}
