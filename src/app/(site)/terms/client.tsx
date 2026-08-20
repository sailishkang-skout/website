"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Building2,
  CheckCircle2,
  Key,
  CreditCard,
  Zap,
  DollarSign,
  RefreshCw,
  Sliders,
  Database,
  UserCheck,
  Mail,
  ShieldCheck,
  Server,
  Bot,
  AlertTriangle,
  Lock,
  MessageSquare,
  Award,
  Clock,
  Globe,
  AlertOctagon,
  Scale,
  Gavel,
  ChevronRight,
  Menu,
} from "lucide-react";
import { Section, GradientText } from "@/components/site/Section";
import { scrollElementIntoContainer } from "@/lib/scroll-into-container";

const sections = [
  { id: "agreement", title: "1. Agreement to These Terms" },
  { id: "corporate-info", title: "2. Our Corporate Information" },
  { id: "the-services", title: "3. The Services" },
  { id: "eligibility", title: "4. Eligibility" },
  { id: "account-registration", title: "5. Account Registration" },
  { id: "2fa-security-communications", title: "6. 2FA & Security Communications" },
  { id: "subscriptions", title: "7. Subscriptions" },
  { id: "trials-free-services", title: "8. Trials and Free Services" },
  { id: "fees-billing", title: "9. Fees and Billing" },
  { id: "automatic-renewal", title: "10. Automatic Renewal" },
  { id: "credits-usage-limits", title: "11. Credits, Usage and Limits" },
  { id: "your-data", title: "12. Your Data" },
  { id: "customer-representations", title: "13. Customer Representations Regarding Data" },
  { id: "sales-outreach-communications", title: "14. Sales Outreach and Communications" },
  { id: "email-verification-deliverability", title: "15. Email Verification and Deliverability" },
  { id: "third-party-integrations", title: "16. Third-Party Integrations" },
  { id: "ai-features", title: "17. AI Features" },
  { id: "acceptable-use", title: "18. Acceptable Use" },
  { id: "customer-communications-compliance", title: "19. Customer Communications Compliance" },
  { id: "intellectual-property", title: "20. Intellectual Property" },
  { id: "customer-feedback", title: "21. Customer Feedback" },
  { id: "confidentiality", title: "22. Confidentiality" },
  { id: "security-privacy", title: "23. Security and Privacy" },
  { id: "dpas", title: "24. Data Processing Agreements" },
  { id: "suspension", title: "25. Suspension" },
  { id: "termination", title: "26. Termination" },
  { id: "customer-data-after-termination", title: "27. Customer Data After Termination" },
  { id: "service-availability", title: "28. Service Availability" },
  { id: "no-business-outcome-guarantee", title: "29. No Business Outcome Guarantee" },
  { id: "disclaimer-warranties", title: "30. Disclaimer of Warranties" },
  { id: "limitation-liability", title: "31. Limitation of Liability" },
  { id: "indemnification", title: "32. Indemnification" },
  { id: "governing-law", title: "33. Governing Law" },
  { id: "dispute-resolution", title: "34. Dispute Resolution" },
  { id: "changes-terms", title: "35. Changes to These Terms" },
  { id: "electronic-acceptance", title: "36. Electronic Acceptance" },
  { id: "notices", title: "37. Notices" },
  { id: "general", title: "38. General" },
  { id: "entire-agreement", title: "39. Entire Agreement" },
  { id: "contact", title: "40. Contact" },
];

