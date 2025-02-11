import { Injectable } from "@angular/core";

import { KnowledgeApiResponse } from "@feature/records/models";
import { RecordsApiService } from "../records-api.service";
import { RecordStrategy } from "./record-strategy.interface";


@Injectable({
  providedIn: 'root'
})
export class KnowledgeStrategy implements RecordStrategy {

  constructor(private recordsApiService: RecordsApiService,
  ) { }

  getRecord(id: string): Promise<KnowledgeApiResponse> {
    return this.recordsApiService.getKnowledgeRecord(id);
  }
}