"use client";

import { useState, useEffect } from "react";
import {
  Lock,
  ShieldCheck,
  Building2,
  FileText,
  Mail,
  UserCheck,
  Server,
  Globe,
  Database,
  Key,
  CheckCircle2,
  ChevronRight,
  Menu,
  AlertTriangle,
  Cookie,
  UserX,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { Section, GradientText } from "@/components/site/Section";
import { scrollElementIntoContainer } from "@/lib/scroll-into-container";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information-we-collect", title: "2. Information We Collect" },
  { id: "customer-provided-data", title: "3. Customer-Provided Data" },
  { id: "email-communication-data", title: "4. Email and Communication Data" },
  { id: "crm-integrations", title: "5. CRM, Third-Party Integrations & Connected Accounts" },
  { id: "collect-automatically", title: "6. Information We Collect Automatically" },
  { id: "public-third-party", title: "7. Information From Public & Third-Party Sources" },
  { id: "how-we-use", title: "8. How We Use Information" },
  { id: "transactional-operational-communications", title: "9. Transactional, Operational & Marketing Communications" },
  { id: "marketing-communications", title: "10. Marketing Communications" },
  { id: "customer-responsibility", title: "11. Customer Responsibility for Prospect Data" },
  { id: "legal-bases", title: "12. Legal Bases and Permitted Processing" },
  { id: "how-we-share", title: "13. How We Share Information" },
  { id: "data-retention", title: "14. Data Retention" },
  { id: "deletion", title: "15. Deletion" },
  { id: "data-security", title: "16. Data Security" },
  { id: "international-transfers", title: "17. International Data Transfers" },
  { id: "cookies", title: "18. Cookies and Similar Technologies" },
  { id: "childrens-privacy", title: "19. Children's Privacy" },
  { id: "your-rights", title: "20. Your Rights" },
  { id: "data-protection-requests", title: "21. Data Protection Requests" },
  { id: "changes-policy", title: "22. Changes to This Privacy Policy" },
  { id: "contact-us", title: "23. Contact Us" },
];

