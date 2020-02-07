import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { SrvResp } from '../models/srv.resp.model';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class GuardService {

  isAuth = false;

  constructor(private socket: Socket) {
    if (this.getAuth())
      this.isAuth = true;
  }

  getStatus(): Observable<SrvResp> {
    return this.socket.fromEvent('authStatusChanged');
  }

  setStatus(resp) {
    this.isAuth = resp.status;
    if (resp.status) {
      this.setAuth(resp.data.token.token); 
      const source = timer(950);
      const subscribe = source.subscribe(() => this.socket.emit('renewTocken'));
    }
    else {
      this.removeAuth();
    }
  }

  setAuth(token) {
    sessionStorage.setItem('token', token);
  }

  removeAuth() {
    sessionStorage.removeItem('token');
    this.isAuth = false;
  }

  getAuth() {
    return sessionStorage.getItem('token');
  }
}
