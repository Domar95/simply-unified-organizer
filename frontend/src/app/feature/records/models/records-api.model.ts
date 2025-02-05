export interface ProgrammingProjectGetResponse {
  category_id: number;
  created_at: string;
  deadline: Date | null;
  description: string | null;
  extra: string | null;
  id: number;
  importance: number | null;
  name: string;
  updated_at: string;
  used_technologies: string | null;
}

export interface ProgrammingProjectPostRequest {
  category_id: number;
  deadline?: Date; // TODO: check if this is correct
  description?: string;
  extra?: string;
  importance?: number;
  name: string;
  used_technologies?: string;
}

export interface ProgrammingProjectPatchRequest {
  category_id?: number;
  deadline?: Date; // TODO: check if this is correct
  description?: string;
  extra?: string;
  importance?: number;
  name?: string;
  used_technologies?: string;
}

export interface KnowledgeApiResponse {
  id: string;
  category_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  importance: number;
  domain: string;
  link: string;
  image: string;
}

export interface KnowledgeListApiResponse {
  records: KnowledgeApiResponse[];
}
