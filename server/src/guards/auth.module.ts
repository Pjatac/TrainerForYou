import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../dal/user/users.module';


@Module({
  imports: [
  PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secretOrPrivateKey: 'secretkeyformytrainerapp',
      signOptions: {
        expiresIn: '1m'
      }
    }),
    UsersModule
  ],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
