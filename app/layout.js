import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "To-Do List",
  description:
    "The app allows users to add, check off, and delete tasks, as well as keep track of pending and completed tasks. It features a clean and modern interface with a smooth user experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
         <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark flex justify-center items-center min-h-screen p-5`}
      >
        {children}
      </body>
    </html>
  );
}
