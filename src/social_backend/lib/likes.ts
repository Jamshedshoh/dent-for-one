import * as api from "../api/likes";

import { Like } from "../types/like";

export async function likePost(like: Omit<Like, "id" | "created_at">) {
  return api.likePost(like);
}

export async function unlikePost(post_id: string, user_id: string) {
  return api.unlikePost(post_id, user_id);
}

export async function fetchLikesByPost(post_id: string) {
  return api.getLikesByPost(post_id);
}
