import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Search } from "~/components/search";
import ThemeToggle from "~/utils/toogleDarkMode";

/* import Image from "next/image";
 */
export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

/* const logo = "https://upload.wikimedia.org/wikipedia/commons/6/67/UTN_logo.jpg"
 */
function Nav (){
  return(
    <nav className="w-full flex justify-between p-7 mb-5">
      <div className="container">
        <div className="flex justify-between items-center gap-4">
          {/* <Image src={logo} width={50} height={50} alt="img" className="max-h-[50px]"/> */}
          <Search/>
          <ThemeToggle/>
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
