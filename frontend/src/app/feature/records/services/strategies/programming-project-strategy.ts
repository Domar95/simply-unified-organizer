import { Injectable } from "@angular/core";

import { ProgrammingProjectApiResponse } from "@feature/records/models";
import { RecordsApiService } from "../records-api.service";
import { RecordStrategy } from "./record-strategy.interface";


@Injectable({
  providedIn: 'root'
})
export class ProgrammingProjectStrategy implements RecordStrategy {
  constructor(private recordsApiService: RecordsApiService,
  ) { }

  getRecord(id: string): Promise<ProgrammingProjectApiResponse> {
    return this.recordsApiService.getProgrammingProject(id);
  }
}
