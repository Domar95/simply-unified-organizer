import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserApiResponse, UserPostRequest } from './users-api.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly APIURL = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  registerUser(user: UserPostRequest): Promise<UserApiResponse> {
    return lastValueFrom(
      this.http.post<UserApiResponse>(`${this.APIURL}/users`, user)
    );
  }
}
