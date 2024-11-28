import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Search } from "~/components/search";
import ThemeToggle from "~/utils/toogleDarkMode";


export const metadata: Metadata = {
  title: "Utn-Hub - Recopilación del material de la Universidad Tecnológica Nacional",
  description: "Generado por estudiantes para estudiantes, principalmente material de la Universidad Tecnológica Nacional de Rosario",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  twitter:{
    card: "summary_large_image"
  },
  metadataBase: new URL('https://utn-hub.vercel.app/')
};

function Nav (){
  return(
    <nav className="w-full flex justify-between p-7 mb-5">
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          {/* <Image src={logo} width={50} height={50} alt="img" className="max-h-[50px]"/> */}
          <h1 className="text-3xl font-bold justify-start">UTN-Hub</h1>
          <div className="flex flex-row gap-4">
          <Search/>
          <ThemeToggle/>
          </div>
        </div>
      </div>
    </nav>
  )
}



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="h-screen">
        <Nav/>
        {children}
      </body>
    </html>
  );
}
