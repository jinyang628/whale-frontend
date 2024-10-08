import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/shared/theme/theme-provider";
import HotjarProvider from "@/hooks/hotjar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whale",
  description:
    "Gobbling up the old web infrastructure one application at a time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any"/>
          <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
          <link 
            rel="apple-touch-icon" 
            href="/apple-icon?<generated>" 
            type="image/<generated>"
            sizes="<generated>"
          />
        </head>
        <body className={inter.className}>
          <HotjarProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </HotjarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
