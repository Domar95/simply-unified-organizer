import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';

import {
  KnowledgeListApiResponse,
  KnowledgeApiResponse,
  ProgrammingProjectGetResponse,
  ProgrammingProjectPatchRequest,
  ProgrammingProjectPostRequest,
} from '@feature/records/models';

@Injectable()
export class RecordsApiService {
  // need to update different envs in config later on
  readonly APIURL = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getProgrammingProject(id: string): Promise<ProgrammingProjectGetResponse> {
    return lastValueFrom(
      this.http.get<ProgrammingProjectGetResponse>(
        `${this.APIURL}/records/programming-project/${id}`
      )
    );
  }

  getProgrammingProjects(): Promise<ProgrammingProjectGetResponse[]> {
    return lastValueFrom(
      this.http.get<ProgrammingProjectGetResponse[]>(
        `${this.APIURL}/records/programming-project`
      )
    );
  }

  addProgrammingProject(
    programmingProject: ProgrammingProjectPostRequest
  ): Promise<ProgrammingProjectGetResponse> {
    return lastValueFrom(
      this.http.post<ProgrammingProjectGetResponse>(
        `${this.APIURL}/records/programming-project`,
        programmingProject
      )
    );
  }

  updateProgrammingProject(
    id: string,
    programmingProject: ProgrammingProjectPatchRequest
  ): Promise<ProgrammingProjectGetResponse> {
    return lastValueFrom(
      this.http.patch<ProgrammingProjectGetResponse>(
        `${this.APIURL}/records/programming-project/${id}`,
        programmingProject
      )
    );
  }

  deleteProgrammingProject(id: string): Promise<ProgrammingProjectGetResponse> {
    return lastValueFrom(
      this.http.delete<ProgrammingProjectGetResponse>(
        `${this.APIURL}/records/programming-project/${id}`
      )
    );
  }

  getKnowledgeRecord(id: string): Promise<KnowledgeApiResponse> {
    return lastValueFrom(
      this.http.get<KnowledgeApiResponse>(
        `${this.APIURL}/records/knowledge/${id}`
      )
    );
  }

  getKnowledgeRecords(): Promise<KnowledgeApiResponse[]> {
    return lastValueFrom(
      this.http
        .get<KnowledgeListApiResponse>(
          `${this.APIURL}/records/knowledge`
        )
        .pipe(map((response) => response.records))
    );
  }

  addKnowledgeRecord(
    programmingProject: KnowledgeApiResponse
  ): Promise<KnowledgeApiResponse> {
    return lastValueFrom(
      this.http.post<KnowledgeApiResponse>(
        `${this.APIURL}/records/knowledge`,
        programmingProject
      )
    );
  }

  updateKnowledgeRecord(
    id: string,
    programmingProject: KnowledgeApiResponse
  ): Promise<KnowledgeApiResponse> {
    return lastValueFrom(
      this.http.patch<KnowledgeApiResponse>(
        `${this.APIURL}/records/knowledge/${id}`,
        programmingProject
      )
    );
  }

  deleteKnowledgeRecord(id: string): Promise<KnowledgeApiResponse> {
    return lastValueFrom(
      this.http.delete<KnowledgeApiResponse>(
        `${this.APIURL}/records/knowledge/${id}`
      )
    );
  }
}
