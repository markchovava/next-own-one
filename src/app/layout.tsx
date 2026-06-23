import type { Metadata } from "next";
import "./globals.css";
import { ComfortaaRegular } from "@/_assets/fonts/comfortaa/ComfortaaFont";
import Footer from "@/_components/footers/Footer";
import Header from "@/_components/headers/Header";
/* ToastContainer */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
