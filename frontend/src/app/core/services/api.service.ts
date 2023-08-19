import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // need to update different envs in config later on
  readonly APIURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) {
  }

  getRecords(): Observable<any> {
    return this.http.get<any>(`${this.APIURL}/records`)
    //return lastValueFrom(this.http.get<any>(`${this.APIURL}/records`))
  }

  async getRecords2(): Promise<any> {
    const data = await fetch(`${this.APIURL}/records`)
    return await data.json() ?? {}
  }

  getApiUrl(): string {
    return this.APIURL
  }
}
