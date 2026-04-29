import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";
import { Navbar } from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "TravelAxis BD",
  description: "Discover the beauty of Bangladesh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar></Navbar>
          {children}
        </Providers>
      </body>
    </html>
  );
}
