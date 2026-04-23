import type { Metadata } from "next";

import { Outfit, Literata } from "next/font/google";

import { ThemeProvider } from "@/providers/ThemeProvider";

import "./globals.css";

const fontSans = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

const fontSerif = Literata({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aether Reader",
  description: "Aether Reader",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html
      lang="en" suppressHydrationWarning
      className={`${fontSans.variable} ${fontSerif.variable} font-sans h-full antialiased`}
    >

      <body className="min-h-full pb-8">

        <ThemeProvider>

          {children}

        </ThemeProvider>

      </body>

    </html>

  );
}
