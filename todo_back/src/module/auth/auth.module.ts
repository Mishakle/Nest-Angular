import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/module/auth/auth.service';
import { AuthController } from './auth.controller';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtStrategy } from './passport/jwt.strategy';

/*
  importing .env file, User entity, JWTmodule with secret word and exp. time
*/
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([]),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
      property: 'user',
    }),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.EXPRIRES_IN },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GqlAuthGuard],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
