import { KnowledgeApiResponse, NoteApiResponse, ProgrammingProjectApiResponse, QuestionBase } from "@feature/records/models";

export interface RecordStrategy {
  /* API */
  getRecord(id: string): Promise<KnowledgeApiResponse | NoteApiResponse | ProgrammingProjectApiResponse>;

  getQuestions(initialValues?: Record<string, string | number>): QuestionBase<string | number | Date>[];
}

