import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static BASE_URL = environment.backUrl;

  constructor(
    private http: HttpClient
  ) { }

  public login(username: string, password: string): Observable<any> {
    if (!username || !password) {
      throw new Error('missing params');
    }
    const body = {
      username,
      password
    };
    return this.http.post(`${UserService.BASE_URL}/users`, body);
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${UserService.BASE_URL}/users`);
  }

  public getUser(id: string): Observable<any> {
    if (!id) {
      throw new Error('id is required');
    }
    return this.http.get(`${UserService.BASE_URL}/users/${id}`);
  }

  public createUser(user: User): Observable<any> {
    if (!user) {
      throw new Error('user is required');
    }
    const body = {
      name: user.name,
      username: user.username,
      password: user.password
    };
    return this.http.post(`${UserService.BASE_URL}/users`, body);
  }

  public updateUser(id: string, user: User): Observable<any> {
    if (!id || !user) {
      throw new Error('missing arguments');
    }
    const body = {
      name: user.name,
      username: user.username,
      password: user.password
    };
    return this.http.put(`${UserService.BASE_URL}/users/${id}`, body);
  }

  public deleteUser(id: string): Observable<any> {
    if (!id) {
      throw new Error('id is required');
    }
    return this.http.delete(`${UserService.BASE_URL}/users/${id}`);
  }
}
