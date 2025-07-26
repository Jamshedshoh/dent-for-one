import { AnalyticsEvent } from "../types/analytics";
import { db } from "../../../database/client";

// Log an analytics event
export async function logEvent(
  event: Omit<AnalyticsEvent, "id" | "created_at">
) {
  return db.from("social_analytics").insert(event).select().single();
}

// Get all analytics events for a post
export async function getEventsByPost(post_id: string) {
  return db
    .from("social_analytics")
    .select("*")
    .eq("post_id", post_id)
    .order("created_at", { ascending: true });
}
