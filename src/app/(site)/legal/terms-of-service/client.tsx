"use client";

import { useState, useEffect } from "react";
import { FileText, Menu, ChevronRight, CheckCircle2 } from "lucide-react";
import { Section, GradientText } from "@/components/site/Section";

const sections = [
  { id: "agreement-to-terms", title: "Agreement to These Terms" },
  { id: "corporate-information", title: "Our Corporate Information" },
  { id: "the-services", title: "The Services" },
  { id: "eligibility", title: "Eligibility" },
  { id: "account-registration", title: "Account Registration" },
  { id: "2fa-security", title: "2FA & Security Communications" },
  { id: "subscriptions", title: "Subscriptions" },
  { id: "trials-free-services", title: "Trials and Free Services" },
  { id: "fees-billing", title: "Fees and Billing" },
  { id: "automatic-renewal", title: "Automatic Renewal" },
  { id: "credits-usage-limits", title: "Credits, Usage and Limits" },
  { id: "your-data", title: "Your Data" },
  { id: "customer-data-representations", title: "Customer Representations Regarding Data" },
  { id: "sales-outreach", title: "Sales Outreach and Communications" },
  { id: "email-verification", title: "Email Verification and Deliverability" },
  { id: "third-party-integrations", title: "Third-Party Integrations" },
  { id: "ai-features", title: "AI Features" },
  { id: "acceptable-use", title: "Acceptable Use" },
  { id: "communications-compliance", title: "Customer Communications Compliance" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "customer-feedback", title: "Customer Feedback" },
  { id: "confidentiality", title: "Confidentiality" },
  { id: "security-privacy", title: "Security and Privacy" },
  { id: "dpa", title: "Data Processing Agreements" },
  { id: "suspension", title: "Suspension" },
  { id: "termination", title: "Termination" },
  { id: "customer-data-after-termination", title: "Customer Data After Termination" },
  { id: "service-availability", title: "Service Availability" },
  { id: "no-guarantee", title: "No Business Outcome Guarantee" },
  { id: "disclaimer-warranties", title: "Disclaimer of Warranties" },
  { id: "limitation-liability", title: "Limitation of Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "governing-law", title: "Governing Law" },
  { id: "dispute-resolution", title: "Dispute Resolution" },
  { id: "changes-to-terms", title: "Changes to These Terms" },
  { id: "electronic-acceptance", title: "Electronic Acceptance" },
  { id: "notices", title: "Notices" },
  { id: "general", title: "General" },
  { id: "entire-agreement", title: "Entire Agreement" },
  { id: "contact", title: "Contact" },
];

export default function Client() {
  const [activeSection, setActiveSection] = useState("agreement-to-terms");

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

  useEffect(() => {
    if (!activeSection) return;
    const activeBtn = document.getElementById(`nav-btn-${activeSection}`);
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
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
              <span>TERMS OF SERVICE</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
              Terms of <GradientText>Service</GradientText>
            </h1>

            <div className="mx-auto max-w-3xl text-xs sm:text-sm leading-relaxed text-muted-foreground space-y-3 px-2 text-left sm:text-center">
              <p>
                These Terms of Service ("Terms") govern your access to and use of the websites,
                applications, software, APIs, SaaS platform, integrations, and related services
                provided by Skout AI Private Limited ("Skout AI", "Skout", "we", "us", or "our").
              </p>
              <p className="text-[11px] font-mono italic text-foreground">
                Unless otherwise stated, capitalized terms have the meanings given to them in these
                Terms.
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
              <div className="max-h-[calc(100vh-10rem)] overflow-y-auto space-y-1 text-xs scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                      <ChevronRight
                        className={`h-3 w-3 shrink-0 transition-transform ${isActive ? "text-accent translate-x-0.5" : "opacity-40"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* POLICY CONTENT (GRID COLUMN 8/9) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8 text-xs sm:text-sm leading-relaxed">
            {/* 1. AGREEMENT TO THESE TERMS */}
            <section
              id="agreement-to-terms"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>1. Agreement to These Terms</h2>
              </div>
              <p className="text-muted-foreground">
                These Terms of Service ("Terms") govern your access to and use of the websites,
                applications, software, APIs, SaaS platform, integrations, and related services
                provided by Skout AI Private Limited ("Skout AI", "Skout", "we", "us", or "our").
              </p>
              <p className="text-muted-foreground">
                By creating an account, accessing the Services, purchasing a subscription, signing
                an order form, or otherwise using the Services, you agree to these Terms.
              </p>
              <p className="text-muted-foreground">
                If you use the Services on behalf of a company or organization, you represent that
                you have authority to bind that organization. In that case, "you" and "your" refer
                to that organization.
              </p>
            </section>

            {/* 2. OUR CORPORATE INFORMATION */}
            <section
              id="corporate-information"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>2. Our Corporate Information</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI Private Limited is incorporated under the Companies Act, 2013.
              </p>
              <p className="text-muted-foreground">CIN: U62099HR2026PTC146861</p>
              <p className="text-muted-foreground">Date of Incorporation: June 20, 2026.</p>
              <p className="text-muted-foreground">Registered State: Haryana, India</p>
              <p className="text-muted-foreground">
                Registered/Mailing Address: 02-007, 2nd Floor, Emaar, The Palm Square, Sector 66,
                Bhondsi, Gurgaon – 122102, Haryana, India.
              </p>
              <p className="text-muted-foreground">
                The company's constitutional documents authorize activities including software
                development, IT services, data processing, hosting, SaaS, PaaS, IaaS, proprietary
                software, licensing, technical support and related services.
              </p>
            </section>

            {/* 3. THE SERVICES */}
            <section
              id="the-services"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>3. The Services</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI provides software and technology services that may include:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground pt-1 list-none">
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
                ].map((service, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                The specific features available to you depend on your subscription, plan, usage
                limits, configuration, and applicable order form.
              </p>
            </section>

            {/* 4. ELIGIBILITY */}
            <section
              id="eligibility"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>4. Eligibility</h2>
              </div>
              <p className="text-muted-foreground">
                You must have legal capacity to enter into these Terms.
              </p>
              <p className="text-muted-foreground">
                If you use Skout AI on behalf of an organization, you represent that you are
                authorized to do so.
              </p>
              <p className="text-muted-foreground">
                The Services are not intended for individuals under 18 years of age unless otherwise
                permitted by applicable law and expressly authorized by Skout AI.
              </p>
            </section>

            {/* 5. ACCOUNT REGISTRATION */}
            <section
              id="account-registration"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>5. Account Registration</h2>
              </div>
              <p className="text-muted-foreground">
                You must provide accurate and current information when creating an account.
              </p>
              <p className="text-muted-foreground">You are responsible for:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Maintaining account security</li>
                <li>Protecting passwords</li>
                <li>Protecting authentication credentials</li>
                <li>Enabling appropriate security controls</li>
                <li>Maintaining accurate account information</li>
                <li>Controlling user access</li>
                <li>Monitoring activity under your account</li>
              </ul>
              <p className="text-muted-foreground">
                You must notify Skout AI promptly if you suspect unauthorized access.
              </p>
            </section>

            {/* 6. 2FA & SECURITY COMMUNICATIONS */}
            <section
              id="2fa-security"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>6. Two-Factor Authentication and Security Communications</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may require or offer 2FA/MFA and other account-security controls.
              </p>
              <p className="text-muted-foreground">
                By using the Services, you authorize Skout AI to send communications necessary to:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground pt-1 list-none">
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
              <p className="text-muted-foreground">
                These communications are operational/security communications and are not treated as
                optional marketing communications.
              </p>
            </section>

            {/* 7. SUBSCRIPTIONS */}
            <section
              id="subscriptions"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>7. Subscriptions</h2>
              </div>
              <p className="text-muted-foreground">
                Access to certain Services requires a paid subscription.
              </p>
              <p className="text-muted-foreground">Subscription terms may be specified in:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>An order form</li>
                <li>Checkout page</li>
                <li>Pricing page</li>
                <li>Account billing page</li>
                <li>Subscription agreement</li>
                <li>Enterprise agreement</li>
              </ul>
              <p className="text-muted-foreground">Your subscription may specify:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Plan</li>
                <li>Number of users</li>
                <li>Usage limits</li>
                <li>Credits</li>
                <li>Data limits</li>
                <li>API limits</li>
                <li>Billing frequency</li>
                <li>Subscription term</li>
              </ul>
            </section>

            {/* 8. TRIALS AND FREE SERVICES */}
            <section
              id="trials-free-services"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>8. Trials and Free Services</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may provide free trials, free plans, promotional credits, beta
                functionality, or other free Services.
              </p>
              <p className="text-muted-foreground">Free or beta functionality may:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Have usage limitations;</li>
                <li>Be modified;</li>
                <li>Be suspended;</li>
                <li>Be discontinued;</li>
                <li>Have limited support;</li>
                <li>Be provided without warranties to the maximum extent permitted by law.</li>
              </ul>
            </section>

            {/* 9. FEES AND BILLING */}
            <section
              id="fees-billing"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>9. Fees and Billing</h2>
              </div>
              <p className="text-muted-foreground">
                You agree to pay applicable subscription and usage fees.
              </p>
              <p className="text-muted-foreground">Unless otherwise stated:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Fees are billed according to your selected billing period.</li>
                <li>Taxes may be added where required.</li>
                <li>Usage-based charges may apply.</li>
                <li>Additional usage may require additional payment.</li>
                <li>
                  Subscription fees generally are non-refundable except where required by law or
                  expressly agreed.
                </li>
              </ul>
              <p className="text-muted-foreground">
                We may use third-party payment processors. You authorize applicable payment
                providers to process charges associated with your subscription.
              </p>
            </section>

            {/* 10. AUTOMATIC RENEWAL */}
            <section
              id="automatic-renewal"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>10. Automatic Renewal</h2>
              </div>
              <p className="text-muted-foreground">
                Unless otherwise stated, paid subscriptions may automatically renew for the
                applicable renewal period.
              </p>
              <p className="text-muted-foreground">
                Before purchasing, you are responsible for reviewing:
              </p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Price</li>
                <li>Billing frequency</li>
                <li>Renewal terms</li>
                <li>Usage limits</li>
                <li>Cancellation terms</li>
              </ul>
              <p className="text-muted-foreground">
                You may cancel your subscription using the cancellation mechanism provided through
                the Services or by contacting Skout AI.
              </p>
              <p className="text-muted-foreground">
                Cancellation normally becomes effective at the end of the current paid subscription
                period unless otherwise required by applicable law or agreed in writing.
              </p>
            </section>

            {/* 11. CREDITS, USAGE AND LIMITS */}
            <section
              id="credits-usage-limits"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>11. Credits, Usage and Limits</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may provide usage allowances such as:
              </p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Credits</li>
                <li>Verification credits</li>
                <li>Enrichment credits</li>
                <li>AI usage</li>
                <li>API requests</li>
                <li>Contacts</li>
                <li>Emails</li>
                <li>Seats</li>
                <li>Storage</li>
                <li>Other usage units</li>
              </ul>
              <p className="text-muted-foreground">
                Unused usage allowances may expire according to the applicable subscription terms
                and generally have no cash value unless otherwise stated.
              </p>
              <p className="text-muted-foreground">
                Skout AI may apply reasonable limits to protect system stability, security,
                deliverability, and platform integrity.
              </p>
            </section>

            {/* 12. YOUR DATA */}
            <section
              id="your-data"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>12. Your Data</h2>
              </div>
              <p className="text-muted-foreground">
                You retain ownership of data that you submit to the Services.
              </p>
              <p className="text-muted-foreground">"Customer Data" may include:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Contacts</li>
                <li>Prospects</li>
                <li>Leads</li>
                <li>CRM records</li>
                <li>Company data</li>
                <li>Email information</li>
                <li>Campaign information</li>
                <li>Files</li>
                <li>Notes</li>
                <li>Communications</li>
                <li>Account information</li>
                <li>Other information submitted by you or your users</li>
              </ul>
              <p className="text-muted-foreground">
                You grant Skout AI the rights reasonably necessary to host, store, process,
                transmit, display, analyze, secure, and otherwise use Customer Data to provide and
                operate the Services.
              </p>
              <p className="text-muted-foreground">We may also process Customer Data:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>To provide requested functionality;</li>
                <li>To maintain security;</li>
                <li>To prevent abuse;</li>
                <li>To troubleshoot;</li>
                <li>To provide support;</li>
                <li>To comply with law;</li>
                <li>To enforce these Terms;</li>
                <li>As otherwise permitted by the Privacy Policy or applicable agreement.</li>
              </ul>
            </section>

            {/* 13. CUSTOMER REPRESENTATIONS REGARDING DATA */}
            <section
              id="customer-data-representations"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>13. Customer Representations Regarding Data</h2>
              </div>
              <p className="text-muted-foreground">
                You represent and warrant that you have all rights, permissions, notices, consents,
                or other lawful authority necessary for Customer Data you submit to Skout AI.
              </p>
              <p className="text-muted-foreground">
                You are responsible for ensuring that your use of Customer Data complies with
                applicable law.
              </p>
            </section>

            {/* 14. SALES OUTREACH AND COMMUNICATIONS */}
            <section
              id="sales-outreach"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>14. Sales Outreach and Communications</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may provide tools that enable users to send email or other communications.
              </p>
              <p className="text-muted-foreground">
                You are solely responsible for communications initiated through your account.
              </p>
              <p className="text-muted-foreground">
                You must ensure that communications comply with applicable:
              </p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Anti-spam laws</li>
                <li>Privacy laws</li>
                <li>Data-protection laws</li>
                <li>Marketing laws</li>
                <li>Consumer-protection laws</li>
                <li>Telecommunications laws</li>
                <li>Email-provider rules</li>
                <li>Platform policies</li>
              </ul>
              <p className="text-muted-foreground">
                You must not use Skout AI to send unlawful, deceptive, fraudulent, abusive,
                harassing, or unsolicited communications in violation of applicable law.
              </p>
            </section>

            {/* 15. EMAIL VERIFICATION AND DELIVERABILITY */}
            <section
              id="email-verification"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>15. Email Verification and Deliverability</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may provide email verification and deliverability functionality.
              </p>
              <p className="text-muted-foreground">
                Verification results are based on technical signals and available evidence and do
                not constitute a guarantee that an email address belongs to a particular person,
                will receive an email, or will accept future communications.
              </p>
              <p className="text-muted-foreground">Skout AI does not guarantee:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Delivery</li>
                <li>Inbox placement</li>
                <li>Open rates</li>
                <li>Reply rates</li>
                <li>Meeting rates</li>
                <li>Lead conversion</li>
                <li>Revenue</li>
                <li>Sender reputation</li>
              </ul>
            </section>

            {/* 16. THIRD-PARTY INTEGRATIONS */}
            <section
              id="third-party-integrations"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>16. Third-Party Integrations</h2>
              </div>
              <p className="text-muted-foreground">
                You may connect Skout AI to third-party services.
              </p>
              <p className="text-muted-foreground">
                You authorize Skout AI to access information reasonably necessary to provide the
                requested integration.
              </p>
              <p className="text-muted-foreground">
                Third-party services remain subject to their own terms and privacy policies.
              </p>
              <p className="text-muted-foreground">
                Skout AI is not responsible for third-party services, including their:
              </p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Availability</li>
                <li>Security</li>
                <li>Accuracy</li>
                <li>Functionality</li>
                <li>Data practices</li>
                <li>Changes</li>
                <li>Suspension</li>
                <li>Termination</li>
              </ul>
            </section>

            {/* 17. AI FEATURES */}
            <section
              id="ai-features"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>17. AI Features</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may provide AI-assisted functionality.
              </p>
              <p className="text-muted-foreground">AI-generated outputs may contain:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Errors</li>
                <li>Inaccuracies</li>
                <li>Hallucinations</li>
                <li>Incomplete information</li>
                <li>Outdated information</li>
                <li>Inappropriate recommendations</li>
              </ul>
              <p className="text-muted-foreground">
                You are responsible for reviewing AI-generated content before relying on,
                publishing, sending, or acting upon it.
              </p>
              <p className="text-muted-foreground">
                Skout AI does not guarantee that AI-generated content will be accurate, complete,
                lawful, original, or suitable for a particular purpose.
              </p>
            </section>

            {/* 18. ACCEPTABLE USE */}
            <section
              id="acceptable-use"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>18. Acceptable Use</h2>
              </div>
              <p className="text-muted-foreground">You must not use the Services to:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Violate applicable law;</li>
                <li>Violate another person's rights;</li>
                <li>Send unlawful spam;</li>
                <li>Conduct fraud;</li>
                <li>Impersonate another person;</li>
                <li>Distribute malware;</li>
                <li>Attempt unauthorized access;</li>
                <li>Circumvent security controls;</li>
                <li>Abuse APIs;</li>
                <li>Circumvent rate limits;</li>
                <li>Reverse engineer the Services except where legally permitted;</li>
                <li>Scrape the Services without authorization;</li>
                <li>Interfere with system availability;</li>
                <li>Conduct security attacks;</li>
                <li>Upload malicious code;</li>
                <li>Use unlawfully obtained contact data;</li>
                <li>Violate third-party platform rules;</li>
                <li>Build a competing service using unauthorized access to Skout AI;</li>
                <li>Abuse email infrastructure;</li>
                <li>
                  Engage in activities that materially threaten Skout AI's security or reputation.
                </li>
              </ul>
            </section>

            {/* 19. CUSTOMER COMMUNICATIONS COMPLIANCE */}
            <section
              id="communications-compliance"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>19. Customer Communications Compliance</h2>
              </div>
              <p className="text-muted-foreground">
                You are responsible for determining whether you have the appropriate legal basis and
                permissions to contact recipients.
              </p>
              <p className="text-muted-foreground">You must maintain appropriate:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Consent where required;</li>
                <li>Opt-out mechanisms;</li>
                <li>Suppression lists;</li>
                <li>Unsubscribe processes;</li>
                <li>Sender identification;</li>
                <li>Contact information;</li>
                <li>Required disclosures.</li>
              </ul>
              <p className="text-muted-foreground">
                Skout AI may suspend campaigns or accounts where activity creates substantial spam,
                abuse, legal, security, or deliverability risk.
              </p>
            </section>

            {/* 20. INTELLECTUAL PROPERTY */}
            <section
              id="intellectual-property"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>20. Intellectual Property</h2>
              </div>
              <p className="text-muted-foreground">Skout AI and its licensors own all rights in:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Software</li>
                <li>Source code</li>
                <li>Object code</li>
                <li>Algorithms</li>
                <li>Databases</li>
                <li>Interfaces</li>
                <li>Designs</li>
                <li>Workflows</li>
                <li>Documentation</li>
                <li>Trademarks</li>
                <li>Logos</li>
                <li>Service architecture</li>
                <li>Proprietary technology</li>
                <li>Models</li>
                <li>Methodologies</li>
                <li>Other Skout AI intellectual property</li>
              </ul>
              <p className="text-muted-foreground">
                Except for rights expressly granted under these Terms, no ownership rights are
                transferred to you.
              </p>
            </section>

            {/* 21. CUSTOMER FEEDBACK */}
            <section
              id="customer-feedback"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>21. Customer Feedback</h2>
              </div>
              <p className="text-muted-foreground">
                If you provide feedback, ideas, recommendations, or suggestions regarding Skout AI,
                you grant Skout AI a perpetual, worldwide, royalty-free right to use that feedback
                to improve or develop the Services.
              </p>
            </section>

            {/* 22. CONFIDENTIALITY */}
            <section
              id="confidentiality"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>22. Confidentiality</h2>
              </div>
              <p className="text-muted-foreground">
                Each party may receive confidential information from the other.
              </p>
              <p className="text-muted-foreground">
                Each party agrees to use reasonable measures to protect confidential information and
                to use it only for legitimate purposes related to the relationship between the
                parties.
              </p>
              <p className="text-muted-foreground">
                Confidentiality obligations do not apply to information that:
              </p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Is publicly available;</li>
                <li>Was already lawfully known;</li>
                <li>Is independently developed;</li>
                <li>Is received lawfully from another source;</li>
                <li>Must be disclosed by law.</li>
              </ul>
              <p className="text-muted-foreground">
                Enterprise customers may enter into separate confidentiality or data-processing
                agreements where appropriate.
              </p>
            </section>

            {/* 23. SECURITY AND PRIVACY */}
            <section
              id="security-privacy"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>23. Security and Privacy</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI maintains security controls designed to protect Customer Data.
              </p>
              <p className="text-muted-foreground">
                The processing of personal data is also governed by our Privacy Policy and, where
                applicable, a Data Processing Agreement.
              </p>
              <p className="text-muted-foreground">
                In the event of a conflict concerning personal-data processing, the applicable Data
                Processing Agreement will control to the extent specified in that agreement.
              </p>
            </section>

            {/* 24. DATA PROCESSING AGREEMENTS */}
            <section
              id="dpa"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>24. Data Processing Agreements</h2>
              </div>
              <p className="text-muted-foreground">
                Customers that require a Data Processing Agreement may request one from Skout AI.
              </p>
              <p className="text-muted-foreground">
                Where applicable, the DPA will govern the processing of personal data performed by
                Skout AI on behalf of the customer.
              </p>
            </section>

            {/* 25. SUSPENSION */}
            <section
              id="suspension"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>25. Suspension</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may suspend or restrict access where reasonably necessary because of:
              </p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Non-payment;</li>
                <li>Security risk;</li>
                <li>Abuse;</li>
                <li>Fraud;</li>
                <li>Violation of these Terms;</li>
                <li>Illegal activity;</li>
                <li>Spam;</li>
                <li>Deliverability risk;</li>
                <li>Excessive system usage;</li>
                <li>Third-party provider requirements;</li>
                <li>Legal requirements;</li>
                <li>Risk to other users or the platform.</li>
              </ul>
              <p className="text-muted-foreground">
                Where reasonably practicable, we may provide notice before suspension.
              </p>
              <p className="text-muted-foreground">
                Immediate suspension may occur where necessary to protect the Services or others.
              </p>
            </section>

            {/* 26. TERMINATION */}
            <section
              id="termination"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>26. Termination</h2>
              </div>
              <p className="text-muted-foreground">
                You may terminate your account according to the applicable subscription or
                cancellation process.
              </p>
              <p className="text-muted-foreground">
                Skout AI may terminate or suspend accounts for material violations of these Terms or
                where required for legal, security, abuse, or operational reasons.
              </p>
              <p className="text-muted-foreground">
                Following termination, access to the Services will cease.
              </p>
            </section>

            {/* 27. CUSTOMER DATA AFTER TERMINATION */}
            <section
              id="customer-data-after-termination"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>27. Customer Data After Termination</h2>
              </div>
              <p className="text-muted-foreground">
                Following termination, Skout AI may provide a reasonable period during which
                Customer Data may be exported, subject to the applicable plan or agreement.
              </p>
              <p className="text-muted-foreground">
                After the applicable retention/export period, Skout AI may delete Customer Data
                unless retention is required or permitted by law.
              </p>
              <p className="text-muted-foreground">Certain records may be retained for:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Legal compliance</li>
                <li>Security</li>
                <li>Fraud prevention</li>
                <li>Accounting</li>
                <li>Dispute resolution</li>
                <li>Suppression requirements</li>
                <li>Enforcement of agreements</li>
              </ul>
            </section>

            {/* 28. SERVICE AVAILABILITY */}
            <section
              id="service-availability"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>28. Service Availability</h2>
              </div>
              <p className="text-muted-foreground">
                We seek to maintain reliable and secure Services but do not guarantee uninterrupted
                availability.
              </p>
              <p className="text-muted-foreground">Services may be affected by:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Maintenance</li>
                <li>Internet infrastructure</li>
                <li>Cloud providers</li>
                <li>Third-party integrations</li>
                <li>Cybersecurity incidents</li>
                <li>Force majeure events</li>
                <li>Technical failures</li>
                <li>Government action</li>
                <li>Other events outside our reasonable control</li>
              </ul>
            </section>

            {/* 29. NO BUSINESS OUTCOME GUARANTEE */}
            <section
              id="no-guarantee"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>29. No Business Outcome Guarantee</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI does not guarantee any particular business outcome.
              </p>
              <p className="text-muted-foreground">This includes:</p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Number of leads</li>
                <li>Lead conversion rates</li>
                <li>Revenue generation</li>
                <li>Business growth</li>
                <li>Specific ROI or return on investment</li>
              </ul>
            </section>

            {/* 30. DISCLAIMER OF WARRANTIES */}
            <section
              id="disclaimer-warranties"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>30. Disclaimer of Warranties</h2>
              </div>
              <p className="text-muted-foreground">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICES ARE PROVIDED "AS IS"
                AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR
                STATUTORY.
              </p>
              <p className="text-muted-foreground">
                Skout AI disclaims all warranties, including any implied warranties of
                merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            {/* 31. LIMITATION OF LIABILITY */}
            <section
              id="limitation-liability"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>31. Limitation of Liability</h2>
              </div>
              <p className="text-muted-foreground">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SKOUT AI BE
                LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES
                ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF THE SERVICES.
              </p>
              <p className="text-muted-foreground">
                The total aggregate liability of Skout AI arising out of or relating to the Services
                shall not exceed the total amount you paid to Skout AI in the 12-month period
                preceding the claim.
              </p>
            </section>

            {/* 32. INDEMNIFICATION */}
            <section
              id="indemnification"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>32. Indemnification</h2>
              </div>
              <p className="text-muted-foreground">
                You agree to defend, indemnify, and hold harmless Skout AI and its officers,
                directors, employees, and agents from and against any and all claims, damages,
                obligations, losses, liabilities, costs, or debt, and expenses (including but not
                limited to attorney's fees) arising from:
              </p>
              <ul className="list-disc pl-6 mb-0 space-y-2 text-muted-foreground">
                <li>Your use of and access to the Services;</li>
                <li>Your violation of any term of these Terms;</li>
                <li>
                  Your violation of any third-party right, including without limitation any
                  copyright, property, or privacy right of any third party.
                </li>
              </ul>
            </section>

            {/* 33. GOVERNING LAW */}
            <section
              id="governing-law"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>33. Governing Law</h2>
              </div>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of India,
                without regard to its conflict of law provisions.
              </p>
            </section>

            {/* 34. DISPUTE RESOLUTION */}
            <section
              id="dispute-resolution"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>34. Dispute Resolution</h2>
              </div>
              <p className="text-muted-foreground">
                Any dispute arising from these Terms shall be subject to the exclusive jurisdiction
                of the courts located in Gurgaon, Haryana, India.
              </p>
            </section>

            {/* 35. CHANGES TO THESE TERMS */}
            <section
              id="changes-to-terms"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>35. Changes to These Terms</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may update these Terms from time to time. We will notify you of material
                changes by providing notice through the Services or by other appropriate means.
              </p>
              <p className="text-muted-foreground">
                Your continued use of the Services after the effective date of the updated Terms
                constitutes your acceptance of the changes.
              </p>
            </section>

            {/* 36. ELECTRONIC ACCEPTANCE */}
            <section
              id="electronic-acceptance"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>36. Electronic Acceptance</h2>
              </div>
              <p className="text-muted-foreground">
                You acknowledge and agree that by clicking to accept or agree to these Terms, you
                are entering into a binding electronic agreement.
              </p>
            </section>

            {/* 37. NOTICES */}
            <section
              id="notices"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>37. Notices</h2>
              </div>
              <p className="text-muted-foreground">
                Skout AI may provide notices to you through the email address associated with your
                account or through communications within the Services.
              </p>
            </section>

            {/* 38. GENERAL */}
            <section
              id="general"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>38. General</h2>
              </div>
              <p className="text-muted-foreground">
                These Terms constitute the entire agreement between you and Skout AI concerning your
                use of the Services.
              </p>
              <p className="text-muted-foreground">
                If any provision of these Terms is held to be invalid or unenforceable, the
                remaining provisions shall remain in full force and effect.
              </p>
              <p className="text-muted-foreground">
                No waiver of any term of these Terms shall be deemed a further or continuing waiver
                of such term or any other term.
              </p>
            </section>

            {/* 39. ENTIRE AGREEMENT */}
            <section
              id="entire-agreement"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>39. Entire Agreement</h2>
              </div>
              <p className="text-muted-foreground">
                These Terms, together with the Privacy Policy and any other applicable agreements
                you may have with Skout AI, constitute the entire agreement between you and Skout AI
                regarding your use of the Services.
              </p>
            </section>

            {/* 40. CONTACT */}
            <section
              id="contact"
              className="scroll-mt-28 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg"
            >
              <div className="flex items-center gap-2.5 text-foreground font-display text-lg sm:text-xl font-bold border-b border-border/60 pb-3">
                <h2>40. Contact</h2>
              </div>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at the
                registered address mentioned above.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </div>
  );
}
