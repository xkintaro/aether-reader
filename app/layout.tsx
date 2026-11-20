import type { Metadata } from "next";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Aether Reader",
    template: "%s · Aether Reader",
  },
  description: "A modern, fast and elegant manga & novel reader.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="flex min-h-svh flex-col antialiased">
        <ThemeProvider>
          <TooltipProvider delay={300}>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
