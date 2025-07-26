import * as api from "../api/analytics";

import { AnalyticsEvent } from "../types/analytics";

export async function logEvent(
  event: Omit<AnalyticsEvent, "id" | "created_at">
) {
  return api.logEvent(event);
}

export async function fetchEventsByPost(post_id: string) {
  return api.getEventsByPost(post_id);
}
