import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lusano",
  description: "Lusano — A modern, elegant experience.",
};

/*
 * Disable browser-level pinch-zoom so only our custom canvas zoom runs.
 * The canvas still zooms via CSS transform — this only stops the viewport scaling.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${dmSans.variable} font-body bg-background text-text-primary antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
