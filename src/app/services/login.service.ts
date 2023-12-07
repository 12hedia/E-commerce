import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Login} from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000'; // Assurez-vous que cela correspond à votre configuration JSON Server

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/users`, { username, password });
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/isAuthenticated`);
  }

  getAuthenticatedUser(): Observable<Login | null> {
    return this.http.get<Login | null>(`${this.apiUrl}/authenticatedUser`);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }
}
