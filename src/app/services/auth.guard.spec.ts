import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {Router} from '@angular/router';
import {UserService} from './user.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerServiceSpy;
  let authServiceSpy;

  routerServiceSpy = jasmine.createSpyObj('Route', ['navigate']);
  authServiceSpy = jasmine.createSpyObj('UserService', ['isLoggedIn']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: routerServiceSpy},
        {provide: UserService, useValue: authServiceSpy},
        AuthGuard
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    guard.canActivate();
    expect(guard).toBeTruthy();
  });

  it('should be created with no loggedIn', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);
    guard.canActivate();
    expect(guard).toBeTruthy();
  });
});
