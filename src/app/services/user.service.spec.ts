import {inject, TestBed} from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {User} from '../models/user';

describe('UserService', () => {
  const user: User = new User();
  user.id = 'Id';
  user.name = 'Name';
  user.email = 'username@test.com';
  user.password = 'Password';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
  });

  it('service should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('service should send login request', inject([UserService], (service: UserService) => {
    service.login(user.email, user.password);
    expect(service).toBeTruthy();
  }));

  it('service should send login request and throw error', inject([UserService], (service: UserService) => {
    expect(() => service.login(undefined, undefined)).toThrowError();
    expect(service).toBeTruthy();
  }));

  it('service should send getUsers request', inject([UserService], (service: UserService) => {
    service.getUsers();
    expect(service).toBeTruthy();
  }));

  it('service should send getUser request', inject([UserService], (service: UserService) => {
    service.getUser(user.id);
    expect(service).toBeTruthy();
  }));

  it('service should send getUser request and throw error', inject([UserService], (service: UserService) => {
    expect(() => service.getUser(undefined)).toThrowError();
    expect(service).toBeTruthy();
  }));

  it('service should send createUser request', inject([UserService], (service: UserService) => {
    service.createUser(user);
    expect(service).toBeTruthy();
  }));

  it('service should send createUser request and throw error', inject([UserService], (service: UserService) => {
    expect(() => service.createUser(undefined)).toThrowError();
    expect(service).toBeTruthy();
  }));

  it('service should send updateUser request', inject([UserService], (service: UserService) => {
    service.updateUser(user.id, user);
    expect(service).toBeTruthy();
  }));

  it('service should send updateUser request and throw error', inject([UserService], (service: UserService) => {
    expect(() => service.updateUser(undefined, undefined)).toThrowError();
    expect(service).toBeTruthy();
  }));

  it('service should send deleteUser request', inject([UserService], (service: UserService) => {
    service.deleteUser(user.id);
    expect(service).toBeTruthy();
  }));

  it('service should send deleteUser request and throw error', inject([UserService], (service: UserService) => {
    expect(() => service.deleteUser(undefined)).toThrowError();
    expect(service).toBeTruthy();
  }));
});
