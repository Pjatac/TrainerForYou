import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway()
export class TransportGateway implements OnGatewayConnection, OnGatewayDisconnect{
  
  clients = [];
  
  async handleConnection(client) {
    console.log(`New Connectionn on ${new Date}`, this.clients.length);
    this.clients.push(client);
    client.emit('nameOfFunc', null);
  }

  async handleDisconnect(client) {
    console.log("Disconnect ", client.id.id);
    this.clients.splice(this.clients.indexOf(cl => cl.id = client.id), 1);
  }

  @SubscribeMessage('nameOfFunc')
  async onGetResponses(client, params: any) {
      client.emit('nameOfFunc', params);
  }
}
