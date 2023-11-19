// export { default } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const matcher = "/((?!api|_next/static|_next/image|favicon.ico).*?$)";
  console.log("Matcher", matcher);
  console.log("NEXTAUTH URL: ", process.env.NEXTAUTH_URL);
  const uri = req.url.replace(process.env.NEXTAUTH_URL!, "");
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
      `${
        process.env.NEXTAUTH_URL
      }/api/auth/signin?callbackUrl=${encodeURIComponent(req.url)}`,
    );

  // If user is authenticated, continue.
  return NextResponse.next();
}
