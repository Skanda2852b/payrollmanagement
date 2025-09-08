import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Payroll Management System",
  description:
    "Manage payroll and expenses efficiently",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className
        }
      >
        <Navbar />
        <main className="min-h-screen bg-gray-50 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
