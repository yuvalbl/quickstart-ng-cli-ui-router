import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeroesComponent } from './heroes/heroes.component';
import { UIRouterModule } from 'ui-router-ng2';
import { APP_STATES } from './app.states';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeroesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UIRouterModule.forRoot({
      states: APP_STATES,
      otherwise: {state: 'home'}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
