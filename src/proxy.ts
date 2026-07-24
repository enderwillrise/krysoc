import { NextResponse, type NextRequest } from "next/server";

// Locale detection on the root path only: German browsers land on /de,
// everyone else on /en. All internal links carry an explicit locale.
export function proxy(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const prefersGerman = /^de\b|,\s*de\b/i.test(acceptLanguage);
  const locale = prefersGerman ? "de" : "en";
  request.nextUrl.pathname = `/${locale}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/"],
};
