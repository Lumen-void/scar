import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, BookOpen, Car, ShieldCheck, Tent, Users } from "lucide-react";
import type { PublicRegionDetails } from "@scar/db/admin";
import { StatusBadge, Surface } from "@scar/ui";

const chapterCards = [
  { href: "local-transport", title: "Local Transport", icon: Car, detail: "Local vehicles, self-drive limits and route handoffs." },
  { href: "camping", title: "Camping", icon: Tent, detail: "Allowed zones, forest restrictions, supply points and charges." },
  { href: "guides", title: "Guides", icon: Users, detail: "Trekking guides, horsemen and local support rules." },
  { href: "safety", title: "Safety", icon: ShieldCheck, detail: "Danger zones, seasonal notes and emergency visibility." }
] as const;

export function GroundBookRegionPage({ region }: { region: PublicRegionDetails }) {
  const baseHref = `/travel-book/himachal-pradesh/${region.slug}`;
  const dbChapterCards = region.chapters.map((chapter) => ({
    href: chapter.slug,
    title: chapter.title,
    icon: BookOpen,
    detail: chapter.summary
  }));
  const visibleChapters = dbChapterCards.length ? dbChapterCards : [...chapterCards];

  return (
    <div>
      <section className="page-hero">
        <h1>{region.name} Ground Reality Book</h1>
        <p>{region.routeReality ?? region.summary}</p>
      </section>

      <div className="chapter-tabs chapter-tabs--wide">
        {visibleChapters.map((chapter) => (
          <Link key={chapter.title} className="chapter-tab" href={`${baseHref}/${chapter.href}` as Route}>
            <span>{chapter.title}</span>
            <small>{chapter.detail}</small>
          </Link>
        ))}
      </div>

      <div className="region-grid mt-4">
        {visibleChapters.map((card) => {
          const Icon = card.icon;
          return (
            <Surface key={card.title}>
              <Icon aria-hidden="true" />
              <StatusBadge tone="good">Chapter</StatusBadge>
              <h2 className="mt-3 text-2xl font-black">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{card.detail}</p>
              <Link className="ghost-button mt-4 inline-flex" href={`${baseHref}/${card.href}` as Route}>
                Open chapter <ArrowRight size={16} />
              </Link>
            </Surface>
          );
        })}
      </div>

      <section className="media-section">
        <div className="section-heading">
          <span>Published rules</span>
          <h2>All verified ground records for this region.</h2>
        </div>
        <div className="market-grid">
          {region.groundRules.map((rule) => (
            <article key={rule.id} className="ground-card">
              <ShieldCheck aria-hidden="true" />
              <StatusBadge tone={rule.statusLabel === "Allowed" ? "good" : rule.statusLabel === "Not Recommended" ? "warn" : "neutral"}>{rule.statusLabel}</StatusBadge>
              <h3>{rule.title}</h3>
              <p>{rule.summary}</p>
              <div className="ground-meta">
                <span>{rule.ruleType} / {rule.zone}</span>
                <strong>{rule.cost ?? rule.timing ?? "Local check needed"}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
