import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { User } from 'src/entities/user.entity';
import { AuthService } from '../auth.service';

export const cookieExtractor = (req: any) => {
  return req && req.cookies ? req.cookies[process.env.COOKIE_NAME] : null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly _authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload): Promise<User> {
    const user = await this._authService.validatePayload(payload);
    if (!user) {
      throw new UnauthorizedException(
        'Invalid or expired authentication token',
      );
    }
    return user;
  }
}
