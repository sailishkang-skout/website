"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";
import { WORKSPACE_URL } from "@/lib/constants";
import "./footer.css";

// ALL ITEMS FROM HEADER DROPDOWNS
const productDropdownItems = [
  { to: "/products/prospect-search", label: "Prospect Search" },
  { to: "/products/smart-lists", label: "Smart Lists" },
  { to: "/products/import", label: "Import & Mapping" },
  { to: "/products/enrichment", label: "Waterfall Enrichment" },
  { to: "/products/chrome-extension", label: "Chrome Extension" },
  { to: "/products/sequences", label: "Multichannel Sequences" },
  { to: "/products/inbox", label: "Unified Inbox" },
  { to: "/products/ai-review", label: "AI Outbound Review" },
  { to: "/products/deliverability", label: "Deliverability & Warmup" },
  { to: "/products/crm", label: "Native GTM CRM" },
  { to: "/products/pipeline", label: "Visual Deal Pipeline" },
  { to: "/products/tasks-meetings", label: "Tasks & Meetings" },
  { to: "/products/analytics", label: "Sales Analytics" },
  { to: "/products/dexter-ai", label: "Dexter AI Copilot" },
];

const solutionDropdownItems = [
  { to: "/solutions/outbound-prospecting", label: "Outbound Prospecting" },
  { to: "/solutions/account-based-sales", label: "Account-Based Sales" },
  { to: "/solutions/pipeline-management", label: "Pipeline Management" },
  { to: "/solutions/sales-intelligence", label: "Sales Intelligence" },
  { to: "/solutions/smarter-outbound", label: "Smarter Outbound" },
  { to: "/solutions/ai-assisted-selling", label: "AI-Assisted Selling" },
];

const resourceDropdownItems = [
  { to: "/integrations", label: "Integrations Hub" },
  { to: "/resources/gtm-outbound-calculator", label: "GTM Outbound Calculator" },
  { to: "/resources/setup-guides", label: "Setup Guides" },
  { to: "/trust/trust-security-privacy", label: "Trust, Security & Privacy" },
  { to: "/trust/subprocessors", label: "Subprocessors" },
  { to: "/trust/security-vulnerability-reporting", label: "Security / Vulnerability Reporting" },
];

const legalDropdownItems = [
  { to: "/legal/privacy-policy", label: "Privacy Policy" },
  { to: "/legal/terms-of-service", label: "Terms of Service" },
  { to: "/legal/acceptable-use-policy", label: "Acceptable Use Policy" },
  { to: "/legal/ai-terms", label: "AI Terms" },
  { to: "/legal/data-processing-agreement", label: "Data Processing Agreement" },
  { to: "/legal/cookie-policy", label: "Cookie Policy" },
];

const platformNavItems = [
  { to: "/intelligence", label: "Platform Intelligence" },
  { to: "/pricing", label: "Pricing" },
  { to: "/coming-soon", label: "Log In to Workspace" },
  { to: "/contact", label: "Book a Demo" },
];

export function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === "dark" || theme === "dark";
  const activeLogo = isDark ? logoDark : logo;

  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12">
          {/* BRAND COLUMN */}
          <div className="md:col-span-3 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={activeLogo}
                alt="Skout AI"
                width={140}
                height={36}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              Find the right prospects. Know why they matter. Reach them with context. One connected
              workspace for prospecting, enrichment, outreach, CRM, and GTM intelligence.
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Engine Connected</span>
              </div>
              <span>•</span>
              <a
                href="https://www.linkedin.com/company/shoutai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent font-medium hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* PRODUCTS DROPDOWN LINKS */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Products</h4>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              {productDropdownItems.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.to}
                    className={`transition-colors ${l.label.includes("Dexter") ? "font-semibold text-accent" : "hover:text-foreground"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOLUTIONS DROPDOWN LINKS */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Solutions
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              {solutionDropdownItems.map((l) => (
                <li key={l.label}>
                  <Link href={l.to} className="transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES DROPDOWN */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Resources
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              {resourceDropdownItems.map((l) => (
                <li key={l.label}>
                  <Link href={l.to} className="transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL DROPDOWN LINKS */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Legal</h4>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              {legalDropdownItems.map((l) => (
                <li key={l.label}>
                  <Link href={l.to} className="transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PLATFORM LINKS */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Platform</h4>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/pricing"
                  className="transition-colors hover:text-foreground font-medium"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <a
                  href={WORKSPACE_URL}
                  className="transition-colors hover:text-foreground font-medium"
                >
                  Log In
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-foreground font-medium"
                >
                  Book a Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-border pt-6 gap-4 sm:flex-row text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Skout AI Inc. All rights reserved.</p>
          <p>Discover → Understand → Engage → Convert</p>
        </div>
      </div>
    </footer>
  );
}
