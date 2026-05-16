import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { LanguageProvider } from "@/context/LanguageContext";

const ttChocolates = localFont({
  src: [
    { path: "../public/fonts/TT Runs Trial Thin.ttf",                weight: "100", style: "normal" },
    { path: "../public/fonts/TT Runs Trial Thin Italic.ttf",         weight: "100", style: "italic" },
    { path: "../public/fonts/TT Runs Trial ExtraLight.ttf",          weight: "200", style: "normal" },
    { path: "../public/fonts/TT Runs Trial ExtraLight Italic.ttf",   weight: "200", style: "italic" },
    { path: "../public/fonts/TT Runs Trial Light.ttf",               weight: "300", style: "normal" },
    { path: "../public/fonts/TT Runs Trial Light Italic.ttf",        weight: "300", style: "italic" },
    { path: "../public/fonts/TT Runs Trial Regular.ttf",             weight: "400", style: "normal" },
    { path: "../public/fonts/TT Runs Trial Italic.ttf",              weight: "400", style: "italic" },
    { path: "../public/fonts/TT Runs Trial Medium.ttf",              weight: "500", style: "normal" },
    { path: "../public/fonts/TT Runs Trial Medium Italic.ttf",       weight: "500", style: "italic" },
    { path: "../public/fonts/TT Runs Trial DemiBold.ttf",            weight: "600", style: "normal" },
    { path: "../public/fonts/TT Runs Trial DemiBold Italic.ttf",     weight: "600", style: "italic" },
    { path: "../public/fonts/TT Runs Trial Bold.ttf",                weight: "700", style: "normal" },
    { path: "../public/fonts/TT Runs Trial Bold Italic.ttf",         weight: "700", style: "italic" },
    { path: "../public/fonts/TT Runs Trial ExtraBold.ttf",           weight: "800", style: "normal" },
    { path: "../public/fonts/TT Runs Trial ExtraBold Italic.ttf",    weight: "800", style: "italic" },
    { path: "../public/fonts/TT Runs Trial Black.ttf",               weight: "900", style: "normal" },
    { path: "../public/fonts/TT Runs Trial Black Italic.ttf",        weight: "900", style: "italic" },
  ],
  variable: "--font-tt-chocolates",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mikhaylov Carpenter",
  description: "Mikhaylov Carpenter — Heirloom-quality furniture.",
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
        className={`${ttChocolates.variable} font-body bg-background text-text-primary antialiased`}
      >
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
