import { Schedule } from "../types/schedule";
import { db } from "../../../database/client";

// Get all scheduled posts for a user
export async function getSchedulesByUser(user_id: string) {
  return db
    .from("social_schedules")
    .select("*")
    .eq("user_id", user_id)
    .order("scheduled_for", { ascending: true });
}

// Schedule a post
export async function schedulePost(
  schedule: Omit<Schedule, "id" | "created_at">
) {
  return db.from("social_schedules").insert(schedule).select().single();
}

// Delete a schedule
export async function deleteSchedule(id: string) {
  return db.from("social_schedules").delete().eq("id", id);
}
