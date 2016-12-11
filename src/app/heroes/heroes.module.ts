import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRouterModule } from 'ui-router-ng2';
import { HEROES_STATES } from './heroes.states';
import { HeroesComponent } from './heroes.component';

@NgModule({
  imports: [
    CommonModule,
    UIRouterModule.forChild({ states: HEROES_STATES })
  ],
  declarations: [
    HeroesComponent,
  ]
})
export class HeroesModule {}
