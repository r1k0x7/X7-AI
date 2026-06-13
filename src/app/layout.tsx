import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { AuthProvider } from "@/components/shared/auth-provider";
import { QueryProvider } from "@/components/shared/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "X7 AI Platform | The Future of Artificial Intelligence",
    template: "%s | X7 AI Platform",
  },
  description:
    "X7 AI Platform - One Platform. Unlimited AI Power. Chatbot, Image Generator, Coding Assistant, Document Analyzer, Voice Assistant, and AI Automation.",
  keywords: [
    "AI",
    "Artificial Intelligence",
    "Chatbot",
    "Image Generator",
    "Coding Assistant",
    "Document Analyzer",
    "Voice Assistant",
    "AI Automation",
    "Machine Learning",
    "GPT",
    "Claude",
    "Gemini",
  ],
  authors: [{ name: "X7 AI Team" }],
  creator: "X7 AI Platform",
  publisher: "X7 AI Platform",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://x7ai.com",
    siteName: "X7 AI Platform",
    title: "X7 AI Platform | The Future of Artificial Intelligence",
    description:
      "One Platform. Unlimited AI Power. Experience the next generation of AI tools.",
    images: [
      {
        url: "https://x7ai.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "X7 AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "X7 AI Platform | The Future of Artificial Intelligence",
    description: "One Platform. Unlimited AI Power.",
    images: ["https://x7ai.com/twitter-image.jpg"],
    creator: "@x7ai",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <QueryProvider>
              {children}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "rgba(17, 17, 24, 0.95)",
                    border: "1px solid rgba(0, 240, 255, 0.2)",
                    color: "#fff",
                    backdropFilter: "blur(12px)",
                  },
                }}
              />
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
