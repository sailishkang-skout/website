import TermsOfServiceClient from "@/app/(site)/terms/client";

export const metadata = {
  title: "Terms of Service | Skout AI",
  description:
    "Review the Terms of Service for Skout AI Private Limited. Understand workspace rules, acceptable use, billing, user obligations, and intellectual property.",
};

export default function LegalTermsOfServicePage() {
  return <TermsOfServiceClient />;
}