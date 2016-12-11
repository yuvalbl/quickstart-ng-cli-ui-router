import { Http } from "@angular/http";
import { Ng2StateDeclaration } from 'ui-router-ng2';
import { HeroesComponent } from './heroes.component';

// based on ui-router-ng2 quickstart examples: https://github.com/ui-router/quickstart-ng2
const HEROES_STATES: Ng2StateDeclaration[] = [
  {
    name: 'heroes',
    url: '/heroes',
    views: {
      $default: { component: HeroesComponent },
    },
    resolve: [
      {
        token: 'heroesList',
        deps: [Http],
        resolveFn: (http: Http) => http.get('/data/heroes.json').map(res => res.json()).toPromise()
      }
    ]
  }
];

export { HEROES_STATES }
