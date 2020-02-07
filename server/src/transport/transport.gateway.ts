import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, WsResponse } from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { SrvResp } from '../common/srvresp.model';
import { UserDTO } from '../dal/user/userDTO';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Languages } from 'src/dal/enums';
import { UsersService } from '../dal/user/users.service';
import { AuthService } from '../guards/auth.service';
@WebSocketGateway()
export class TransportGateway implements OnGatewayConnection, OnGatewayDisconnect {

  clients = [];

  constructor(private readonly usersService: UsersService, private authService: AuthService) {
  }

  async handleConnection(client) {
    //const userDTO = { role: 0, name: "Pjatak", email: "pjataka@gmail.com", password: "dostup", language: Languages.Russian };
    //try {
    //   const res = await this.authService.login(client.conn.request.connection.remoteAddress,userDTO);
    //}
    //catch (e) {
    // console.log(e);
    //}
    console.log(`New Connectionn on ${new Date}`, this.clients.length);
    this.clients.push(client);
    client.emit('nameOfFunc', null);
  }

  async handleDisconnect(client) {
    console.log("Disconnect ", client.id);
    this.clients.splice(this.clients.indexOf(cl => cl.id = client.id), 1);
  }

  @SubscribeMessage('login-request')
  async onLoginRequest(client, user: UserDTO) {
    const res = await this.authService.login(user, client.conn.request.connection.remoteAddress);
    if (!res.status) {
      client.emit('login-response', res);
    }
    else {
      client.emit('login-response', res);
      client.emit('authStatusChanged', res);
    }
  }

  // @UseGuards(AuthGuard())
  // @SubscribeMessage('get-stat')
  // async onGetStatRequest(client) {
  //   const res = await this.usersService.findAll();
  //   client.emit('get-stat', new SrvResp(true, '', res));
  // }

  @UseGuards(AuthGuard())
  @SubscribeMessage('get-stat')
  async onGetStat(client){
    const event = 'events';
    return client.emit('get-stat', new SrvResp(true, '', event));
  }
}
