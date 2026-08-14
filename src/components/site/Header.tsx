"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  ListFilter,
  FileSpreadsheet,
  Sparkles,
  Workflow,
  Inbox as InboxIcon,
  ShieldCheck,
  CheckCircle2,
  Database,
  Kanban,
  CalendarCheck,
  BarChart3,
  Bot,
  Target,
  LineChart,
  Layers,
  BookOpen,
  Radio,
  ArrowRight,
  Zap,
  Chrome,
  Calculator,
  LucideIcon,
  Sun,
  Moon,
} from "lucide-react";
import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";
import { LOGIN_URL, WORKSPACE_URL } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Wait for component to mount to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === "dark" || theme === "dark";
  const activeLogo = isDark ? logoDark : logo;

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    console.log("Switching theme from", theme, "to", newTheme);
    setTheme(newTheme);
  };

  const closeMenus = () => {
    setActiveMenu(null);
    setMobileOpen(false);
  };

  const handleMouseEnter = (menu: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  // Close menus on route change
  useEffect(() => {
    closeMenus();
  }, [pathname]);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeMenus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl transition-all"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center py-0.5 transition-opacity hover:opacity-90 shrink-0"
        >
          <Image
            src={activeLogo}
            alt="Skout AI Logo"
            width={140}
            height={36}
            className="h-7 sm:h-9 w-auto max-w-27.5 sm:max-w-none object-contain"
            priority
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-1">
          {/* PRODUCTS MEGA MENU */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("products")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeMenu === "products"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
              onClick={() => setActiveMenu(activeMenu === "products" ? null : "products")}
            >
              Products
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeMenu === "products" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeMenu === "products" && (
              <div className="absolute left-1/2 top-full w-220 -translate-x-1/2 pt-2">
                <div className="max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-2xl border border-border bg-card p-6 shadow-2xl backdrop-blur-2xl">
                  <div className="grid grid-cols-3 gap-6">
                    {/* DISCOVER COLUMN */}
                    <div>
                      <div className="mb-3 flex items-center gap-2 border-b border-border/80 pb-2 font-display text-base font-semibold tracking-wide text-foreground">
                        <Search className="h-4 w-4 text-accent" /> Discover
                      </div>
                      <div className="space-y-3">
                        <MegaItem
                          title="Prospect Search"
                          desc="Find companies and contacts using the signals and criteria that matter to your ICP."
                          href="/products/prospect-search"
                          icon={Search}
                        />
                        <MegaItem
                          title="Smart Lists"
                          desc="Turn your targeting criteria into dynamic, AI-assisted prospect lists."
                          href="/products/smart-lists"
                          icon={ListFilter}
                        />
                        <MegaItem
                          title="ICP Setup"
                          desc="Define target firmographics and technographics for your workspace."
                          href="/products/icp-setup"
                          icon={Target}
                        />
                        <MegaItem
                          title="Import"
                          desc="Bring your existing prospects into Skout and continue building intelligence."
                          href="/products/import"
                          icon={FileSpreadsheet}
                        />
                        <MegaItem
                          title="Contact Enrichment"
                          desc="Complete missing prospect and company information before you reach out."
                          href="/products/enrichment"
                          icon={Sparkles}
                        />
                        <MegaItem
                          title="Chrome Extension"
                          desc="Capture, enrich, and score prospects directly inside LinkedIn."
                          href="/products/chrome-extension"
                          icon={Chrome}
                        />
                      </div>
                    </div>

                    {/* ENGAGE COLUMN */}
                    <div>
                      <div className="mb-3 flex items-center gap-2 border-b border-border/80 pb-2 font-display text-base font-semibold tracking-wide text-foreground">
                        <Workflow className="h-4 w-4 text-accent" /> Engage
                      </div>
                      <div className="space-y-3">
                        <MegaItem
                          title="Sequences"
                          desc="Build and manage automated outbound sequences from one workspace."
                          href="/products/sequences"
                          icon={Workflow}
                        />
                        <MegaItem
                          title="Inbox"
                          desc="Keep replies and conversations connected to prospects and accounts."
                          href="/products/inbox"
                          icon={InboxIcon}
                        />
                        <MegaItem
                          title="AI Review"
                          desc="Use AI to review outbound messaging before it reaches prospects."
                          href="/products/ai-review"
                          icon={CheckCircle2}
                        />
                        <MegaItem
                          title="Deliverability"
                          desc="Monitor signals affecting outbound email health and sending performance."
                          href="/products/deliverability"
                          icon={ShieldCheck}
                        />
                      </div>
                    </div>

                    {/* CONVERT COLUMN */}
                    <div>
                      <div className="mb-3 flex items-center gap-2 border-b border-border/80 pb-2 font-display text-base font-semibold tracking-wide text-foreground">
                        <Database className="h-4 w-4 text-accent" /> Convert
                      </div>
                      <div className="space-y-3">
                        <MegaItem
                          title="CRM"
                          desc="Manage companies, contacts, deals, tasks, and meetings in Skout."
                          href="/products/crm"
                          icon={Database}
                        />
                        <MegaItem
                          title="Pipeline"
                          desc="Move opportunities through a visual deal pipeline with account context."
                          href="/products/pipeline"
                          icon={Kanban}
                        />
                        <MegaItem
                          title="Tasks & Meetings"
                          desc="Keep required actions to move deals forward in the same workspace."
                          href="/products/tasks-meetings"
                          icon={CalendarCheck}
                        />
                        <MegaItem
                          title="Analytics"
                          desc="Understand activity and pipeline movement across your GTM workflow."
                          href="/products/analytics"
                          icon={BarChart3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM FEATURE CARD: DEXTER AI */}
                  <Link
                    href="/products/dexter-ai"
                    onClick={() => setActiveMenu(null)}
                    className="mt-6 block rounded-xl border border-border/80 bg-muted/40 p-4 transition-colors hover:bg-muted/80 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-background">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                            Dexter AI{" "}
                            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">
                              GTM Intelligence Layer
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            Your AI-powered sales copilot. Ask Dexter to research target prospects,
                            summarize account threads, and write high-converting copy.
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-accent group-hover:underline flex items-center gap-1">
                        Explore Dexter AI →
                      </span>
                    </div>
                  </Link>

                  {/* INTEGRATIONS FOOTER STRIP */}
                  <Link
                    href="/integrations"
                    onClick={() => setActiveMenu(null)}
                    className="mt-3 flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5 text-accent" />
                      <span>
                        <strong>Integrations:</strong> Connect HubSpot, Google Calendar, and BYOK AI
                        models
                      </span>
                    </div>
                    <span className="font-semibold text-foreground group-hover:underline flex items-center gap-1">
                      View Integrations →
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* SOLUTIONS MEGA MENU */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("solutions")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeMenu === "solutions"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
              onClick={() => setActiveMenu(activeMenu === "solutions" ? null : "solutions")}
            >
              Solutions
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeMenu === "solutions" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeMenu === "solutions" && (
              <div className="absolute left-1/2 top-full w-150 -translate-x-1/2 pt-2">
                <div className="max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-2xl border border-border bg-card p-6 shadow-2xl backdrop-blur-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <MegaItem
                      title="Outbound Prospecting"
                      desc="Build targeted prospect lists without starting from spreadsheets."
                      href="/solutions/outbound-prospecting"
                      icon={Target}
                    />
                    <MegaItem
                      title="Account-Based Sales"
                      desc="Define your ICP and focus your team on accounts that fit."
                      href="/solutions/account-based-sales"
                      icon={Layers}
                    />
                    <MegaItem
                      title="Pipeline Management"
                      desc="Connect prospecting activity to contacts, deals, and meetings."
                      href="/solutions/pipeline-management"
                      icon={LineChart}
                    />
                    <MegaItem
                      title="Sales Intelligence"
                      desc="Turn company and contact information into usable context."
                      href="/solutions/sales-intelligence"
                      icon={Bot}
                    />
                    <MegaItem
                      title="Smarter Outbound"
                      desc="Combine enrichment, sequencing, AI review, and deliverability."
                      href="/solutions/smarter-outbound"
                      icon={Workflow}
                    />
                    <MegaItem
                      title="AI-Assisted Selling"
                      desc="Use Dexter to turn prospect data into useful sales actions."
                      href="/solutions/ai-assisted-selling"
                      icon={Sparkles}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* INTELLIGENCE LINK */}
          <Link
            href="/intelligence"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Intelligence</span>
          </Link>

          {/* PRICING LINK */}
          <Link
            href="/pricing"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            Pricing
          </Link>

          {/* INTEGRATIONS LINK */}
          <Link
            href="/integrations"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            Integrations
          </Link>

          {/* RESOURCES MENU */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("resources")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeMenu === "resources"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
              onClick={() => setActiveMenu(activeMenu === "resources" ? null : "resources")}
            >
              Resources
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeMenu === "resources" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeMenu === "resources" && (
              <div className="absolute left-0 top-full w-105 pt-2">
                <div className="max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-2xl border border-border bg-card p-5 shadow-2xl backdrop-blur-2xl">
                  <div className="space-y-4">
                    <Link
                      href="/resources/gtm-outbound-calculator"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                    >
                      <Calculator className="mt-0.5 h-5 w-5 text-accent shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-foreground group-hover:underline">
                          GTM Outbound Calculator
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          Estimate contact sourcing, email finding, verification, and inbox tooling
                          costs. Benchmark Apollo + Smartlead vs Skout AI.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/resources/setup-guides"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                    >
                      <BookOpen className="mt-0.5 h-5 w-5 text-foreground shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-foreground group-hover:underline">
                          Setup Guides
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          Step-by-step guides for getting your Skout workspace, ICP, prospecting,
                          enrichment, CRM, and outreach workflows running.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* RIGHT CTAS */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <a
            href={LOGIN_URL}
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Log in
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
          >
            Book a demo <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE WITH THEME TOGGLE */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-foreground hover:bg-muted"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <button
            className="rounded-lg p-2 text-foreground hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER (MATCHING DESKTOP NAVBAR 100%) */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden border-t border-border bg-background p-6 md:hidden">
          <div className="flex flex-col gap-6">
            {/* PRODUCTS */}
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Products
              </div>
              <div className="grid grid-cols-1 gap-1.5 pl-2 text-sm">
                <div className="pt-1 text-[11px] font-bold text-accent uppercase">Discover</div>
                <Link
                  href="/products/prospect-search"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Prospect Search
                </Link>
                <Link
                  href="/products/smart-lists"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Smart Lists
                </Link>
                <Link
                  href="/products/import"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Import & Mapping
                </Link>

                <div className="pt-2 text-[11px] font-bold text-accent uppercase">
                  Enrich & Intelligence
                </div>
                <Link
                  href="/products/enrichment"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Waterfall Enrichment
                </Link>
                <Link
                  href="/products/chrome-extension"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Chrome Extension
                </Link>
                <Link
                  href="/products/dexter-ai"
                  onClick={() => setMobileOpen(false)}
                  className="font-bold text-accent py-0.5"
                >
                  Dexter AI Copilot
                </Link>

                <div className="pt-2 text-[11px] font-bold text-accent uppercase">
                  Engage & Deliver
                </div>
                <Link
                  href="/products/sequences"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Multichannel Sequences
                </Link>
                <Link
                  href="/products/inbox"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Unified Inbox
                </Link>
                <Link
                  href="/products/ai-review"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  AI Outbound Review
                </Link>
                <Link
                  href="/products/deliverability"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Deliverability & Warmup
                </Link>

                <div className="pt-2 text-[11px] font-bold text-accent uppercase">
                  CRM & Pipeline
                </div>
                <Link
                  href="/products/crm"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Native GTM CRM
                </Link>
                <Link
                  href="/products/pipeline"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Visual Deal Pipeline
                </Link>
                <Link
                  href="/products/tasks-meetings"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Tasks & Meetings
                </Link>
                <Link
                  href="/products/analytics"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Sales Analytics
                </Link>
              </div>
            </div>

            {/* SOLUTIONS */}
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Solutions
              </div>
              <div className="grid grid-cols-1 gap-1.5 pl-2 text-sm">
                <Link
                  href="/solutions/outbound-prospecting"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Outbound Prospecting
                </Link>
                <Link
                  href="/solutions/account-based-sales"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Account-Based Sales
                </Link>
                <Link
                  href="/solutions/pipeline-management"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Pipeline Management
                </Link>
                <Link
                  href="/solutions/sales-intelligence"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Sales Intelligence
                </Link>
                <Link
                  href="/solutions/smarter-outbound"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  Smarter Outbound
                </Link>
                <Link
                  href="/solutions/ai-assisted-selling"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground py-0.5"
                >
                  AI-Assisted Selling
                </Link>
              </div>
            </div>

            {/* MAIN NAVIGATION & RESOURCES */}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Link
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold text-foreground py-1"
              >
                Pricing
              </Link>
              <Link
                href="/integrations"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold text-foreground py-1"
              >
                Integrations
              </Link>

              <div className="pt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Resources
              </div>
              <Link
                href="/resources/gtm-outbound-calculator"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-accent py-0.5"
              >
                GTM Outbound Calculator
              </Link>
              <Link
                href="/resources/setup-guides"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground py-0.5"
              >
                Setup Guides
              </Link>

              <div className="pt-3 flex flex-col gap-2">
                <a
                  href={WORKSPACE_URL}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-muted-foreground text-center py-1.5"
                >
                  Log in to workspace
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-foreground px-5 py-2.5 text-center text-sm font-medium text-background"
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

interface MegaItemProps {
  title: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  onClick?: () => void;
}

function MegaItem({ title, desc, href, icon: Icon, onClick }: MegaItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted/80"
    >
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-foreground group-hover:bg-accent group-hover:text-background transition-colors">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground group-hover:underline">{title}</div>
        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">{desc}</p>
      </div>
    </Link>
  );
}
