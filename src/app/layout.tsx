
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


export const metadata: Metadata = {
  title: "Utn-Hub - Recopilación del material de la Universidad Tecnológica Nacional",
  description: "Generado por estudiantes para estudiantes, principalmente material de la Universidad Tecnológica Nacional de Rosario",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  twitter:{
    card: "summary_large_image"
  },
  metadataBase: new URL('https://utn-hub.vercel.app/')
};



async function Nav(){
  
  const session = await auth()

  return(
    <nav className="w-full flex justify-between p-7 mb-5">
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold justify-start"><Link href={"/"}>UTN-Hub</Link></h1>
          <div className="flex flex-row gap-4">
          <Search/>
          <ModeToggle/>
          {session 
          ?(
            <>
            <SignOut/>
            <UserAvatar/>
            </>
          )
          :(
          <>
            <SignIn/>
          </>
          )}
          </div>
        </div>
      </div>
    </nav>
  )
}

interface RootLayoutProps {
  children: Readonly<React.ReactNode>;
}

export default function RootLayout({children}: RootLayoutProps) {
  
  return (
    <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
      <body className="h-[100vh] flex flex-col"> 
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Nav/>  
            {children}
            <div className="h-10 container w-full"></div>
          </ThemeProvider>
      </body>
    </html>
  );
}
