"use client";

import { useState, useEffect } from "react";
import { FileText, Menu, ChevronRight, CheckCircle2 } from "lucide-react";
import { Section, GradientText } from "@/components/site/Section";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information-we-collect", title: "2. Information We Collect" },
  { id: "customer-provided-data", title: "3. Customer-Provided Data" },
  { id: "information-from-third-parties", title: "4. Information from Third Parties" },
  { id: "information-from-use-of-services", title: "5. Information from Use of Services" },
  { id: "cookies-and-tracking-technologies", title: "6. Cookies and Tracking Technologies" },
  { id: "how-we-use-information", title: "7. How We Use Information" },
  { id: "how-we-disclose-information", title: "8. How We Disclose Information" },
  { id: "data-retention", title: "9. Data Retention" },
  { id: "your-data-protection-rights", title: "10. Your Data Protection Rights" },
  { id: "childrens-privacy", title: "11. Children's Privacy" },
  { id: "international-data-transfers", title: "12. International Data Transfers" },
  { id: "third-party-links-and-services", title: "13. Third-Party Links and Services" },
  { id: "changes-to-this-privacy-policy", title: "14. Changes to This Privacy Policy" },
  { id: "do-not-track", title: "15. Do Not Track" },
  { id: "data-security", title: "16. Data Security" },
  { id: "data-processing-addendum", title: "17. Data Processing Addendum" },
  { id: "ai-and-machine-learning", title: "18. AI and Machine Learning" },
  {
    id: "marketing-and-promotional-communications",
    title: "19. Marketing and Promotional Communications",
  },
  { id: "california-privacy-rights", title: "20. California Privacy Rights" },
  { id: "virginia-privacy-rights", title: "21. Virginia Privacy Rights" },
  { id: "governing-law-and-jurisdiction", title: "22. Governing Law and Jurisdiction" },
  { id: "contact-us", title: "23. Contact Us" },
];

