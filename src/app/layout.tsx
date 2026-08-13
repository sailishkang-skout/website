import type { Metadata } from "next";
import { QueryProvider } from "@/lib/providers/query-provider";
import { ThemeProvider } from "next-themes";
import "@/styles.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL("https://skoutai.io"),
  title: {
    default: "Skout AI | AI-Powered GTM Platform for Smarter Outbound",
    template: "%s | Skout AI",
  },
  description:
    "Find the right prospects, enrich accounts, personalize outreach, and manage your pipeline with Skout AI's intelligent GTM platform.",
  keywords: [
    "Skout AI",
    "GTM platform",
    "prospect discovery",
    "contact enrichment",
    "sales intelligence",
    "outreach sequences",
    "deliverability",
    "Dexter AI",
    "B2B CRM",
    "ICP targeting",
  ],
  authors: [{ name: "Skout AI", url: "https://skoutai.io/" }],
  creator: "Skout AI",
  alternates: {
    canonical: "https://skoutai.io/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skoutai.io/",
    siteName: "Skout AI",
    title: "Skout AI — Find Better Prospects. Sell Smarter.",
    description:
      "One intelligent workspace for prospecting, enrichment, outreach, CRM, and GTM intelligence. Meet Dexter, your AI-powered sales intelligence layer.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Skout AI — Find → Understand → Engage → Convert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skout AI — Find Better Prospects. Sell Smarter.",
    description:
      "One intelligent workspace for prospecting, enrichment, outreach, CRM, and GTM intelligence. Meet Dexter, your AI-powered sales intelligence layer.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/skout-light-32.png", sizes: "32x32", type: "image/png" },
      { url: "/skout-light-16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
