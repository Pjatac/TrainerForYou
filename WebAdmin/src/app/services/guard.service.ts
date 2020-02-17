import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { SrvResp } from '../models/srv.resp.model';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { WrappedSocket } from 'ngx-socket-io/src/socket-io.service';

@Injectable({
  providedIn: 'root'
})
export default class GuardService {

  isAuth = false;
  private userID: string;

  constructor(private socket: Socket, private _router: Router) {
    // if (this.getAuth())
    //   this.isAuth = true;
    
  }

  getStatus(): Observable<SrvResp> {
    return this.socket.fromEvent('authStatusChanged');
  }

  setStatus(resp) {
    this.isAuth = resp.status;
    if (resp.status) {
      if (resp.message === "renew") {
        this.setAuth(resp.data);
        this.changeConnToken(sessionStorage.getItem('token'));
      }
      else {
        this.setAuth(resp.data.token.token);
        this.userID = resp.data.id;
        this.changeConnToken(sessionStorage.getItem('token'));
        this._router.navigateByUrl('/stat');
      }
      const source = timer(50000);
      const subscribe = source.subscribe(() => this.socket.emit('renewToken', this.userID));
    }
    else {
      this.removeAuth();
    }
  }

  changeConnToken(token) {

    // const config: SocketIoConfig = { url: 'http://localhost:3000', options: { query: { token: sessionStorage.getItem('token') } } };
    // (this.socket as WrappedSocket).config = config;
    this.socket.ioSocket.io.opts.query = { token: token };
    //this.socket.ioSocket.query = { token: token };
    //this.socket.ioSocket.io.connecting[0].io.engine.query = { token: token };
    //this.socket.ioSocket.json.io.engine.query = { token: token };
    this.socket.disconnect('renewToken');
    this.socket.connect();
  }

  setAuth(token) {
    sessionStorage.setItem('token', token);
  }

  removeAuth() {
    sessionStorage.removeItem('token');
    this.isAuth = false;
  }

  getAuth(callerName) {
    const token = sessionStorage.getItem('token');
    console.log(`Get token ${token} from ${callerName} at ${new Date()}`);
    return token;
  }
}
