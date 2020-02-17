import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { SrvResp } from '../models/srv.resp.model';

@Injectable({
  providedIn: 'root'
})
export default class TransportService {

  constructor(private socket: Socket) { }

  login(user): Observable<SrvResp> {
    this.socket.emit('login-request', user);
    return this.socket.fromEvent('login-response');
  }

  getStat() {
    this.socket.emit('get-stat');
    console.log(this.socket);
    return this.socket.fromEvent('get-stat');
  }
}
