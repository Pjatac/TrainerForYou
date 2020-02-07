import { Component, OnInit } from '@angular/core';
import GuardService from 'src/app/services/guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private readonly _guard: GuardService) { }

  ngOnInit() {
  }

  exit() {
    this._guard.removeAuth();
  }
}
