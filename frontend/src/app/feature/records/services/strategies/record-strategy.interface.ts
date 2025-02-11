import { KnowledgeApiResponse, KnowledgePostRequest, NoteApiResponse, NotePostRequest, ProgrammingProjectApiResponse, ProgrammingProjectPostRequest, QuestionBase } from "@feature/records/models";

export interface RecordStrategy {
  /* API */
  getRecord(id: string): Promise<KnowledgeApiResponse | NoteApiResponse | ProgrammingProjectApiResponse>;
  addRecord(data: KnowledgePostRequest | NotePostRequest | ProgrammingProjectPostRequest): Promise<KnowledgeApiResponse | NoteApiResponse | ProgrammingProjectApiResponse>;

  getQuestions(initialValues?: Record<string, string | number>): QuestionBase<string | number | Date>[];
}

