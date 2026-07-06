import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MewMate — Cat Safety Tags",
  description: "Helping every pet find their way home with QR safety tags",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
