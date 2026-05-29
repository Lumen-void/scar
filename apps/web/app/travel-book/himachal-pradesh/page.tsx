import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";
import { himachalTravelState, localMarketMatrix } from "@scar/domain";
import { getPublishedStateBook } from "@scar/db/admin";
import { StatusBadge, Surface } from "@scar/ui";

export const dynamic = "force-static";

export default async function TravelBookHimachalPage() {
  const stateBook = await getPublishedStateBook();
  const regions = stateBook?.regions.length ? stateBook.regions : himachalTravelState.regions.map((region) => ({
    slug: region.slug,
    name: region.name,
    title: region.title,
    summary: region.description,
    tourismCategories: region.focus
  }));

  return (
    <div>
      <section className="page-hero">
        <h1>{stateBook?.name ?? himachalTravelState.name} Travel Book</h1>
        <p>{stateBook?.framing ?? himachalTravelState.framing} This book adds the local market layer travelers usually discover too late.</p>
      </section>
      <div className="region-grid">
        {regions.map((region) => (
          <Surface key={region.slug}>
            <MapPinned aria-hidden="true" />
            <StatusBadge tone="good">{region.name}</StatusBadge>
            <h2 className="mt-3 text-2xl font-black">{region.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{region.summary}</p>
            <div className="focus-rail">
              {region.tourismCategories.map((focus) => <span key={focus}>{focus}</span>)}
            </div>
            <Link className="action-button mt-4 inline-flex" href={`/travel-book/himachal-pradesh/${region.slug}`}>
              Open ground book <ArrowRight size={16} />
            </Link>
          </Surface>
        ))}
      </div>
      <Surface className="mt-4">
        <StatusBadge tone="warn">Local market preview</StatusBadge>
        <h2 className="mt-3 text-2xl font-black">{localMarketMatrix.region}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">{localMarketMatrix.promise}</p>
      </Surface>
    </div>
  );
}