export default function PrivacyPolicyClient() {
  const [activeSection, setActiveSection] = useState("introduction");

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
      }
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

  return (
    <div className="flex flex-col gap-0 text-foreground">
      {/* HERO SECTION */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-10! md:py-16! text-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-accent">
              <Lock className="h-3.5 w-3.5" />
              <span>SKOUT AI — PRIVACY POLICY</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
              Privacy <GradientText>Policy</GradientText>
            </h1>

            <p className="mx-auto max-w-2xl text-xs sm:text-sm leading-relaxed text-muted-foreground text-center">
              This Privacy Policy explains how Skout AI Private Limited (&quot;Skout AI&quot;, &quot;Skout&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, stores, discloses, and otherwise processes information in connection with our websites, applications, software, SaaS platform, APIs, integrations, communications, and related services (collectively, the &quot;Services&quot;).
            </p>
          </div>
        </Section>
      </div>

      {/* MAIN CONTENT AREA */}
      <Section className="py-8! md:py-12!">
        {/* MOBILE STICKY INDEX SELECTOR */}
        <div className="block lg:hidden sticky top-16 z-30 mb-6 rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-accent uppercase tracking-wider">
            <Menu className="h-4 w-4" /> Jump to Privacy Section
          </div>
          <select
            value={activeSection}
            onChange={(e) => scrollToSection(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* STICKY NAVIGATION MENU (DESKTOP) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 rounded-2xl border border-border bg-card/80 p-4 shadow-xl backdrop-blur-xl space-y-1">
              <div className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5 border-b border-border/60 pb-2">
                <Lock className="h-4 w-4" /> Policy Navigation
              </div>
              <div className="max-h-[calc(100vh-10rem)] overflow-y-auto space-y-1 text-xs [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {sections.map((s) => {
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
                      <ChevronRight className={`h-3 w-3 shrink-0 transition-transform ${isActive ? "text-accent translate-x-0.5" : "opacity-40"}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* POLICY CONTENT */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8 text-xs sm:text-sm leading-relaxed">
            {/* 1. INTRODUCTION */}
            <section id="introduction" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Building2 className="h-5 w-5 text-accent shrink-0" />
                <h2>1. Introduction</h2>
              </div>
              <p className="text-muted-foreground">
                This Privacy Policy explains how Skout AI Private Limited (&quot;Skout AI&quot;, &quot;Skout&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, stores, discloses, and otherwise processes information in connection with our websites, applications, software, SaaS platform, APIs, integrations, communications, and related services (collectively, the &quot;Services&quot;).
              </p>
              <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1.5 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Skout AI Private Limited is an Indian company incorporated under the Companies Act, 2013.</p>
                <p><span className="font-semibold text-foreground">Corporate Identity Number (CIN):</span> U62099HR2026PTC146861</p>
                <p><span className="font-semibold text-foreground">Registered State:</span> Haryana, India</p>
                <p><span className="font-semibold text-foreground">Registered/Mailing Address:</span> 02-007, 2nd Floor, Emaar, The Palm Square, Sector 66, Bhondsi, Gurgaon – 122102, Haryana, India.</p>
              </div>
              <p className="text-muted-foreground">
                The Services are designed primarily for businesses and organizations and may involve processing business information, professional contact information, account information, communications, prospect information, CRM information, email-related information, and other information provided by customers or generated through use of the Services.
              </p>
              <p className="text-muted-foreground font-medium text-foreground">
                By accessing or using the Services, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </section>

            {/* 2. INFORMATION WE COLLECT */}
            <section id="information-we-collect" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Database className="h-5 w-5 text-accent shrink-0" />
                <h2>2. Information We Collect</h2>
              </div>
              <p className="text-muted-foreground">
                Depending on how you interact with Skout AI, we may collect the following categories of information.
              </p>

              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-foreground text-sm">2.1 Account and Registration Information</h3>
                <p className="text-muted-foreground">When you create or administer a Skout AI account, we may collect:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "Full name",
                    "Work email address",
                    "Phone number",
                    "Company name",
                    "Job title or role",
                    "Login credentials and authentication information",
                    "Account preferences",
                    "Organization information",
                    "Billing and subscription information",
                    "Account identifiers",
                    "Security and authentication information",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-3">
                <h3 className="font-bold text-foreground text-sm">2.2 Two-Factor Authentication and Account Security Information</h3>
                <p className="text-muted-foreground">
                  To protect accounts and prevent unauthorized access, Skout AI may provide or require two-factor authentication (&quot;2FA&quot;), multi-factor authentication (&quot;MFA&quot;), verification codes, login confirmations, password-reset communications, security alerts, and similar security mechanisms.
                </p>
                <p className="text-muted-foreground">For these purposes, we may process:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "Email address",
                    "Phone number",
                    "Authentication identifiers",
                    "One-time verification codes",
                    "Authentication timestamps",
                    "Login and security events",
                    "Device and browser information",
                    "IP address",
                    "Account security status",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Key className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs space-y-1 text-amber-300">
                  <p className="font-bold">Important:</p>
                  <p className="font-normal text-muted-foreground text-xs">
                    Security communications such as OTPs, 2FA codes, password-reset messages, account-verification messages, suspicious-login alerts, and critical service notifications may be sent even where you have opted out of promotional or marketing communications.
                  </p>
                  <p className="font-normal text-muted-foreground text-xs">
                    These communications are considered transactional, operational, or security-related communications, rather than marketing communications.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. CUSTOMER-PROVIDED DATA */}
            <section id="customer-provided-data" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <UserCheck className="h-5 w-5 text-accent shrink-0" />
                <h2>3. Customer-Provided Data</h2>
              </div>
              <p className="text-muted-foreground">
                Because Skout AI is a B2B SaaS platform, customers may provide information about their employees, prospects, customers, leads, contacts, companies, or other individuals.
              </p>
              <p className="text-muted-foreground">This information may include:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Names",
                  "Professional email addresses",
                  "Business phone numbers",
                  "Job titles",
                  "Company names",
                  "Professional profiles",
                  "Company information",
                  "Business addresses",
                  "Websites",
                  "CRM records",
                  "Lead information",
                  "Prospecting information",
                  "Email communication information",
                  "Campaign information",
                  "Notes and custom fields",
                  "Engagement information",
                  "Data imported through integrations",
                  "Information contained in files uploaded by customers",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                Customers are responsible for ensuring that they have the appropriate rights, permissions, notices, consents, or other lawful authority necessary for providing such information to Skout AI and using it through the Services.
              </p>
              <p className="text-muted-foreground">
                Where Skout AI processes customer-provided personal data on behalf of a customer, the customer may act as the relevant data controller/fiduciary and Skout AI may act as a processor/data processor or equivalent service provider, depending on the applicable law and relationship.
              </p>
            </section>

            {/* 4. EMAIL AND COMMUNICATION DATA */}
            <section id="email-communication-data" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <h2>4. Email and Communication Data</h2>
              </div>
              <p className="text-muted-foreground">
                Because Skout AI may provide sales intelligence, outbound communication, email automation, email verification, and related functionality, the Services may process information relating to email communications.
              </p>
              <p className="text-muted-foreground">This may include:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Sender email addresses",
                  "Recipient email addresses",
                  "Email addresses submitted for verification",
                  "Email metadata",
                  "Delivery status",
                  "Bounce information",
                  "SMTP responses",
                  "Mailbox verification information",
                  "Domain information",
                  "MX records",
                  "Email authentication information",
                  "Email engagement information",
                  "Campaign configuration",
                  "Sending limits",
                  "Suppression and unsubscribe information",
                  "Email content where necessary to provide a customer-requested feature",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                Where a customer connects an email account or mailbox to Skout AI, we may access and process information made available through that connection to provide the requested functionality.
              </p>
              <p className="text-foreground font-semibold">
                We do not access connected mailboxes for unrelated purposes.
              </p>
            </section>

            {/* 5. CRM, THIRD-PARTY INTEGRATIONS AND CONNECTED ACCOUNTS */}
            <section id="crm-integrations" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Server className="h-5 w-5 text-accent shrink-0" />
                <h2>5. CRM, Third-Party Integrations and Connected Accounts</h2>
              </div>
              <p className="text-muted-foreground">Skout AI may integrate with third-party services such as:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Email providers",
                  "CRM platforms",
                  "Calendar services",
                  "Communication platforms",
                  "Data providers",
                  "Enrichment providers",
                  "Authentication providers",
                  "Cloud storage providers",
                  "Analytics providers",
                  "Payment providers",
                  "Other business applications",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                When you connect a third-party service, Skout AI may receive information from that service according to the permissions granted by you and the applicable third-party service.
              </p>
              <p className="text-muted-foreground">
                You are responsible for reviewing the privacy practices and permissions of third-party services you connect to Skout AI.
              </p>
            </section>

            {/* 6. INFORMATION WE COLLECT AUTOMATICALLY */}
            <section id="collect-automatically" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Globe className="h-5 w-5 text-accent shrink-0" />
                <h2>6. Information We Collect Automatically</h2>
              </div>
              <p className="text-muted-foreground">
                When you use the Services, we may automatically collect technical and usage information, including:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "IP address",
                  "Browser type",
                  "Operating system",
                  "Device type",
                  "Device identifiers",
                  "Approximate location derived from IP address",
                  "Login activity",
                  "Session information",
                  "Pages and features accessed",
                  "Actions performed within the Services",
                  "API activity",
                  "Error logs",
                  "Performance information",
                  "Security events",
                  "Authentication events",
                  "Referrer information",
                  "Cookies and similar technologies",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                We use this information to operate, secure, troubleshoot, analyze, and improve the Services.
              </p>
            </section>

            {/* 7. INFORMATION FROM PUBLIC AND THIRD-PARTY SOURCES */}
            <section id="public-third-party" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Database className="h-5 w-5 text-accent shrink-0" />
                <h2>7. Information From Public and Third-Party Sources</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may provide sales intelligence, company intelligence, prospect discovery, enrichment, verification, and related features.
              </p>
              <p className="text-muted-foreground">In connection with those features, we may obtain business or professional information from:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Public websites",
                  "Company websites",
                  "Public business directories",
                  "Public professional profiles",
                  "Public government or regulatory records",
                  "Business databases",
                  "Data providers",
                  "Enrichment providers",
                  "Other publicly available or commercially licensed sources",
                ].map((src, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{src}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                The information obtained may include business contact information, company information, professional information, company technology information, employment information, and other business-related information.
              </p>
              <p className="text-muted-foreground">
                Where required by applicable law, we will apply appropriate privacy, notice, consent, objection, suppression, retention, and other compliance mechanisms.
              </p>
            </section>

            {/* 8. HOW WE USE INFORMATION */}
            <section id="how-we-use" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <FileText className="h-5 w-5 text-accent shrink-0" />
                <h2>8. How We Use Information</h2>
              </div>
              <p className="text-muted-foreground">We may use information to:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Provide and operate the Services.",
                  "Create and manage customer accounts.",
                  "Authenticate users.",
                  "Provide 2FA and security verification.",
                  "Send transactional and operational communications.",
                  "Process subscriptions and payments.",
                  "Provide customer support.",
                  "Perform email verification and deliverability-related services.",
                  "Provide prospecting and sales intelligence functionality.",
                  "Perform data enrichment.",
                  "Detect invalid, risky, fraudulent, abusive, or malicious activity.",
                  "Maintain suppression and opt-out records.",
                  "Monitor system performance.",
                  "Protect the Services and our customers.",
                  "Prevent fraud and unauthorized access.",
                  "Diagnose errors and technical problems.",
                  "Improve and develop the Services.",
                  "Develop analytics and aggregated insights.",
                  "Comply with applicable law and legal obligations.",
                  "Enforce our agreements and policies.",
                  "Respond to lawful requests from governmental authorities.",
                  "Communicate important changes to the Services.",
                ].map((use, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 9. TRANSACTIONAL, OPERATIONAL AND MARKETING COMMUNICATIONS */}
            <section id="transactional-operational-communications" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <h2>9. Transactional, Operational and Marketing Communications</h2>
              </div>
              <p className="text-foreground font-semibold">
                This section is particularly important for Skout AI.
              </p>
              <p className="text-muted-foreground">
                By creating an account or using the Services, you acknowledge that Skout AI may send you communications reasonably necessary to operate and secure your account.
              </p>
              <p className="text-muted-foreground font-semibold text-xs">These may include:</p>

              <div className="space-y-3 pt-1">
                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-2 text-xs text-muted-foreground">
                  <p className="font-bold text-foreground">Account communications</p>
                  <p>Account verification, Email verification, Phone verification, 2FA/MFA codes, Password reset, Login notifications, Suspicious-login alerts, Account recovery, Security notifications</p>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-2 text-xs text-muted-foreground">
                  <p className="font-bold text-foreground">Service communications</p>
                  <p>Service availability notifications, Maintenance notifications, System incidents, Product functionality notices, Usage alerts, Credit/usage notifications, Integration notifications, API notifications, Campaign notifications, Deliverability notifications</p>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-2 text-xs text-muted-foreground">
                  <p className="font-bold text-foreground">Billing communications</p>
                  <p>Payment confirmations, Invoices, Failed payment notifications, Subscription confirmations, Renewal notices, Cancellation confirmations, Billing changes</p>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-2 text-xs text-muted-foreground">
                  <p className="font-bold text-foreground">Legal communications</p>
                  <p>Privacy Policy updates, Terms updates, Security notices, Regulatory notices, Other legally required communications</p>
                </div>
              </div>
              <p className="text-foreground font-medium text-xs sm:text-sm">
                These communications may continue even if you unsubscribe from marketing communications.
              </p>
            </section>

            {/* 10. MARKETING COMMUNICATIONS */}
            <section id="marketing-communications" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <h2>10. Marketing Communications</h2>
              </div>
              <p className="text-muted-foreground">
                Where permitted by applicable law, Skout AI may send promotional communications about:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "New products",
                  "Features",
                  "Product updates",
                  "Events",
                  "Educational materials",
                  "Offers",
                  "Research",
                  "Other Skout AI services",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                You may unsubscribe from marketing communications at any time using the unsubscribe mechanism included in the communication or by contacting us.
              </p>
              <p className="text-muted-foreground font-medium text-foreground">
                Unsubscribing from marketing communications does not disable essential transactional, security, legal, billing, or account-related communications.
              </p>
            </section>

            {/* 11. CUSTOMER RESPONSIBILITY FOR PROSPECT AND CONTACT DATA */}
            <section id="customer-responsibility" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <AlertTriangle className="h-5 w-5 text-accent shrink-0" />
                <h2>11. Customer Responsibility for Prospect and Contact Data</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI provides tools that customers may use for sales prospecting and outbound communications.
              </p>
              <p className="text-foreground font-semibold">
                Customers are responsible for ensuring that their use of the Services complies with applicable:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Privacy laws",
                  "Data protection laws",
                  "Anti-spam laws",
                  "Marketing laws",
                  "Telecommunications laws",
                  "Consumer protection laws",
                  "Platform terms",
                  "Email provider requirements",
                  "CRM requirements",
                ].map((law, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{law}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground font-semibold text-foreground">
                Customers must not use Skout AI to unlawfully collect, process, profile, contact, or target individuals.
              </p>
              <p className="text-muted-foreground">
                Skout AI may suspend or restrict activity that presents significant legal, security, abuse, spam, deliverability, or platform-integrity risk.
              </p>
            </section>

            {/* 12. LEGAL BASES AND PERMITTED PROCESSING */}
            <section id="legal-bases" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <FileText className="h-5 w-5 text-accent shrink-0" />
                <h2>12. Legal Bases and Permitted Processing</h2>
              </div>
              <p className="text-muted-foreground">
                Depending on the applicable jurisdiction, Skout AI may process information based on:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Consent",
                  "Performance of a contract",
                  "Compliance with legal obligations",
                  "Legitimate interests where permitted",
                  "Protection of rights and security",
                  "Other lawful grounds recognized by applicable law",
                ].map((base, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{base}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                For Indian users and applicable processing, Skout AI will apply the requirements of applicable Indian data-protection law, including the Digital Personal Data Protection framework as applicable to the relevant processing. India&apos;s DPDP Rules, 2025 were notified by MeitY on November 14, 2025.
              </p>
            </section>

            {/* 13. HOW WE SHARE INFORMATION */}
            <section id="how-we-share" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Server className="h-5 w-5 text-accent shrink-0" />
                <h2>13. How We Share Information</h2>
              </div>
              <p className="text-muted-foreground">We may share information with:</p>

              <div className="space-y-3">
                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-2 text-xs text-muted-foreground">
                  <p className="font-bold text-foreground">Service providers</p>
                  <p>Third parties that help us operate the Services, including providers for:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs pt-1">
                    {[
                      "Cloud infrastructure", "Databases", "Authentication", "Email delivery",
                      "SMS/OTP delivery", "Analytics", "Customer support", "Payment processing",
                      "Data enrichment", "Email verification", "Security", "Monitoring",
                      "Error tracking", "Communications", "Storage"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-accent" /> {item}
                      </div>
                    ))}
                  </div>
                  <p className="pt-1 italic">These providers may process information only as reasonably necessary to provide their services to us or as otherwise permitted by applicable law.</p>
                </div>

                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1.5 text-xs text-muted-foreground">
                  <p className="font-bold text-foreground">Customer-directed integrations</p>
                  <p>We may share information with third-party services when you or your organization explicitly connects or instructs Skout AI to use those services.</p>
                </div>

                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1.5 text-xs text-muted-foreground">
                  <p className="font-bold text-foreground">Legal and regulatory authorities</p>
                  <p>We may disclose information where reasonably necessary to comply with applicable law, respond to lawful governmental requests, protect rights or property, investigate fraud or abuse, protect users or the public, enforce our agreements, or protect the security of the Services.</p>
                </div>

                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1.5 text-xs text-muted-foreground">
                  <p className="font-bold text-foreground">Corporate transactions</p>
                  <p>Information may be transferred in connection with merger, acquisition, financing, reorganization, sale of assets, bankruptcy, or corporate restructuring.</p>
                </div>
              </div>
            </section>

            {/* 14. DATA RETENTION */}
            <section id="data-retention" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Database className="h-5 w-5 text-accent shrink-0" />
                <h2>14. Data Retention</h2>
              </div>
              <p className="text-muted-foreground">We retain information for as long as reasonably necessary to:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Provide the Services;",
                  "Maintain customer accounts;",
                  "Fulfill contractual obligations;",
                  "Meet legal requirements;",
                  "Resolve disputes;",
                  "Prevent fraud and abuse;",
                  "Maintain security;",
                  "Enforce agreements;",
                  "Maintain legitimate business records.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">Different categories of information may have different retention periods.</p>
              <p className="text-muted-foreground font-medium text-foreground">
                Certain information, such as suppression lists, security logs, transaction records, fraud-prevention information, and legally required records, may need to be retained after account termination.
              </p>
            </section>

            {/* 15. DELETION */}
            <section id="deletion" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <UserX className="h-5 w-5 text-accent shrink-0" />
                <h2>15. Deletion</h2>
              </div>
              <p className="text-muted-foreground">
                Customers may request deletion of their account or certain information, subject to applicable law and contractual obligations.
              </p>
              <p className="text-muted-foreground">
                Deletion may not immediately remove information that we are legally required or reasonably entitled to retain, including:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Financial records",
                  "Security records",
                  "Fraud-prevention records",
                  "Suppression records",
                  "Legal records",
                  "Audit records",
                  "Information necessary to resolve disputes",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                Where applicable, retained information will remain subject to appropriate protections.
              </p>
            </section>

            {/* 16. DATA SECURITY */}
            <section id="data-security" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
                <h2>16. Data Security</h2>
              </div>
              <p className="text-muted-foreground">
                We maintain administrative, technical, and organizational safeguards designed to protect information against unauthorized access, loss, misuse, alteration, or disclosure.
              </p>
              <p className="text-muted-foreground">Depending on the Services and applicable requirements, safeguards may include:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Encryption in transit",
                  "Encryption at rest where appropriate",
                  "Access controls",
                  "Authentication controls",
                  "Role-based access",
                  "Logging and monitoring",
                  "Security testing",
                  "Infrastructure protections",
                  "Backup and recovery mechanisms",
                  "Incident-response procedures",
                  "Employee confidentiality obligations",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground font-medium text-foreground italic">
                No internet-based service can be guaranteed to be completely secure.
              </p>
            </section>

            {/* 17. INTERNATIONAL DATA TRANSFERS */}
            <section id="international-transfers" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Globe className="h-5 w-5 text-accent shrink-0" />
                <h2>17. International Data Transfers</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI is an Indian company but may use infrastructure and service providers located in India or other countries.
              </p>
              <p className="text-muted-foreground font-medium text-foreground">
                Where information is transferred internationally, we will implement appropriate safeguards and comply with applicable legal requirements governing international data transfers.
              </p>
            </section>

            {/* 18. COOKIES AND SIMILAR TECHNOLOGIES */}
            <section id="cookies" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Cookie className="h-5 w-5 text-accent shrink-0" />
                <h2>18. Cookies and Similar Technologies</h2>
              </div>
              <p className="text-muted-foreground">Skout AI may use cookies and similar technologies to:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Keep users signed in",
                  "Remember preferences",
                  "Maintain sessions",
                  "Improve security",
                  "Analyze usage",
                  "Improve performance",
                  "Understand how users interact with the website",
                  "Measure marketing effectiveness",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                You may control cookies through your browser or applicable cookie controls.
              </p>
            </section>

            {/* 19. CHILDREN'S PRIVACY */}
            <section id="childrens-privacy" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <HelpCircle className="h-5 w-5 text-accent shrink-0" />
                <h2>19. Children&apos;s Privacy</h2>
              </div>
              <p className="text-muted-foreground">
                The Services are intended for businesses and users who are legally capable of entering into agreements.
              </p>
              <p className="text-muted-foreground font-semibold text-foreground">
                The Services are not intended for children.
              </p>
              <p className="text-muted-foreground">
                We do not knowingly seek to collect personal information from children in violation of applicable law.
              </p>
            </section>

            {/* 20. YOUR RIGHTS */}
            <section id="your-rights" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <UserCheck className="h-5 w-5 text-accent shrink-0" />
                <h2>20. Your Rights</h2>
              </div>
              <p className="text-muted-foreground">
                Depending on applicable law, you may have rights relating to your personal information, including rights to:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Access information",
                  "Correct inaccurate information",
                  "Request deletion",
                  "Withdraw consent where applicable",
                  "Object to certain processing",
                  "Request information regarding processing",
                  "Lodge a complaint",
                  "Exercise other rights provided by applicable law",
                ].map((right, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{right}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                Requests may be submitted using the contact information below.
              </p>
              <p className="text-muted-foreground">
                Certain rights may be subject to applicable legal limitations.
              </p>
            </section>

            {/* 21. DATA PROTECTION REQUESTS */}
            <section id="data-protection-requests" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <h2>21. Data Protection Requests</h2>
              </div>
              <p className="text-muted-foreground">To submit a privacy or data-protection request, contact:</p>
              <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1 text-xs text-muted-foreground">
                <p className="font-bold text-foreground">Skout AI Private Limited</p>
                <p>02-007, 2nd Floor, Emaar, The Palm Square,</p>
                <p>Sector 66, Bhondsi, Gurgaon – 122102, Haryana, India</p>
                <p><span className="font-bold text-foreground">Privacy contact:</span> <a href="mailto:Info@skoutai.io" className="text-accent underline font-mono">Info@skoutai.io</a></p>
              </div>
              <p className="text-muted-foreground text-xs">
                We may need to verify your identity before fulfilling certain requests.
              </p>
            </section>

            {/* 22. CHANGES TO THIS PRIVACY POLICY */}
            <section id="changes-policy" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <RefreshCw className="h-5 w-5 text-accent shrink-0" />
                <h2>22. Changes to This Privacy Policy</h2>
              </div>
              <p className="text-muted-foreground">We may update this Privacy Policy periodically.</p>
              <p className="text-muted-foreground">If we make material changes, we may provide notice through:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Email",
                  "Website notice",
                  "Dashboard notification",
                  "In-product notification",
                  "Other reasonable methods",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground font-medium text-foreground">
                The updated policy will include a revised &quot;Last Updated&quot; date.
              </p>
            </section>

            {/* 23. CONTACT US */}
            <section id="contact-us" className="scroll-mt-28 space-y-4 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-card to-card p-5 sm:p-7 shadow-xl">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Building2 className="h-5 w-5 text-accent shrink-0" />
                <h2>23. Contact Us</h2>
              </div>
              <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-2 text-xs text-muted-foreground">
                <p className="font-bold text-foreground text-sm">Skout AI Private Limited</p>
                <p>02-007, 2nd Floor, Emaar, The Palm Square, Sector 66, Bhondsi, Gurgaon – 122102, Haryana, India</p>
                <p><span className="font-bold text-foreground">CIN:</span> U62099HR2026PTC146861</p>
                <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
                  <div><span className="font-bold text-foreground font-sans">Privacy:</span> <a href="mailto:Info@skoutai.io" className="text-accent underline">Info@skoutai.io</a></div>
                  <div><span className="font-bold text-foreground font-sans">Legal:</span> <a href="mailto:Info@skoutai.io" className="text-accent underline">Info@skoutai.io</a></div>
                  <div><span className="font-bold text-foreground font-sans">Support:</span> <a href="mailto:Info@skoutai.io" className="text-accent underline">Info@skoutai.io</a></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Section>
    </div>
  );
}
