import type { Metadata } from "next";
import "./globals.css";
import { ComfortaaRegular } from "@/_assets/fonts/comfortaa/ComfortaaFont";
import Footer from "@/_components/footers/Footer";
import Header from "@/_components/headers/Header";



export const metadata: Metadata = {
  title: "Own One",
  description: "Own One",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`antialiased`}>
      <body className={`${ComfortaaRegular.className} 
        min-h-full flex flex-col text-gray-800`}>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
