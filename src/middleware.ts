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
  const envURL = process.env.NEXTAUTH_URL;
  const uri = req.url.replace(envURL!, "");
  if (
    uri.match(matcher) === null ||
    req.url.includes("signin") ||
    req.url.includes("api/auth/callback") ||
    req.url.includes("api/uploadthing")
  ) {
    console.log("allow url", req.url);
    return NextResponse.next();
  }
  let session = req.cookies.get("next-auth.session-token")?.value;

  if (!session) {
    session = req.cookies.get("__Secure-next-auth.session-token")?.value;
    console.log("Session", session);
  }

  console.log("protected url", req.url, session);
  if (!session) {
    console.log("redirecting to signin");
    return NextResponse.redirect(
      `${envURL}/api/auth/signin?callbackUrl=${encodeURIComponent(req.url)}`,
    );
  }
  // If user is authenticated, continue.
  return NextResponse.next();
}
