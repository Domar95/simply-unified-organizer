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
  deadline?: Date;
  description?: string;
  extra?: string;
  importance?: number;
  name: string;
  used_technologies?: string;
}
