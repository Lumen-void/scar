import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { himachalTravelState } from "@scar/domain";
import { getPublishedStateBook } from "@scar/db/admin";
import { StatusBadge, Surface } from "@scar/ui";

export const dynamic = "force-static";

export default async function HimachalPage() {
  const stateBook = await getPublishedStateBook();
  const regions = stateBook?.regions.length ? stateBook.regions : himachalTravelState.regions.map((region) => ({
    slug: region.slug,
    name: region.name,
    title: region.title,
    summary: region.description,
    tourismCategories: region.focus,
    bestSeason: null,
    howToReach: null,
    routeReality: null
  }));

  return (
    <div>
      <section className="page-hero">
        <h1>{stateBook?.name ?? himachalTravelState.name}</h1>
        <p>{stateBook?.framing ?? himachalTravelState.framing}</p>
      </section>
      <div className="region-grid">
        {regions.map((region) => (
          <Surface key={region.slug}>
            <StatusBadge tone="good">{region.name}</StatusBadge>
            <h2 className="mt-3 text-2xl font-black">{region.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{region.summary}</p>
            <div className="focus-rail">
              {region.tourismCategories.map((focus) => <span key={focus}>{focus}</span>)}
            </div>
            <Link className="ghost-button mt-4 inline-flex" href={`/states/himachal-pradesh/${region.slug}`}>
              Explore region <ArrowRight size={16} />
            </Link>
          </Surface>
        ))}
      </div>
    </div>
  );
}
