import type { Metadata } from "next";
import { Open_Sans, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import {Footer} from "@/components/footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-open-sans",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JACY Trading & Consulting",
  description: "Human Centric Trading and Consulting Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable} ${roboto.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-800">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
