import { QuestionBase } from "@feature/records/models";

export interface RecordStrategy {
  /* API */
  getRecord(id: string): Promise<unknown>;

  getQuestions(): QuestionBase<string | number | Date>[];
}

