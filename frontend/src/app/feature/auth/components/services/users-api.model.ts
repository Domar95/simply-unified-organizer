export interface UserPostRequest {
  username: string;
  email: string;
  password: string;
}

export interface UserApiResponse {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  email: string;
  password: string;
}
