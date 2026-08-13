import type { ReactNode } from "react";

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-4 sm:px-6 md:py-6 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
      <span className="h-px w-8 bg-foreground/40" />
      {children}
    </span>
  );
}

export function GradientText({ children }: { children: ReactNode }) {
  return (
    <span
      className="italic-serif"
      style={{
        backgroundImage: "var(--gradient-accent)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}
