import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { BookOpen, Route as RouteIcon, ShieldCheck } from "lucide-react";
import type { PublicRegionDetails } from "@scar/db/admin";
import { StatusBadge, Surface } from "@scar/ui";

export function RegionDetailPage({ region }: { region: PublicRegionDetails }) {
  const heroImage = region.mediaAssets[0]?.url ?? "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85";

  return (
    <div>
      <section className="region-detail-hero">
        <Image src={heroImage} alt="" width={1800} height={1000} priority />
        <div>
          <StatusBadge tone="good">{region.stateName}</StatusBadge>
          <h1>{region.title}</h1>
          <p>{region.summary}</p>
          <div className="hero-actions">
            <Link className="action-button" href={`/travel-book/himachal-pradesh/${region.slug}` as Route}>Open ground book</Link>
            {region.travelProducts[0] ? (
              <Link className="ghost-button ghost-button--on-dark" href={region.travelProducts[0].href as Route}>View trip</Link>
            ) : null}
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        <Surface className="span-4">
          <BookOpen aria-hidden="true" />
          <h2 className="mt-3 text-xl font-black">Best season</h2>
          <p className="text-sm text-muted">{region.bestSeason ?? "Seasonal, verify before travel."}</p>
        </Surface>
        <Surface className="span-4">
          <RouteIcon aria-hidden="true" />
          <h2 className="mt-3 text-xl font-black">How to reach</h2>
          <p className="text-sm text-muted">{region.howToReach ?? "Add access notes from admin."}</p>
        </Surface>
        <Surface className="span-4">
          <ShieldCheck aria-hidden="true" />
          <h2 className="mt-3 text-xl font-black">Route reality</h2>
          <p className="text-sm text-muted">{region.routeReality ?? "Add local movement rules from admin."}</p>
        </Surface>
      </div>

      {region.places.length ? (
        <section className="media-section">
          <div className="section-heading">
            <span>Places</span>
            <h2>Published ground points inside this region.</h2>
          </div>
          <div className="market-grid">
            {region.places.map((place) => (
              <article key={place.id} className="ground-card">
                <BookOpen aria-hidden="true" />
                <StatusBadge tone="neutral">{place.placeType}</StatusBadge>
                <h3>{place.name}</h3>
                <p>{place.summary}</p>
                <div className="ground-meta">
                  <span>{place.regionName}</span>
                  <strong>{place.latitude && place.longitude ? `${place.latitude}, ${place.longitude}` : "Admin mapped"}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {region.routes.length ? (
        <section className="media-section">
          <div className="section-heading">
            <span>Routes</span>
            <h2>Editable movement logic and route stops.</h2>
          </div>
          <div className="chapter-stack">
            {region.routes.map((route) => (
              <article key={route.id} className="chapter-card">
                <span>{route.status}</span>
                <h2>{route.title}</h2>
                <p>{route.summary}</p>
                <strong>{route.stops.map((stop) => `${stop.sequence}. ${stop.label}`).join(" / ") || "Add stops from admin"}</strong>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="media-section">
        <div className="section-heading">
          <span>Travel book chapters</span>
          <h2>Admin-published chapters for this region.</h2>
        </div>
        <div className="chapter-stack">
          {region.chapters.map((chapter) => (
            <article key={chapter.id} className="chapter-card">
              <span>{chapter.status}</span>
              <h2>{chapter.title}</h2>
              <p>{chapter.summary}</p>
              <strong>{chapter.body}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="media-section">
        <div className="section-heading">
          <span>Ground rules</span>
          <h2>Transport, safety, camping and local charges.</h2>
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
                <strong>{rule.cost ?? rule.timing ?? "Verified note"}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      {region.travelProducts.length ? (
        <section className="media-section">
          <div className="section-heading">
            <span>Bookable trips</span>
            <h2>Products connected to this region.</h2>
          </div>
          <div className="trip-product-grid">
            {region.travelProducts.map((product) => (
              <Link key={product.slug} href={product.href as Route} className="trip-product-card">
                <Image src={product.image} alt="" width={900} height={1100} />
                <div className="trip-product-card__body">
                  <span>{product.category.replaceAll("-", " ")}</span>
                  <h2>{product.title}</h2>
                  <p>{product.tagline}</p>
                  <strong>INR {product.startingPriceInr.toLocaleString("en-IN")} / {product.duration}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
