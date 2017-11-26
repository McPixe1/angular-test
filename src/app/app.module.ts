import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { Configuration } from './app.constants';
import { DataService } from './shared/services/data.service';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PlayersComponent } from './components/players/players.component';

const appRoutes: Routes = [
  { path: 'players', component: PlayersComponent },
  { path: '',
    redirectTo: '/players',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    ),
    BrowserModule,
    NgxPaginationModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [DataService, Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
