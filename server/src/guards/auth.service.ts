import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../dal/user/userDTO';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../dal/user/users.service';
import { SrvResp } from '../common/srvresp.model';
import { Logger } from 'winston';


@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private readonly usersService: UsersService, @Inject('winston') private readonly logger: Logger) { }

    validateUserByPassword(loginAttempt: UserDTO, userToAttempt) {

        // This will be used for the initial login
        return new Promise((resolve, reject) => {

            // Check the supplied password against the hash stored for this email address
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
                if (err) throw new UnauthorizedException();
                if (isMatch) {
                    // If there is a successful match, generate a JWT for the user
                    resolve(this.createJwtPayload(userToAttempt));

                } else {
                    reject({ err: "Wrong password!" });
                }
            });
        });
    }

    async validateUserByJwt(payload: JwtPayload) {
        // This will be used when the user has already logged in and has a JWT
        let user = await this.usersService.findByEmail(payload.email);

        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }
    }

    createJwtPayload(user) {
        let data: JwtPayload = {
            email: user.email
        };
        let jwt = this.jwtService.sign(data);
        return {
             expiresIn: new Date(),
             token: jwt
        }
    }

    async login(loginer, ip): Promise<SrvResp> {
        const existing = await this.usersService.findByEmail(loginer.email);
        if (!existing) {
            this.logger.warn(`${new Date()} Login attempt with wrong email, ip: ${ip}`);
            return new SrvResp(false, "User not found!");
        }
        try {
            const token = await this.validateUserByPassword(loginer, existing);
            return {
                status: true,
                message: "User has been submitted successfully!",
                data: {id: existing._id, role: existing.role, token: token}
            };
        }
        catch (err) {
            this.logger.warn(`${new Date()} Login attempt with wrong password, ip: ${ip} `);
            return { status: false, message: err.err, data: null };
        }
    }

}