export default function TermsClient() {
  const [activeSection, setActiveSection] = useState("agreement");

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
              <FileText className="h-3.5 w-3.5" />
              <span>SKOUT AI — TERMS OF SERVICE</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
              Terms of <GradientText>Service</GradientText>
            </h1>

            <p className="mx-auto max-w-2xl text-xs sm:text-sm leading-relaxed text-muted-foreground text-center">
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of the websites, applications, software, APIs, SaaS platform, integrations, and related services provided by Skout AI Private Limited (&quot;Skout AI&quot;, &quot;Skout&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
            </p>
          </div>
        </Section>
      </div>

      {/* MAIN CONTENT AREA */}
      <Section className="py-8! md:py-12!">
        {/* MOBILE STICKY INDEX SELECTOR */}
        <div className="block lg:hidden sticky top-16 z-30 mb-6 rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-accent uppercase tracking-wider">
            <Menu className="h-4 w-4" /> Jump to Terms Section
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
                <FileText className="h-4 w-4" /> Navigation Index
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
            {/* 1. AGREEMENT TO THESE TERMS */}
            <section id="agreement" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <FileText className="h-5 w-5 text-accent shrink-0" />
                <h2>1. Agreement to These Terms</h2>
              </div>
              <p className="text-muted-foreground">
                These Terms of Service (&quot;Terms&quot;) govern your access to and use of the websites, applications, software, APIs, SaaS platform, integrations, and related services provided by Skout AI Private Limited (&quot;Skout AI&quot;, &quot;Skout&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
              </p>
              <p className="text-muted-foreground font-medium text-foreground">
                By creating an account, accessing the Services, purchasing a subscription, signing an order form, or otherwise using the Services, you agree to these Terms.
              </p>
              <p className="text-muted-foreground">
                If you use the Services on behalf of a company or organization, you represent that you have authority to bind that organization. In that case, &quot;you&quot; and &quot;your&quot; refer to that organization.
              </p>
            </section>

            {/* 2. OUR CORPORATE INFORMATION */}
            <section id="corporate-info" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Building2 className="h-5 w-5 text-accent shrink-0" />
                <h2>2. Our Corporate Information</h2>
              </div>
              <p className="text-muted-foreground font-semibold text-foreground">
                Skout AI Private Limited is incorporated under the Companies Act, 2013.
              </p>
              <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1.5 text-xs text-muted-foreground">
                <p><span className="font-semibold text-foreground">CIN:</span> U62099HR2026PTC146861</p>
                <p><span className="font-semibold text-foreground">Date of Incorporation:</span> June 20, 2026.</p>
                <p><span className="font-semibold text-foreground">Registered State:</span> Haryana, India</p>
                <p className="pt-1"><span className="font-semibold text-foreground">Registered/Mailing Address:</span></p>
                <p>02-007, 2nd Floor, Emaar, The Palm Square, Sector 66, Bhondsi, Gurgaon – 122102, Haryana, India.</p>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                The company&apos;s constitutional documents authorize activities including software development, IT services, data processing, hosting, SaaS, PaaS, IaaS, proprietary software, licensing, technical support and related services.
              </p>
            </section>

            {/* 3. THE SERVICES */}
            <section id="the-services" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Zap className="h-5 w-5 text-accent shrink-0" />
                <h2>3. The Services</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI provides software and technology services that may include:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Sales intelligence",
                  "Prospect discovery",
                  "Lead generation",
                  "Company intelligence",
                  "Contact enrichment",
                  "Data enrichment",
                  "Email verification",
                  "Email intelligence",
                  "Outbound workflow automation",
                  "Email outreach",
                  "Campaign management",
                  "CRM integrations",
                  "AI-assisted sales functionality",
                  "Analytics",
                  "Reporting",
                  "APIs",
                  "Other sales and business automation functionality",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-xs sm:text-sm">
                The specific features available to you depend on your subscription, plan, usage limits, configuration, and applicable order form.
              </p>
            </section>

            {/* 4. ELIGIBILITY */}
            <section id="eligibility" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <UserCheck className="h-5 w-5 text-accent shrink-0" />
                <h2>4. Eligibility</h2>
              </div>
              <p className="text-muted-foreground">
                You must have legal capacity to enter into these Terms.
              </p>
              <p className="text-muted-foreground">
                If you use Skout AI on behalf of an organization, you represent that you are authorized to do so.
              </p>
              <p className="text-muted-foreground font-medium text-foreground">
                The Services are not intended for individuals under 18 years of age unless otherwise permitted by applicable law and expressly authorized by Skout AI.
              </p>
            </section>

            {/* 5. ACCOUNT REGISTRATION */}
            <section id="account-registration" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Key className="h-5 w-5 text-accent shrink-0" />
                <h2>5. Account Registration</h2>
              </div>
              <p className="text-muted-foreground">
                You must provide accurate and current information when creating an account.
              </p>
              <p className="text-foreground font-semibold">You are responsible for:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Maintaining account security",
                  "Protecting passwords",
                  "Protecting authentication credentials",
                  "Enabling appropriate security controls",
                  "Maintaining accurate account information",
                  "Controlling user access",
                  "Monitoring activity under your account",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground font-medium text-foreground">
                You must notify Skout AI promptly if you suspect unauthorized access.
              </p>
            </section>

            {/* 6. TWO-FACTOR AUTHENTICATION AND SECURITY COMMUNICATIONS */}
            <section id="2fa-security-communications" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Lock className="h-5 w-5 text-accent shrink-0" />
                <h2>6. Two-Factor Authentication and Security Communications</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may require or offer 2FA/MFA and other account-security controls.
              </p>
              <p className="text-muted-foreground">
                By using the Services, you authorize Skout AI to send communications necessary to:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Verify your identity",
                  "Verify your account",
                  "Deliver OTPs",
                  "Complete 2FA",
                  "Recover your account",
                  "Notify you about security events",
                  "Notify you about suspicious activity",
                  "Protect your account",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-xs sm:text-sm italic">
                These communications are operational/security communications and are not treated as optional marketing communications.
              </p>
            </section>

            {/* 7. SUBSCRIPTIONS */}
            <section id="subscriptions" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <CreditCard className="h-5 w-5 text-accent shrink-0" />
                <h2>7. Subscriptions</h2>
              </div>
              <p className="text-muted-foreground">
                Access to certain Services requires a paid subscription.
              </p>
              <p className="text-muted-foreground">Subscription terms may be specified in:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "An order form",
                  "Checkout page",
                  "Pricing page",
                  "Account billing page",
                  "Subscription agreement",
                  "Enterprise agreement",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground pt-1">Your subscription may specify:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Plan",
                  "Number of users",
                  "Usage limits",
                  "Credits",
                  "Data limits",
                  "API limits",
                  "Billing frequency",
                  "Subscription term",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 8. TRIALS AND FREE SERVICES */}
            <section id="trials-free-services" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <GiftIcon className="h-5 w-5 text-accent shrink-0" />
                <h2>8. Trials and Free Services</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may provide free trials, free plans, promotional credits, beta functionality, or other free Services.
              </p>
              <p className="text-muted-foreground">Free or beta functionality may:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Have usage limitations;",
                  "Be modified;",
                  "Be suspended;",
                  "Be discontinued;",
                  "Have limited support;",
                  "Be provided without warranties to the maximum extent permitted by law.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 9. FEES AND BILLING */}
            <section id="fees-billing" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <DollarSign className="h-5 w-5 text-accent shrink-0" />
                <h2>9. Fees and Billing</h2>
              </div>
              <p className="text-foreground font-semibold">
                You agree to pay applicable subscription and usage fees.
              </p>
              <p className="text-muted-foreground">Unless otherwise stated:</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Fees are billed according to your selected billing period.",
                  "Taxes may be added where required.",
                  "Usage-based charges may apply.",
                  "Additional usage may require additional payment.",
                  "Subscription fees generally are non-refundable except where required by law or expressly agreed.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-xs sm:text-sm">
                We may use third-party payment processors. You authorize applicable payment providers to process charges associated with your subscription.
              </p>
            </section>

            {/* 10. AUTOMATIC RENEWAL */}
            <section id="automatic-renewal" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <RefreshCw className="h-5 w-5 text-accent shrink-0" />
                <h2>10. Automatic Renewal</h2>
              </div>
              <p className="text-muted-foreground">
                Unless otherwise stated, paid subscriptions may automatically renew for the applicable renewal period.
              </p>
              <p className="text-muted-foreground font-semibold">Before purchasing, you are responsible for reviewing:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Price",
                  "Billing frequency",
                  "Renewal terms",
                  "Usage limits",
                  "Cancellation terms",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                You may cancel your subscription using the cancellation mechanism provided through the Services or by contacting Skout AI.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Cancellation normally becomes effective at the end of the current paid subscription period unless otherwise required by applicable law or agreed in writing.
              </p>
            </section>

            {/* 11. CREDITS, USAGE AND LIMITS */}
            <section id="credits-usage-limits" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Sliders className="h-5 w-5 text-accent shrink-0" />
                <h2>11. Credits, Usage and Limits</h2>
              </div>
              <p className="text-muted-foreground">Skout AI may provide usage allowances such as:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Credits",
                  "Verification credits",
                  "Enrichment credits",
                  "AI usage",
                  "API requests",
                  "Contacts",
                  "Emails",
                  "Seats",
                  "Storage",
                  "Other usage units",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Unused usage allowances may expire according to the applicable subscription terms and generally have no cash value unless otherwise stated.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Skout AI may apply reasonable limits to protect system stability, security, deliverability, and platform integrity.
              </p>
            </section>

            {/* 12. YOUR DATA */}
            <section id="your-data" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Database className="h-5 w-5 text-accent shrink-0" />
                <h2>12. Your Data</h2>
              </div>
              <p className="text-foreground font-semibold">
                You retain ownership of data that you submit to the Services.
              </p>
              <p className="text-muted-foreground">&quot;Customer Data&quot; may include:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Contacts",
                  "Prospects",
                  "Leads",
                  "CRM records",
                  "Company data",
                  "Email information",
                  "Campaign information",
                  "Files",
                  "Notes",
                  "Communications",
                  "Account information",
                  "Other information submitted by you or your users",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                You grant Skout AI the rights reasonably necessary to host, store, process, transmit, display, analyze, secure, and otherwise use Customer Data to provide and operate the Services.
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">We may also process Customer Data:</p>
                <ul className="space-y-1 list-disc pl-5">
                  <li>To provide requested functionality;</li>
                  <li>To maintain security;</li>
                  <li>To prevent abuse;</li>
                  <li>To troubleshoot;</li>
                  <li>To provide support;</li>
                  <li>To comply with law;</li>
                  <li>To enforce these Terms;</li>
                  <li>As otherwise permitted by the Privacy Policy or applicable agreement.</li>
                </ul>
              </div>
            </section>

            {/* 13. CUSTOMER REPRESENTATIONS REGARDING DATA */}
            <section id="customer-representations" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <UserCheck className="h-5 w-5 text-accent shrink-0" />
                <h2>13. Customer Representations Regarding Data</h2>
              </div>
              <p className="text-muted-foreground font-semibold">
                You represent and warrant that you have all rights, permissions, notices, consents, or other lawful authority necessary for Customer Data you submit to Skout AI.
              </p>
              <p className="text-muted-foreground">
                You are responsible for ensuring that your use of Customer Data complies with applicable law.
              </p>
            </section>

            {/* 14. SALES OUTREACH AND COMMUNICATIONS */}
            <section id="sales-outreach-communications" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <h2>14. Sales Outreach and Communications</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may provide tools that enable users to send email or other communications.
              </p>
              <p className="text-foreground font-semibold">
                You are solely responsible for communications initiated through your account.
              </p>
              <p className="text-muted-foreground">You must ensure that communications comply with applicable:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Anti-spam laws",
                  "Privacy laws",
                  "Data-protection laws",
                  "Marketing laws",
                  "Consumer-protection laws",
                  "Telecommunications laws",
                  "Email-provider rules",
                  "Platform policies",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground font-semibold text-xs sm:text-sm">
                You must not use Skout AI to send unlawful, deceptive, fraudulent, abusive, harassing, or unsolicited communications in violation of applicable law.
              </p>
            </section>

            {/* 15. EMAIL VERIFICATION AND DELIVERABILITY */}
            <section id="email-verification-deliverability" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
                <h2>15. Email Verification and Deliverability</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may provide email verification and deliverability functionality.
              </p>
              <p className="text-muted-foreground">
                Verification results are based on technical signals and available evidence and do not constitute a guarantee that an email address belongs to a particular person, will receive an email, or will accept future communications.
              </p>
              <div className="space-y-1">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">Skout AI does not guarantee:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "Delivery",
                    "Inbox placement",
                    "Open rates",
                    "Reply rates",
                    "Meeting rates",
                    "Lead conversion",
                    "Revenue",
                    "Sender reputation",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 16. THIRD-PARTY INTEGRATIONS */}
            <section id="third-party-integrations" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Server className="h-5 w-5 text-accent shrink-0" />
                <h2>16. Third-Party Integrations</h2>
              </div>
              <p className="text-muted-foreground">
                You may connect Skout AI to third-party services.
              </p>
              <p className="text-muted-foreground">
                You authorize Skout AI to access information reasonably necessary to provide the requested integration.
              </p>
              <p className="text-muted-foreground">
                Third-party services remain subject to their own terms and privacy policies.
              </p>
              <div className="space-y-1">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">Skout AI is not responsible for third-party services, including their:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "Availability",
                    "Security",
                    "Accuracy",
                    "Functionality",
                    "Data practices",
                    "Changes",
                    "Suspension",
                    "Termination",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 17. AI FEATURES */}
            <section id="ai-features" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Bot className="h-5 w-5 text-accent shrink-0" />
                <h2>17. AI Features</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may provide AI-assisted functionality.
              </p>
              <div className="space-y-1">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">AI-generated outputs may contain:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "Errors",
                    "Inaccuracies",
                    "Hallucinations",
                    "Incomplete information",
                    "Outdated information",
                    "Inappropriate recommendations",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-foreground font-medium text-xs sm:text-sm">
                You are responsible for reviewing AI-generated content before relying on, publishing, sending, or acting upon it.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Skout AI does not guarantee that AI-generated content will be accurate, complete, lawful, original, or suitable for a particular purpose.
              </p>
            </section>

            {/* 18. ACCEPTABLE USE */}
            <section id="acceptable-use" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <AlertOctagon className="h-5 w-5 text-accent shrink-0" />
                <h2>18. Acceptable Use</h2>
              </div>
              <p className="text-foreground font-semibold">You must not use the Services to:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Violate applicable law;",
                  "Violate another person's rights;",
                  "Send unlawful spam;",
                  "Conduct fraud;",
                  "Impersonate another person;",
                  "Distribute malware;",
                  "Attempt unauthorized access;",
                  "Circumvent security controls;",
                  "Abuse APIs;",
                  "Circumvent rate limits;",
                  "Reverse engineer the Services except where legally permitted;",
                  "Scrape the Services without authorization;",
                  "Interfere with system availability;",
                  "Conduct security attacks;",
                  "Upload malicious code;",
                  "Use unlawfully obtained contact data;",
                  "Violate third-party platform rules;",
                  "Build a competing service using unauthorized access to Skout AI;",
                  "Abuse email infrastructure;",
                  "Engage in activities that materially threaten Skout AI's security or reputation.",
                ].map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 19. CUSTOMER COMMUNICATIONS COMPLIANCE */}
            <section id="customer-communications-compliance" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <MessageSquare className="h-5 w-5 text-accent shrink-0" />
                <h2>19. Customer Communications Compliance</h2>
              </div>
              <p className="text-muted-foreground">
                You are responsible for determining whether you have the appropriate legal basis and permissions to contact recipients.
              </p>
              <div className="space-y-1">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">You must maintain appropriate:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "Consent where required;",
                    "Opt-out mechanisms;",
                    "Suppression lists;",
                    "Unsubscribe processes;",
                    "Sender identification;",
                    "Contact information;",
                    "Required disclosures.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-foreground font-medium text-xs sm:text-sm">
                Skout AI may suspend campaigns or accounts where activity creates substantial spam, abuse, legal, security, or deliverability risk.
              </p>
            </section>

            {/* 20. INTELLECTUAL PROPERTY */}
            <section id="intellectual-property" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Award className="h-5 w-5 text-accent shrink-0" />
                <h2>20. Intellectual Property</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI and its licensors own all rights in:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Software",
                  "Source code",
                  "Object code",
                  "Algorithms",
                  "Databases",
                  "Interfaces",
                  "Designs",
                  "Workflows",
                  "Documentation",
                  "Trademarks",
                  "Logos",
                  "Service architecture",
                  "Proprietary technology",
                  "Models",
                  "Methodologies",
                  "Other Skout AI intellectual property",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground font-medium text-xs sm:text-sm">
                Except for rights expressly granted under these Terms, no ownership rights are transferred to you.
              </p>
            </section>

            {/* 21. CUSTOMER FEEDBACK */}
            <section id="customer-feedback" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <MessageSquare className="h-5 w-5 text-accent shrink-0" />
                <h2>21. Customer Feedback</h2>
              </div>
              <p className="text-muted-foreground">
                If you provide feedback, ideas, recommendations, or suggestions regarding Skout AI, you grant Skout AI a perpetual, worldwide, royalty-free right to use that feedback to improve or develop the Services.
              </p>
            </section>

            {/* 22. CONFIDENTIALITY */}
            <section id="confidentiality" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Lock className="h-5 w-5 text-accent shrink-0" />
                <h2>22. Confidentiality</h2>
              </div>
              <p className="text-muted-foreground">
                Each party may receive confidential information from the other.
              </p>
              <p className="text-muted-foreground">
                Each party agrees to use reasonable measures to protect confidential information and to use it only for legitimate purposes related to the relationship between the parties.
              </p>
              <div className="space-y-1">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">Confidentiality obligations do not apply to information that:</div>
                <ul className="space-y-1 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "Is publicly available;",
                    "Was already lawfully known;",
                    "Is independently developed;",
                    "Is received lawfully from another source;",
                    "Must be disclosed by law.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Enterprise customers may enter into separate confidentiality or data-processing agreements where appropriate.
              </p>
            </section>

            {/* 23. SECURITY AND PRIVACY */}
            <section id="security-privacy" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
                <h2>23. Security and Privacy</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI maintains security controls designed to protect Customer Data.
              </p>
              <p className="text-muted-foreground">
                The processing of personal data is also governed by our Privacy Policy and, where applicable, a Data Processing Agreement.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm italic">
                In the event of a conflict concerning personal-data processing, the applicable Data Processing Agreement will control to the extent specified in that agreement.
              </p>
            </section>

            {/* 24. DATA PROCESSING AGREEMENTS */}
            <section id="dpas" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <FileText className="h-5 w-5 text-accent shrink-0" />
                <h2>24. Data Processing Agreements</h2>
              </div>
              <p className="text-muted-foreground">
                Customers that require a Data Processing Agreement may request one from Skout AI.
              </p>
              <p className="text-muted-foreground font-medium text-foreground">
                Where applicable, the DPA will govern the processing of personal data performed by Skout AI on behalf of the customer.
              </p>
            </section>

            {/* 25. SUSPENSION */}
            <section id="suspension" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <AlertOctagon className="h-5 w-5 text-accent shrink-0" />
                <h2>25. Suspension</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may suspend or restrict access where reasonably necessary because of:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Non-payment;",
                  "Security risk;",
                  "Abuse;",
                  "Fraud;",
                  "Violation of these Terms;",
                  "Illegal activity;",
                  "Spam;",
                  "Deliverability risk;",
                  "Excessive system usage;",
                  "Third-party provider requirements;",
                  "Legal requirements;",
                  "Risk to other users or the platform.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Where reasonably practicable, we may provide notice before suspension.
              </p>
              <p className="text-foreground font-semibold text-xs sm:text-sm">
                Immediate suspension may occur where necessary to protect the Services or others.
              </p>
            </section>

            {/* 26. TERMINATION */}
            <section id="termination" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Clock className="h-5 w-5 text-accent shrink-0" />
                <h2>26. Termination</h2>
              </div>
              <p className="text-muted-foreground">
                You may terminate your account according to the applicable subscription or cancellation process.
              </p>
              <p className="text-muted-foreground">
                Skout AI may terminate or suspend accounts for material violations of these Terms or where required for legal, security, abuse, or operational reasons.
              </p>
              <p className="text-foreground font-medium text-xs sm:text-sm">
                Following termination, access to the Services will cease.
              </p>
            </section>

            {/* 27. CUSTOMER DATA AFTER TERMINATION */}
            <section id="customer-data-after-termination" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Database className="h-5 w-5 text-accent shrink-0" />
                <h2>27. Customer Data After Termination</h2>
              </div>
              <p className="text-muted-foreground">
                Following termination, Skout AI may provide a reasonable period during which Customer Data may be exported, subject to the applicable plan or agreement.
              </p>
              <p className="text-muted-foreground">
                After the applicable retention/export period, Skout AI may delete Customer Data unless retention is required or permitted by law.
              </p>
              <div className="space-y-1">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">Certain records may be retained for:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "Legal compliance",
                    "Security",
                    "Fraud prevention",
                    "Accounting",
                    "Dispute resolution",
                    "Suppression requirements",
                    "Enforcement of agreements",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 28. SERVICE AVAILABILITY */}
            <section id="service-availability" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Globe className="h-5 w-5 text-accent shrink-0" />
                <h2>28. Service Availability</h2>
              </div>
              <p className="text-muted-foreground">
                We seek to maintain reliable and secure Services but do not guarantee uninterrupted availability.
              </p>
              <div className="space-y-1">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">Services may be affected by:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "Maintenance",
                    "Internet infrastructure",
                    "Cloud providers",
                    "Third-party integrations",
                    "Cybersecurity incidents",
                    "Force majeure events",
                    "Technical failures",
                    "Government action",
                    "Other events outside our reasonable control",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 29. NO BUSINESS OUTCOME GUARANTEE */}
            <section id="no-business-outcome-guarantee" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <AlertTriangle className="h-5 w-5 text-accent shrink-0" />
                <h2>29. No Business Outcome Guarantee</h2>
              </div>
              <p className="text-foreground font-bold">
                Skout AI does not guarantee any particular business outcome.
              </p>
              <div className="space-y-1">
                <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-accent">This includes:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "Number of leads",
                    "Lead quality",
                    "Email deliverability",
                    "Open rates",
                    "Reply rates",
                    "Meetings",
                    "Pipeline",
                    "Sales",
                    "Revenue",
                    "Conversion rates",
                    "Customer acquisition",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 30. DISCLAIMER OF WARRANTIES */}
            <section id="disclaimer-warranties" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Scale className="h-5 w-5 text-accent shrink-0" />
                <h2>30. Disclaimer of Warranties</h2>
              </div>
              <p className="text-foreground font-bold uppercase tracking-wide text-xs sm:text-sm">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot;
              </p>
              <p className="text-foreground font-semibold text-xs sm:text-sm">
                SKOUT AI DISCLAIMS WARRANTIES NOT EXPRESSLY PROVIDED IN THESE TERMS, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, AVAILABILITY, AND ERROR-FREE OPERATION.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                NOTHING IN THESE TERMS EXCLUDES A WARRANTY OR RIGHT THAT CANNOT LAWFULLY BE EXCLUDED.
              </p>
            </section>

            {/* 31. LIMITATION OF LIABILITY */}
            <section id="limitation-liability" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Scale className="h-5 w-5 text-accent shrink-0" />
                <h2>31. Limitation of Liability</h2>
              </div>
              <p className="text-foreground font-semibold text-xs sm:text-sm">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SKOUT AI AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, LICENSORS, AND SERVICE PROVIDERS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOSS OF PROFITS, REVENUE, GOODWILL, DATA, BUSINESS, OR BUSINESS INTERRUPTION.
              </p>
              <p className="text-foreground font-semibold text-xs sm:text-sm">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SKOUT AI&apos;S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THE SERVICES OR THESE TERMS WILL NOT EXCEED THE FEES PAID BY YOU TO SKOUT AI FOR THE SERVICES GIVING RISE TO THE CLAIM DURING THE THREE (3) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Nothing in these Terms limits liability that cannot legally be limited under applicable law.
              </p>
            </section>

            {/* 32. INDEMNIFICATION */}
            <section id="indemnification" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
                <h2>32. Indemnification</h2>
              </div>
              <p className="text-muted-foreground font-medium text-foreground">
                To the extent permitted by applicable law, you agree to defend, indemnify, and hold harmless Skout AI and its affiliates, officers, directors, employees, contractors, and service providers from third-party claims arising from:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Your Customer Data;",
                  "Your use of the Services;",
                  "Communications sent through your account;",
                  "Your violation of these Terms;",
                  "Your violation of applicable law;",
                  "Your violation of third-party rights;",
                  "Your misuse of integrations;",
                  "Your failure to obtain required permissions or consents.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 33. GOVERNING LAW */}
            <section id="governing-law" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Gavel className="h-5 w-5 text-accent shrink-0" />
                <h2>33. Governing Law</h2>
              </div>
              <p className="text-foreground font-semibold">
                These Terms are governed by the laws of India, without regard to conflict-of-law principles, except to the extent applicable law requires otherwise.
              </p>
            </section>

            {/* 34. DISPUTE RESOLUTION */}
            <section id="dispute-resolution" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Gavel className="h-5 w-5 text-accent shrink-0" />
                <h2>34. Dispute Resolution</h2>
              </div>
              <p className="text-muted-foreground">
                Before initiating formal proceedings, the parties should attempt in good faith to resolve disputes through written notice and reasonable discussions.
              </p>
              <p className="text-muted-foreground">
                For disputes that cannot be resolved informally, the courts having appropriate jurisdiction in Gurugram/Gurgaon, Haryana, India, shall have jurisdiction, subject to applicable law and any separate enterprise agreement between the parties.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm italic">
                For enterprise customers, a separately negotiated agreement may specify a different dispute-resolution mechanism.
              </p>
            </section>

            {/* 35. CHANGES TO THESE TERMS */}
            <section id="changes-terms" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <RefreshCw className="h-5 w-5 text-accent shrink-0" />
                <h2>35. Changes to These Terms</h2>
              </div>
              <p className="text-muted-foreground">We may update these Terms from time to time.</p>
              <p className="text-muted-foreground">Material changes may be communicated through:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Email",
                  "Website notification",
                  "Account dashboard",
                  "In-product notice",
                  "Other reasonable means",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground font-medium text-xs sm:text-sm">
                Your continued use of the Services after the effective date of an updated version constitutes acceptance to the extent permitted by law.
              </p>
            </section>

            {/* 36. ELECTRONIC ACCEPTANCE */}
            <section id="electronic-acceptance" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                <h2>36. Electronic Acceptance</h2>
              </div>
              <p className="text-muted-foreground font-medium text-foreground">
                You agree that electronic acceptance of these Terms, including clicking &quot;Accept,&quot; checking a checkbox, signing electronically, creating an account, purchasing a subscription, or using the Services after receiving notice of these Terms, constitutes valid acceptance.
              </p>
            </section>

            {/* 37. NOTICES */}
            <section id="notices" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <h2>37. Notices</h2>
              </div>
              <p className="text-foreground font-semibold text-xs">Legal notices to Skout AI should be directed to:</p>
              <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1 text-xs text-muted-foreground">
                <p className="font-bold text-foreground">Skout AI Private Limited</p>
                <p>02-007, 2nd Floor, Emaar, The Palm Square, Sector 66, Bhondsi, Gurgaon – 122102, Haryana, India</p>
                <p><span className="font-bold text-foreground">Legal contact:</span> <a href="mailto:Info@skoutai.io" className="text-accent underline font-mono">Info@skoutai.io</a></p>
              </div>

              <div className="space-y-1 pt-2">
                <p className="font-semibold text-foreground text-xs">Notices to customers may be delivered by:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                  {[
                    "Email",
                    "Account dashboard",
                    "In-product notification",
                    "Other reasonable electronic means",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 38. GENERAL */}
            <section id="general" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <FileText className="h-5 w-5 text-accent shrink-0" />
                <h2>38. General</h2>
              </div>
              <p className="text-muted-foreground">
                If any provision of these Terms is found unenforceable, the remaining provisions remain effective.
              </p>
              <p className="text-muted-foreground">
                Neither party&apos;s failure to enforce a provision constitutes a waiver.
              </p>
              <p className="text-muted-foreground">
                You may not assign your rights under these Terms without Skout AI&apos;s written consent, except where permitted by applicable law.
              </p>
              <p className="text-muted-foreground">
                Skout AI may assign these Terms in connection with a merger, acquisition, restructuring, financing, sale of assets, or similar transaction.
              </p>
              <p className="text-muted-foreground">
                Neither party is responsible for failure caused by events beyond its reasonable control.
              </p>
            </section>

            {/* 39. ENTIRE AGREEMENT */}
            <section id="entire-agreement" className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <FileText className="h-5 w-5 text-accent shrink-0" />
                <h2>39. Entire Agreement</h2>
              </div>
              <p className="text-muted-foreground font-semibold text-foreground">
                These Terms, together with:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground rounded-xl border border-border/80 bg-background/60 p-4 list-none">
                {[
                  "Privacy Policy",
                  "Data Processing Agreement, where applicable",
                  "Order Form",
                  "Subscription terms",
                  "Acceptable Use Policy",
                  "AI-specific terms, where applicable",
                  "Other expressly incorporated policies",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground font-medium text-xs sm:text-sm">
                constitute the agreement governing your use of the Services.
              </p>
            </section>

            {/* 40. CONTACT */}
            <section id="contact" className="scroll-mt-28 space-y-4 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-card to-card p-5 sm:p-7 shadow-xl">
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <Building2 className="h-5 w-5 text-accent shrink-0" />
                <h2>40. Contact</h2>
              </div>
              <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-2 text-xs text-muted-foreground">
                <p className="font-bold text-foreground text-sm">SKOUT AI PRIVATE LIMITED</p>
                <p><span className="font-bold text-foreground">CIN:</span> U62099HR2026PTC146861</p>
                <p><span className="font-bold text-foreground">Registered/Mailing Address:</span></p>
                <p>02-007, 2nd Floor, Emaar, The Palm Square, Sector 66, Bhondsi, Gurgaon – 122102, Haryana, India</p>
                <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
                  <div><span className="font-bold text-foreground font-sans">Legal:</span> <a href="mailto:Info@skoutai.io" className="text-accent underline">Info@skoutai.io</a></div>
                  <div><span className="font-bold text-foreground font-sans">Privacy:</span> <a href="mailto:Info@skoutai.io" className="text-accent underline">Info@skoutai.io</a></div>
                  <div><span className="font-bold text-foreground font-sans">Support:</span> <a href="mailto:Info@skoutai.io" className="text-accent underline">Info@skoutai.io</a></div>
                  <div><span className="font-bold text-foreground font-sans">Website:</span> <a href="https://skoutai.io" target="_blank" rel="noopener noreferrer" className="text-accent underline">skoutai.io</a></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Section>
    </div>
  );
}

// Helper icon component for Trials & Free Services
function GiftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect width="20" height="5" x="2" y="7" />
      <line x1="12" x2="12" y1="22" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}
