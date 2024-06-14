import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import {
  ProgrammingProjectGetResponse,
  ProgrammingProjectPatchRequest,
  ProgrammingProjectPostRequest,
} from '@feature/records/models';

@Injectable()
export class RecordsApiService {
  // need to update different envs in config later on
  readonly APIURL = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getProgrammingProject(id: number): Promise<ProgrammingProjectGetResponse> {
    return lastValueFrom(
      this.http.get<ProgrammingProjectGetResponse>(
        `${this.APIURL}/category/programming-project/records/${id}`
      )
    );
  }

  getProgrammingProjects(): Promise<ProgrammingProjectGetResponse[]> {
    return lastValueFrom(
      this.http.get<ProgrammingProjectGetResponse[]>(
        `${this.APIURL}/category/programming-project/records`
      )
    );
  }

  addProgrammingProject(
    programmingProject: ProgrammingProjectPostRequest
  ): Promise<ProgrammingProjectGetResponse> {
    return lastValueFrom(
      this.http.post<ProgrammingProjectGetResponse>(
        `${this.APIURL}/category/programming-project/records`,
        programmingProject
      )
    );
  }

  updateProgrammingProject(
    id: number,
    programmingProject: ProgrammingProjectPatchRequest
  ): Promise<ProgrammingProjectGetResponse> {
    return lastValueFrom(
      this.http.patch<ProgrammingProjectGetResponse>(
        `${this.APIURL}/category/programming-project/records/${id}`,
        programmingProject
      )
    );
  }

  deleteProgrammingProject(id: number): Promise<ProgrammingProjectGetResponse> {
    return lastValueFrom(
      this.http.delete<ProgrammingProjectGetResponse>(
        `${this.APIURL}/category/programming-project/records/${id}`
      )
    );
  }
}
