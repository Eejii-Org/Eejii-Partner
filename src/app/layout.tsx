import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { AuthProvider } from "@/providers";
import { ReactQueryClientProvider } from "@/providers/query-client-provider";
import ToastProvider from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eejii Org",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="bg-background min-h-screen flex flex-col">
            <ToastProvider>
              <AuthProvider>{children}</AuthProvider>
            </ToastProvider>
          </main>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
