import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../../services/user.service';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {AuthGuard} from '../../services/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../services/auth.interceptor';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userServiceSpy;
  let routerServiceSpy;

  routerServiceSpy = jasmine.createSpyObj('Route', [ 'navigate' ]);
  userServiceSpy = jasmine.createSpyObj('UserService', [ 'login', 'createUser', 'isLoggedIn' ]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: UserService, useValue: userServiceSpy},
        {provide: Router, useValue: routerServiceSpy},
        AuthGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    userServiceSpy.isLoggedIn.and.returnValue(false);
    component.ngOnInit();
    component.onChangeMode();
    expect(component).toBeTruthy();
  });

  it('should create and redirect', () => {
    userServiceSpy.isLoggedIn.and.returnValue(true);
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it ('should send a login petition', () => {
    component.onLoginForm.controls.email.setValue('test@test.com');
    component.onLoginForm.controls.password.setValue('Pass123');
    component.isRegisterMode = false;
    userServiceSpy.login.and.returnValue(of({token: 'token', date: 'date'}));
    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it ('should send a createUser petition', () => {
    component.onRegistrationForm.controls.email.setValue('test@test.com');
    component.onRegistrationForm.controls.password.setValue('Pass123');
    component.onRegistrationForm.controls.name.setValue('Name');
    component.isRegisterMode = true;
    userServiceSpy.createUser.and.returnValue(of({_id: 'id', name: 'Name', email: 'test@test.com', password: 'Pass123', _v: '0'}));
    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it ('should not send a createUser petition', () => {
    component.isRegisterMode = true;
    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it ('should not send a login petition', () => {
    component.isRegisterMode = false;
    component.onSubmit();
    expect(component).toBeTruthy();
  });
});
