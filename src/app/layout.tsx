import type { Metadata } from "next";
import { QueryProvider } from "@/lib/providers/query-provider";
import "@/styles.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Skout AI — Unified B2B Revenue Intelligence",
    template: "%s | Skout AI",
  },
  description:
    "Find, verify, and reach your next customer with the all-in-one B2B data, enrichment, intent signals and outreach platform. 200M+ verified contacts.",
  keywords: [
    "B2B data",
    "lead intelligence",
    "sales prospecting",
    "email finder",
    "revenue intelligence",
    "outbound sales",
    "AI SDR",
    "waterfall enrichment",
  ],
  authors: [{ name: "Skout AI", url: APP_URL }],
  creator: "Skout AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "Skout AI",
    title: "Skout AI — Unified B2B Revenue Intelligence",
    description:
      "Find, verify, and reach your next customer with the all-in-one B2B data, enrichment and outreach platform.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Skout AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skout AI — Unified B2B Revenue Intelligence",
    description:
      "Find, verify, and reach your next customer with the all-in-one B2B data, enrichment and outreach platform.",
    images: ["/og.png"],
    creator: "@skoutai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
