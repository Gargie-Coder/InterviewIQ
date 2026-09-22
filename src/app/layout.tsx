import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "../context/AppContext";

export const metadata: Metadata = {
  title: "InterviewIQ — Prepare smarter. Interview better.",
  description:
    "An intelligent career preparation platform that analyzes your resume, matches your skills to real job requirements, and helps you prepare for interviews.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-brand-100 selection:text-brand-900">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
