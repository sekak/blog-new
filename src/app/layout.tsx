import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar/navbar";
import { Theme } from "@radix-ui/themes";
import Footer from "@/components/footer";
import { SessionProvider } from "@/context/Session";
import { ToastContainer } from "react-toastify";

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
        <ThemeContextProvider>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Theme>
                <div className="bg-background">
                  <Navbar />
                  <ToastContainer
                    className='mt-14'
                    hideProgressBar={true}
                    theme={'dark'}
                  />                  
                  {children}
                  <Footer />
                </div>
              </Theme>
            </ThemeProvider>
          </SessionProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
