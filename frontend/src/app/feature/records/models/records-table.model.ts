import {
  KnowledgeApiResponse,
  NoteApiResponse,
  ProgrammingProjectApiResponse,
} from './records-api.model';

export type RecordsTableData =
  | (KnowledgeApiResponse | NoteApiResponse | ProgrammingProjectApiResponse)[]
  | 'loading'
  | 'error';
export type RecordsTableColumns = { key: string; label: string }[];
