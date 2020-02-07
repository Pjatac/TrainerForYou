import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { EditComponent } from './components/edit/edit.component';
import { DictionariesComponent } from './components/dictionaries/dictionaries.component';


const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent, pathMatch: 'full' },
  { path: 'stat', component: StatisticComponent, pathMatch: 'full' },
  { path: 'lang', component: LanguagesComponent, pathMatch: 'full' },
  { path: 'dict', component: DictionariesComponent, pathMatch: 'full' },
  { path: 'edit', component: EditComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
