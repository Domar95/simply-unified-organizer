import {
  KnowledgeApiResponse,
  KnowledgePatchRequest,
  KnowledgePostRequest,
  NoteApiResponse,
  NotePatchRequest,
  NotePostRequest,
  ProgrammingProjectApiResponse,
  ProgrammingProjectPatchRequest,
  ProgrammingProjectPostRequest,
  QuestionBase,
} from '@feature/records/models';

export interface RecordStrategy {
  /* API */
  getRecord(
    id: string
  ): Promise<
    KnowledgeApiResponse | NoteApiResponse | ProgrammingProjectApiResponse
  >;
  addRecord(
    data: KnowledgePostRequest | NotePostRequest | ProgrammingProjectPostRequest
  ): Promise<
    KnowledgeApiResponse | NoteApiResponse | ProgrammingProjectApiResponse
  >;
  updateRecord(
    id: string,
    data:
      | KnowledgePatchRequest
      | NotePatchRequest
      | ProgrammingProjectPatchRequest
  ): Promise<
    KnowledgeApiResponse | NoteApiResponse | ProgrammingProjectApiResponse
  >;

  getQuestions(
    initialValues?: Record<string, string | number>
  ): QuestionBase<string | number | Date>[];
}
