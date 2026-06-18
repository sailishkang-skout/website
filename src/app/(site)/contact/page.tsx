export const metadata = {
  title: "Contact",
  description:
    "Talk to a human at Skout AI. Sales, support or partnerships — our team responds within one business day.",
};

import ContactClient from "./client";
export default function ContactPage() {
  return <ContactClient />;
}
