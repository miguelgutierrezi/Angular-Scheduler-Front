import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {Router} from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerServiceSpy;

  routerServiceSpy = jasmine.createSpyObj('Route', [ 'navigate' ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerServiceSpy },
        AuthGuard
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
