import { Car, Route } from "lucide-react";
import { localMarketMatrix, type LocalMarketItem } from "@scar/domain";
import { getPublishedGroundRulesByRegionSlug } from "@scar/db/admin";
import { StatusBadge, Surface } from "@scar/ui";

export const dynamic = "force-static";

export default async function LocalTransportPage() {
  const dbRules = await getPublishedGroundRulesByRegionSlug("kullu-lahaul", ["TRANSPORT", "SEASONAL_NOTE"]);
  const fallbackItems: LocalMarketItem[] = [...localMarketMatrix.localTransportRules, ...localMarketMatrix.selfDriveRestrictions];
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
        <h1>Local Transport Rules</h1>
        <p>Where shared transit ends, where local vehicles make sense, and where self-drive should be treated with caution.</p>
      </section>
      <section className="route-handoff">
        <div><StatusBadge tone="warn">Handoff map</StatusBadge><h2>Shared route to local movement.</h2></div>
        <div className="handoff-rail">
          {["Delhi", "Chandigarh", "Manali hub", "Local taxi", "Village lane"].map((item, index) => (
            <div key={item} className={index > 2 ? "handoff-node handoff-node--local" : "handoff-node"}><span>{index + 1}</span><strong>{item}</strong></div>
          ))}
        </div>
      </section>
      <div className="market-grid">
        {items.map((item) => (
          <article key={item.title} className="ground-card">
            <Car aria-hidden="true" />
            <StatusBadge tone={item.status === "Not Recommended" ? "warn" : "good"}>{item.status}</StatusBadge>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="ground-meta"><span>{item.zone}</span><strong>{item.cost ?? item.timing ?? "Check same day"}</strong></div>
          </article>
        ))}
      </div>
      <Surface className="mt-4"><Route aria-hidden="true" /><h2 className="mt-3 text-xl font-black">Rule</h2><p className="text-sm text-muted">Outside vehicles are not treated as always-best. The book tells the traveler where local movement is safer, faster or required.</p></Surface>
    </div>
  );
}
