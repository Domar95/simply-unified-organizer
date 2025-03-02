import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  UserApiResponse,
  UserLoginRequest,
  UserLoginResponse,
  UserPostRequest,
} from '../models/users-api.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserApiResponse> {
    return this.http.get<UserApiResponse>(`${this.API_URL}/users`);
  }

  registerUser(user: UserPostRequest): Promise<UserApiResponse> {
    return lastValueFrom(
      this.http.post<UserApiResponse>(`${this.API_URL}/users`, user)
    );
  }

  loginUser(cred: UserLoginRequest): Promise<UserLoginResponse> {
    return lastValueFrom(
      this.http.post<UserLoginResponse>(`${this.API_URL}/users/login`, cred)
    );
  }
}
