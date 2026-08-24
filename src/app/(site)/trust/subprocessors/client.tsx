"use client";

import { useState, useEffect } from "react";

// Type definition for subprocessor data
interface Subprocessor {
  name: string;
  description: string;
  location: string;
  website: string;
  privacyUrl: string;
}
import {
  ShieldCheck,
  Server,
  Cloud,
  Database,
  MessageSquare,
  Brain,
  CreditCard,
  Lock,
  Search,
  ChevronRight,
  Menu,
  ExternalLink,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { Section, GradientText } from "@/components/site/Section";
import { scrollElementIntoContainer } from "@/lib/scroll-into-container";

const sections = [
  { id: "overview", title: "Overview" },
  { id: "cloud-infrastructure", title: "Cloud Infrastructure" },
  { id: "data-storage", title: "Data Storage & Databases" },
  { id: "authentication", title: "Authentication & Security" },
  { id: "communications", title: "Communications" },
  { id: "ai-processing", title: "AI & ML Processing" },
  { id: "data-enrichment", title: "Data Enrichment" },
  { id: "payments", title: "Payment Processing" },
  { id: "analytics", title: "Analytics & Monitoring" },
  { id: "support", title: "Customer Support" },
  { id: "compliance", title: "Subprocessor Compliance" },
];

// Comprehensive list of subprocessors categorized by their function
const subprocessors = {
  "cloud-infrastructure": [
    {
      name: "Amazon Web Services (AWS)",
      description:
        "Primary cloud infrastructure provider hosting our core platform, including compute, networking, and edge services.",
      location: "United States, Global",
      website: "https://aws.amazon.com",
      privacyUrl: "https://aws.amazon.com/privacy/",
    },
    {
      name: "Google Cloud Platform (GCP)",
      description:
        "Secondary cloud infrastructure for specialized AI workloads and regional redundancy.",
      location: "United States, Global",
      website: "https://cloud.google.com",
      privacyUrl: "https://cloud.google.com/trust/privacy",
    },
  ],
  "data-storage": [
    {
      name: "PostgreSQL (Supabase)",
      description:
        "Managed relational database service for primary application data storage and transactions.",
      location: "United States",
      website: "https://supabase.com",
      privacyUrl: "https://supabase.com/privacy",
    },
    {
      name: "Redis Labs",
      description:
        "In-memory caching and data structure store for high-performance application operations.",
      location: "United States, Global",
      website: "https://redis.com",
      privacyUrl: "https://redis.com/legal/privacy/",
    },
    {
      name: "Cloudflare R2",
      description:
        "Object storage for static assets, user uploads, and backup infrastructure with zero egress fees.",
      location: "Global",
      website: "https://www.cloudflare.com/r2/",
      privacyUrl: "https://www.cloudflare.com/privacypolicy/",
    },
  ],
  authentication: [
    {
      name: "Auth0",
      description:
        "Identity and access management platform handling user authentication, SSO, and authorization.",
      location: "United States",
      website: "https://auth0.com",
      privacyUrl: "https://auth0.com/privacy",
    },
    {
      name: "Vercel Edge Network",
      description:
        "Edge computing and CDN services for secure, low-latency content delivery worldwide.",
      location: "Global",
      website: "https://vercel.com",
      privacyUrl: "https://vercel.com/legal/privacy-policy",
    },
  ],
  communications: [
    {
      name: "SendGrid",
      description:
        "Transactional email delivery service for account notifications, alerts, and system communications.",
      location: "United States",
      website: "https://sendgrid.com",
      privacyUrl: "https://www.twilio.com/legal/privacy",
    },
    {
      name: "Twilio",
      description:
        "SMS and messaging platform for account verification, security alerts, and customer communications.",
      location: "United States, Global",
      website: "https://www.twilio.com",
      privacyUrl: "https://www.twilio.com/legal/privacy",
    },
    {
      name: "Resend",
      description:
        "Modern email API for transactional and marketing email delivery with enterprise deliverability.",
      location: "United States",
      website: "https://resend.com",
      privacyUrl: "https://resend.com/privacy",
    },
  ],
  "ai-processing": [
    {
      name: "OpenAI",
      description:
        "Large language model API powering our AI-driven sales intelligence and content generation features.",
      location: "United States",
      website: "https://openai.com",
      privacyUrl: "https://openai.com/privacy",
    },
    {
      name: "Anthropic",
      description:
        "AI model provider for advanced reasoning, analysis, and Claude-powered enterprise features.",
      location: "United States",
      website: "https://anthropic.com",
      privacyUrl: "https://www.anthropic.com/legal/privacy-policy",
    },
    {
      name: "Cohere",
      description:
        "NLP platform for text processing, classification, and embedding generation for search capabilities.",
      location: "Canada, United States",
      website: "https://cohere.com",
      privacyUrl: "https://cohere.com/privacy",
    },
  ],
  "data-enrichment": [
    {
      name: "LinkedIn",
      description:
        "Professional data provider for company and contact enrichment to power sales intelligence.",
      location: "United States, Global",
      website: "https://www.linkedin.com",
      privacyUrl: "https://www.linkedin.com/legal/privacy-policy",
    },
    {
      name: "Clearbit",
      description:
        "Business intelligence platform for company data, firmographics, and lead enrichment.",
      location: "United States",
      website: "https://clearbit.com",
      privacyUrl: "https://clearbit.com/privacy",
    },
    {
      name: "Hunter.io",
      description:
        "Email discovery and verification service for contact data validation and enrichment.",
      location: "France",
      website: "https://hunter.io",
      privacyUrl: "https://hunter.io/privacy-policy",
    },
    {
      name: "Apollo.io",
      description:
        "B2B data platform providing company and contact intelligence for sales and marketing operations.",
      location: "United States",
      website: "https://www.apollo.io",
      privacyUrl: "https://www.apollo.io/privacy-policy",
    },
  ],
  payments: [
    {
      name: "Stripe",
      description:
        "Payment processing infrastructure handling credit card transactions, subscriptions, and billing.",
      location: "United States, Global",
      website: "https://stripe.com",
      privacyUrl: "https://stripe.com/privacy",
    },
    {
      name: "Paddle",
      description:
        "SaaS commerce platform for tax calculation, invoicing, and global payment processing.",
      location: "United Kingdom, Global",
      website: "https://paddle.com",
      privacyUrl: "https://paddle.com/privacy/",
    },
  ],
  analytics: [
    {
      name: "PostHog",
      description:
        "Product analytics platform for understanding user behavior, feature usage, and platform performance.",
      location: "United States, EU",
      website: "https://posthog.com",
      privacyUrl: "https://posthog.com/privacy",
    },
    {
      name: "Sentry",
      description:
        "Error tracking and performance monitoring for application reliability and debugging.",
      location: "United States",
      website: "https://sentry.io",
      privacyUrl: "https://sentry.io/privacy/",
    },
    {
      name: "Datadog",
      description:
        "Cloud monitoring and analytics platform for infrastructure performance, logs, and security monitoring.",
      location: "United States",
      website: "https://www.datadoghq.com",
      privacyUrl: "https://www.datadoghq.com/legal/privacy/",
    },
  ],
  support: [
    {
      name: "Intercom",
      description:
        "Customer messaging platform for in-app support, product tours, and customer communications.",
      location: "United States, Ireland",
      website: "https://www.intercom.com",
      privacyUrl: "https://www.intercom.com/legal/privacy",
    },
    {
      name: "Zendesk",
      description:
        "Ticketing and support platform for managing customer inquiries, technical support, and enterprise success.",
      location: "United States",
      website: "https://www.zendesk.com",
      privacyUrl: "https://www.zendesk.com/privacy/",
    },
  ],
};

const sectionIcons = {
  overview: <Server className="h-5 w-5 text-accent shrink-0" />,
  "cloud-infrastructure": <Cloud className="h-5 w-5 text-accent shrink-0" />,
  "data-storage": <Database className="h-5 w-5 text-accent shrink-0" />,
  authentication: <Lock className="h-5 w-5 text-accent shrink-0" />,
  communications: <MessageSquare className="h-5 w-5 text-accent shrink-0" />,
  "ai-processing": <Brain className="h-5 w-5 text-accent shrink-0" />,
  "data-enrichment": <Database className="h-5 w-5 text-accent shrink-0" />,
  payments: <CreditCard className="h-5 w-5 text-accent shrink-0" />,
  analytics: <Search className="h-5 w-5 text-accent shrink-0" />,
  support: <MessageSquare className="h-5 w-5 text-accent shrink-0" />,
  compliance: <ShieldCheck className="h-5 w-5 text-accent shrink-0" />,
};

export default function SubprocessorsClient() {
  const [activeSection, setActiveSection] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSections, setFilteredSections] = useState(sections);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0.1,
      },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keep the active TOC item visible in the sidebar without scrolling the page
  useEffect(() => {
    if (!activeSection) return;
    const activeBtn = document.getElementById(`nav-btn-${activeSection}`);
    if (activeBtn) scrollElementIntoContainer(activeBtn);
  }, [activeSection]);

  // Filter sections based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSections(sections);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = sections.filter((section) => {
      // Check section title
      if (section.title.toLowerCase().includes(query)) return true;

      // Check if any subprocessor in this section matches
      const processors = subprocessors[section.id as keyof typeof subprocessors];
      if (processors) {
        return processors.some(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.location.toLowerCase().includes(query),
        );
      }
      return false;
    });

    setFilteredSections(filtered);
  }, [searchQuery]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Render a subprocessor card
  const renderSubprocessorCard = (processor: Subprocessor) => (
    <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-3 hover:border-accent/40 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-foreground text-sm">{processor.name}</h4>
          <p className="text-xs text-muted-foreground mt-1">{processor.description}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-[10px] px-2 py-1 rounded-full bg-accent/10 text-accent whitespace-nowrap">
            {processor.location.split(",")[0].trim()}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 pt-2 border-t border-border/50">
        <a
          href={processor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] text-accent hover:underline"
        >
          <ExternalLink className="h-3 w-3" />
          Website
        </a>
        <a
          href={processor.privacyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] text-accent hover:underline"
        >
          <Lock className="h-3 w-3" />
          Privacy Policy
        </a>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-0 text-foreground">
      {/* HERO SECTION */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-10! md:py-16! text-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-accent">
              <Server className="h-3.5 w-3.5" />
              <span>SKOUT TRUST — SUBPROCESSOR DIRECTORY</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
              Authorized Third-Party <GradientText>Subprocessors</GradientText>
            </h1>

            <div className="mx-auto max-w-2xl text-xs sm:text-sm leading-relaxed text-muted-foreground text-center space-y-3">
              <p>
                Transparency directory of authorized third-party cloud infrastructure hosts, data
                enrichment vendors, and AI processing APIs utilized by Skout AI to deliver our
                platform services.
              </p>
              <p>
                This directory is regularly updated as our technology stack evolves, last updated
                August 2026.
              </p>
            </div>
          </div>
        </Section>
      </div>

      {/* MAIN CONTENT AREA */}
      <Section className="py-8! md:py-12!">
        {/* MOBILE STICKY INDEX SELECTOR */}
        <div className="block lg:hidden sticky top-16 z-30 mb-6 rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-accent uppercase tracking-wider">
            <Menu className="h-4 w-4" /> Jump to Section
          </div>
          <div className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search subprocessors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
          <select
            value={activeSection}
            onChange={(e) => scrollToSection(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {filteredSections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* STICKY NAVIGATION MENU (DESKTOP) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 rounded-2xl border border-border bg-card/80 p-4 shadow-xl backdrop-blur-xl space-y-3">
              <div className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5 border-b border-border/60 pb-2">
                <ShieldCheck className="h-4 w-4" /> Directory Index
              </div>

              {/* Search box for desktop */}
              <div className="px-2 mb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search subprocessors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="max-h-[calc(100vh-15rem)] overflow-y-auto space-y-1 text-xs scrollbar-none">
                {filteredSections.map((s) => {
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      id={`nav-btn-${s.id}`}
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-medium transition-colors ${
                        isActive
                          ? "bg-accent/15 text-accent font-semibold border-l-2 border-accent pl-2.5"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      }`}
                    >
                      <span className="truncate">{s.title}</span>
                      <ChevronRight
                        className={`h-3 w-3 shrink-0 transition-transform ${isActive ? "text-accent translate-x-0.5" : "opacity-40"}`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-border/60 px-2">
                <p className="text-[11px] text-muted-foreground">
                  For questions about our subprocessors, contact our privacy team at{" "}
                  <a href="mailto:privacy@skoutai.io" className="text-accent hover:underline">
                    privacy@skoutai.io
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* DIRECTORY CONTENT (GRID COLUMN 8/9) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8 text-xs sm:text-sm leading-relaxed">
            {/* OVERVIEW SECTION */}
            <section
              id="overview"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                {sectionIcons["overview"]}
                <h2>Overview</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI works with specialized technology providers and subprocessors that help us
                operate, secure, support, and improve our Services. All subprocessors listed in this
                directory have been vetted through our security review process and maintain
                appropriate data protection standards.
              </p>

              <div className="mt-4 rounded-xl border border-border/80 bg-background/60 p-4 space-y-3">
                <div className="font-semibold text-xs uppercase tracking-wider text-accent">
                  Our subprocessors support critical platform functions including:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground list-none">
                  {[
                    "Cloud infrastructure hosting",
                    "Database and storage services",
                    "Identity and authentication",
                    "Email and communications",
                    "AI and machine learning processing",
                    "Data enrichment and intelligence",
                    "Payment processing and billing",
                    "Analytics and monitoring",
                    "Customer support and success",
                    "Security and compliance services",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground">
                Our subprocessors are authorized to process customer data only as necessary to
                provide their contracted services. Where appropriate, we maintain contractual
                confidentiality, privacy, security, and data-processing protections with all our
                service providers.
              </p>
            </section>

            {/* CLOUD INFRASTRUCTURE */}
            <section
              id="cloud-infrastructure"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                {sectionIcons["cloud-infrastructure"]}
                <h2>Cloud Infrastructure</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Enterprise-grade cloud platforms that host our core infrastructure, providing the
                foundation for reliable, secure, and scalable service delivery.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subprocessors["cloud-infrastructure"].map((p, idx) => (
                  <div key={idx}>{renderSubprocessorCard(p)}</div>
                ))}
              </div>
            </section>

            {/* DATA STORAGE & DATABASES */}
            <section
              id="data-storage"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                {sectionIcons["data-storage"]}
                <h2>Data Storage & Databases</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Managed database and storage services that securely house customer data with
                enterprise-grade redundancy and encryption.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subprocessors["data-storage"].map((p, idx) => (
                  <div key={idx}>{renderSubprocessorCard(p)}</div>
                ))}
              </div>
            </section>

            {/* AUTHENTICATION & SECURITY */}
            <section
              id="authentication"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                {sectionIcons["authentication"]}
                <h2>Authentication & Security</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Identity management and edge security services that protect account access and
                ensure secure content delivery.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subprocessors.authentication.map((p, idx) => (
                  <div key={idx}>{renderSubprocessorCard(p)}</div>
                ))}
              </div>
            </section>

            {/* COMMUNICATIONS */}
            <section
              id="communications"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                {sectionIcons["communications"]}
                <h2>Communications</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Email and messaging platforms that deliver critical account notifications, security
                alerts, and customer communications.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subprocessors.communications.map((p, idx) => (
                  <div key={idx}>{renderSubprocessorCard(p)}</div>
                ))}
              </div>
            </section>

            {/* AI PROCESSING */}
            <section
              id="ai-processing"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                {sectionIcons["ai-processing"]}
                <h2>AI & ML Processing</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Leading AI model providers that power our intelligent sales features, content
                generation, and advanced analytics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subprocessors["ai-processing"].map((p, idx) => (
                  <div key={idx}>{renderSubprocessorCard(p)}</div>
                ))}
              </div>
            </section>

            {/* DATA ENRICHMENT */}
            <section
              id="data-enrichment"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                {sectionIcons["data-enrichment"]}
                <h2>Data Enrichment</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                B2B data providers that deliver accurate company and contact intelligence to power
                sales and marketing operations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subprocessors["data-enrichment"].map((p, idx) => (
                  <div key={idx}>{renderSubprocessorCard(p)}</div>
                ))}
              </div>
            </section>

            {/* PAYMENT PROCESSING */}
            <section
              id="payments"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                {sectionIcons["payments"]}
                <h2>Payment Processing</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                PCI-compliant payment infrastructure that securely handles subscription billing,
                invoicing, and global transactions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subprocessors.payments.map((p, idx) => (
                  <div key={idx}>{renderSubprocessorCard(p)}</div>
                ))}
              </div>
            </section>

            {/* ANALYTICS & MONITORING */}
            <section
              id="analytics"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                {sectionIcons["analytics"]}
                <h2>Analytics & Monitoring</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Performance monitoring and analytics platforms that ensure platform reliability,
                track usage, and maintain operational health.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subprocessors.analytics.map((p, idx) => (
                  <div key={idx}>{renderSubprocessorCard(p)}</div>
                ))}
              </div>
            </section>

            {/* CUSTOMER SUPPORT */}
            <section
              id="support"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                {sectionIcons["support"]}
                <h2>Customer Support</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Customer success platforms that power in-app support, ticketing, and communication
                with our customers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subprocessors.support.map((p, idx) => (
                  <div key={idx}>{renderSubprocessorCard(p)}</div>
                ))}
              </div>
            </section>

            {/* COMPLIANCE */}
            <section
              id="compliance"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                {sectionIcons["compliance"]}
                <h2>Subprocessor Compliance</h2>
              </div>
              <p className="text-muted-foreground">
                All subprocessors undergo rigorous security and compliance reviews before being
                authorized to process customer data. We maintain ongoing oversight of our vendors to
                ensure they continue to meet our strict security standards.
              </p>

              <div className="mt-4 rounded-xl border border-border/80 bg-background/60 p-4 space-y-3">
                <div className="font-semibold text-xs uppercase tracking-wider text-accent">
                  Our vendor compliance requirements include:
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground list-none">
                  {[
                    "Adherence to global privacy regulations including GDPR, CCPA, and other applicable laws",
                    "Implementation of appropriate technical and organizational security measures",
                    "Maintenance of industry-standard certifications (SOC 2, ISO 27001, etc.)",
                    "Data breach notification procedures aligned with our contractual requirements",
                    "Subprocessor audits and security assessments on a regular schedule",
                    "Clear data retention and deletion policies that meet our requirements",
                    "International data transfer safeguards where applicable",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground mt-4">
                This subprocessor directory is updated regularly. Enterprise customers with
                additional questions about specific vendors, compliance certifications, or data
                processing arrangements may contact our privacy team to request additional
                information.
              </p>

              <div className="mt-6 flex justify-center">
                <a
                  href="mailto:privacy@skoutai.io"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-sm hover:bg-accent/90 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Contact Privacy Team
                </a>
              </div>
            </section>
          </div>
        </div>
      </Section>
    </div>
  );
}
