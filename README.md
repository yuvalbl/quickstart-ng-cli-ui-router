# ng-cli with ui-Router-ng2 Quickstart Source

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.21.

## Intro
This project purpose is to provide a quickstart for a project based on angular-cli tool and ui-router-ng2

Spec:

[angular](https://angular.io/docs/ts/latest/): 2.2.1

[angular-cli](https://github.com/angular/angular-cli): 1.0.0-beta.21

[ui-router-ng2](https://ui-router.github.io/docs/latest/modules/ng2.html): 1.0.0-beta.3

NOTE:
as both ng-cli and ui-router-ng2 are currently in beta versions, it is highly recommended 
to test each of the following steps as you go. to serve the app - use `ng serve` & navigate to `http://localhost:4200/`
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
To fix this see the next step.

## 6 modifying `app.component.spec.ts` to work with ui-router.
### 6.1 Add to file top:
```javascript
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { APP_BASE_HREF } from '@angular/common';
import { UIRouterModule } from 'ui-router-ng2';
import { APP_STATES } from './app.states';
```

### 6.2 Add imports with app states to TestBed (inside the `beforeEach` call)  
```javascript
  TestBed.configureTestingModule({
    imports: [
      UIRouterModule.forRoot({
        states: APP_STATES,
        otherwise: {state: 'home'}
      })
    ],
    declarations: [
      AppComponent
    ],
  });
```

### 6.3 Since in this test we will test app component only, without child components, 
we don't need HomeComponent layout itself (which may contain more sub-components)
override home component by adding the following before `TestBed.configureTestingModule`:
```javascript
  TestBed.overrideComponent(HomeComponent, {set: {template: 'Home component'}});
  TestBed.configureTestingModule({
    imports: [
      UIRouterModule.forRoot({
        states: APP_STATES,
        otherwise: {state: 'home'}
      })
    ],
    declarations: [
      AppComponent
    ],
  });
```

### 6.4 Add HomeComponent to your `TestBed` declarations:
```javascript
  TestBed.overrideComponent(HomeComponent, {set: {template: 'Home component'}});
  TestBed.configureTestingModule({
    imports: [
      UIRouterModule.forRoot({
        states: APP_STATES,
        otherwise: {state: 'home'}
      })
    ],
    declarations: [
      AppComponent,
      HomeComponent
    ],
  });
```

### 6.5 Add APP_BASE_HREF provider to `TestBed.configureTestingModule`. 
your `beforeEach` should now look like this:
```javascript
  beforeEach(() => {
    TestBed.overrideComponent(HomeComponent, {set: {template: 'Home component'}});
    TestBed.configureTestingModule({
      imports: [
        UIRouterModule.forRoot({
          states: APP_STATES,
          otherwise: {state: 'home'}
        })
      ],
      declarations: [
        AppComponent,
        HomeComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    });
  });
```

remove the last test / modify your tests according to the current layout.
Run `ng test` to verify everything is solid.
