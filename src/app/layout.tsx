import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "@/components/ClientWrapper";
import { Header } from "@/components/navigation/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Right Account",
  description:
    "Connect with verified service providers for accounting, taxation, compliance and more.",
  openGraph: {
    title: "Right Account - Find the Right Service Provider",
    description:
      "Connect with verified service providers for your business needs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${plusJakartaSans.variable} min-h-full flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <main className="flex-1">
            <ClientWrapper>{children}</ClientWrapper>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
