import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { connectDB } from "@/lib/db/connect";
import { Content } from "@/lib/models/content.model";
import { PRODUCTS_DATA } from "@/lib/productData";

const corePages = [
  { id: "home", label: "Home", description: "Hero, stats, platform section, manifesto, CTA" },
  { id: "about", label: "About", description: "Hero, values, timeline, team, press, manifesto" },
  {
    id: "features",
    label: "Features",
    description: "Hero, feature groups and all individual features",
  },
  { id: "pricing", label: "Pricing", description: "Hero, pricing tiers, comparison table" },
  {
    id: "solutions",
    label: "Solutions",
    description: "Hero, solution cards and CTA section",
  },
  {
    id: "integrations",
    label: "Integrations",
    description: "Hero, integration groups, items and custom API section",
  },
  {
    id: "resources",
    label: "Resources",
    description: "Resource library listing, calculator, guides and free tools",
  },
];

const productPages = Object.values(PRODUCTS_DATA).map((product) => ({
  id: product.slug,
  label: product.title,
  description: `${product.eyebrow} — ${product.subheadline.substring(0, 50)}...`,
}));

const pages = [...corePages, ...productPages];

async function getLastUpdated(): Promise<Record<string, Date | null>> {
  try {
    await connectDB();
    const pageIds = pages.map((p) => p.id);
    const docs = await Content.find({ pageId: { $in: pageIds } })
      .select("pageId updatedAt")
      .lean();
    return Object.fromEntries(docs.map((d) => [d.pageId, d.updatedAt]));
  } catch {
    return {};
  }
}

export default async function ContentPage() {
  const lastUpdated = await getLastUpdated();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold">Content</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Edit the text and copy for every page on your website.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {pages.map((page) => {
          const updated = lastUpdated[page.id];
          return (
            <Link
              key={page.id}
              href={`/admin/content/${page.id}`}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-foreground/30 hover:bg-card/80"
            >
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-medium">{page.label}</h2>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{page.description}</p>
                <p className="mt-2 text-[11px] text-muted-foreground/70">
                  {updated
                    ? `Updated ${new Date(updated).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}`
                    : "Using defaults"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
