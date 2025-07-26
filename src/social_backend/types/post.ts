export interface Post {
  id: string;
  user_id: string;
  content: string;
  media_url?: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
}
