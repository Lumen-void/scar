import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { AlertTriangle, Car, Compass, Search, ShieldCheck, Tent, Users } from "lucide-react";
import { localMarketMatrix, scarAudienceCollections, scarDestinationMedia, travelBookChapters, travelBookPrepTimeline, type LocalMarketItem } from "@scar/domain";
import { getPublishedTravelBookData } from "@scar/db/admin";
import { Metric, StatusBadge, Surface } from "@scar/ui";

export const dynamic = "force-static";

const chapterIcons = [Tent, Car, Users, Tent, ShieldCheck, AlertTriangle, Compass];

export default async function TravelBookPage() {
  const dbBook = await getPublishedTravelBookData();
  const groundRealityItems: LocalMarketItem[] = [
    ...localMarketMatrix.localTransportRules,
    ...localMarketMatrix.campingRules,
    ...localMarketMatrix.trekkingGuideRequirements,
    ...localMarketMatrix.localCharges
  ];
  const costItems: LocalMarketItem[] = [
    ...localMarketMatrix.localCharges,
    ...localMarketMatrix.horsemanOptions,
    ...localMarketMatrix.trekkingGuideRequirements
  ];
  const dbRules = dbBook.flatMap((region) => region.groundRules.map((rule) => ({ ...rule, regionName: region.name })));
  const dbPlaceCards = dbBook.flatMap((region) =>
    region.places.map((place) => ({
      title: place.name,
      label: `${region.name} / ${place.placeType}`,
      detail: place.summary,
      href: `/states/himachal-pradesh/${region.slug}`,
      image: region.mediaAssets[0]?.url ?? "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85"
    }))
  );
  const visibleDestinationCards = dbPlaceCards.length ? dbPlaceCards : scarDestinationMedia;

  return (
    <div>
      <section className="ground-book-hero">
        <div>
          <StatusBadge tone="good">Ground Reality Book</StatusBadge>
          <h1>Everything the mountain does not tell first-time travelers.</h1>
          <p>{localMarketMatrix.promise}</p>
          <div className="ground-search">
            <Search size={18} aria-hidden="true" />
            <span>Search local vehicles, camping rules, guide needs, charges, danger zones</span>
          </div>
        </div>
        <div className="chapter-tabs" aria-label="Travel book chapters">
          {travelBookChapters.map((chapter, index) => {
            const Icon = chapterIcons[index] ?? Compass;
            return (
              <Link key={chapter.label} className="chapter-tab" href={chapter.href}>
                <Icon size={18} aria-hidden="true" />
                <span>{chapter.label}</span>
                <small>{chapter.detail}</small>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="media-section">
        <div className="section-heading">
          <span>Rich preview library</span>
          <h2>Browse by traveler, place and ground reality before building the itinerary.</h2>
        </div>
        <div className="media-card-grid">
          {scarAudienceCollections.slice(0, 4).map((collection, index) => (
            <Link key={collection.title} href={collection.href} className="media-card media-card--short">
              <Image src={collection.image} alt="" width={900} height={900} priority={index === 0} />
              <div className="media-card__body">
                <span>{collection.audience}</span>
                <h3>{collection.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <nav className="breadcrumb-rail" aria-label="Breadcrumb">
        <Link href="/travel-book">Travel Book</Link>
        <span>Himachal</span>
        <span>Kullu-Lahaul</span>
        <span>Ground Reality</span>
      </nav>

      <section className="route-handoff">
        <div>
          <StatusBadge tone="warn">Route handoff</StatusBadge>
          <h2>Shared transit ends. Local movement begins.</h2>
          <p>SCAR separates the travel-book into what the group shares and what the traveler must know locally after dispersal.</p>
        </div>
        <div className="handoff-rail">
          {["Shared SUV", "Manali hub", "Local taxi", "Guide / horseman", "Camp / trail"].map((item, index) => (
            <div key={item} className={index > 1 ? "handoff-node handoff-node--local" : "handoff-node"}>
              <span>{index + 1}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="market-grid">
        {dbRules.map((item) => (
          <article key={item.id} className="ground-card">
            <StatusBadge tone={item.statusLabel === "Allowed" ? "good" : item.statusLabel === "Not Recommended" ? "warn" : "neutral"}>{item.statusLabel}</StatusBadge>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="ground-meta">
              <span>{item.regionName} / {item.zone}</span>
              {item.cost ? <strong>{item.cost}</strong> : null}
            </div>
          </article>
        ))}
        {groundRealityItems.map((item) => (
          <article key={item.title} className="ground-card">
            <StatusBadge tone={item.status === "Allowed" ? "good" : item.status === "Not Recommended" ? "warn" : "neutral"}>{item.status}</StatusBadge>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="ground-meta">
              <span>{item.zone}</span>
              {item.cost ? <strong>{item.cost}</strong> : null}
            </div>
          </article>
        ))}
      </div>

      <section className="media-section">
        <div className="section-heading">
          <span>Places inside the book</span>
          <h2>Each destination becomes a preview into transport, safety, camping and local support.</h2>
        </div>
        <div className="destination-media-grid">
          {visibleDestinationCards.map((destination) => (
            <Link key={destination.title} href={destination.href as Route} className="destination-media-card">
              <Image src={destination.image} alt="" width={900} height={560} />
              <div>
                <span>{destination.label}</span>
                <h3>{destination.title}</h3>
                <p>{destination.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="dashboard-grid">
        <Surface className="span-7">
          <h2 className="text-xl font-black">Cost Signals</h2>
          <div className="cost-bars">
            {costItems.map((item, index) => (
              <div key={item.title} className="cost-row">
                <span>{item.sourceType}</span>
                <i style={{ width: `${42 + index * 18}%` }} />
                <strong>{item.cost ?? "Variable"}</strong>
              </div>
            ))}
          </div>
        </Surface>
        <Surface className="span-5">
          <h2 className="text-xl font-black">Safety Heat Zones</h2>
          <div className="heat-zone-list">
            {["Allowed", "Caution", "Guide Required", "Local Vehicle Only", "Not Recommended", "Seasonal"].map((status) => (
              <span key={status} className={`heat-chip heat-chip--${status.toLowerCase().replaceAll(" ", "-")}`}>{status}</span>
            ))}
          </div>
        </Surface>
        <Metric label="DB regions" value={String(dbBook.length || 1)} tone="accent" />
        <Metric label="Ground records" value={String(dbRules.length + groundRealityItems.length)} />
        <Metric label="Cached access" value="Secondary" />
      </div>

      <section className="prep-timeline">
        {travelBookPrepTimeline.map((step) => (
          <article key={step.phase}>
            <span>{step.phase}</span>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
