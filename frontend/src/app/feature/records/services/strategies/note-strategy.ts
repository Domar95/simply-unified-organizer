import { Injectable } from "@angular/core";

import { NoteApiResponse } from "@feature/records/models";
import { RecordsApiService } from "../records-api.service";
import { RecordStrategy } from "./record-strategy.interface";


@Injectable({
  providedIn: 'root'
})
export class NoteStrategy implements RecordStrategy {

  constructor(private recordsApiService: RecordsApiService,
  ) { }

  getRecord(id: string): Promise<NoteApiResponse> {
    return this.recordsApiService.getNoteRecord(id);
  }
}
