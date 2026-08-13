"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  Globe,
  FileText,
  Bot,
  AlertTriangle,
  Mail,
  UserCheck,
  Server,
  Key,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Menu,
} from "lucide-react";
import { Section, GradientText } from "@/components/site/Section";

const sections = [
  { id: "security-reliability", title: "Security & Reliability" },
  { id: "security-certifications", title: "Security Certifications" },
  { id: "data-privacy", title: "Your Data & Privacy" },
  { id: "prospect-data", title: "Customer-Provided and Prospect Data" },
  { id: "international-processing", title: "International Data Processing" },
  { id: "privacy-framework", title: "Privacy & Data Protection Framework" },
  { id: "licensing-regulatory", title: "Licensing, Permissions & Regulatory Requirements" },
  { id: "account-security", title: "Account Security & Authentication" },
  { id: "service-communications", title: "Service & Transactional Communications" },
  { id: "outbound-compliance", title: "Outbound Communications & Compliance" },
  { id: "responsible-ai", title: "Responsible AI Practices" },
  { id: "third-party-integrations", title: "Third-Party Integrations" },
  { id: "vendors-subprocessors", title: "Vendors & Subprocessors" },
  { id: "dpa", title: "Data Processing Agreement" },
  { id: "incident-response", title: "Security Incident Response" },
  { id: "retention-deletion", title: "Data Retention & Deletion" },
  { id: "compliance-governance", title: "Compliance & Governance" },
  { id: "security-reporting", title: "Security Reporting" },
  { id: "privacy-requests", title: "Privacy Requests" },
  { id: "ongoing-commitment", title: "Ongoing Commitment" },
];

