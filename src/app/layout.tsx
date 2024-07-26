import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Script from "next/script";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whale",
  description: "Gobbling up the old web infrastructure one application at a time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <Script async src="https://cloud.umami.is/script.js" data-website-id="293934de-1d90-48b8-8d99-d72a76aa488a" />
        </Head>
        <body className={inter.className}>
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
