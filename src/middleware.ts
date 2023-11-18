import { UrlObject } from "url";

export { default } from "next-auth/middleware";

export const config = {
  matcher: (url: UrlObject) => {
    console.log("url: ", url);
    return false;
    // return (
    //   url.pathname &&
    //   !url.pathname.startsWith("/api") &&
    //   !url.pathname.startsWith("/_next/static") &&
    //   !url.pathname.startsWith("/_next/image") &&
    //   url.pathname !== "/favicon.ico"
    // );
  },
};