export default function TrustClient() {
  const [activeSection, setActiveSection] = useState("security-reliability");

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
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>TRUST, SECURITY & PRIVACY</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
              Trust, Security & <GradientText>Privacy</GradientText>
            </h1>

            <div className="mx-auto max-w-3xl text-xs sm:text-sm leading-relaxed text-muted-foreground space-y-3 px-2 text-left sm:text-center">
              <p>
                At Skout AI, we understand that our customers rely on our Services to support prospecting, sales intelligence, outbound engagement, workflow automation, communications, and AI-enabled sales operations.
              </p>
              <p>
                Protecting customer data, maintaining platform security, and operating responsibly are fundamental principles of how we design and operate Skout AI.
              </p>
              <p>
                This page explains our approach to security, privacy, data protection, responsible AI, international data processing, account security, and regulatory considerations.
              </p>
              <p className="text-[11px] font-mono italic text-foreground">
                Unless otherwise stated, capitalized terms have the meanings given to them in our Terms of Service.
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
            <Menu className="h-4 w-4" /> Jump to Policy Section
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
                <ShieldCheck className="h-4 w-4" /> Navigation Index
              </div>
              <div className="max-h-[calc(100vh-10rem)] overflow-y-auto space-y-1 text-xs [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {sections.map((s) => {
                  const isActive = activeSection === s.id;
                  return (
                    <button
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

          {/* POLICY CONTENT (GRID COLUMN 8/9) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8 text-xs sm:text-sm leading-relaxed">
            {/* 1. SECURITY & RELIABILITY */}
            <section id="security-reliability" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Server className="h-5 w-5 text-accent shrink-0" />
                <h2>Security & Reliability</h2>
              </div>
              <p className="text-muted-foreground">
                We maintain technical, administrative, and organizational safeguards designed to protect the security, confidentiality, integrity, and availability of the Services.
              </p>
              <p className="text-muted-foreground">
                Skout AI operates using cloud infrastructure and specialized technology providers that support application hosting, databases, storage, communications, authentication, analytics, monitoring, AI functionality, enrichment, and other platform operations.
              </p>
              <p className="text-muted-foreground">
                Depending on the Services and configuration used, data transmitted through Skout AI is protected using encrypted transport protocols.
              </p>
              <p className="text-muted-foreground">
                Access to production systems is restricted to authorized personnel and service providers who have a legitimate operational need to access those systems.
              </p>

              <div className="mt-4 rounded-xl border border-border/80 bg-background/60 p-4 space-y-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">Our security practices may include:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground pt-1 list-none">
                  {[
                    "authentication and access controls;",
                    "role-based permissions;",
                    "multi-factor authentication;",
                    "encryption in transit and, where appropriate, at rest;",
                    "production-access restrictions;",
                    "system logging and monitoring;",
                    "vulnerability management;",
                    "security testing and review;",
                    "backup and recovery procedures;",
                    "infrastructure monitoring;",
                    "incident-response procedures;",
                    "abuse and fraud prevention;",
                    "data retention and deletion controls; and",
                    "vendor and subprocessor security reviews.",
                  ].map((practice, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 text-muted-foreground text-xs sm:text-sm pt-2">
                <p>We regularly review our infrastructure, operational practices, security controls, and technology providers as our Services and technology evolve.</p>
                <p>We maintain incident-response procedures designed to identify, investigate, contain, and remediate security incidents.</p>
                <p>Where required by applicable law or our contractual commitments, we will notify affected customers of confirmed security incidents involving their data.</p>
                <p>No internet-based service can be guaranteed to be completely secure, uninterrupted, or error-free. We nevertheless maintain commercially reasonable safeguards designed to protect the Services and support operational continuity.</p>
                <p className="font-medium text-foreground">Additional security information may be made available to eligible customers upon request and, where appropriate, subject to confidentiality obligations or an NDA.</p>
              </div>
            </section>

            {/* 2. SECURITY CERTIFICATIONS */}
            <section id="security-certifications" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
                <h2>Security Certifications</h2>
              </div>
              <p className="text-foreground font-semibold text-xs sm:text-sm">
                Skout AI is not currently SOC 2 or ISO 27001 certified.
              </p>
              <p className="text-muted-foreground">
                We do not represent or imply that Skout AI has obtained a security certification unless that certification is expressly identified and verifiable.
              </p>
              <p className="text-muted-foreground">
                We continue to develop and mature our security and compliance program as our platform, infrastructure, and customer requirements evolve.
              </p>
            </section>

            {/* 3. YOUR DATA & PRIVACY */}
            <section id="data-privacy" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Lock className="h-5 w-5 text-accent shrink-0" />
                <h2>Your Data & Privacy</h2>
              </div>
              <p className="text-foreground font-semibold">
                You retain ownership of the data and content that you submit to or process through Skout AI, subject to the rights necessary for us to provide the Services.
              </p>

              <div className="space-y-3">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">Depending on how you use Skout AI, information processed through the Services may include:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "account and user information;",
                    "company and business information;",
                    "prospect and contact information;",
                    "professional information;",
                    "email addresses and other contact information;",
                    "CRM and sales data;",
                    "campaign and sequence information;",
                    "communication content and metadata;",
                    "enrichment information;",
                    "workflow and automation data;",
                    "information obtained through authorized integrations;",
                    "authentication and security information;",
                    "billing and subscription information; and",
                    "other information submitted by you or on your behalf.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">We process customer data as necessary to:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "provide and operate the Services;",
                    "maintain and improve the Services;",
                    "provide customer support;",
                    "maintain platform security;",
                    "prevent fraud and abuse;",
                    "authenticate users;",
                    "respond to customer requests;",
                    "operate integrations and connected services;",
                    "process transactions;",
                    "comply with applicable law; and",
                    "perform our contractual and operational obligations.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-emerald-400 font-bold text-xs">
                We do not sell your customer data.
              </div>

              <div className="space-y-2 text-muted-foreground text-xs sm:text-sm">
                <p>Access to customer data is limited to authorized personnel and service providers who have a legitimate business need to access such information, including providing support, maintaining the platform, troubleshooting technical issues, maintaining security, investigating abuse, complying with applicable law, or performing related operational functions.</p>
                <p>Personnel and service providers with access to customer data are subject to appropriate confidentiality and security obligations.</p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">We may generate and use aggregated, anonymized, or appropriately deidentified information that does not reasonably identify a customer or individual for purposes including:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "analytics;",
                    "security;",
                    "fraud and abuse prevention;",
                    "service reliability;",
                    "performance measurement;",
                    "product improvement;",
                    "capacity planning; and",
                    "other lawful business purposes.",
                  ].map((purpose, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{purpose}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm">
                We maintain data retention and deletion practices designed to account for operational requirements, contractual obligations, legal requirements, security considerations, and applicable customer or data-subject requests.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Additional information about our processing of personal information is provided in our Privacy Policy and, where applicable, our Data Processing Agreement.
              </p>
            </section>

            {/* 4. CUSTOMER-PROVIDED AND PROSPECT DATA */}
            <section id="prospect-data" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <UserCheck className="h-5 w-5 text-accent shrink-0" />
                <h2>Customer-Provided and Prospect Data</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI is designed to support sales intelligence, prospecting, enrichment, workflow automation, and outbound communications.
              </p>
              <p className="text-muted-foreground">
                As a result, customers may submit or process information relating to businesses, prospects, contacts, employees, customers, leads, and other individuals.
              </p>
              <p className="text-foreground font-semibold">
                Customers are responsible for ensuring that the information they provide to Skout AI, or instruct Skout AI to process, has been obtained and may be used lawfully.
              </p>

              <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">This includes ensuring, where applicable, that customers have:</div>
                <ul className="space-y-1.5 text-xs text-muted-foreground pt-1 list-none">
                  {[
                    "an appropriate legal basis for processing personal information;",
                    "obtained required consents;",
                    "provided required privacy notices;",
                    "complied with applicable data-source restrictions;",
                    "complied with applicable marketing and communications laws;",
                    "honored individual rights and requests;",
                    "maintained appropriate suppression and opt-out records; and",
                    "obtained any permissions required to use third-party data or integrations.",
                  ].map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm">
                Skout AI provides technical functionality and infrastructure but does not determine the legal basis for a customer's particular processing activities.
              </p>
              <p className="text-foreground font-medium text-xs sm:text-sm">
                Customers remain responsible for determining whether their specific use of prospect, contact, enrichment, or communication data is lawful.
              </p>
            </section>

            {/* 5. INTERNATIONAL DATA PROCESSING */}
            <section id="international-processing" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Globe className="h-5 w-5 text-accent shrink-0" />
                <h2>International Data Processing</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may be used by customers and individuals located in different countries and regions.
              </p>
              <p className="text-muted-foreground">
                Depending on the Services used, your configuration, and the location of our personnel and authorized service providers, information may be processed in countries other than the country in which you or your users are located.
              </p>
              <p className="text-muted-foreground">
                This may include processing in the United States, India, countries within the European Economic Area, the United Kingdom, Canada, Australia, New Zealand, Japan, Singapore, and other jurisdictions where Skout AI or its authorized service providers operate.
              </p>
              <p className="text-muted-foreground">
                Where required by applicable law, Skout AI uses appropriate legal mechanisms and safeguards for international transfers of personal information.
              </p>

              <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">Depending on the circumstances, these mechanisms may include:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground pt-1 list-none">
                  {[
                    "Standard Contractual Clauses (SCCs);",
                    "the UK International Data Transfer Addendum;",
                    "applicable adequacy decisions;",
                    "contractual data-protection commitments;",
                    "appropriate technical and organizational safeguards; and",
                    "other legally recognized international transfer mechanisms.",
                  ].map((mech, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{mech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm">
                The specific mechanism applicable to a particular processing activity may depend on the customer's location, the individuals whose data is processed, the relevant service providers, and applicable law.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Additional information regarding international transfers may be provided through our Data Processing Agreement or upon request.
              </p>
            </section>

            {/* 6. PRIVACY & DATA PROTECTION FRAMEWORK */}
            <section id="privacy-framework" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <FileText className="h-5 w-5 text-accent shrink-0" />
                <h2>Privacy & Data Protection Framework</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI is designed to support responsible processing of personal information and business data.
              </p>
              <p className="text-muted-foreground">
                Depending on your location, the individuals whose information you process, and how you use the Services, applicable requirements may include privacy, data protection, electronic communications, marketing, consumer protection, cybersecurity, and other laws and regulations.
              </p>

              <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent pt-1">Depending on the circumstances, these may include:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { region: "European Union / EEA", desc: "General Data Protection Regulation (GDPR)." },
                  { region: "United Kingdom", desc: "UK GDPR and applicable UK data-protection legislation." },
                  { region: "Switzerland", desc: "applicable Swiss data-protection requirements." },
                  { region: "United States", desc: "applicable federal and state privacy and communications laws, including the CCPA/CPRA where applicable." },
                  { region: "Canada", desc: "applicable federal and provincial privacy requirements;\nCanada's Anti-Spam Legislation (CASL), where applicable." },
                  { region: "Australia", desc: "Privacy Act 1988 and applicable Australian privacy requirements." },
                  { region: "New Zealand", desc: "Privacy Act 2020 and applicable New Zealand requirements." },
                  { region: "China", desc: "applicable privacy and cybersecurity requirements, including the Personal Information Protection Law (PIPL), where applicable." },
                  { region: "Japan", desc: "applicable privacy requirements, including the Act on the Protection of Personal Information (APPI)." },
                  { region: "Singapore", desc: "Personal Data Protection Act (PDPA)." },
                  { region: "Other Jurisdictions", desc: "Other national, regional, state, provincial, or local privacy, data-protection, cybersecurity, marketing, electronic communications, and consumer-protection laws may also apply depending on the circumstances." },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl border border-border/80 bg-background/60 p-3 space-y-1 text-xs">
                    <div className="font-bold text-accent">{item.region}</div>
                    <div className="text-muted-foreground text-[11px] whitespace-pre-line">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-muted-foreground text-xs sm:text-sm pt-2">
                <p>The applicability of a particular law depends on the relevant facts and circumstances.</p>
                <p>Skout AI does not represent that every law listed above applies to every customer or every use of the Services.</p>
                <p className="font-medium text-foreground">Customers are responsible for determining the laws applicable to their particular business, data, recipients, communications, and use of the Services.</p>
                <p>Skout AI provides technical and administrative capabilities designed to support responsible use of the Services but does not provide legal or regulatory advice.</p>
              </div>
            </section>

            {/* 7. LICENSING, PERMISSIONS & REGULATORY REQUIREMENTS */}
            <section id="licensing-regulatory" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <FileText className="h-5 w-5 text-accent shrink-0" />
                <h2>Licensing, Permissions & Regulatory Requirements</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI is a software-as-a-service platform.
              </p>
              <p className="text-muted-foreground">
                Privacy and data-protection laws such as GDPR, UK GDPR, CCPA/CPRA, and similar laws generally establish requirements concerning the processing and protection of personal information rather than operating as a universal license that a SaaS customer must obtain simply to use Skout AI.
              </p>
              <p className="text-muted-foreground">
                Skout AI does not represent that customers need a universal privacy or data-protection license simply to use the platform.
              </p>

              <div className="space-y-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">However, certain activities, industries, jurisdictions, communication channels, or use cases may be subject to additional:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "registrations;",
                    "licenses;",
                    "permits;",
                    "consents;",
                    "sender registrations;",
                    "business verifications;",
                    "telecom requirements;",
                    "contractual requirements; or",
                    "other regulatory obligations.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-accent shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-1">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">These requirements may depend on:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "where the customer operates;",
                    "where recipients are located;",
                    "the type of information being processed;",
                    "the customer's industry;",
                    "the type of communication being sent;",
                    "whether communications are commercial or transactional;",
                    "the communication channel being used;",
                    "applicable telecom requirements;",
                    "applicable marketing and anti-spam requirements; and",
                    "requirements imposed by third-party platforms, mailbox providers, carriers, or service providers.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm">
                Customers are responsible for determining whether their activities require any registration, license, consent, notification, permit, or other authorization.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Where a specific Skout AI feature requires a regulatory authorization, sender registration, verified business identity, third-party approval, or similar requirement, Skout AI may require the customer to provide the information or documentation necessary to enable that feature.
              </p>
              <p className="text-foreground font-medium text-xs sm:text-sm italic">
                Skout AI does not provide legal or regulatory advice and does not guarantee that a customer's particular use of the Services satisfies every legal or regulatory requirement applicable to that customer.
              </p>
            </section>

            {/* 8. ACCOUNT SECURITY & AUTHENTICATION */}
            <section id="account-security" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Key className="h-5 w-5 text-accent shrink-0" />
                <h2>Account Security & Authentication</h2>
              </div>
              <p className="text-muted-foreground">
                Protecting customer accounts is an important part of the Skout AI security architecture.
              </p>
              <p className="text-muted-foreground">
                We may collect and process information necessary to authenticate users, protect accounts, detect suspicious activity, prevent unauthorized access, and support account recovery.
              </p>

              <div className="space-y-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">This information may include:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "email addresses;",
                    "phone numbers;",
                    "authentication identifiers;",
                    "one-time verification codes;",
                    "multi-factor authentication information;",
                    "login events;",
                    "authentication timestamps;",
                    "IP addresses;",
                    "device and browser information;",
                    "session information;",
                    "security events; and",
                    "other information reasonably necessary to protect an account or the Services.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm">
                Skout AI may send account and security communications through supported channels, including email, SMS, authentication applications, push notifications, or other supported mechanisms.
              </p>

              <div className="space-y-2 pt-1">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">These communications may include:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "account verification;",
                    "one-time passwords (OTP);",
                    "two-factor or multi-factor authentication (2FA/MFA);",
                    "password resets;",
                    "account recovery;",
                    "login verification;",
                    "suspicious-login alerts;",
                    "security alerts;",
                    "account-change notifications;",
                    "team invitations;",
                    "integration security notifications; and",
                    "other communications necessary to operate or secure an account.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm">
                These communications are service, transactional, or security communications rather than promotional marketing communications and may be sent even when a user has opted out of promotional communications, subject to applicable law.
              </p>
            </section>

            {/* 9. SERVICE & TRANSACTIONAL COMMUNICATIONS */}
            <section id="service-communications" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <h2>Service & Transactional Communications</h2>
              </div>
              <p className="text-muted-foreground">
                To operate Skout AI, we may send communications relating to your account, subscription, security, usage, integrations, and Services.
              </p>

              <div className="space-y-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">These may include:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "onboarding communications;",
                    "account notifications;",
                    "authentication and security messages;",
                    "OTP and 2FA messages;",
                    "password-reset messages;",
                    "billing and payment notifications;",
                    "subscription and renewal notices;",
                    "product and service notifications;",
                    "credit and usage notifications;",
                    "integration notifications;",
                    "support communications;",
                    "compliance notifications;",
                    "important Terms or Privacy Policy updates;",
                    "security incident notifications; and",
                    "other administrative or transactional communications.",
                  ].map((msg, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{msg}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm">
                These communications are necessary to provide and administer the Services and are distinct from promotional marketing communications.
              </p>
            </section>

            {/* 10. OUTBOUND COMMUNICATIONS & COMPLIANCE */}
            <section id="outbound-compliance" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <AlertTriangle className="h-5 w-5 text-accent shrink-0" />
                <h2>Outbound Communications & Compliance</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may provide functionality that enables customers to create, schedule, personalize, automate, or analyze outbound communications.
              </p>
              <p className="text-foreground font-semibold">
                Customers remain responsible for the communications they send through the Services.
              </p>

              <div className="space-y-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">Customers must ensure that their use of Skout AI complies with applicable:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "anti-spam laws;",
                    "privacy laws;",
                    "marketing laws;",
                    "electronic communications laws;",
                    "consumer-protection requirements;",
                    "telecom requirements;",
                    "platform rules;",
                    "mailbox-provider requirements; and",
                    "other applicable laws and regulations.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm">
                Customers are responsible for ensuring that communications contain required disclosures, sender information, unsubscribe mechanisms, opt-out functionality, and other legally required information.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Customers are also responsible for honoring unsubscribe, objection, suppression, do-not-contact, and similar requests.
              </p>
              <p className="text-foreground font-medium text-xs sm:text-sm">
                Skout AI may restrict, suspend, throttle, or terminate communications activity where we reasonably believe it presents a legal, security, abuse, deliverability, or platform-integrity risk.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Additional requirements are contained in our Terms of Service and Acceptable Use Policy.
              </p>
            </section>

            {/* 11. RESPONSIBLE AI PRACTICES */}
            <section id="responsible-ai" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Bot className="h-5 w-5 text-accent shrink-0" />
                <h2>Responsible AI Practices</h2>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">Skout AI includes AI-enabled functionality designed to support activities such as:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "prospect research;",
                    "lead qualification;",
                    "personalization;",
                    "communication drafting;",
                    "workflow automation;",
                    "classification;",
                    "summarization;",
                    "sales intelligence;",
                    "enrichment;",
                    "recommendations; and",
                    "other sales and productivity functions.",
                  ].map((func, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                      <span>{func}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm">
                We design and operate AI functionality with a focus on transparency, reliability, security, privacy, and responsible use.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Some AI features may rely on authorized third-party AI providers.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Where third-party AI providers are used, information submitted through an AI feature may be processed by those providers as necessary to provide the requested functionality.
              </p>

              <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 text-indigo-300 font-semibold text-xs">
                We do not use customer data to train generalized artificial-intelligence or machine-learning models for the benefit of other customers unless expressly agreed in writing.
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm">
                AI-generated content may contain inaccurate, incomplete, outdated, or unintended information.
              </p>
              <p className="text-foreground font-medium text-xs sm:text-sm">
                Customers remain responsible for reviewing AI-generated content and determining whether it is appropriate before sending, publishing, relying upon, or otherwise using it.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm italic">
                Additional requirements relating to AI functionality may be described in our AI Terms.
              </p>
            </section>

            {/* 12. THIRD-PARTY INTEGRATIONS */}
            <section id="third-party-integrations" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <ExternalLink className="h-5 w-5 text-accent shrink-0" />
                <h2>Third-Party Integrations</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may integrate with third-party services, including CRM systems, email providers, calendars, communication platforms, data providers, enrichment providers, analytics services, AI providers, and other business applications.
              </p>
              <p className="text-muted-foreground">
                When you connect a third-party service, you authorize Skout AI to access and process information from that service as necessary to provide the functionality you have enabled.
              </p>
              <p className="text-muted-foreground">
                Your use of third-party services remains subject to the terms and policies of those third parties.
              </p>
              <p className="text-muted-foreground">
                Skout AI does not control and is not responsible for the availability, accuracy, security, privacy practices, or continued operation of third-party services.
              </p>
              <p className="text-foreground font-medium text-xs sm:text-sm">
                Customers are responsible for ensuring that they have the necessary permissions and authorizations to connect third-party services to Skout AI.
              </p>
            </section>

            {/* 13. VENDORS & SUBPROCESSORS */}
            <section id="vendors-subprocessors" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Server className="h-5 w-5 text-accent shrink-0" />
                <h2>Vendors & Subprocessors</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI works with specialized technology providers and subprocessors that help us operate, secure, support, and improve the Services.
              </p>

              <div className="space-y-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">Depending on the Services and features used, these providers may support:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "cloud infrastructure;",
                    "databases and storage;",
                    "authentication;",
                    "email and communications;",
                    "SMS and messaging;",
                    "analytics;",
                    "monitoring;",
                    "customer support;",
                    "AI functionality;",
                    "enrichment;",
                    "data processing;",
                    "integrations;",
                    "security;",
                    "payment processing; and",
                    "other operational functions.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm">
                Our subprocessors are authorized to process customer data only as necessary to provide their contracted services.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Where appropriate, we maintain contractual confidentiality, privacy, security, and data-processing protections with our service providers.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Our subprocessors may change as Skout AI's technology stack and Services evolve.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Information regarding current subprocessors may be provided through our Subprocessor List, Data Processing Agreement, customer documentation, or upon request.
              </p>
            </section>

            {/* 14. DATA PROCESSING AGREEMENT */}
            <section id="dpa" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <FileText className="h-5 w-5 text-accent shrink-0" />
                <h2>Data Processing Agreement</h2>
              </div>
              <p className="text-muted-foreground">
                For customers that process personal information through Skout AI in circumstances where a Data Processing Agreement is required or appropriate, Skout AI may provide a Data Processing Agreement (DPA) addressing matters including:
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "processing instructions;",
                  "roles and responsibilities;",
                  "confidentiality;",
                  "security measures;",
                  "subprocessors;",
                  "international data transfers;",
                  "data-subject rights;",
                  "security incidents;",
                  "retention and deletion;",
                  "assistance with applicable privacy obligations; and",
                  "other contractual data-protection requirements.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-foreground font-semibold text-xs sm:text-sm">
                Enterprise customers may contact our privacy or legal team regarding DPA requirements.
              </p>
            </section>

            {/* 15. SECURITY INCIDENT RESPONSE */}
            <section id="incident-response" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
                <h2>Security Incident Response</h2>
              </div>
              <p className="text-muted-foreground">
                We maintain procedures designed to detect, investigate, contain, remediate, and learn from security incidents.
              </p>
              <p className="text-muted-foreground">
                If Skout AI determines that a confirmed security incident has occurred involving customer data, we will provide notice where required by applicable law or contractual obligations.
              </p>

              <div className="space-y-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">Our response may include:</div>
                <ul className="space-y-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "identifying and assessing the incident;",
                    "containing affected systems;",
                    "investigating the nature and scope of the incident;",
                    "taking appropriate remediation measures;",
                    "communicating with affected customers where required; and",
                    "implementing corrective and preventive measures.",
                  ].map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 16. DATA RETENTION & DELETION */}
            <section id="retention-deletion" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Lock className="h-5 w-5 text-accent shrink-0" />
                <h2>Data Retention & Deletion</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI maintains data retention and deletion practices designed to balance operational requirements, security, contractual obligations, and applicable legal requirements.
              </p>

              <div className="space-y-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">Retention periods may vary depending on:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "the type of information;",
                    "the purpose for which it was collected;",
                    "the Services being used;",
                    "account status;",
                    "customer configuration;",
                    "legal requirements;",
                    "security requirements; and",
                    "applicable contractual obligations.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm">
                When information is no longer required for legitimate business, contractual, security, or legal purposes, it may be deleted, anonymized, or otherwise handled in accordance with our applicable retention procedures.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Additional retention and deletion terms may be specified in our Privacy Policy, Data Processing Agreement, or applicable customer agreement.
              </p>
            </section>

            {/* 17. COMPLIANCE & GOVERNANCE */}
            <section id="compliance-governance" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Globe className="h-5 w-5 text-accent shrink-0" />
                <h2>Compliance & Governance</h2>
              </div>
              <p className="text-muted-foreground">
                We maintain contractual, technical, and operational practices intended to support responsible data handling throughout the Services.
              </p>
              <p className="text-muted-foreground">
                Our compliance program is designed to evolve as Skout AI expands into additional markets, products, technologies, and regulatory environments.
              </p>
              <p className="text-muted-foreground font-medium text-foreground">
                Skout AI is designed to support customers operating across major international markets, including:
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "North America;",
                  "the European Union and EEA;",
                  "the United Kingdom;",
                  "Canada;",
                  "Australia;",
                  "New Zealand;",
                  "India;",
                  "Japan;",
                  "Singapore; and",
                  "other jurisdictions,",
                ].map((jurisdiction, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{jurisdiction}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-xs">
                subject to applicable laws, service availability, third-party provider requirements, and customer configuration.
              </p>

              <p className="text-muted-foreground text-xs sm:text-sm italic">
                Nothing on this page constitutes legal advice or guarantees that a customer's particular use of Skout AI complies with every law applicable to that customer.
              </p>
            </section>

            {/* 18. SECURITY REPORTING */}
            <section id="security-reporting" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <h2>Security Reporting</h2>
              </div>
              <p className="text-muted-foreground">
                We encourage responsible disclosure of potential vulnerabilities, security issues, or privacy concerns affecting Skout AI.
              </p>
              <p className="font-semibold text-foreground text-xs">Security concerns can be reported to:</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1">
                  <div className="font-bold text-foreground text-xs">Security:</div>
                  <a href="mailto:security@skoutai.io" className="text-accent font-mono text-xs hover:underline">
                    security@skoutai.io
                  </a>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1">
                  <div className="font-bold text-foreground text-xs">Privacy & Data Protection:</div>
                  <a href="mailto:privacy@skoutai.io" className="text-accent font-mono text-xs hover:underline">
                    privacy@skoutai.io
                  </a>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1">
                  <div className="font-bold text-foreground text-xs">Legal:</div>
                  <a href="mailto:legal@skoutai.io" className="text-accent font-mono text-xs hover:underline">
                    legal@skoutai.io
                  </a>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1">
                  <div className="font-bold text-foreground text-xs">Customer Support:</div>
                  <a href="mailto:support@skoutai.io" className="text-accent font-mono text-xs hover:underline">
                    support@skoutai.io
                  </a>
                </div>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm pt-1">
                When reporting a security issue, please provide enough information for our team to understand and investigate the potential vulnerability where possible.
              </p>
            </section>

            {/* 19. PRIVACY REQUESTS */}
            <section id="privacy-requests" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Lock className="h-5 w-5 text-accent shrink-0" />
                <h2>Privacy Requests</h2>
              </div>
              <p className="font-semibold text-foreground text-xs">Privacy-related requests may be submitted to:</p>
              <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1 w-fit">
                <a href="mailto:privacy@skoutai.io" className="text-accent font-mono text-xs sm:text-sm font-bold hover:underline">
                  privacy@skoutai.io
                </a>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Depending on applicable law and the nature of the request, we may need to verify the identity or authority of the requester before processing the request.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Customers may also use the contact methods described in our Privacy Policy and Data Processing Agreement, where applicable.
              </p>
            </section>

            {/* 20. ONGOING COMMITMENT */}
            <section id="ongoing-commitment" className="scroll-mt-28 space-y-4 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-card to-card p-5 sm:p-7 shadow-xl">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                <h2>Ongoing Commitment</h2>
              </div>
              <p className="text-muted-foreground font-semibold">
                Trust, security, privacy, and responsible AI are ongoing responsibilities.
              </p>

              <div className="space-y-2">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">As Skout AI grows, we will continue to evaluate and improve our:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "security controls;",
                    "privacy practices;",
                    "infrastructure;",
                    "access controls;",
                    "vendor management;",
                    "incident-response processes;",
                    "data governance;",
                    "AI safeguards;",
                    "compliance processes; and",
                    "customer-facing security documentation.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-foreground font-medium text-xs sm:text-sm leading-relaxed">
                Our objective is to build Skout AI so customers can confidently use the platform for prospecting, sales intelligence, outbound engagement, workflow automation, and AI-enabled sales operations while maintaining appropriate control over their data and communications.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </div>
  );
}
