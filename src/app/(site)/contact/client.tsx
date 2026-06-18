"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import {
  Mail,
  MapPin,
  Sparkles,
  Phone,
  Send,
  ChevronDown,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import "./contact.css";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  size: z.string().min(1, "Team size is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

async function submitContact(data: ContactFormData) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? "Submission failed");
  return json;
}

export default function ContactClient() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || "rick";
  const [activeTab, setActiveTab] = useState<"calendar" | "form">("calendar");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: submitContact,
    onSuccess: () => reset(),
  });

  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab("calendar");
    const el = document.getElementById("booking-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Section className="py-8! md:py-12!">
        {/* BANNER SECTION (Mocking Image 1) */}
        <div className="contact-banner">
          <div className="contact-banner-content">
            <div className="contact-banner-left">
              <div className="contact-banner-eyebrow">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span>Find Your Next Customers</span>
              </div>
              <h1 className="contact-banner-title">
                Let's build your
                <br />
                Global Pipeline.
              </h1>
              <p className="contact-banner-desc">
                Discover how Skout AI can help you find, verify, and reach top-tier B2B prospects
                globally while saving you from bounce-rate headaches and compliance issues. Book a
                demo today.
              </p>
              <a href="#booking-section" onClick={scrollToBooking} className="contact-banner-btn">
                Book a Demo <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Mock graphics right side */}
            <div className="contact-banner-right">
              {/* Verified Leads Card */}
              <div className="graphic-card-team">
                <h3 className="graphic-card-team-title">Verified Leads</h3>
                <div className="graphic-team-list">
                  {[
                    { name: "Ava Larsen", role: "CEO · Oslo", flag: "🇳🇴", initials: "AL" },
                    { name: "Priya Shah", role: "Product · Bangalore", flag: "🇮🇳", initials: "PS" },
                    { name: "Mateo Rivera", role: "CTO · Lisbon", flag: "🇵🇹", initials: "MR" },
                  ].map((m) => (
                    <div key={m.name} className="graphic-team-item">
                      <div className="graphic-avatar">{m.initials}</div>
                      <div className="graphic-member-info">
                        <div className="graphic-member-name">{m.name}</div>
                        <div className="graphic-member-role">{m.role}</div>
                      </div>
                      <div className="graphic-member-status">
                        <span className="graphic-status-dot"></span>
                        <span>{m.flag} Verified</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Waterfall Enrich Card */}
              <div className="graphic-card-enrich">
                <h3 className="graphic-card-enrich-title">Enrich Prospect</h3>
                <div className="graphic-enrich-form">
                  <div className="graphic-enrich-label">Select Prospect</div>
                  <div className="graphic-enrich-select">
                    <span>Javier Ojeda</span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  </div>
                  <div className="graphic-enrich-label">Enrichment cost</div>
                  <div className="graphic-enrich-amount">1 Credit</div>
                  <div className="graphic-enrich-submit">Submit Enrichment</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE BOOKING / FORM SECTION (Mocking Image 2) */}
        <div id="booking-section" className="contact-interactive-sec scroll-mt-20">
          <div className="contact-options-stack">
            {/* Sales Card Option */}
            <div
              className={`contact-option-card card-dark ${activeTab === "calendar" ? "active" : ""}`}
              onClick={() => setActiveTab("calendar")}
            >
              <div className="card-icon-wrapper">
                <Phone className="h-5 w-5" />
              </div>
              <h2 className="card-title-text">Speak to someone in sales</h2>
              <p className="card-desc-text">
                Let's jump on a video call, and we'll show you how simple it is to scale your
                outbound with Skout AI.
              </p>
              <button className="card-btn">Book an Appointment</button>
            </div>

            {/* Mail Card Option */}
            <div
              className={`contact-option-card card-light ${activeTab === "form" ? "active" : ""}`}
              onClick={() => setActiveTab("form")}
            >
              <div className="card-icon-wrapper">
                <Send className="h-5 w-5" />
              </div>
              <h2 className="card-title-text">Contact our team</h2>
              <p className="card-desc-text">
                Email us directly, and we'll get back to you within 24 hours.
              </p>
              <button className="card-btn">Send a Mail</button>
            </div>
          </div>

          {/* Interactive display panel right side */}
          <div className="contact-display-panel">
            <div className="panel-header">
              <span className="panel-title">
                {activeTab === "calendar" ? "Schedule a Demo" : "Send us a message"}
              </span>
              <span className="panel-badge">
                {activeTab === "calendar" ? "Cal.com Integration" : "Contact Form"}
              </span>
            </div>

            <div className="panel-content">
              {activeTab === "calendar" ? (
                <div className="calendar-embed-container">
                  <iframe
                    src={`https://cal.com/${calLink}?embed=true&theme=dark`}
                    style={{ width: "100%", height: "100%", minHeight: "650px", border: "0" }}
                    allow="camera; microphone; autoplay; clipboard-write"
                    title="Cal.com scheduling calendar"
                  />
                  <div className="calendar-fallback">
                    <p className="text-xs text-muted-foreground">
                      If the calendar widget does not load, you can also book directly at:
                    </p>
                    <a
                      href={`https://cal.com/${calLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      cal.com/{calLink} <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit((data) => mutate(data))}
                  className="panel-form-container"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Full name"
                      name="name"
                      register={register}
                      error={errors.name?.message}
                    />
                    <Field
                      label="Work email"
                      name="email"
                      type="email"
                      register={register}
                      error={errors.email?.message}
                    />
                    <Field
                      label="Company"
                      name="company"
                      register={register}
                      error={errors.company?.message}
                    />
                    <Field
                      label="Team size"
                      name="size"
                      register={register}
                      error={errors.size?.message}
                    />
                  </div>
                  <div className="mt-2">
                    <label className="text-sm font-medium">How can we help?</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your goals, current stack, or any questions you have..."
                      className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary"
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
                    )}
                  </div>
                  {isSuccess && (
                    <p className="mt-4 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500">
                      ✓ Thanks — we'll be in touch soon!
                    </p>
                  )}
                  {isError && (
                    <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {(error as Error).message}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isPending || isSuccess}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
                    style={{ background: "var(--foreground)" }}
                  >
                    {isPending ? "Sending..." : isSuccess ? "Message sent ✓" : "Send message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: keyof ContactFormData;
  type?: string;
  register: ReturnType<typeof useForm<ContactFormData>>["register"];
  error?: string;
};

function Field({ label, name, type = "text", register, error }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
        {...register(name)}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
