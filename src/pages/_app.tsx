import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster as SonnerToaster } from "sonner";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <div className={`${inter.className} min-h-screen`}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Toaster />
        <SonnerToaster richColors />
      </SessionProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
