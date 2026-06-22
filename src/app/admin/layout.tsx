import FooterDefault from "./_components/footers/FooterDefault";
import HeaderDefault from "./_components/headers/HeaderDefault";
/* ToastContainer */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <div
        className={`antialiased w-full flex flex-col min-h-screen`}>
        <HeaderDefault />
        <main className='flex-1'>
          {children}
        </main>
        <FooterDefault />
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
    </div>
  );
}