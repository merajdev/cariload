import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WrapLayout from "./WrapLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cariload",
  description: "Cariload is an online marketplace for loads and trucks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WrapLayout>{children}</WrapLayout>
      </body>
    </html>
  );
}
