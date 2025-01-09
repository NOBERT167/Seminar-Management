import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./Components/ThemeProvider";
import Sidebar from "./Components/Sidebar";
import { AuthProvider } from "./context/authcontext";
import { AuthGuard } from "./Components/AuthGuard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <AuthGuard>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <Sidebar />
              <main className="px-5 z-10 sm:pl-[300px] bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">
                {children}
              </main>
            </ThemeProvider>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
