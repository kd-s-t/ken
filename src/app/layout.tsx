import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { Sonner, TooltipProvider, Toaster } from "@/modules/ui";
import { VisitorTracker } from "@/components/VisitorTracker";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Kenn - Software Engineer",
  description: "Portfolio of Kenn - Software Eng with 10+ years of experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="theme1">
      <body className={outfit.className}>
        <TooltipProvider>
          <VisitorTracker />
          {children}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  );
}

