# ng-cli with ui-Router-ng2 Quickstart Source

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.21.

## Intro
This project purpose is to provide a quickstart for a project based on angular-cli tool and ui-router-ng2

Spec:

[angular](https://angular.io/docs/ts/latest/): 2.2.1

[angular-cli](https://github.com/angular/angular-cli): 1.0.0-beta.21

[ui-router-ng2](https://ui-router.github.io/docs/latest/modules/ng2.html): 1.0.0-beta.3

NOTE:
as both ng-cli and ui-router-ng2 are currently in beta versions, it is highly recommended to test each of the following steps as you go.

to serve the app - use `ng serve` & navigate to `http://localhost:4200/`

to test the app using karma - use: `ng test`

# Project creation step by step:
## 1. Get up to date ng-cli 
if ng-cli not install - install it globally:
```bash
npm install -g angular-cli
```
if ng-cli already installed - make sure you have the latest version.
To see your current version use `npm list -g angular-cli`. 
To see the latest angular-cli versions use  `npm info angular-cli version`.

If update required - see [angular-cli update section](https://github.com/angular/angular-cli#updating-angular-cli).

## 2. Create a new ng-cli project:
```bash
ng new myProject
```

## 3. Go to project folder and add ui-router for angular 2:
```bash
cd myProject
npm install ui-router-ng2 --save
```

## 4. Create 2  components named 'home' and 'heroes' (unused functions & imports can be removed):
```bash
ng g component home
ng g component heroes
```

## 5. Set [ui-router basic navigation](https://github.com/ui-router/quickstart-ng2):
### 5.1 Add navigation menu and ui-view to `app.component.html`:
```
<nav role="navigation">
  <ul>
    <li>
      <a uiSref="home">Home</a>
    </li>
    <li>
      <a uiSref="heroes">My Heroes</a>
    </li>
  </ul>
</nav>

<ui-view></ui-view>
```

### 5.2 In app folder create `app.states.ts` file with the following state constants:
```javascript
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
```

### 5.3 In `app.module.ts` add APP_STATES to imports 
```javascript
	//...
	import { UIRouterModule } from 'ui-router-ng2';
	import { APP_STATES } from './app.states';
	//...

  imports: [
	//... your other imports
	
    UIRouterModule.forRoot({
      states: APP_STATES,
      otherwise: {state: 'home'}
    })
  ],
  //...
```

Check the app (ng serve) and see everything is loaded correctly
Note: Test will not work at this stage since the exist jasmine suite doesn't know ui-router states.
To fix this the required dependencies must be included in the TestBed.

The practical solution (for most cases) would be to import the entire 
AppModule, along with [APP_BASE_HREF](https://angular.io/docs/ts/latest/api/common/index/APP_BASE_HREF-let.html) token.
To see how to include only the must-have dependencies in your test file - 
see [set testbed minimal configuration](https://github.com/yuvalbl/quickstart-ng-cli-ui-router/blob/master/notes/set_testbed_minimal_configuration.md) note.

## 6 modifying `app.component.spec.ts` to work with ui-router.
### 6.1 Add to file top:
```javascript
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from './app.module';
```

### 6.2 Configure TestBed to import AppModule  (inside the `beforeEach` call)  
```javascript
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });
  });
```

### 6.3 Modify the tests according to the current layout. 

Run `ng test` to verify everything is solid.

## 7 Lets add some content to our heroes component:
### 7.1 Inside `heroes` folder, add heroes components states file named: `heroes.states.ts`
### 7.2 Add the following code to the states file you've created:
 ```javascript
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
 ```
 
note the resolve functionality, we will use it soon enough.

### 7.3 Inside `heroes` folder, add heroes components states file named: `heroes.module.ts`
### 7.4 Add the following code to the module file you've created:
```javascript
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
```
### 7.5 You should now modify the `app.module` file. Remove `HeroesComponent` from the declaration section inside your `ngModule`.
Instead, include `HeroesModule` in your import section.
Your file should now look like this:
```javascript
// imports list...
import { HeroesModule } from './heroes/heroes.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UIRouterModule.forRoot({
      states: APP_STATES,
      otherwise: {state: 'home'}
    }),
    HeroesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 7.6 Modify heroes.components.ts so it can accept data from the ui-router resolve function.
add the Input decorator to your Heroes Components `constructor`:
```javascript
// ...
import {Component, Input} from '@angular/core';
// ...
  @Input('heroesList') heroes;
  constructor() { }
```

### 7.7 Modify heroes.components.html to display the resolved data:
```
<p>
  My Heroes:
</p>
<ul>
  <li *ngFor="let hero of heroes">
    <a uiSref="hero.details">{{hero.name}}</a>
  </li>
</ul>
```

### 7.8 Add data json file so the Heroes component will have something to work with.
In  your src folder, create a new `data` folder. inside of it create `heroes.json` file with some data.
You can use the following data, which is similar to the data file of angular2 heroes demo:
```javascript
[
  {"id": "11", "name": "Mr. Nice"},
  {"id": "12", "name": "Narco"},
  {"id": "13", "name": "Bombasto"},
  {"id": "14", "name": "Celeritas"},
  {"id": "15", "name": "Magneta"},
  {"id": "16", "name": "RubberMan"},
  {"id": "17", "name": "Dynama"},
  {"id": "18", "name": "Dr IQ"},
  {"id": "19", "name": "Magma"},
  {"id": "20", "name": "Tornado"}
]
```
