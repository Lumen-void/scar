import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Sparkles } from "lucide-react";
import { scarTravelProducts, scarTourismVerticals, travelAgencyPages } from "@scar/domain";
import { StatusBadge } from "@scar/ui";
import { PublicInquiryForm } from "./inquiry-form";

type ProductView = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  duration: string;
  region: string;
  startingPriceInr: number;
  emotionalOutcome: string;
  image: string;
  href: string;
  highlights: string[];
  itineraryDays?: Array<{
    dayNumber: number;
    title: string;
    route: string;
    experience: string;
    focus: string;
    highlights?: string[];
  }>;
  serviceItems?: Array<{
    label: string;
    title: string;
    body: string;
  }>;
  mediaAssets?: Array<{
    id: string;
    url: string;
    alt?: string | null;
    caption?: string | null;
  }>;
};

export function ProductGrid({ products = scarTravelProducts }: { products?: readonly ProductView[] }) {
  return (
    <div className="trip-product-grid">
      {products.map((product) => (
        <Link key={product.slug} href={product.href as Route} className="trip-product-card">
          <Image src={product.image} alt="" width={900} height={1100} />
          <div className="trip-product-card__body">
            <span>{product.category.replaceAll("-", " ")}</span>
            <h2>{product.title}</h2>
            <p>{product.tagline}</p>
            <strong>From INR {product.startingPriceInr.toLocaleString("en-IN")} / {product.duration}</strong>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function TripsIndexPage({ products = scarTravelProducts }: { products?: readonly ProductView[] }) {
  return (
    <div>
      <section className="trance-page-hero">
        <div>
          <StatusBadge tone="good">Trip products</StatusBadge>
          <h1>Healing trips, retreat journeys and recreate-yourself routes.</h1>
          <p>These are the products SCAR sells. The website can list them from backend records: title, route, outcome, price, media, itinerary days and content blocks.</p>
        </div>
        <div className="jungle-3d-card" aria-hidden="true">
          <span />
          <strong>SCAR</strong>
          <small>Trip Catalog</small>
        </div>
      </section>
      <ProductGrid products={products} />
    </div>
  );
}

export function TripDetailPage({ product }: { product: ProductView }) {
  const inclusionItems = product.serviceItems?.filter((item) => item.label === "INCLUSION") ?? [];
  const exclusionItems = product.serviceItems?.filter((item) => item.label === "EXCLUSION") ?? [];

  return (
    <div>
      <section className="trip-detail-hero">
        <Image src={product.image} alt="" width={1800} height={1100} priority />
        <div>
          <StatusBadge tone="good">{product.category.replaceAll("-", " ")}</StatusBadge>
          <h1>{product.title}</h1>
          <p>{product.tagline}</p>
          <Link href="/customer" className="action-button">Start planning <ArrowRight size={16} /></Link>
        </div>
      </section>
      <section className="trip-detail-grid">
        <article>
          <span>Duration</span>
          <strong>{product.duration}</strong>
        </article>
        <article>
          <span>Region</span>
          <strong>{product.region}</strong>
        </article>
        <article>
          <span>Starting price</span>
          <strong>INR {product.startingPriceInr.toLocaleString("en-IN")}</strong>
        </article>
        <article>
          <span>Outcome</span>
          <strong>{product.emotionalOutcome}</strong>
        </article>
      </section>
      <section className="trip-highlights">
        <div className="section-heading">
          <span>Highlights</span>
          <h2>Built as a product, personalized as a journey.</h2>
        </div>
        <div className="visual-layer-grid">
          {product.highlights.map((highlight) => (
            <article key={highlight} className="visual-layer-card">
              <Sparkles />
              <h3>{highlight}</h3>
              <p>Visible in the travel product backend and reusable across listing pages, itinerary pages and planner screens.</p>
            </article>
          ))}
        </div>
      </section>
      {product.itineraryDays?.length ? (
        <section className="trip-itinerary-section">
          <div className="section-heading">
            <span>Itinerary</span>
            <h2>Editable day-by-day journey flow.</h2>
          </div>
          <div className="chapter-stack">
            {product.itineraryDays.map((day) => (
              <article key={day.dayNumber} className="chapter-card">
                <span>Day {String(day.dayNumber).padStart(2, "0")} / {day.focus}</span>
                <h2>{day.title}</h2>
                <strong>{day.route}</strong>
                <p>{day.experience}</p>
                {day.highlights?.length ? (
                  <div className="focus-rail">
                    {day.highlights.map((highlight) => <small key={highlight}>{highlight}</small>)}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}
      {inclusionItems.length || exclusionItems.length ? (
        <section className="trip-service-section">
          <div className="service-list">
            <h2>Included</h2>
            {inclusionItems.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="service-list">
            <h2>Not included</h2>
            {exclusionItems.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
      <section className="trip-inquiry-section">
        <PublicInquiryForm
          tripSlug={product.slug}
          defaultMessage={`I am interested in ${product.title}. Please help me plan dates, route, price and local support.`}
        />
      </section>
    </div>
  );
}

export function ExperiencesPage() {
  return (
    <div>
      <section className="trance-page-hero">
        <div>
          <StatusBadge tone="good">Experiences</StatusBadge>
          <h1>Four tourism energies, one SCAR operating system.</h1>
          <p>Spiritual, cultural, adventure and rural experiences remain separate for discovery, then combine under shared transit and safety logic.</p>
        </div>
      </section>
      <div className="atlas-grid">
        {scarTourismVerticals.map((vertical) => (
          <article key={vertical.id} className="atlas-card">
            <span>{vertical.label.slice(0, 2).toUpperCase()}</span>
            <small>{vertical.tourismName}</small>
            <h3>{vertical.expression}</h3>
            <p>{vertical.examples.join(" / ")}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function SimpleAgencyPage({ title, detail }: { title: string; detail: string }) {
  return (
    <div>
      <section className="trance-page-hero">
        <div>
          <StatusBadge tone="good">SCAR</StatusBadge>
          <h1>{title}</h1>
          <p>{detail}</p>
        </div>
      </section>
      <div className="account-grid">
        {travelAgencyPages.map((page) => (
          <Link key={page.href} href={page.href as Route} className="account-card">
            <span>{page.label}</span>
            <p>{page.detail}</p>
            <strong>Open <ArrowRight size={16} /></strong>
          </Link>
        ))}
      </div>
    </div>
  );
}
