import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";
import { himachalTravelState } from "@scar/domain";
import { getPublishedRegions } from "@scar/db/admin";
import { StatusBadge, Surface } from "@scar/ui";

export const dynamic = "force-static";

export default async function StatesPage() {
  const regions = await getPublishedRegions();

  return (
    <div>
      <section className="page-hero">
        <h1>Travel States</h1>
        <p>Every state becomes a travel book with regions, routes, stays, guides, activities, offline notes and emotional journey paths.</p>
      </section>
      <Surface>
        <div className="destination-feature">
          <MapPinned aria-hidden="true" />
          <div>
            <StatusBadge tone="good">Live state book</StatusBadge>
            <h2 className="mt-3 text-3xl font-black">{himachalTravelState.name}</h2>
            <p>{himachalTravelState.framing}</p>
            <Link className="action-button mt-4 inline-flex" href="/states/himachal-pradesh">
              Open Himachal <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Surface>
      {regions.length ? (
        <div className="atlas-grid mt-4">
          {regions.map((region) => (
            <Link key={region.slug} href={`/states/himachal-pradesh/${region.slug}`} className="atlas-card">
              <span>{region.tourismCategories.slice(0, 2).join(" / ") || "Himachal"}</span>
              <small>{region.bestSeason ?? "Seasonal"}</small>
              <h3>{region.title}</h3>
              <p>{region.summary}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
