import { Injectable, UnauthorizedException, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { SrvResp } from '../../common/srvresp.model';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
  ) { }

  canActivate(context: ExecutionContext) {
    console.log(`Check token validity from socket: ${context.getArgs()[0].handshake.query.token} at ${new Date}`);
    const socket = context.getArgs()[0];
    const token = socket.handshake.query.token;

    if (token==="null") {
      throw new BadRequestException('Authentication token not found.');
    }

    const validationResult = this.auth.validateToken(token);
    console.log(`Result: ${validationResult} at ${new Date}`);
    if ( typeof validationResult === "string") {
      //socket.emit('authStatusChanged', new SrvResp(false, validationResult));
      throw new UnauthorizedException(validationResult);
    }
    else return true;
    
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService){

        super({
            jwtFromRequest: (socket) => { return socket.handshake.query.token},
            secretOrKey: 'secretkeyformytrainerapp'
        });
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // passReqToCallback: true,
            // secretOrKey: 'secretkeyformytrainerapp'},
            // async (payload) => await this.validate(payload)
        // );
        // passport.use(this);
    }

    async validate(payload: JwtPayload){

        const user = await this.authService.validateUserByJwt(payload);

        if(!user){
            throw new UnauthorizedException();
        }

        return user;

    }

}