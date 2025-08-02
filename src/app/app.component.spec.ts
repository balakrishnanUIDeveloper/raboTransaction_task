import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { App } from './app.component';

// Mock components for routing
@Component({ template: 'Mock Home Component' })
class MockHomeComponent {}

@Component({ template: 'Mock Cart Component' })
class MockCartComponent {}

describe('App Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([
          { path: '', component: MockHomeComponent },
          { path: 'cart', component: MockCartComponent },
        ]),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should have correct title and router outlet', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((app as any).title).toBe('Transaction Cart App');
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
