// app/about/jacy/layout.tsx

import type { Metadata } from "next";
import { Open_Sans, Roboto } from "next/font/google";
import "../../globals.css";

const openSans = Open_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const roboto = Roboto({
  weight: ["500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "JACY TRADING & CONSULTING",
  description: "Professional Trading & Consulting Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${roboto.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
