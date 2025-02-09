import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';

import {
  KnowledgeApiResponse,
  ProgrammingProjectPatchRequest,
  ProgrammingProjectPostRequest,
  ProgrammingProjectApiResponse,
  KnowledgePostRequest,
  KnowledgePatchRequest,
  ProgrammingProjectListApiResponse,
  KnowledgeListApiResponse,
} from '@feature/records/models';

@Injectable()
export class RecordsApiService {
  // need to update different envs in config later on
  readonly APIURL = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getProgrammingProject(id: string): Promise<ProgrammingProjectApiResponse> {
    return lastValueFrom(
      this.http.get<ProgrammingProjectApiResponse>(
        `${this.APIURL}/records/programming-project/${id}`
      )
    );
  }

  getProgrammingProjects(): Promise<ProgrammingProjectApiResponse[]> {
    return lastValueFrom(
      this.http.get<ProgrammingProjectListApiResponse>(
        `${this.APIURL}/records/programming-project`
      ).pipe(map((response) => response.records))
    );
  }

  addProgrammingProject(
    programmingProject: ProgrammingProjectPostRequest
  ): Promise<ProgrammingProjectApiResponse> {
    return lastValueFrom(
      this.http.post<ProgrammingProjectApiResponse>(
        `${this.APIURL}/records/programming-project`,
        programmingProject
      )
    );
  }

  updateProgrammingProject(
    id: string,
    programmingProject: ProgrammingProjectPatchRequest
  ): Promise<ProgrammingProjectApiResponse> {
    return lastValueFrom(
      this.http.patch<ProgrammingProjectApiResponse>(
        `${this.APIURL}/records/programming-project/${id}`,
        programmingProject
      )
    );
  }

  deleteProgrammingProject(id: string): Promise<void> {
    return lastValueFrom(
      this.http.delete<void>(
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
    programmingProject: KnowledgePostRequest
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
    programmingProject: KnowledgePatchRequest
  ): Promise<KnowledgeApiResponse> {
    return lastValueFrom(
      this.http.patch<KnowledgeApiResponse>(
        `${this.APIURL}/records/knowledge/${id}`,
        programmingProject
      )
    );
  }

  deleteKnowledgeRecord(id: string): Promise<void> {
    return lastValueFrom(
      this.http.delete<void>(
        `${this.APIURL}/records/knowledge/${id}`
      )
    );
  }
}
