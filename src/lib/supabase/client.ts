import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseEnv } from "@/lib/supa-env";

export function createClient() {
  const env = getSupabaseEnv();

  if (!env) {
    return null;
  }

  const { url, anonKey } = env;
  return createBrowserClient(url, anonKey);
}