export default function Client() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0.1 },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col gap-0 text-foreground">
      {/* Hero Section */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-10! md:py-16! text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FileText className="text-primary" />
              <span className="text-primary font-mono">Legal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Last updated: August 12, 2026
            </p>
          </div>
        </Section>
      </div>

      {/* Main Content */}
      <Section className="py-8! md:py-12!">
        {/* Mobile Sticky Selector */}
        <div className="block lg:hidden sticky top-16 z-30 mb-6">
          <div className="relative rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full flex items-center justify-between"
            >
              <span className="font-semibold">
                {sections.find((s) => s.id === activeSection)?.title}
              </span>
              <ChevronRight
                className={`transform transition-transform ${isMenuOpen ? "rotate-90" : ""}`}
              />
            </button>
            {isMenuOpen && (
              <div className="absolute top-full left-0 w-full mt-2 bg-card border border-border rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(section.id);
                    }}
                    className={`block px-4 py-2 ${
                      activeSection === section.id ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Sticky Sidebar */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-2">
              <h3 className="font-semibold mb-3">On this page</h3>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section.id);
                  }}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    activeSection === section.id
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${
                      activeSection === section.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          {/* Section Content */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8 text-xs sm:text-sm leading-relaxed">
            <div id="introduction" className="space-y-4">
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p>
                This Privacy Policy explains how Skout AI Private Limited ("Skout AI", "Skout",
                "we", "us", or "our") collects, uses, stores, discloses, and otherwise processes
                information in connection with our websites, applications, software, SaaS platform,
                APIs, integrations, communications, and related services (collectively, the
                "Services").
              </p>
              <p>
                Skout AI Private Limited is an Indian company incorporated under the Companies Act,
                2013.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Corporate Identity Number (CIN): U62099HR2026PTC146861</li>
                <li>Registered State: Haryana, India</li>
                <li>
                  Registered/Mailing Address: 02-007, 2nd Floor, Emaar, The Palm Square, Sector 66,
                  Bhondsi, Gurgaon – 122102, Haryana, India.
                </li>
              </ul>
              <p>
                The Services are designed primarily for businesses and organizations and may involve
                processing business information, professional contact information, account
                information, communications, prospect information, CRM information, email-related
                information, and other information provided by customers or generated through use of
                the Services.
              </p>
              <p>
                By accessing or using the Services, you acknowledge that you have read and
                understood this Privacy Policy.
              </p>
            </div>

            <div id="information-we-collect" className="space-y-4">
              <h2 className="text-xl font-semibold">2. Information We Collect</h2>
              <h3 className="text-lg font-semibold">2.1 Account and Registration Information</h3>
              <p>When you create or administer a Skout AI account, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Full name</li>
                <li>Work email address</li>
                <li>Phone number</li>
                <li>Company name</li>
                <li>Job title or role</li>
                <li>Login credentials and authentication information</li>
                <li>Account preferences</li>
                <li>Organization information</li>
                <li>Billing and subscription information</li>
                <li>Account identifiers</li>
                <li>Security and authentication information</li>
              </ul>
              <h3 className="text-lg font-semibold">
                2.2 Two-Factor Authentication and Account Security Information
              </h3>
              <p>
                To protect accounts and prevent unauthorized access, Skout AI may provide or require
                two-factor authentication ("2FA"), multi-factor authentication ("MFA"), verification
                codes, login confirmations, password-reset communications, security alerts, and
                similar security mechanisms.
              </p>
              <p>For these purposes, we may process:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email address</li>
                <li>Phone number</li>
                <li>Authentication identifiers</li>
                <li>One-time verification codes</li>
                <li>Authentication timestamps</li>
                <li>Login and security events</li>
                <li>Device and browser information</li>
                <li>IP address</li>
                <li>Account security status</li>
              </ul>
            </div>

            <div id="customer-provided-data" className="space-y-4">
              <h2 className="text-xl font-semibold">3. Customer-Provided Data</h2>
              <p>
                Because Skout AI is a B2B SaaS platform, customers may provide information about
                their employees, prospects, customers, leads, contacts, companies, or other
                individuals.
              </p>
              <p>This information may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Names</li>
                <li>Professional email addresses</li>
                <li>Business phone numbers</li>
                <li>Job titles</li>
                <li>Company names</li>
                <li>Professional profiles</li>
                <li>Company information</li>
                <li>Business addresses</li>
                <li>Websites</li>
                <li>CRM records</li>
                <li>Lead information</li>
                <li>Prospecting information</li>
                <li>Email communication information</li>
                <li>Campaign information</li>
                <li>Notes and custom fields</li>
                <li>Engagement information</li>
                <li>Data imported through integrations</li>
                <li>Information contained in files uploaded by customers</li>
              </ul>
            </div>

            <div id="information-from-third-parties" className="space-y-4">
              <h2 className="text-xl font-semibold">4. Information from Third Parties</h2>
              <p>We may obtain information from third-party sources, such as:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Data providers and data-enrichment services</li>
                <li>Publicly available sources (e.g., websites, social media)</li>
                <li>Third-party integrations and partners</li>
                <li>Marketing and advertising partners</li>
                <li>Referral sources</li>
                <li>Security providers</li>
              </ul>
            </div>

            <div id="information-from-use-of-services" className="space-y-4">
              <h2 className="text-xl font-semibold">5. Information from Use of Services</h2>
              <p>
                When you access or use the Services, we may automatically collect information,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device information (e.g., hardware model, operating system)</li>
                <li>Browser information (e.g., browser type, language)</li>
                <li>IP address and location information</li>
                <li>Usage data (e.g., features used, pages visited, time spent)</li>
                <li>Log information (e.g., access times, error logs)</li>
                <li>Performance data</li>
                <li>Information from integrations</li>
              </ul>
            </div>

            <div id="cookies-and-tracking-technologies" className="space-y-4">
              <h2 className="text-xl font-semibold">6. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies, web beacons, and similar technologies to operate and improve the
                Services, analyze usage, and for advertising purposes.
              </p>
              <p>You can control cookies through your browser settings and other tools.</p>
            </div>

            <div id="how-we-use-information" className="space-y-4">
              <h2 className="text-xl font-semibold">7. How We Use Information</h2>
              <p>We may use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve the Services</li>
                <li>Personalize and customize the Services</li>
                <li>Communicate with you (e.g., for support, marketing)</li>
                <li>Process transactions and manage subscriptions</li>
                <li>Ensure security and prevent fraud</li>
                <li>Analyze usage and trends</li>
                <li>Develop new products and features</li>
                <li>Comply with legal obligations</li>
                <li>Enforce our terms and policies</li>
              </ul>
            </div>

            <div id="how-we-disclose-information" className="space-y-4">
              <h2 className="text-xl font-semibold">8. How We Disclose Information</h2>
              <p>We may disclose information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers and subprocessors</li>
                <li>Affiliates and subsidiaries</li>
                <li>Third-party integrations authorized by you</li>
                <li>In connection with a merger, sale, or acquisition</li>
                <li>To comply with legal requirements or protect rights</li>
                <li>With your consent</li>
              </ul>
            </div>

            <div id="data-retention" className="space-y-4">
              <h2 className="text-xl font-semibold">9. Data Retention</h2>
              <p>
                We retain information for as long as necessary to fulfill the purposes for which it
                was collected, comply with legal obligations, resolve disputes, and enforce our
                agreements.
              </p>
            </div>

            <div id="your-data-protection-rights" className="space-y-4">
              <h2 className="text-xl font-semibold">10. Your Data Protection Rights</h2>
              <p>
                Depending on your location, you may have rights to access, correct, delete, or
                restrict the processing of your information. Please contact us to exercise your
                rights.
              </p>
            </div>

            <div id="childrens-privacy" className="space-y-4">
              <h2 className="text-xl font-semibold">11. Children's Privacy</h2>
              <p>
                The Services are not intended for or directed to children under the age of 16. We do
                not knowingly collect personal information from children.
              </p>
            </div>

            <div id="international-data-transfers" className="space-y-4">
              <h2 className="text-xl font-semibold">12. International Data Transfers</h2>
              <p>
                We may transfer, store, and process your information in countries other than your
                own. We will take appropriate safeguards to protect your information.
              </p>
            </div>

            <div id="third-party-links-and-services" className="space-y-4">
              <h2 className="text-xl font-semibold">13. Third-Party Links and Services</h2>
              <p>
                The Services may contain links to third-party websites or services. We are not
                responsible for their privacy practices.
              </p>
            </div>

            <div id="changes-to-this-privacy-policy" className="space-y-4">
              <h2 className="text-xl font-semibold">14. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any
                material changes.
              </p>
            </div>

            <div id="do-not-track" className="space-y-4">
              <h2 className="text-xl font-semibold">15. Do Not Track</h2>
              <p>
                Some browsers offer a "Do Not Track" feature. The Services do not currently respond
                to DNT signals.
              </p>
            </div>

            <div id="data-security" className="space-y-4">
              <h2 className="text-xl font-semibold">16. Data Security</h2>
              <p>
                We maintain administrative, technical, and organizational safeguards designed to
                protect information against unauthorized access, loss, misuse, alteration, or
                disclosure.
              </p>
              <p>Depending on the Services and applicable requirements, safeguards may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption in transit</li>
                <li>Encryption at rest where appropriate</li>
                <li>Access controls</li>
                <li>Authentication controls</li>
                <li>Role-based access</li>
                <li>Logging and monitoring</li>
                <li>Security testing</li>
                <li>Infrastructure protections</li>
                <li>Backup and recovery mechanisms</li>
                <li>Incident-response procedures</li>
                <li>Employee confidentiality obligations</li>
              </ul>
            </div>

            <div id="data-processing-addendum" className="space-y-4">
              <h2 className="text-xl font-semibold">17. Data Processing Addendum</h2>
              <p>
                Customers who require a Data Processing Addendum (DPA) under the GDPR or similar
                regulations can contact us to obtain one.
              </p>
            </div>

            <div id="ai-and-machine-learning" className="space-y-4">
              <h2 className="text-xl font-semibold">18. AI and Machine Learning</h2>
              <p>
                We may use AI and machine learning to improve the Services. We will not use Customer
                Data to train our models without your consent.
              </p>
            </div>

            <div id="marketing-and-promotional-communications" className="space-y-4">
              <h2 className="text-xl font-semibold">
                19. Marketing and Promotional Communications
              </h2>
              <p>
                You can opt out of receiving marketing communications from us by following the
                unsubscribe instructions in those communications.
              </p>
            </div>

            <div id="california-privacy-rights" className="space-y-4">
              <h2 className="text-xl font-semibold">20. California Privacy Rights</h2>
              <p>
                If you are a California resident, you may have additional rights under the
                California Consumer Privacy Act (CCPA). Please contact us for more information.
              </p>
            </div>

            <div id="virginia-privacy-rights" className="space-y-4">
              <h2 className="text-xl font-semibold">21. Virginia Privacy Rights</h2>
              <p>
                If you are a Virginia resident, you may have additional rights under the Virginia
                Consumer Data Protection Act (VCDPA). Please contact us for more information.
              </p>
            </div>

            <div id="governing-law-and-jurisdiction" className="space-y-4">
              <h2 className="text-xl font-semibold">22. Governing Law and Jurisdiction</h2>
              <p>
                This Privacy Policy is governed by the laws of India, and any disputes will be
                subject to the exclusive jurisdiction of the courts in Gurgaon, Haryana.
              </p>
            </div>

            <div id="contact-us" className="space-y-4">
              <h2 className="text-xl font-semibold">23. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at the
                registered address mentioned above.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
