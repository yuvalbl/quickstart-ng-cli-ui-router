/**
 * App level states
 */
import { Ng2StateDeclaration } from 'ui-router-ng2';
import { HomeComponent } from './home/home.component';

const APP_STATES: Ng2StateDeclaration[] = [
  {
    name: 'home',
    url: '/',
    component: HomeComponent
  }
];

export { APP_STATES };
