import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Space_Grotesk, Anton } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider, Show, } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-primary",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noctra",
  description: "AI SaaS realtime video sharing platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={cn("antialiased", "font-primary", spaceGrotesk.variable, anton.variable)}
      >
        <body suppressHydrationWarning>
          <Suspense>
            <Show when="signed-out" />
            <Show when="signed-in" />
          </Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}