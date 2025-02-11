import { Injectable } from "@angular/core";

import { ProgrammingProjectApiResponse, QuestionBase } from "@feature/records/models";
import { RecordsApiService } from "../records-api.service";
import { RecordStrategy } from "./record-strategy.interface";
import { QuestionService } from "../question-service.service";


@Injectable({
  providedIn: 'root'
})
export class ProgrammingProjectStrategy implements RecordStrategy {
  constructor(private recordsApiService: RecordsApiService, private questionService: QuestionService
  ) { }

  getRecord(id: string): Promise<ProgrammingProjectApiResponse> {
    return this.recordsApiService.getProgrammingProject(id);
  }

  getQuestions(initialValues?: Record<string, string | number>): QuestionBase<string | number | Date>[] {
    return this.questionService.getProgrammingProjectQuestions(initialValues)
  }

}
