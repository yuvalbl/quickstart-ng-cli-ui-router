Set TestBed Minimal Configuration
Test will not work at this stage since the exist jasmine suite doesn't know ui-router states.
To fix this we'll add all the required dependencies to TestBed.

## modifying `app.component.spec.ts` to work with ui-router.
### 1 Add to file top:
```javascript
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { APP_BASE_HREF } from '@angular/common';
import { UIRouterModule } from 'ui-router-ng2';
import { APP_STATES } from './app.states';
```

### 2 Add imports with app states to TestBed (inside the `beforeEach` call)  
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

### 3 Since in this test we will test app component only, without child components, 
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

### 4 Add HomeComponent to your `TestBed` declarations:
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

### 5 Add APP_BASE_HREF provider to `TestBed.configureTestingModule`. 
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
