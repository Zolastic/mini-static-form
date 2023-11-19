// export { default } from "next-auth/middleware"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const matcher = "/((?!api|_next/static|_next/image|favicon.ico).*?$)";
  console.log("Matcher", matcher);
  console.log(
    "NEXTAUTH URL: ",
    process.env.NEXTAUTH_URL,
    process.env.VERCEL_URL,
  );
  const envURL = process.env.VERCEL_URL ?? process.env.NEXTAUTH_URL;
  const uri = req.url.replace(envURL!, "");
  if (
    uri.match(matcher) === null ||
    req.url.includes("signin") ||
    req.url.includes("api/auth/callback")
  ) {
    return NextResponse.next();
  }
  const session = req.cookies.get("next-auth.session-token")?.value;

  if (!session)
    return NextResponse.redirect(
      `${envURL}/api/auth/signin?callbackUrl=${encodeURIComponent(req.url)}`,
    );

  // If user is authenticated, continue.
  return NextResponse.next();
}
