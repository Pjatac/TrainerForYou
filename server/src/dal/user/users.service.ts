import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserDTO } from './userDTO';
import { SrvResp } from '../../common/srvresp.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    ) { }

    async create(createUserDto: UserDTO): Promise<User> {
        return await this.userModel.create(createUserDto);
    }

    async findAll(): Promise<User[] | null> {
        return await this.userModel.find().exec();
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email: email }, function (err, docs) {
        }).exec();
        return user;
    }

    async findByID(_id: string): Promise<User | null> {
        const user = await this.userModel.findOne({ _id: _id }, function (err, docs) {
        }).exec();
        return user;
    }

    // async login(user: UserDTO) {
    //     const existing = await this.findByEmail(user.email);
    //     if (!existing) {
    //         return new SrvResp(false, `User not exist`);
    //     }
    //     else {
    //         existing.checkPassword(user.password, (err, isMatch) => {
    //             //if (err) throw new UnauthorizedException();
    //             if (isMatch) {
    //                 // If there is a successful match, generate a JWT for the user
    //                 //resolve(this.createJwtPayload(userToAttempt));
    //                 return new SrvResp(true);
    //             } else {
    //                 //reject({ err: "Wrong password!" });
    //                 return new SrvResp(false, `Wrong password!`);
    //             }
    //         });
    //     }
    // }
}