import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SrvResp } from '../common/srvresp.model';
import { UserDTO } from '../dal/user/userDTO';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Languages } from 'src/dal/enums';
import { UsersService } from '../dal/user/users.service';
import { AuthService } from '../guards/auth.service';
import { WsAuthGuard } from '../guards/strategies/jwt.strategy';

@WebSocketGateway()
export class TransportGateway implements OnGatewayConnection, OnGatewayDisconnect {

  clients = [];

  constructor(private readonly usersService: UsersService, private authService: AuthService) {
  }

  @WebSocketServer() server;

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
  }

  async handleDisconnect(client) {

    // if (reason == 'renewToken') {
    //   console.log(`Renew token`);
    //   client.connect();
    // }
    // else {
    //  client.server.connect();
      console.log("Disconnect ", client.id);
      this.clients.splice(this.clients.indexOf(cl => cl.id = client.id), 1);
    //}
  }

  @SubscribeMessage('login-request')
  async onLoginRequest(client, user: UserDTO) {
    const res = await this.authService.login(user, client.conn.request.connection.remoteAddress);

    client.emit('login-response', res);
    console.log(`Sending login-response at ${new Date}`);
    if (res.status) {
      console.log(`Successfull login at ${new Date}`);
      console.log(`Sending authStatusChanged from login-request at ${new Date}`);
      client.emit('authStatusChanged', res);
    }

  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('get-stat')
  async onGetStat(client) {
    console.log(`in sequred get-stat at ${new Date}`);
    return client.emit('get-stat', new SrvResp(true, 'getting statistic'));
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('renewToken')
  async onRenewToken(client, userID) {
    console.log(`in sequred renewToken at ${new Date}`);
    const res = await this.authService.createJwtPayload(await this.usersService.findByID(userID));
    client.emit('authStatusChanged', new SrvResp(true, "renew", res.token));
  }
}
