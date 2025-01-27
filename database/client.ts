import { createClient } from "@supabase/supabase-js";

const baseUrl = import.meta.env.VITE_DB_BASE_URL as string;
const apiKey = import.meta.env.VITE_DB_API_KEY as string;

export const db = createClient(baseUrl, apiKey);
