import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should have navigation menu with 2 li items', (() => {
    let fixture = TestBed.createComponent(AppComponent);
    let appElement = fixture.debugElement.nativeElement;
    let nav = appElement.querySelector('nav');
    expect(nav).not.toBeNull();
    let ul = nav.querySelector('ul');
    expect(ul).not.toBeNull();
    let li = ul.querySelectorAll('li');
    expect(li.length).toEqual(2);
  }));
});
