import Link from "next/link";
import Image from "next/image";
import type { Route as NextRoute } from "next";
import type { CSSProperties } from "react";
import { ArrowRight, BookOpen, CalendarDays, MapPinned, Play, Route, ShieldCheck, SlidersHorizontal, Sparkles } from "lucide-react";
import {
  himachalTravelState,
  scarAudienceCollections,
  scarClassificationAtlas,
  scarDestinationMedia,
  travelBookCategories
} from "@scar/domain";
import { getHomepageSettings, getPublishedRegions, getPublishedTripProducts } from "@scar/db/admin";
import { Metric, StatusBadge, Surface } from "@scar/ui";

export const dynamic = "force-static";

export default async function HomePage() {
  const [homepage, products, dbRegions] = await Promise.all([
    getHomepageSettings(),
    getPublishedTripProducts(),
    getPublishedRegions()
  ]);
  const bookLayers = [
    ["Destinations", "States, regions, routes, stays and retreat chapters", "/states"],
    ["Travel Book", "Local vehicles, self-drive limits, guides, horsemen, charges and safety zones", "/travel-book"],
    ["Plan Your Trip", "Traveler vision becomes personal experiences after the shared arrival hub", "/customer"],
    ["Saved Access", "Important chapters remain readable when the mountain signal drops", "/offline"]
  ] as const;

  const featureStories = [
    {
      label: "Retreats",
      title: "Kullu-Lahaul mindful retreat",
      detail: "Silence, monastery immersion, forest walks and high mountain stillness shaped like a travel book.",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=85",
      href: "/states/himachal-pradesh/kullu-lahaul/mindful-retreat"
    },
    {
      label: "Local Rules",
      title: "Where shared transit ends",
      detail: "See where travelers disperse into local taxis, guides, horsemen, camping support and route-specific safety rules.",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85",
      href: "/travel-book/himachal-pradesh/kullu-lahaul/local-transport"
    },
    {
      label: "Camping",
      title: "Forest nights without blind risk",
      detail: "Allowed zones, guide-required routes, supply points, local charges and after-dark warnings in one chapter.",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=85",
      href: "/travel-book/himachal-pradesh/kullu-lahaul/camping"
    },
    {
      label: "Planner",
      title: "Your own itinerary after arrival",
      detail: "Everyone reaches the destination together. After the hub, the itinerary becomes personal.",
      image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1400&q=85",
      href: "/customer"
    }
  ] as const;

  return (
    <div>
      <section className="cinematic-hero">
        <div className="cinematic-hero__media" aria-hidden="true">
          <div className="hero-motion-frame">
            <Image
              src={homepage.heroImageUrl}
              alt=""
              width={1800}
              height={1200}
              priority
            />
            <div className="video-glow" />

            {/* Highly premium animated level background layers */}
            <div className="topographic-radar" />
            <div className="ambient-mist-container">
              <div className="ambient-mist-layer ambient-mist-layer--one" />
              <div className="ambient-mist-layer ambient-mist-layer--two" />
            </div>
            <div className="particles-container">
              <div className="particle particle--1" />
              <div className="particle particle--2" />
              <div className="particle particle--3" />
              <div className="particle particle--4" />
              <div className="particle particle--5" />
            </div>
            <div className="elevation-levels" />

            {/* Premium, ultra-clean route target markers */}
            <div className="premium-target-marker target-marker--one">
              <span className="target-marker__ping" />
              <span className="target-marker__label">Mandi Hub</span>
            </div>
            <div className="premium-target-marker target-marker--two">
              <span className="target-marker__ping" />
              <span className="target-marker__label">Lahaul Pass</span>
            </div>
            <div className="premium-target-marker target-marker--three">
              <span className="target-marker__ping" />
              <span className="target-marker__label">Kullu Camp</span>
            </div>
          </div>
        </div>

        <div className="cinematic-hero__content">
          <StatusBadge tone="good">{homepage.heroEyebrow}</StatusBadge>
          <h1>{homepage.heroTitle}</h1>
          <p>{homepage.heroBody}</p>
          <div className="hero-actions">
            <Link className="action-button" href={homepage.primaryCtaHref as NextRoute}>{homepage.primaryCtaLabel}</Link>
            <Link className="ghost-button ghost-button--on-dark" href={homepage.secondaryCtaHref as NextRoute}>{homepage.secondaryCtaLabel}</Link>
          </div>
        </div>

        <div className="hero-planner" aria-label="SCAR route planner preview">
          <div className="hero-planner__top">
            <span>Shared departure</span>
            <strong>Delhi / Chandigarh to Kullu-Manali</strong>
          </div>
          <div className="hero-route-line">
            {["Delhi", "Chandigarh", "Mandi", "Manali hub"].map((stop, index) => (
              <div key={stop} className={index === 3 ? "hero-route-stop hero-route-stop--active" : "hero-route-stop"}>
                <i>{index + 1}</i>
                <span>{stop}</span>
              </div>
            ))}
          </div>
          <div className="hero-split-grid">
            <div><Sparkles size={16} /><span>Mindful Retreats</span></div>
            <div><BookOpen size={16} /><span>Travel Book</span></div>
            <div><Route size={16} /><span>Local Routes</span></div>
            <div><ShieldCheck size={16} /><span>Safety Rules</span></div>
          </div>
        </div>

        <div className="hero-video-control">
          <button type="button" aria-label="Preview SCAR journey motion">
            <Play size={18} fill="currentColor" />
          </button>
          <span>Shared arrival. Personal chapters after the hub.</span>
        </div>

        {/* Sophisticated 3D elevation map deck */}
        <div className="elevation-deck" aria-hidden="true">
          <div className="elevation-deck__grid" />
          <div className="elevation-deck__contour elevation-deck__contour--one" />
          <div className="elevation-deck__contour elevation-deck__contour--two" />
          <div className="elevation-deck__contour elevation-deck__contour--three" />
          <div className="elevation-deck__core">
            <span>SCAR MAP</span>
            <strong>Elevation Deck</strong>
            <small>Active Hub • 2,050m</small>
          </div>
        </div>
      </section>

      <section className="planner-dock" aria-label="Travel book planning controls">
        <Link href="/states" className="planner-dock__item">
          <MapPinned size={18} />
          <span>Destinations</span>
          <strong>Explore Himachal</strong>
        </Link>
        <Link href="/customer" className="planner-dock__item">
          <SlidersHorizontal size={18} />
          <span>Trip Planner</span>
          <strong>Build my retreat</strong>
        </Link>
        <Link href="/travel-book/himachal-pradesh/kullu-lahaul/local-transport" className="planner-dock__item">
          <Route size={18} />
          <span>Local Rules</span>
          <strong>Know movement limits</strong>
        </Link>
        <Link href="/travel-book/himachal-pradesh/kullu-lahaul/camping" className="planner-dock__item">
          <CalendarDays size={18} />
          <span>Experiences</span>
          <strong>Camping and guides</strong>
        </Link>
        <Link href="/travel-book" className="planner-dock__submit">
          Open Travel Book <ArrowRight size={16} />
        </Link>
      </section>

      <section className="book-management-section">
        <div className="section-heading">
          <span>How SCAR manages travel data</span>
          <h2>One book, many layers, visible before the traveler moves.</h2>
        </div>
        <div className="book-layer-grid">
          {bookLayers.map(([label, detail, href]) => (
            <Link key={label} href={href} className="book-layer-card">
              <span>{label}</span>
              <p>{detail}</p>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>

      <section className="atlas-section">
        <div className="atlas-section__header">
          <div className="section-heading">
            <span>Travel-site classification</span>
          <h2>Every page belongs to a clear traveler discovery system.</h2>
          </div>
          <p>
            SCAR is structured like a destination board and a travel book together: places, experiences, road movement, ground rules and personal itinerary creation are grouped before they are sold.
          </p>
        </div>
        <div className="atlas-grid">
          {scarClassificationAtlas.map((item, index) => (
            <Link key={item.label} href={item.href} className="atlas-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{item.label}</small>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
      </section>

      <section className="trip-catalog-section">
        <div className="section-heading">
          <span>Bookable journeys</span>
          <h2>Trips are products in the backend, visual stories on the frontend.</h2>
        </div>
        <div className="trip-product-grid">
          {products.map((product) => (
            <Link key={product.slug} href={product.href as NextRoute} className="trip-product-card">
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

      <section className="neon-route-section" aria-label="SCAR product route visualization">
        <div>
          <span>Route visualization</span>
          <h2>One departure becomes many personal trip products.</h2>
          <p>Shared logistics reduce friction. Backend trip products define what can be sold. The traveler profile filters which healing, retreat and adventure paths appear.</p>
        </div>
        <div className="neon-route-map" aria-hidden="true">
          {["Delhi", "Chandigarh", "Manali Hub", "Retreat", "Recreate"].map((node, index) => (
            <i key={node} style={{ "--i": index } as CSSProperties}><strong>{node}</strong></i>
          ))}
        </div>
      </section>

      <section className="story-slab-section">
        {featureStories.map((story, index) => (
          <article key={story.title} className="story-slab">
            <div className="story-slab__copy">
              <span>{story.label}</span>
              <h2>{story.title}</h2>
              <p>{story.detail}</p>
              <Link href={story.href} className="story-slab__link">Explore chapter <ArrowRight size={18} /></Link>
              <small>{String(index + 1).padStart(2, "0")} / {String(featureStories.length).padStart(2, "0")}</small>
            </div>
            <Image src={story.image} alt="" width={1400} height={950} />
          </article>
        ))}
      </section>

      <section className="media-section">
        <div className="section-heading">
          <span>Travel ideas by traveler type</span>
          <h2>Choose the way you want the mountains to meet you.</h2>
        </div>
        <div className="media-card-grid">
          {scarAudienceCollections.map((collection) => (
            <Link key={collection.title} href={collection.href} className="media-card">
              <Image src={collection.image} alt="" width={900} height={1100} />
              <div className="media-card__body">
                <span>{collection.audience}</span>
                <h3>{collection.title}</h3>
                <p>{collection.cards.join(" • ")}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="booking-strip" aria-label="Travel categories">
        {travelBookCategories.map((category) => (
          <Link key={category.id} href={category.id === "offline-book" ? "/travel-book" : category.id === "shared-transit" ? "/customer" : "/states"} className="booking-tile">
            <BookOpen size={18} aria-hidden="true" />
            <span>{category.label}</span>
            <strong>{category.title}</strong>
          </Link>
        ))}
      </div>

      <section className="media-section">
        <div className="section-heading">
          <span>Destination previews</span>
          <h2>Every place opens into rules, routes, stays, risks and experiences.</h2>
        </div>
        <div className="destination-media-grid">
          {(dbRegions.length ? dbRegions.slice(0, 6).map((region) => ({
            title: region.name,
            label: region.bestSeason ?? "Himachal region",
            href: `/states/himachal-pradesh/${region.slug}`,
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
            detail: region.summary
          })) : scarDestinationMedia).map((destination) => (
            <Link key={destination.title} href={destination.href as NextRoute} className="destination-media-card">
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

      <section className="story-panel">
        <div>
          <StatusBadge tone="warn">Scrollytelling foundation</StatusBadge>
          <h2>Shared logistics. Infinite personal chapters.</h2>
          <p>
            The public interface is organized like a travel book: states, regions, routes, retreats, stays, field guides, activities, offline notes and nested local pages.
          </p>
        </div>
        <div className="story-steps">
          {["Choose state", "Enter region", "Set inner state", "Shape experiences", "Save offline"].map((step, index) => (
            <div key={step} className="story-step">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="dashboard-grid">
        <Surface className="span-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">Featured State</h2>
            <StatusBadge tone="good">Offline ready</StatusBadge>
          </div>
          <div className="destination-feature">
            <MapPinned aria-hidden="true" />
            <div>
              <h3>{himachalTravelState.name}</h3>
              <p>{himachalTravelState.framing}</p>
              <Link className="inline-flex items-center gap-2 text-sm font-black text-accent" href="/states/himachal-pradesh">
                Open state book <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Surface>
        <Surface className="span-5">
          <h2 className="mb-4 text-xl font-black">Interface Direction</h2>
          <div className="row-list">
            <div className="list-row"><Sparkles aria-hidden="true" /><div><h3>Microinteractions</h3><p>Hover, press, theme and route feedback.</p></div></div>
            <div className="list-row"><Route aria-hidden="true" /><div><h3>Travel visualization</h3><p>Route rails, nested regions and experience flow.</p></div></div>
            <div className="list-row"><BookOpen aria-hidden="true" /><div><h3>Ground Reality Book</h3><p>Offline local market knowledge first; cached access second.</p></div></div>
          </div>
        </Surface>
        <Metric label="Depth model" value="State" tone="accent" />
        <Metric label="Nested routes" value="Region" />
        <Metric label="Experience layer" value="Personal" />
      </div>
    </div>
  );
}
