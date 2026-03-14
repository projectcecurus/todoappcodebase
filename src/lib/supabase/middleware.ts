import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { getSupabaseEnv } from "@/lib/supa-env";

const publicPaths = ["/auth"];
const envErrorPath = "/auth";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request
  });

  const env = getSupabaseEnv();
  const pathname = request.nextUrl.pathname;
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (!env) {
    if (!isPublicPath) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = envErrorPath;
      redirectUrl.search = "";
      redirectUrl.searchParams.set("error", "missing_env");
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  }

  const { url, anonKey } = env;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options: CookieOptions }>) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request
        });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user && !isPublicPath) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/auth";
    redirectUrl.search = "";
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && pathname.startsWith("/auth")) {
    const redirectUrl = request.nextUrl.clone();
    const next = request.nextUrl.searchParams.get("next");
    redirectUrl.pathname = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
