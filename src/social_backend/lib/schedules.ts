import * as api from "../api/schedules";

import { Schedule } from "../types/schedule";

export async function fetchSchedulesByUser(user_id: string) {
  return api.getSchedulesByUser(user_id);
}

export async function addSchedule(
  schedule: Omit<Schedule, "id" | "created_at">
) {
  return api.schedulePost(schedule);
}

export async function removeSchedule(id: string) {
  return api.deleteSchedule(id);
}
