import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { LanguageProvider } from "@/context/LanguageContext";

const ttChocolates = localFont({
  src: [
    { path: "../public/fonts/TT Chocolates Trial ExtraLight.otf",        weight: "200", style: "normal"  },
    { path: "../public/fonts/TT Chocolates Trial ExtraLight Italic.otf", weight: "200", style: "italic"  },
    { path: "../public/fonts/TT Chocolates Trial Light.otf",             weight: "300", style: "normal"  },
    { path: "../public/fonts/TT Chocolates Trial Light Italic.otf",      weight: "300", style: "italic"  },
    { path: "../public/fonts/TT Chocolates Trial Regular.otf",           weight: "400", style: "normal"  },
    { path: "../public/fonts/TT Chocolates Trial Italic.otf",            weight: "400", style: "italic"  },
    { path: "../public/fonts/TT Chocolates Trial Medium.otf",            weight: "500", style: "normal"  },
    { path: "../public/fonts/TT Chocolates Trial Medium Italic.otf",     weight: "500", style: "italic"  },
    { path: "../public/fonts/TT Chocolates Trial DemiBold.otf",          weight: "600", style: "normal"  },
    { path: "../public/fonts/TT Chocolates Trial DemiBold Italic.otf",   weight: "600", style: "italic"  },
    { path: "../public/fonts/TT Chocolates Trial Bold.otf",              weight: "700", style: "normal"  },
    { path: "../public/fonts/TT Chocolates Trial Bold italic.otf",       weight: "700", style: "italic"  },
    { path: "../public/fonts/TT Chocolates Trial ExtraBold.otf",         weight: "800", style: "normal"  },
    { path: "../public/fonts/TT Chocolates Trial ExtraBold Italic.otf",  weight: "800", style: "italic"  },
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
