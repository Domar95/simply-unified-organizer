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

  getKnowledgeRecord(id: string): Promise<KnowledgeApiResponse> {
    return lastValueFrom(
      this.http.get<KnowledgeApiResponse>(
        `${this.APIURL}/category/knowledge/records/${id}`
      )
    );
  }

  getKnowledgeRecords(): Promise<KnowledgeApiResponse[]> {
    return lastValueFrom(
      this.http
        .get<KnowledgeListApiResponse>(
          `${this.APIURL}/category/knowledge/records`
        )
        .pipe(map((response) => response.records))
    );
  }

  addKnowledgeRecord(
    programmingProject: KnowledgeApiResponse
  ): Promise<KnowledgeApiResponse> {
    return lastValueFrom(
      this.http.post<KnowledgeApiResponse>(
        `${this.APIURL}/category/knowledge/records`,
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
        `${this.APIURL}/category/knowledge/records/${id}`,
        programmingProject
      )
    );
  }

  deleteKnowledgeRecord(id: string): Promise<KnowledgeApiResponse> {
    return lastValueFrom(
      this.http.delete<KnowledgeApiResponse>(
        `${this.APIURL}/category/knowledge/records/${id}`
      )
    );
  }
}
