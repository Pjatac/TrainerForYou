import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import TransportService from 'src/app/services/transport.service';
import { MatDialog } from '@angular/material';
import { OurDialogComponent } from '../our-dialog/our-dialog.component';
import { SrvResp } from 'src/app/models/srv.resp.model';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {

  user;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30)])
  });
  resp: SrvResp;
  subscribtion;

  constructor(private _router: Router, private transportService: TransportService, public dialog: MatDialog) { }

  onSubmit() {
    this.user = {
      email: this.loginForm.controls["email"].value,
      password: this.loginForm.controls["password"].value
    };
    this.subscribtion = this.transportService.login(this.user).subscribe(r => {
      if (!r.status) {
        this.subscribtion.unsubscribe();
        this.dialog.open(OurDialogComponent, { data: { body: r.message, title: "Ouups" } });
      }
      else {
        this.subscribtion.unsubscribe();
        //this.dialog.open(OurDialogComponent, { data: { body: r.message, title: "Success" } });
        
      }
    });
  };

}
