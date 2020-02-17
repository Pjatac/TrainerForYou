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
    this._guard.getStatus().subscribe(resp => {
      console.log(`Get status changed on ${new Date}`);
      this._guard.setStatus(resp);
    // if (resp.status === false)
      // this.dialog.open(OurDialogComponent, { data: { body: resp.message, title: "Getting trouble..." } });
    });
  }
}
