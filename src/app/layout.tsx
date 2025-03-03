import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/navbar/navbar";
import { SessionProvider } from "@/context/Session";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Med Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
        attribute="class" defaultTheme="dark" themes={['light', 'dark', 'purple-dark']}>
          <SessionProvider>
            <ToastContainer
              className='mt-14'
              hideProgressBar={true}
              theme={'dark'}
            />
            <Navbar />
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
