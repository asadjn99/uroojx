import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
// import Link from "next/link";

const lexend = Lexend({ 
  subsets: ["latin"],
  variable: "--font-lexend", // This binds to the tailwind config
});

export const metadata: Metadata = {
  title: "Lumina Academy - by-asad",
  description: "Master new skills with Uroojx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // We add 'dark' class here to force dark mode as per your HTML example
    <html lang="en" className={`${lexend.variable} dark`}>
      <head>
        {/* Material Symbols Icon Font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-x-hidden flex flex-col min-h-screen font-display">
        {children}
      </body>
    </html>
  );
}