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
    profile: any,
    done: (error: any, user?: any) => void
  ) {
    try {
      const email =
        profile._json.email ||
        (profile.emails && profile.emails[0] && profile.emails[0].value);

      if (!email) {
        throw new Error('No se pudo obtener el email del perfil de Google');
      }

      const user = {
        email: email,
        firstName: profile._json.given_name || profile.name?.givenName,
        lastName: profile._json.family_name || profile.name?.familyName,
        googleId: profile.id,
        picture: profile._json.picture,
        emailVerified: profile._json.email_verified,
        accessToken,
      };

      return done(null, user);
    } catch (error) {
      console.error('Error en GoogleStrategy.validate:', error);
      return done(error, null);
    }
  }
}
