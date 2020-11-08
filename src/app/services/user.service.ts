import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly BASE_URL = environment.backUrl;

  constructor(
    private http: HttpClient
  ) { }

  public login(email: string, password: string): Observable<any> {
    if (!email || !password) {
      throw new Error('missing params');
    }
    const body = {
      email,
      password
    };
    return this.http.post(`${this.BASE_URL}/login`, body);
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/users`);
  }

  public getUser(id: string): Observable<any> {
    if (!id) {
      throw new Error('id is required');
    }
    return this.http.get(`${this.BASE_URL}/users/${id}`);
  }

  public createUser(user: User): Observable<any> {
    if (!user) {
      throw new Error('user is required');
    }
    const body = {
      name: user.name,
      email: user.email,
      password: user.password
    };
    return this.http.post(`${this.BASE_URL}/users`, body);
  }

  public updateUser(id: string, user: User): Observable<any> {
    if (!id || !user) {
      throw new Error('missing arguments');
    }
    const body = {
      name: user.name,
      email: user.email,
      password: user.password
    };
    return this.http.put(`${this.BASE_URL}/users/${id}`, body);
  }

  public deleteUser(id: string): Observable<any> {
    if (!id) {
      throw new Error('id is required');
    }
    return this.http.delete(`${this.BASE_URL}/users/${id}`);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== undefined;
  }
}
