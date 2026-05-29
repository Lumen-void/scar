import { AlertTriangle, ShieldCheck } from "lucide-react";
import { localMarketMatrix, type LocalMarketItem } from "@scar/domain";
import { getPublishedGroundRulesByRegionSlug } from "@scar/db/admin";
import { StatusBadge, Surface } from "@scar/ui";

export const dynamic = "force-static";

export default async function SafetyPage() {
  const dbRules = await getPublishedGroundRulesByRegionSlug("kullu-lahaul", ["SAFETY", "EMERGENCY", "PERMIT", "SEASONAL_NOTE"]);
  const fallbackItems: LocalMarketItem[] = [
    ...localMarketMatrix.dangerZones,
    ...localMarketMatrix.seasonalNotes,
    ...localMarketMatrix.emergencyContacts
  ];
  const items = dbRules.length
    ? dbRules.map((rule) => ({
      title: rule.title,
      zone: rule.zone,
      status: rule.statusLabel,
      summary: rule.summary,
      timing: rule.timing ?? undefined,
      sourceType: "safety"
    }))
    : fallbackItems;
  return (
    <div>
      <section className="page-hero">
        <h1>Safety and Local Rules</h1>
        <p>Danger zones, seasonal route shifts, emergency contacts and places where first-time travelers should not improvise.</p>
      </section>
      <div className="market-grid">
        {items.map((item) => (
          <article key={item.title} className="ground-card">
            {item.status === "Allowed" ? <ShieldCheck aria-hidden="true" /> : <AlertTriangle aria-hidden="true" />}
            <StatusBadge tone={item.status === "Allowed" ? "good" : "warn"}>{item.status}</StatusBadge>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="ground-meta"><span>{item.zone}</span><strong>{item.timing ?? item.sourceType}</strong></div>
          </article>
        ))}
      </div>
      <Surface className="mt-4">
        <h2 className="text-xl font-black">Cached safety visibility</h2>
        <p className="mt-2 text-sm leading-6 text-muted">These notes belong in the saved travel book too, so weak network does not hide essential local guidance.</p>
      </Surface>
    </div>
  );
}
