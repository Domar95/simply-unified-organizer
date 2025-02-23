import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  UserApiResponse,
  UserLoginRequest,
  UserLoginResponse,
  UserPostRequest,
} from '../models/users-api.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly APIURL = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserApiResponse> {
    return this.http.get<UserApiResponse>(`${this.APIURL}/users`)
  }

  registerUser(user: UserPostRequest): Promise<UserApiResponse> {
    return lastValueFrom(
      this.http.post<UserApiResponse>(`${this.APIURL}/users`, user)
    );
  }

  loginUser(cred: UserLoginRequest): Promise<UserLoginResponse> {
    return lastValueFrom(
      this.http.post<UserLoginResponse>(`${this.APIURL}/users/login`, cred)
    );
  }
}
