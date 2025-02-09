/* Base Records API model */
interface BaseRecordsApi {
  id: number;
  uuid: string;
  name: string;
  text: string | null;
  created_at: string;
  updated_at: string
}

/* Programming Project API models */
export interface ProgrammingProjectApiResponse extends BaseRecordsApi {
  deadline: string | null;
  description: string | null;
  extra: string | null;
  importance: number | null;
  used_technologies: string | null;
}

export type ProgrammingProjectPostRequest = Omit<ProgrammingProjectApiResponse, 'id' | 'uuid' | 'created_at' | 'updated_at'>;

export type ProgrammingProjectPatchRequest = Partial<ProgrammingProjectPostRequest>;

export interface ProgrammingProjectListApiResponse {
  records: ProgrammingProjectApiResponse[];
}

/* Knowledge API models */
export interface KnowledgeApiResponse extends BaseRecordsApi {
  // false id type - its string until migrated to postgresql
  importance: number | null;
  domain: string | null;
  link: string | null;
  image: string | null;
}

export type KnowledgePostRequest = Omit<KnowledgeApiResponse, 'id' | 'uuid' | 'created_at' | 'updated_at'>;

export type KnowledgePatchRequest = Partial<KnowledgePostRequest>;

export interface KnowledgeListApiResponse {
  records: KnowledgeApiResponse[];
}