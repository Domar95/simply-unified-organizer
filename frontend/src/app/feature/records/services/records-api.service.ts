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
  NoteApiResponse,
  NoteListApiResponse,
  NotePostRequest,
  NotePatchRequest,
} from '@feature/records/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecordsApiService {
  // need to update different envs in config later on
  readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /* Programming Project API*/
  getProgrammingProject(id: string): Promise<ProgrammingProjectApiResponse> {
    return lastValueFrom(
      this.http.get<ProgrammingProjectApiResponse>(
        `${this.API_URL}/records/programming-project/${id}`
      )
    );
  }

  getProgrammingProjects(): Promise<ProgrammingProjectApiResponse[]> {
    return lastValueFrom(
      this.http
        .get<ProgrammingProjectListApiResponse>(
          `${this.API_URL}/records/programming-project`
        )
        .pipe(map((response) => response.records))
    );
  }

  addProgrammingProject(
    programmingProject: ProgrammingProjectPostRequest
  ): Promise<ProgrammingProjectApiResponse> {
    return lastValueFrom(
      this.http.post<ProgrammingProjectApiResponse>(
        `${this.API_URL}/records/programming-project`,
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
        `${this.API_URL}/records/programming-project/${id}`,
        programmingProject
      )
    );
  }

  deleteProgrammingProject(id: string): Promise<void> {
    return lastValueFrom(
      this.http.delete<void>(
        `${this.API_URL}/records/programming-project/${id}`
      )
    );
  }

  /* Knowledge API*/
  getKnowledgeRecord(id: string): Promise<KnowledgeApiResponse> {
    return lastValueFrom(
      this.http.get<KnowledgeApiResponse>(
        `${this.API_URL}/records/knowledge/${id}`
      )
    );
  }

  getKnowledgeRecords(): Promise<KnowledgeApiResponse[]> {
    return lastValueFrom(
      this.http
        .get<KnowledgeListApiResponse>(`${this.API_URL}/records/knowledge`)
        .pipe(map((response) => response.records))
    );
  }

  addKnowledgeRecord(
    programmingProject: KnowledgePostRequest
  ): Promise<KnowledgeApiResponse> {
    return lastValueFrom(
      this.http.post<KnowledgeApiResponse>(
        `${this.API_URL}/records/knowledge`,
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
        `${this.API_URL}/records/knowledge/${id}`,
        programmingProject
      )
    );
  }

  deleteKnowledgeRecord(id: string): Promise<void> {
    return lastValueFrom(
      this.http.delete<void>(`${this.API_URL}/records/knowledge/${id}`)
    );
  }

  /* Note API*/
  getNoteRecord(id: string): Promise<NoteApiResponse> {
    return lastValueFrom(
      this.http.get<NoteApiResponse>(`${this.API_URL}/records/note/${id}`)
    );
  }

  getNoteRecords(): Promise<NoteApiResponse[]> {
    return lastValueFrom(
      this.http
        .get<NoteListApiResponse>(`${this.API_URL}/records/note`)
        .pipe(map((response) => response.records))
    );
  }

  addNoteRecord(note: NotePostRequest): Promise<NoteApiResponse> {
    return lastValueFrom(
      this.http.post<NoteApiResponse>(`${this.API_URL}/records/note`, note)
    );
  }

  updateNoteRecord(
    id: string,
    note: NotePatchRequest
  ): Promise<NoteApiResponse> {
    return lastValueFrom(
      this.http.patch<NoteApiResponse>(
        `${this.API_URL}/records/note/${id}`,
        note
      )
    );
  }

  deleteNoteRecord(id: string): Promise<void> {
    return lastValueFrom(
      this.http.delete<void>(`${this.API_URL}/records/note/${id}`)
    );
  }
}
