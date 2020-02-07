import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {
  MatSortModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './components/start/start.component';

import TransportService from './services/transport.service';
import GuardService from "./services/guard.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OurDialogComponent } from './components/our-dialog/our-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { DictionariesComponent } from './components/dictionaries/dictionaries.component';
import { EditComponent } from './components/edit/edit.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {query: {token: sessionStorage.getItem('token')}} };

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    OurDialogComponent,
    HeaderComponent,
    NotFoundComponent,
    StatisticComponent,
    LanguagesComponent,
    DictionariesComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [TransportService, GuardService],
  bootstrap: [AppComponent],
  entryComponents: [OurDialogComponent]
})
export class AppModule { }
