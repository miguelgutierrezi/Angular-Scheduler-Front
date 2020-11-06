import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static BASE_URL = environment.backUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<any> {
    return this.http.get(`${UserService.BASE_URL}/users`);
  }

  public getUser(id: string): Observable<any> {
    return this.http.get(`${UserService.BASE_URL}/users/${id}`);
  }

  public createUser(): Observable<any> {
    return this.http.post(`${UserService.BASE_URL}/users`, {});
  }

  public updateUser(id: string): Observable<any> {
    return this.http.put(`${UserService.BASE_URL}/users/${id}`, {});
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete(`${UserService.BASE_URL}/users/${id}`);
  }
}
