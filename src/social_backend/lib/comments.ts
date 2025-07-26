import * as api from "../api/comments";

import { Comment } from "../types/comment";

export async function fetchCommentsByPost(post_id: string) {
  return api.getCommentsByPost(post_id);
}

export async function addComment(comment: Omit<Comment, "id" | "created_at">) {
  return api.createComment(comment);
}

export async function removeComment(id: string) {
  return api.deleteComment(id);
}
