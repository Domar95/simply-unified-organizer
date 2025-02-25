import { Injectable } from '@angular/core';

import {
  KnowledgeApiResponse,
  KnowledgePatchRequest,
  KnowledgePostRequest,
  QuestionBase,
} from '@feature/records/models';
import { RecordsApiService } from '../records-api.service';
import { RecordStrategy } from './record-strategy.interface';
import { QuestionService } from '../question-service.service';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeStrategy implements RecordStrategy {
  constructor(
    private recordsApiService: RecordsApiService,
    private questionService: QuestionService
  ) {}

  getRecord(id: string): Promise<KnowledgeApiResponse> {
    return this.recordsApiService.getKnowledgeRecord(id);
  }

  getAllRecords(): Promise<KnowledgeApiResponse[]> {
    return this.recordsApiService.getKnowledgeRecords();
  }

  addRecord(data: KnowledgePostRequest): Promise<KnowledgeApiResponse> {
    return this.recordsApiService.addKnowledgeRecord(data);
  }

  updateRecord(
    id: string,
    data: KnowledgePatchRequest
  ): Promise<KnowledgeApiResponse> {
    return this.recordsApiService.updateKnowledgeRecord(id, data);
  }

  deleteRecord(id: string): Promise<void> {
    return this.recordsApiService.deleteKnowledgeRecord(id);
  }

  getQuestions(
    initialValues?: Record<string, string | number>
  ): QuestionBase<string | number>[] {
    return this.questionService.getKnowledgeRecordQuestions(initialValues);
  }
}
