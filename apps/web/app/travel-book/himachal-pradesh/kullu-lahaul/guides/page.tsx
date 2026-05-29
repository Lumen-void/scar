import { Footprints, Users } from "lucide-react";
import { localMarketMatrix, type LocalMarketItem } from "@scar/domain";
import { getPublishedGroundRulesByRegionSlug } from "@scar/db/admin";
import { StatusBadge } from "@scar/ui";

export const dynamic = "force-static";

export default async function GuidesPage() {
  const dbRules = await getPublishedGroundRulesByRegionSlug("kullu-lahaul", ["GUIDE_REQUIREMENT"]);
  const fallbackItems: LocalMarketItem[] = [...localMarketMatrix.trekkingGuideRequirements, ...localMarketMatrix.horsemanOptions];
  const items = dbRules.length
    ? dbRules.map((rule) => ({
      title: rule.title,
      zone: rule.zone,
      status: rule.statusLabel,
      summary: rule.summary,
      cost: rule.cost ?? undefined,
      sourceType: "trekking guide"
    }))
    : fallbackItems;
  return (
    <div>
      <section className="page-hero">
        <h1>Guides, Horsemen and Field Support</h1>
        <p>SCAR shows when local support is optional, useful or required so travelers do not learn it after reaching the trailhead.</p>
      </section>
      <div className="market-grid">
        {items.map((item) => (
          <article key={item.title} className="ground-card">
            {item.sourceType === "horseman" ? <Footprints aria-hidden="true" /> : <Users aria-hidden="true" />}
            <StatusBadge tone={item.status === "Guide Required" ? "warn" : "neutral"}>{item.status}</StatusBadge>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="ground-meta"><span>{item.zone}</span><strong>{item.cost ?? "Variable"}</strong></div>
          </article>
        ))}
      </div>
    </div>
  );
}
