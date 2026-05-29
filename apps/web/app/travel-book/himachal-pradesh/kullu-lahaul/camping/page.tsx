import { Backpack, Flame, Tent } from "lucide-react";
import { localMarketMatrix, type LocalMarketItem } from "@scar/domain";
import { getPublishedGroundRulesByRegionSlug } from "@scar/db/admin";
import { StatusBadge, Surface } from "@scar/ui";

export const dynamic = "force-static";

export default async function CampingPage() {
  const dbRules = await getPublishedGroundRulesByRegionSlug("kullu-lahaul", ["CAMPING", "LOCAL_CHARGE"]);
  const fallbackItems: LocalMarketItem[] = [
    ...localMarketMatrix.campingRules,
    ...localMarketMatrix.campingSupplyPoints,
    ...localMarketMatrix.localCharges,
    ...localMarketMatrix.allowedZones
  ];
  const items = dbRules.length
    ? dbRules.map((rule) => ({
      title: rule.title,
      zone: rule.zone,
      status: rule.statusLabel,
      summary: rule.summary,
      cost: rule.cost ?? undefined,
      timing: rule.timing ?? undefined
    }))
    : fallbackItems;
  return (
    <div>
      <section className="page-hero">
        <h1>Camping Ground Reality</h1>
        <p>How to camp safely, where not to go, what to carry, which charges appear locally, and why unsupported forest camping is not casual travel.</p>
      </section>
      <div className="market-grid">
        {items.map((item) => (
          <article key={item.title} className="ground-card">
            <Tent aria-hidden="true" />
            <StatusBadge tone={item.status === "Allowed" ? "good" : "warn"}>{item.status}</StatusBadge>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="ground-meta"><span>{item.zone}</span><strong>{item.cost ?? "Local check needed"}</strong></div>
          </article>
        ))}
      </div>
      <div className="dashboard-grid mt-4">
        <Surface className="span-6"><Backpack aria-hidden="true" /><h2 className="mt-3 text-xl font-black">Before you camp</h2><p className="text-sm text-muted">Water, rain layer, torch, batteries, medicine, guide contact, local permission and exit route should be known first.</p></Surface>
        <Surface className="span-6"><Flame aria-hidden="true" /><h2 className="mt-3 text-xl font-black">Fire and night rule</h2><p className="text-sm text-muted">Bonfire, blankets, late vehicle calls and guide overtime can become separate charges. The book makes them visible before arrival.</p></Surface>
      </div>
    </div>
  );
}
