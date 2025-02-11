import { Injectable } from "@angular/core";

import { NoteApiResponse, NotePostRequest, QuestionBase } from "@feature/records/models";
import { RecordsApiService } from "../records-api.service";
import { RecordStrategy } from "./record-strategy.interface";
import { QuestionService } from "../question-service.service";


@Injectable({
  providedIn: 'root'
})
export class NoteStrategy implements RecordStrategy {

  constructor(private recordsApiService: RecordsApiService, private questionService: QuestionService
  ) { }

  getRecord(id: string): Promise<NoteApiResponse> {
    return this.recordsApiService.getNoteRecord(id);
  }

  addRecord(data: NotePostRequest): Promise<NoteApiResponse> {
    return this.recordsApiService.addNoteRecord(data);
  }

  getQuestions(initialValues?: Record<string, string | number>): QuestionBase<string | number | Date>[] {
    return this.questionService.getNoteQuestions(initialValues)
  }
}
