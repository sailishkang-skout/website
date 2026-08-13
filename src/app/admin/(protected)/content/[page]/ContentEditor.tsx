"use client";

import { useState, useCallback } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// ─── Shared primitives ──────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  const base =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2";
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-muted-foreground">{label}</label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${base} resize-y`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      )}
    </div>
  );
}

function CtaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: { text: string; href: string };
  onChange: (v: { text: string; href: string }) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-muted-foreground">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          value={value.text}
          onChange={(e) => onChange({ ...value, text: e.target.value })}
          placeholder="Button text"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
        />
        <input
          type="text"
          value={value.href}
          onChange={(e) => onChange({ ...value, href: e.target.value })}
          placeholder="/path or URL"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
        />
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  open,
  onToggle,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-lg bg-muted/40 px-4 py-3 text-left text-sm font-medium transition hover:bg-muted"
    >
      {title}
      {open ? (
        <ChevronUp className="h-4 w-4 text-muted-foreground" />
      ) : (
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <SectionHeader title={title} open={open} onToggle={() => setOpen((v) => !v)} />
      {open && <div className="space-y-4 p-4">{children}</div>}
    </div>
  );
}

// ─── Page-specific editors ───────────────────────────────────────────────────

function HomeEditor({
  data,
  onChange,
}: {
  data: Record<string, unknown>;
  onChange: (d: Record<string, unknown>) => void;
}) {
  function patch(section: string, field: string, value: unknown) {
    const sec = (data[section] as Record<string, unknown>) ?? {};
    onChange({ ...data, [section]: { ...sec, [field]: value } });
  }

  function patchNested(section: string, sub: string, field: string, value: unknown) {
    const sec = (data[section] as Record<string, unknown>) ?? {};
    const subObj = (sec[sub] as Record<string, unknown>) ?? {};
    onChange({ ...data, [section]: { ...sec, [sub]: { ...subObj, [field]: value } } });
  }

  const hero = (data.hero as Record<string, unknown>) ?? {};
  const heroStats = (hero.stats as Array<{ key: string; value: string }>) ?? [];
  const heroPrimary = (hero.primaryCta as { text: string; href: string }) ?? { text: "", href: "" };
  const heroSecondary = (hero.secondaryCta as { text: string; href: string }) ?? {
    text: "",
    href: "",
  };

  const platform = (data.platform as Record<string, unknown>) ?? {};
  const bigCard = (platform.bigCard as Record<string, unknown>) ?? {};
  const enrichmentCard = (platform.enrichmentCard as Record<string, unknown>) ?? {};
  const verificationCard = (platform.verificationCard as Record<string, unknown>) ?? {};
  const outreachCard = (platform.outreachCard as Record<string, unknown>) ?? {};
  const intentCard = (platform.intentCard as Record<string, unknown>) ?? {};

  const manifesto = (data.manifesto as Record<string, unknown>) ?? {};
  const extras = (data.extras as Record<string, unknown>) ?? {};
  const extraItems = (extras.items as Array<{ title: string }>) ?? [];
  const cta = (data.cta as Record<string, unknown>) ?? {};
  const ctaPrimary = (cta.primaryCta as { text: string; href: string }) ?? { text: "", href: "" };
  const ctaSecondary = (cta.secondaryCta as { text: string; href: string }) ?? {
    text: "",
    href: "",
  };

  return (
    <div className="space-y-4">
      <Section title="Hero">
        <Field
          label="Eyebrow"
          value={String(hero.eyebrow ?? "")}
          onChange={(v) => patch("hero", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(hero.title ?? "")}
          onChange={(v) => patch("hero", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(hero.titleHighlight ?? "")}
          onChange={(v) => patch("hero", "titleHighlight", v)}
        />
        <Field
          label="Description"
          value={String(hero.description ?? "")}
          onChange={(v) => patch("hero", "description", v)}
          multiline
        />
        <CtaField
          label="Primary CTA (text / href)"
          value={heroPrimary}
          onChange={(v) => patch("hero", "primaryCta", v)}
        />
        <CtaField
          label="Secondary CTA (text / href)"
          value={heroSecondary}
          onChange={(v) => patch("hero", "secondaryCta", v)}
        />
        <div className="space-y-1">
          <label className="block text-xs font-medium text-muted-foreground">Stats</label>
          {heroStats.map((stat, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input
                value={stat.key}
                onChange={(e) => {
                  const updated = heroStats.map((s, j) =>
                    j === i ? { ...s, key: e.target.value } : s,
                  );
                  patch("hero", "stats", updated);
                }}
                placeholder="200M+"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
              <input
                value={stat.value}
                onChange={(e) => {
                  const updated = heroStats.map((s, j) =>
                    j === i ? { ...s, value: e.target.value } : s,
                  );
                  patch("hero", "stats", updated);
                }}
                placeholder="Verified contacts"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
              <button
                type="button"
                onClick={() =>
                  patch(
                    "hero",
                    "stats",
                    heroStats.filter((_, j) => j !== i),
                  )
                }
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => patch("hero", "stats", [...heroStats, { key: "", value: "" }])}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Add stat
          </button>
        </div>
      </Section>

      <Section title="Platform Section">
        <Field
          label="Eyebrow"
          value={String(platform.eyebrow ?? "")}
          onChange={(v) => patch("platform", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(platform.title ?? "")}
          onChange={(v) => patch("platform", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(platform.titleHighlight ?? "")}
          onChange={(v) => patch("platform", "titleHighlight", v)}
        />
        <Field
          label="Description"
          value={String(platform.description ?? "")}
          onChange={(v) => patch("platform", "description", v)}
        />
        <div className="rounded-lg border border-border/50 p-3 space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Big Card (Prospect Graph)</p>
          <Field
            label="Tag"
            value={String(bigCard.tag ?? "")}
            onChange={(v) => patchNested("platform", "bigCard", "tag", v)}
          />
          <Field
            label="Title"
            value={String(bigCard.title ?? "")}
            onChange={(v) => patchNested("platform", "bigCard", "title", v)}
          />
          <Field
            label="Title Italic"
            value={String(bigCard.titleItalic ?? "")}
            onChange={(v) => patchNested("platform", "bigCard", "titleItalic", v)}
          />
          <Field
            label="Subtitle"
            value={String(bigCard.subtitle ?? "")}
            onChange={(v) => patchNested("platform", "bigCard", "subtitle", v)}
          />
          <Field
            label="Description"
            value={String(bigCard.description ?? "")}
            onChange={(v) => patchNested("platform", "bigCard", "description", v)}
            multiline
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border/50 p-3 space-y-3">
            <p className="text-xs font-medium text-muted-foreground">Waterfall Enrichment Card</p>
            <Field
              label="Title"
              value={String(enrichmentCard.title ?? "")}
              onChange={(v) => patchNested("platform", "enrichmentCard", "title", v)}
            />
            <Field
              label="Description"
              value={String(enrichmentCard.description ?? "")}
              onChange={(v) => patchNested("platform", "enrichmentCard", "description", v)}
              multiline
            />
          </div>
          <div className="rounded-lg border border-border/50 p-3 space-y-3">
            <p className="text-xs font-medium text-muted-foreground">Verification Card</p>
            <Field
              label="Title"
              value={String(verificationCard.title ?? "")}
              onChange={(v) => patchNested("platform", "verificationCard", "title", v)}
            />
            <Field
              label="Description"
              value={String(verificationCard.description ?? "")}
              onChange={(v) => patchNested("platform", "verificationCard", "description", v)}
              multiline
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border/50 p-3 space-y-3">
            <p className="text-xs font-medium text-muted-foreground">Outreach Card</p>
            <Field
              label="Tag"
              value={String(outreachCard.tag ?? "")}
              onChange={(v) => patchNested("platform", "outreachCard", "tag", v)}
            />
            <Field
              label="Title"
              value={String(outreachCard.title ?? "")}
              onChange={(v) => patchNested("platform", "outreachCard", "title", v)}
            />
            <Field
              label="Title Italic"
              value={String(outreachCard.titleItalic ?? "")}
              onChange={(v) => patchNested("platform", "outreachCard", "titleItalic", v)}
            />
            <Field
              label="Description"
              value={String(outreachCard.description ?? "")}
              onChange={(v) => patchNested("platform", "outreachCard", "description", v)}
              multiline
            />
          </div>
          <div className="rounded-lg border border-border/50 p-3 space-y-3">
            <p className="text-xs font-medium text-muted-foreground">Intent Card</p>
            <Field
              label="Tag"
              value={String(intentCard.tag ?? "")}
              onChange={(v) => patchNested("platform", "intentCard", "tag", v)}
            />
            <Field
              label="Title"
              value={String(intentCard.title ?? "")}
              onChange={(v) => patchNested("platform", "intentCard", "title", v)}
            />
            <Field
              label="Highlight Word"
              value={String(intentCard.titleHighlight ?? "")}
              onChange={(v) => patchNested("platform", "intentCard", "titleHighlight", v)}
            />
            <Field
              label="Subtitle"
              value={String(intentCard.subtitle ?? "")}
              onChange={(v) => patchNested("platform", "intentCard", "subtitle", v)}
            />
            <Field
              label="Description"
              value={String(intentCard.description ?? "")}
              onChange={(v) => patchNested("platform", "intentCard", "description", v)}
              multiline
            />
          </div>
        </div>
      </Section>

      <Section title="Manifesto">
        <Field
          label="Full text"
          value={String(manifesto.text ?? "")}
          onChange={(v) => patch("manifesto", "text", v)}
          multiline
        />
        <Field
          label="Highlighted phrase"
          value={String(manifesto.highlight ?? "")}
          onChange={(v) => patch("manifesto", "highlight", v)}
        />
        <Field
          label="Italic phrase"
          value={String(manifesto.italic ?? "")}
          onChange={(v) => patch("manifesto", "italic", v)}
        />
      </Section>

      <Section title="Extras Grid">
        <Field
          label="Eyebrow"
          value={String(extras.eyebrow ?? "")}
          onChange={(v) => patch("extras", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(extras.title ?? "")}
          onChange={(v) => patch("extras", "title", v)}
        />
        <Field
          label="Title Italic"
          value={String(extras.titleItalic ?? "")}
          onChange={(v) => patch("extras", "titleItalic", v)}
        />
        <div className="space-y-1">
          <label className="block text-xs font-medium text-muted-foreground">Items</label>
          {extraItems.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={item.title}
                onChange={(e) => {
                  const updated = extraItems.map((it, j) =>
                    j === i ? { ...it, title: e.target.value } : it,
                  );
                  patch("extras", "items", updated);
                }}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
              <button
                type="button"
                onClick={() =>
                  patch(
                    "extras",
                    "items",
                    extraItems.filter((_, j) => j !== i),
                  )
                }
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => patch("extras", "items", [...extraItems, { title: "" }])}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Add item
          </button>
        </div>
      </Section>

      <Section title="Bottom CTA">
        <Field
          label="Title"
          value={String(cta.title ?? "")}
          onChange={(v) => patch("cta", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(cta.titleHighlight ?? "")}
          onChange={(v) => patch("cta", "titleHighlight", v)}
        />
        <Field
          label="Description"
          value={String(cta.description ?? "")}
          onChange={(v) => patch("cta", "description", v)}
        />
        <CtaField
          label="Primary CTA (text / href)"
          value={ctaPrimary}
          onChange={(v) => patch("cta", "primaryCta", v)}
        />
        <CtaField
          label="Secondary CTA (text / href)"
          value={ctaSecondary}
          onChange={(v) => patch("cta", "secondaryCta", v)}
        />
      </Section>
    </div>
  );
}

function AboutEditor({
  data,
  onChange,
}: {
  data: Record<string, unknown>;
  onChange: (d: Record<string, unknown>) => void;
}) {
  function patch(section: string, field: string, value: unknown) {
    const sec = (data[section] as Record<string, unknown>) ?? {};
    onChange({ ...data, [section]: { ...sec, [field]: value } });
  }

  const hero = (data.hero as Record<string, unknown>) ?? {};
  const heroStats = (hero.stats as Array<{ key: string; value: string }>) ?? [];
  const heroPrimary = (hero.primaryCta as { text: string; href: string }) ?? { text: "", href: "" };
  const heroSecondary = (hero.secondaryCta as { text: string; href: string }) ?? {
    text: "",
    href: "",
  };

  const manifesto = (data.manifesto as Record<string, unknown>) ?? {};
  const manifestoParagraphs = (manifesto.paragraphs as string[]) ?? [];

  const values = (data.values as Record<string, unknown>) ?? {};
  const valueItems =
    (values.items as Array<{ number: string; title: string; description: string }>) ?? [];

  const timeline = (data.timeline as Record<string, unknown>) ?? {};
  const timelineItems =
    (timeline.items as Array<{ year: string; time: string; description: string }>) ?? [];

  const team = (data.team as Record<string, unknown>) ?? {};
  const teamMembers =
    (team.members as Array<{ name: string; role: string; location: string }>) ?? [];

  const press = (data.press as Record<string, unknown>) ?? {};
  const pressPublications = (press.publications as string[]) ?? [];

  const cta = (data.cta as Record<string, unknown>) ?? {};
  const ctaPrimary = (cta.primaryCta as { text: string; href: string }) ?? { text: "", href: "" };
  const ctaSecondary = (cta.secondaryCta as { text: string; href: string }) ?? {
    text: "",
    href: "",
  };

  return (
    <div className="space-y-4">
      <Section title="Hero">
        <Field
          label="Eyebrow"
          value={String(hero.eyebrow ?? "")}
          onChange={(v) => patch("hero", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(hero.title ?? "")}
          onChange={(v) => patch("hero", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(hero.titleHighlight ?? "")}
          onChange={(v) => patch("hero", "titleHighlight", v)}
        />
        <Field
          label="Title Suffix"
          value={String(hero.titleSuffix ?? "")}
          onChange={(v) => patch("hero", "titleSuffix", v)}
        />
        <Field
          label="Description"
          value={String(hero.description ?? "")}
          onChange={(v) => patch("hero", "description", v)}
          multiline
        />
        <CtaField
          label="Primary CTA"
          value={heroPrimary}
          onChange={(v) => patch("hero", "primaryCta", v)}
        />
        <CtaField
          label="Secondary CTA"
          value={heroSecondary}
          onChange={(v) => patch("hero", "secondaryCta", v)}
        />
        <div className="space-y-1">
          <label className="block text-xs font-medium text-muted-foreground">Stats</label>
          {heroStats.map((stat, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input
                value={stat.key}
                onChange={(e) =>
                  patch(
                    "hero",
                    "stats",
                    heroStats.map((s, j) => (j === i ? { ...s, key: e.target.value } : s)),
                  )
                }
                placeholder="Key"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
              <input
                value={stat.value}
                onChange={(e) =>
                  patch(
                    "hero",
                    "stats",
                    heroStats.map((s, j) => (j === i ? { ...s, value: e.target.value } : s)),
                  )
                }
                placeholder="Label"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
              <button
                type="button"
                onClick={() =>
                  patch(
                    "hero",
                    "stats",
                    heroStats.filter((_, j) => j !== i),
                  )
                }
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => patch("hero", "stats", [...heroStats, { key: "", value: "" }])}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Add stat
          </button>
        </div>
      </Section>

      <Section title="Manifesto">
        <Field
          label="Eyebrow"
          value={String(manifesto.eyebrow ?? "")}
          onChange={(v) => patch("manifesto", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(manifesto.title ?? "")}
          onChange={(v) => patch("manifesto", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(manifesto.titleHighlight ?? "")}
          onChange={(v) => patch("manifesto", "titleHighlight", v)}
        />
        <Field
          label="Title Suffix"
          value={String(manifesto.titleSuffix ?? "")}
          onChange={(v) => patch("manifesto", "titleSuffix", v)}
        />
        <div className="space-y-1">
          <label className="block text-xs font-medium text-muted-foreground">Paragraphs</label>
          {manifestoParagraphs.map((para, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                value={para}
                onChange={(e) =>
                  patch(
                    "manifesto",
                    "paragraphs",
                    manifestoParagraphs.map((p, j) => (j === i ? e.target.value : p)),
                  )
                }
                rows={3}
                className="flex-1 resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
              <button
                type="button"
                onClick={() =>
                  patch(
                    "manifesto",
                    "paragraphs",
                    manifestoParagraphs.filter((_, j) => j !== i),
                  )
                }
                className="self-start rounded-lg border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => patch("manifesto", "paragraphs", [...manifestoParagraphs, ""])}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Add paragraph
          </button>
        </div>
      </Section>

      <Section title="Values">
        <Field
          label="Eyebrow"
          value={String(values.eyebrow ?? "")}
          onChange={(v) => patch("values", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(values.title ?? "")}
          onChange={(v) => patch("values", "title", v)}
        />
        <div className="space-y-3">
          {valueItems.map((item, i) => (
            <div key={i} className="rounded-lg border border-border/50 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Value {i + 1}</span>
                <button
                  type="button"
                  onClick={() =>
                    patch(
                      "values",
                      "items",
                      valueItems.filter((_, j) => j !== i),
                    )
                  }
                  className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <Field
                label="Number"
                value={item.number}
                onChange={(v) =>
                  patch(
                    "values",
                    "items",
                    valueItems.map((it, j) => (j === i ? { ...it, number: v } : it)),
                  )
                }
              />
              <Field
                label="Title"
                value={item.title}
                onChange={(v) =>
                  patch(
                    "values",
                    "items",
                    valueItems.map((it, j) => (j === i ? { ...it, title: v } : it)),
                  )
                }
              />
              <Field
                label="Description"
                value={item.description}
                onChange={(v) =>
                  patch(
                    "values",
                    "items",
                    valueItems.map((it, j) => (j === i ? { ...it, description: v } : it)),
                  )
                }
                multiline
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              patch("values", "items", [
                ...valueItems,
                {
                  number: String(valueItems.length + 1).padStart(2, "0"),
                  title: "",
                  description: "",
                },
              ])
            }
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Add value
          </button>
        </div>
      </Section>

      <Section title="Timeline">
        <Field
          label="Eyebrow"
          value={String(timeline.eyebrow ?? "")}
          onChange={(v) => patch("timeline", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(timeline.title ?? "")}
          onChange={(v) => patch("timeline", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(timeline.titleHighlight ?? "")}
          onChange={(v) => patch("timeline", "titleHighlight", v)}
        />
        <Field
          label="Title Suffix"
          value={String(timeline.titleSuffix ?? "")}
          onChange={(v) => patch("timeline", "titleSuffix", v)}
        />
        <Field
          label="Subtitle"
          value={String(timeline.subtitle ?? "")}
          onChange={(v) => patch("timeline", "subtitle", v)}
        />
        <div className="space-y-3">
          {timelineItems.map((item, i) => (
            <div key={i} className="rounded-lg border border-border/50 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Event {i + 1}</span>
                <button
                  type="button"
                  onClick={() =>
                    patch(
                      "timeline",
                      "items",
                      timelineItems.filter((_, j) => j !== i),
                    )
                  }
                  className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field
                  label="Year"
                  value={item.year}
                  onChange={(v) =>
                    patch(
                      "timeline",
                      "items",
                      timelineItems.map((it, j) => (j === i ? { ...it, year: v } : it)),
                    )
                  }
                />
                <Field
                  label="Season / Time"
                  value={item.time}
                  onChange={(v) =>
                    patch(
                      "timeline",
                      "items",
                      timelineItems.map((it, j) => (j === i ? { ...it, time: v } : it)),
                    )
                  }
                />
              </div>
              <Field
                label="Description"
                value={item.description}
                onChange={(v) =>
                  patch(
                    "timeline",
                    "items",
                    timelineItems.map((it, j) => (j === i ? { ...it, description: v } : it)),
                  )
                }
                multiline
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              patch("timeline", "items", [
                ...timelineItems,
                { year: "", time: "", description: "" },
              ])
            }
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Add event
          </button>
        </div>
      </Section>

      <Section title="Team">
        <Field
          label="Eyebrow"
          value={String(team.eyebrow ?? "")}
          onChange={(v) => patch("team", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(team.title ?? "")}
          onChange={(v) => patch("team", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(team.titleHighlight ?? "")}
          onChange={(v) => patch("team", "titleHighlight", v)}
        />
        <div className="space-y-2">
          {teamMembers.map((member, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
              <input
                value={member.name}
                onChange={(e) =>
                  patch(
                    "team",
                    "members",
                    teamMembers.map((m, j) => (j === i ? { ...m, name: e.target.value } : m)),
                  )
                }
                placeholder="Name"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
              <input
                value={member.role}
                onChange={(e) =>
                  patch(
                    "team",
                    "members",
                    teamMembers.map((m, j) => (j === i ? { ...m, role: e.target.value } : m)),
                  )
                }
                placeholder="Role"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
              <input
                value={member.location}
                onChange={(e) =>
                  patch(
                    "team",
                    "members",
                    teamMembers.map((m, j) => (j === i ? { ...m, location: e.target.value } : m)),
                  )
                }
                placeholder="Location"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
              <button
                type="button"
                onClick={() =>
                  patch(
                    "team",
                    "members",
                    teamMembers.filter((_, j) => j !== i),
                  )
                }
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              patch("team", "members", [...teamMembers, { name: "", role: "", location: "" }])
            }
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Add member
          </button>
        </div>
      </Section>

      <Section title="Press / Featured In">
        <Field
          label="Eyebrow"
          value={String(press.eyebrow ?? "")}
          onChange={(v) => patch("press", "eyebrow", v)}
        />
        <div className="space-y-1">
          <label className="block text-xs font-medium text-muted-foreground">Publications</label>
          {pressPublications.map((pub, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={pub}
                onChange={(e) =>
                  patch(
                    "press",
                    "publications",
                    pressPublications.map((p, j) => (j === i ? e.target.value : p)),
                  )
                }
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
              <button
                type="button"
                onClick={() =>
                  patch(
                    "press",
                    "publications",
                    pressPublications.filter((_, j) => j !== i),
                  )
                }
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => patch("press", "publications", [...pressPublications, ""])}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Add publication
          </button>
        </div>
      </Section>

      <Section title="Bottom CTA">
        <Field
          label="Eyebrow"
          value={String(cta.eyebrow ?? "")}
          onChange={(v) => patch("cta", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(cta.title ?? "")}
          onChange={(v) => patch("cta", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(cta.titleHighlight ?? "")}
          onChange={(v) => patch("cta", "titleHighlight", v)}
        />
        <Field
          label="Title Suffix"
          value={String(cta.titleSuffix ?? "")}
          onChange={(v) => patch("cta", "titleSuffix", v)}
        />
        <CtaField
          label="Primary CTA"
          value={ctaPrimary}
          onChange={(v) => patch("cta", "primaryCta", v)}
        />
        <CtaField
          label="Secondary CTA"
          value={ctaSecondary}
          onChange={(v) => patch("cta", "secondaryCta", v)}
        />
      </Section>
    </div>
  );
}

function FeaturesEditor({
  data,
  onChange,
}: {
  data: Record<string, unknown>;
  onChange: (d: Record<string, unknown>) => void;
}) {
  function patch(section: string, field: string, value: unknown) {
    const sec = (data[section] as Record<string, unknown>) ?? {};
    onChange({ ...data, [section]: { ...sec, [field]: value } });
  }

  const hero = (data.hero as Record<string, unknown>) ?? {};
  const groups =
    (data.groups as Array<{
      title: string;
      features: Array<{ title: string; description: string }>;
    }>) ?? [];
  const cta = (data.cta as Record<string, unknown>) ?? {};

  function updateGroup(i: number, field: string, value: unknown) {
    onChange({ ...data, groups: groups.map((g, j) => (j === i ? { ...g, [field]: value } : g)) });
  }

  function updateFeature(gi: number, fi: number, field: string, value: string) {
    const updated = groups.map((g, j) =>
      j === gi
        ? { ...g, features: g.features.map((f, k) => (k === fi ? { ...f, [field]: value } : f)) }
        : g,
    );
    onChange({ ...data, groups: updated });
  }

  return (
    <div className="space-y-4">
      <Section title="Hero">
        <Field
          label="Eyebrow"
          value={String(hero.eyebrow ?? "")}
          onChange={(v) => patch("hero", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(hero.title ?? "")}
          onChange={(v) => patch("hero", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(hero.titleHighlight ?? "")}
          onChange={(v) => patch("hero", "titleHighlight", v)}
        />
        <Field
          label="Description"
          value={String(hero.description ?? "")}
          onChange={(v) => patch("hero", "description", v)}
          multiline
        />
      </Section>

      {groups.map((group, gi) => (
        <div key={gi} className="overflow-hidden rounded-xl border border-border">
          <div className="flex items-center justify-between bg-muted/40 px-4 py-3">
            <div className="flex-1">
              <input
                value={group.title}
                onChange={(e) => updateGroup(gi, "title", e.target.value)}
                className="w-full bg-transparent text-sm font-medium outline-none"
                placeholder="Group title"
              />
            </div>
            <button
              type="button"
              onClick={() => onChange({ ...data, groups: groups.filter((_, j) => j !== gi) })}
              className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive ml-2"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            {group.features.map((feature, fi) => (
              <div key={fi} className="rounded-lg border border-border/50 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Feature {fi + 1}</span>
                  <button
                    type="button"
                    onClick={() =>
                      updateGroup(
                        gi,
                        "features",
                        group.features.filter((_, k) => k !== fi),
                      )
                    }
                    className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
                <Field
                  label="Title"
                  value={feature.title}
                  onChange={(v) => updateFeature(gi, fi, "title", v)}
                />
                <Field
                  label="Description"
                  value={feature.description}
                  onChange={(v) => updateFeature(gi, fi, "description", v)}
                  multiline
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                updateGroup(gi, "features", [...group.features, { title: "", description: "" }])
              }
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-3.5 w-3.5" /> Add feature
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          onChange({ ...data, groups: [...groups, { title: "New Group", features: [] }] })
        }
        className="flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground w-full justify-center"
      >
        <Plus className="h-4 w-4" /> Add feature group
      </button>

      <Section title="Bottom CTA">
        <Field
          label="Title"
          value={String(cta.title ?? "")}
          onChange={(v) => patch("cta", "title", v)}
        />
        <Field
          label="Description"
          value={String(cta.description ?? "")}
          onChange={(v) => patch("cta", "description", v)}
          multiline
        />
        <Field
          label="CTA Button Text"
          value={String(cta.ctaText ?? "")}
          onChange={(v) => patch("cta", "ctaText", v)}
        />
        <Field
          label="CTA Button Link"
          value={String(cta.ctaHref ?? "")}
          onChange={(v) => patch("cta", "ctaHref", v)}
        />
      </Section>
    </div>
  );
}

function PricingEditor({
  data,
  onChange,
}: {
  data: Record<string, unknown>;
  onChange: (d: Record<string, unknown>) => void;
}) {
  function patch(section: string, field: string, value: unknown) {
    const sec = (data[section] as Record<string, unknown>) ?? {};
    onChange({ ...data, [section]: { ...sec, [field]: value } });
  }

  const hero = (data.hero as Record<string, unknown>) ?? {};
  const tiers =
    (data.tiers as Array<{
      name: string;
      price: string;
      per: string;
      desc: string;
      cta: string;
      ctaHref: string;
      highlight: boolean;
      features: string[];
    }>) ?? [];
  const compare = (data.compare as Record<string, unknown>) ?? {};
  const compareRows = (compare.rows as string[][]) ?? [];

  function updateTier(i: number, field: string, value: unknown) {
    onChange({ ...data, tiers: tiers.map((t, j) => (j === i ? { ...t, [field]: value } : t)) });
  }

  return (
    <div className="space-y-4">
      <Section title="Hero">
        <Field
          label="Eyebrow"
          value={String(hero.eyebrow ?? "")}
          onChange={(v) => patch("hero", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(hero.title ?? "")}
          onChange={(v) => patch("hero", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(hero.titleHighlight ?? "")}
          onChange={(v) => patch("hero", "titleHighlight", v)}
        />
        <Field
          label="Description"
          value={String(hero.description ?? "")}
          onChange={(v) => patch("hero", "description", v)}
          multiline
        />
      </Section>

      <div>
        <h3 className="mb-3 text-sm font-medium">Pricing Tiers</h3>
        <div className="space-y-3">
          {tiers.map((tier, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border">
              <div className="flex items-center justify-between bg-muted/40 px-4 py-3">
                <span className="text-sm font-medium">{tier.name || `Tier ${i + 1}`}</span>
                <button
                  type="button"
                  onClick={() => onChange({ ...data, tiers: tiers.filter((_, j) => j !== i) })}
                  className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <Field
                    label="Name"
                    value={tier.name}
                    onChange={(v) => updateTier(i, "name", v)}
                  />
                  <Field
                    label="Price"
                    value={tier.price}
                    onChange={(v) => updateTier(i, "price", v)}
                  />
                  <Field
                    label="Period"
                    value={tier.per}
                    onChange={(v) => updateTier(i, "per", v)}
                  />
                </div>
                <Field
                  label="Description"
                  value={tier.desc}
                  onChange={(v) => updateTier(i, "desc", v)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Field
                    label="CTA Text"
                    value={tier.cta}
                    onChange={(v) => updateTier(i, "cta", v)}
                  />
                  <Field
                    label="CTA Link"
                    value={tier.ctaHref ?? "/contact"}
                    onChange={(v) => updateTier(i, "ctaHref", v)}
                  />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!tier.highlight}
                    onChange={(e) => updateTier(i, "highlight", e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-muted-foreground">Mark as most popular</span>
                </label>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-muted-foreground">
                    Features
                  </label>
                  {(tier.features ?? []).map((feat, fi) => (
                    <div key={fi} className="flex gap-2">
                      <input
                        value={feat}
                        onChange={(e) =>
                          updateTier(
                            i,
                            "features",
                            tier.features.map((f, k) => (k === fi ? e.target.value : f)),
                          )
                        }
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateTier(
                            i,
                            "features",
                            tier.features.filter((_, k) => k !== fi),
                          )
                        }
                        className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => updateTier(i, "features", [...(tier.features ?? []), ""])}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add feature
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              onChange({
                ...data,
                tiers: [
                  ...tiers,
                  {
                    name: "",
                    price: "",
                    per: "",
                    desc: "",
                    cta: "",
                    ctaHref: "/contact",
                    highlight: false,
                    features: [],
                  },
                ],
              })
            }
            className="flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground w-full justify-center"
          >
            <Plus className="h-4 w-4" /> Add pricing tier
          </button>
        </div>
      </div>

      <Section title="Comparison Table">
        <Field
          label="Eyebrow"
          value={String(compare.eyebrow ?? "")}
          onChange={(v) => patch("compare", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(compare.title ?? "")}
          onChange={(v) => patch("compare", "title", v)}
        />
        <div className="space-y-1">
          <label className="block text-xs font-medium text-muted-foreground">
            Rows (first cell = feature name, rest = per-tier values)
          </label>
          {compareRows.map((row, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex flex-1 gap-1">
                {row.map((cell, ci) => (
                  <input
                    key={ci}
                    value={cell}
                    onChange={(e) =>
                      patch(
                        "compare",
                        "rows",
                        compareRows.map((r, ri) =>
                          ri === i ? r.map((c, ci2) => (ci2 === ci ? e.target.value : c)) : r,
                        ),
                      )
                    }
                    className="flex-1 min-w-0 rounded-lg border border-border bg-background px-2 py-2 text-xs outline-none ring-ring focus:ring-2"
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  patch(
                    "compare",
                    "rows",
                    compareRows.filter((_, ri) => ri !== i),
                  )
                }
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              patch("compare", "rows", [...compareRows, Array(tiers.length + 1).fill("")])
            }
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Add row
          </button>
        </div>
      </Section>
    </div>
  );
}

function SolutionsEditor({
  data,
  onChange,
}: {
  data: Record<string, unknown>;
  onChange: (d: Record<string, unknown>) => void;
}) {
  function patch(section: string, field: string, value: unknown) {
    const sec = (data[section] as Record<string, unknown>) ?? {};
    onChange({ ...data, [section]: { ...sec, [field]: value } });
  }

  const hero = (data.hero as Record<string, unknown>) ?? {};
  const solutions =
    (data.solutions as Array<{ title: string; description: string; bullets: string[] }>) ?? [];
  const cta = (data.cta as Record<string, unknown>) ?? {};
  const ctaPrimary = (cta.primaryCta as { text: string; href: string }) ?? { text: "", href: "" };
  const ctaSecondary = (cta.secondaryCta as { text: string; href: string }) ?? {
    text: "",
    href: "",
  };

  function updateSolution(i: number, field: string, value: unknown) {
    onChange({
      ...data,
      solutions: solutions.map((s, j) => (j === i ? { ...s, [field]: value } : s)),
    });
  }

  return (
    <div className="space-y-4">
      <Section title="Hero">
        <Field
          label="Eyebrow"
          value={String(hero.eyebrow ?? "")}
          onChange={(v) => patch("hero", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(hero.title ?? "")}
          onChange={(v) => patch("hero", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(hero.titleHighlight ?? "")}
          onChange={(v) => patch("hero", "titleHighlight", v)}
        />
        <Field
          label="Description"
          value={String(hero.description ?? "")}
          onChange={(v) => patch("hero", "description", v)}
          multiline
        />
      </Section>

      <div>
        <h3 className="mb-3 text-sm font-medium">Solution Cards</h3>
        <div className="space-y-3">
          {solutions.map((sol, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border">
              <div className="flex items-center justify-between bg-muted/40 px-4 py-3">
                <span className="text-sm font-medium">{sol.title || `Solution ${i + 1}`}</span>
                <button
                  type="button"
                  onClick={() =>
                    onChange({ ...data, solutions: solutions.filter((_, j) => j !== i) })
                  }
                  className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="p-4 space-y-3">
                <Field
                  label="Title"
                  value={sol.title}
                  onChange={(v) => updateSolution(i, "title", v)}
                />
                <Field
                  label="Description"
                  value={sol.description}
                  onChange={(v) => updateSolution(i, "description", v)}
                  multiline
                />
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-muted-foreground">
                    Bullet points
                  </label>
                  {(sol.bullets ?? []).map((bullet, bi) => (
                    <div key={bi} className="flex gap-2">
                      <input
                        value={bullet}
                        onChange={(e) =>
                          updateSolution(
                            i,
                            "bullets",
                            sol.bullets.map((b, k) => (k === bi ? e.target.value : b)),
                          )
                        }
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateSolution(
                            i,
                            "bullets",
                            sol.bullets.filter((_, k) => k !== bi),
                          )
                        }
                        className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => updateSolution(i, "bullets", [...(sol.bullets ?? []), ""])}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add bullet
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              onChange({
                ...data,
                solutions: [...solutions, { title: "", description: "", bullets: [] }],
              })
            }
            className="flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground w-full justify-center"
          >
            <Plus className="h-4 w-4" /> Add solution
          </button>
        </div>
      </div>

      <Section title="Bottom CTA">
        <Field
          label="Eyebrow"
          value={String(cta.eyebrow ?? "")}
          onChange={(v) => patch("cta", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(cta.title ?? "")}
          onChange={(v) => patch("cta", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(cta.titleHighlight ?? "")}
          onChange={(v) => patch("cta", "titleHighlight", v)}
        />
        <Field
          label="Description"
          value={String(cta.description ?? "")}
          onChange={(v) => patch("cta", "description", v)}
          multiline
        />
        <CtaField
          label="Primary CTA"
          value={ctaPrimary}
          onChange={(v) => patch("cta", "primaryCta", v)}
        />
        <CtaField
          label="Secondary CTA"
          value={ctaSecondary}
          onChange={(v) => patch("cta", "secondaryCta", v)}
        />
      </Section>
    </div>
  );
}

function IntegrationsEditor({
  data,
  onChange,
}: {
  data: Record<string, unknown>;
  onChange: (d: Record<string, unknown>) => void;
}) {
  function patch(section: string, field: string, value: unknown) {
    const sec = (data[section] as Record<string, unknown>) ?? {};
    onChange({ ...data, [section]: { ...sec, [field]: value } });
  }

  const hero = (data.hero as Record<string, unknown>) ?? {};
  const groups =
    (data.groups as Array<{
      name: string;
      blurb: string;
      items: Array<{ name: string; caption: string; key: string }>;
    }>) ?? [];
  const custom = (data.custom as Record<string, unknown>) ?? {};
  const customFeatures = (custom.features as string[]) ?? [];

  function updateGroup(i: number, field: string, value: unknown) {
    onChange({ ...data, groups: groups.map((g, j) => (j === i ? { ...g, [field]: value } : g)) });
  }

  function updateItem(gi: number, ii: number, field: string, value: string) {
    const updated = groups.map((g, j) =>
      j === gi
        ? { ...g, items: g.items.map((item, k) => (k === ii ? { ...item, [field]: value } : item)) }
        : g,
    );
    onChange({ ...data, groups: updated });
  }

  return (
    <div className="space-y-4">
      <Section title="Hero">
        <Field
          label="Eyebrow"
          value={String(hero.eyebrow ?? "")}
          onChange={(v) => patch("hero", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(hero.title ?? "")}
          onChange={(v) => patch("hero", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(hero.titleHighlight ?? "")}
          onChange={(v) => patch("hero", "titleHighlight", v)}
        />
        <Field
          label="Description"
          value={String(hero.description ?? "")}
          onChange={(v) => patch("hero", "description", v)}
          multiline
        />
      </Section>

      {groups.map((group, gi) => (
        <div key={gi} className="overflow-hidden rounded-xl border border-border">
          <div className="flex items-center justify-between bg-muted/40 px-4 py-3">
            <input
              value={group.name}
              onChange={(e) => updateGroup(gi, "name", e.target.value)}
              className="flex-1 bg-transparent text-sm font-medium outline-none"
              placeholder="Group name"
            />
            <button
              type="button"
              onClick={() => onChange({ ...data, groups: groups.filter((_, j) => j !== gi) })}
              className="ml-2 rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <Field
              label="Blurb"
              value={group.blurb}
              onChange={(v) => updateGroup(gi, "blurb", v)}
              multiline
            />
            <div className="space-y-2">
              <label className="block text-xs font-medium text-muted-foreground">
                Integrations
              </label>
              {group.items.map((item, ii) => (
                <div key={ii} className="grid grid-cols-[2fr_2fr_1fr_auto] gap-2">
                  <input
                    value={item.name}
                    onChange={(e) => updateItem(gi, ii, "name", e.target.value)}
                    placeholder="Name"
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
                  />
                  <input
                    value={item.caption}
                    onChange={(e) => updateItem(gi, ii, "caption", e.target.value)}
                    placeholder="Caption"
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
                  />
                  <input
                    value={item.key}
                    onChange={(e) => updateItem(gi, ii, "key", e.target.value)}
                    placeholder="Key"
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateGroup(
                        gi,
                        "items",
                        group.items.filter((_, k) => k !== ii),
                      )
                    }
                    className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  updateGroup(gi, "items", [...group.items, { name: "", caption: "", key: "" }])
                }
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <Plus className="h-3.5 w-3.5" /> Add integration
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          onChange({ ...data, groups: [...groups, { name: "New Group", blurb: "", items: [] }] })
        }
        className="flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground w-full justify-center"
      >
        <Plus className="h-4 w-4" /> Add integration group
      </button>

      <Section title="Custom / API Section">
        <Field
          label="Eyebrow"
          value={String(custom.eyebrow ?? "")}
          onChange={(v) => patch("custom", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={String(custom.title ?? "")}
          onChange={(v) => patch("custom", "title", v)}
        />
        <Field
          label="Title Highlight"
          value={String(custom.titleHighlight ?? "")}
          onChange={(v) => patch("custom", "titleHighlight", v)}
        />
        <Field
          label="Description"
          value={String(custom.description ?? "")}
          onChange={(v) => patch("custom", "description", v)}
          multiline
        />
        <div className="space-y-1">
          <label className="block text-xs font-medium text-muted-foreground">Feature tags</label>
          {customFeatures.map((feat, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={feat}
                onChange={(e) =>
                  patch(
                    "custom",
                    "features",
                    customFeatures.map((f, j) => (j === i ? e.target.value : f)),
                  )
                }
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
              <button
                type="button"
                onClick={() =>
                  patch(
                    "custom",
                    "features",
                    customFeatures.filter((_, j) => j !== i),
                  )
                }
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => patch("custom", "features", [...customFeatures, ""])}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Add feature
          </button>
        </div>
      </Section>
    </div>
  );
}

// ─── Main content editor ─────────────────────────────────────────────────────

interface Props {
  pageId: string;
  pageLabel: string;
  initialContent: Record<string, unknown>;
}

export default function ContentEditor({ pageId, pageLabel, initialContent }: Props) {
  const [data, setData] = useState<Record<string, unknown>>(initialContent);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = useCallback((d: Record<string, unknown>) => {
    setData(d);
    setStatus("idle");
  }, []);

  async function handleSave() {
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch(`/api/admin/content/${pageId}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  }

  const EditorComponent = {
    home: HomeEditor,
    about: AboutEditor,
    features: FeaturesEditor,
    pricing: PricingEditor,
    solutions: SolutionsEditor,
    integrations: IntegrationsEditor,
  }[pageId];

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{pageLabel} Page</h1>
        <div className="flex items-center gap-3">
          {status === "success" && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600">
              <CheckCircle2 className="h-4 w-4" /> Saved
            </span>
          )}
          {status === "error" && (
            <span className="flex items-center gap-1.5 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" /> Failed to save
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      {EditorComponent ? (
        <EditorComponent data={data} onChange={handleChange} />
      ) : (
        <p className="text-sm text-muted-foreground">No editor available for this page.</p>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
