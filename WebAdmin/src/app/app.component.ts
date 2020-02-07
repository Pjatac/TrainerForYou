import { Component, OnInit } from '@angular/core';
import  GuardService  from './services/guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  
export class AppComponent implements OnInit{
  title = 'WebAdmin';

  constructor(private _guard: GuardService) {}

  ngOnInit() {
    this._guard.getStatus().subscribe(resp => this._guard.setStatus(resp));
  }
}
