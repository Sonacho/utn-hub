import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Search } from "~/components/search";
import Link from "next/link";
import { ThemeProvider } from "~/components/theme-provider";
import { ModeToggle } from "~/utils/toogleDarkMode";
import { SignOut } from "~/components/sign_out";
import UserAvatar from "~/components/ui/user_avatar";
import { auth } from "~/lib/auth";
import SignIn from "~/components/sign_in";
import Footer from "~/components/footer";

export const metadata: Metadata = {
  title: "Utn-Hub - Recopilación de material de ISI",
  description:
    "Generado por estudiantes para estudiantes, principalmente material de la Universidad Tecnológica Nacional de Rosario",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://utn-hub.vercel.app/"),
};

async function Nav() {
  const session = await auth();

  return (
    <nav className="mb-5 flex w-full justify-between p-7">
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <h1 className="justify-start text-3xl font-bold">
            <Link href={"/"}>UTN-Hub</Link>
          </h1>
          <div className="flex flex-row gap-4">
            <Search />
            <ModeToggle />
            {session?.user ? (
              <>
                <SignOut />
                <UserAvatar />
              </>
            ) : (
              <>
                <SignIn />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

interface RootLayoutProps {
  children: Readonly<React.ReactNode>;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col">
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
          <div className="container w-full"></div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
