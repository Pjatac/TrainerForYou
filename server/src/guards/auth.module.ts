import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../dal/user/users.module';
import { WsAuthGuard } from './strategies/jwt.strategy';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt', session: true });

@Module({
  imports: [
    //PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretkeyformytrainerapp',
      signOptions: {
        expiresIn: '1m'
      }
    }),
    passportModule,
    UsersModule
  ],
  exports: [AuthService, passportModule],
  providers: [AuthService, JwtStrategy, WsAuthGuard]
})
export class AuthModule { }
