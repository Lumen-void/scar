import { BookOpen, Download } from "lucide-react";
import { kulluLahaulRetreatBook } from "@scar/domain";
import { getPublishedTripProductBySlug } from "@scar/db/admin";
import { StatusBadge, Surface } from "@scar/ui";

export const dynamic = "force-static";

export default async function MindfulRetreatPage() {
  const dbTrip = await getPublishedTripProductBySlug("kullu-lahaul-mindful-retreat");
  const chapters = dbTrip?.itineraryDays.length
    ? dbTrip.itineraryDays.map((day) => ({
      title: day.title,
      place: day.route,
      experience: day.experience,
      highlights: day.highlights,
      focus: day.focus
    }))
    : kulluLahaulRetreatBook.chapters;

  return (
    <div>
      <section className="page-hero">
        <h1>{dbTrip?.title ?? kulluLahaulRetreatBook.title}</h1>
        <p>{dbTrip?.tagline ?? kulluLahaulRetreatBook.subtitle}. Built as a living travel-book frame that can be customized by the traveler.</p>
      </section>
      <Surface className="hero-flow-surface">
        <div className="destination-feature">
          <BookOpen aria-hidden="true" />
          <div>
            <StatusBadge tone="good">Offline chapter pack</StatusBadge>
            <h2 className="mt-3 text-2xl font-black">{dbTrip ? `${dbTrip.region} / ${dbTrip.duration}` : kulluLahaulRetreatBook.route}</h2>
            <p>Each chapter uses experiential language: experience, highlights, focus and emotional state.</p>
            <button className="ghost-button mt-4" type="button"><Download size={16} /> Save for offline</button>
          </div>
        </div>
      </Surface>
      <div className="chapter-stack">
        {chapters.map((chapter, index) => (
          <article key={chapter.title} className="chapter-card">
            <span>Chapter {String(index + 1).padStart(2, "0")}</span>
            <h2>{chapter.title}</h2>
            <strong>{chapter.place}</strong>
            <p>{chapter.experience}</p>
            <div className="focus-rail">
              {chapter.highlights.map((highlight) => <small key={highlight}>{highlight}</small>)}
            </div>
            <StatusBadge tone="warn">Focus: {chapter.focus}</StatusBadge>
          </article>
        ))}
      </div>
    </div>
  );
}
