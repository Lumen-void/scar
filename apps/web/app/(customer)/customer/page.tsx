"use client";

import { useMemo, useState } from "react";
import {
  demoAssignments,
  scarSharedJourneyModel,
  scarThemes,
  scarTourismVerticals,
  scarUnifiedTourismModel,
  type ActivityAssignmentView,
  type ScarPillar
} from "@scar/domain";
import { Metric, StatusBadge, Surface, useScarTheme } from "@scar/ui";
import { PublicInquiryForm } from "../../_components/inquiry-form";

const suggestedActivities: Record<ScarPillar, ActivityAssignmentView> = {
  spiritual: {
    id: "aa-suggest-spiritual",
    time: "18:30",
    title: "Evening sound-healing pause",
    pillar: "spiritual",
    location: "Vashisht quiet hall",
    guide: "Tenzin Dorje",
    status: "open"
  },
  cultural: {
    id: "aa-suggest-cultural",
    time: "12:15",
    title: "Heritage village immersion",
    pillar: "cultural",
    location: "Naggar castle route",
    guide: "Devika Sen",
    status: "open"
  },
  adventure: {
    id: "aa-suggest-adventure",
    time: "16:40",
    title: "Courage and release crossing",
    pillar: "adventure",
    location: "Solang training span",
    guide: "Aarav Rana",
    status: "open"
  },
  rural: {
    id: "aa-suggest-rural",
    time: "09:20",
    title: "Slow village breakfast ritual",
    pillar: "rural",
    location: "Soyal village kitchen",
    guide: "Meera Thakur",
    status: "open"
  }
};

export default function CustomerPage() {
  const { theme, setTheme } = useScarTheme();
  const [intent, setIntent] = useState("corporate burnout");
  const [vision, setVision] = useState("Silence, spirituality and Himalayan stillness");
  const [assignments, setAssignments] = useState(demoAssignments);

  const rankedPillars = useMemo(() => {
    const base: ScarPillar[] = intent.includes("creative")
      ? ["cultural", "rural", "spiritual", "adventure"]
      : intent.includes("grief")
        ? ["spiritual", "rural", "cultural", "adventure"]
        : ["spiritual", "adventure", "rural", "cultural"];

    return base;
  }, [intent]);

  function addSuggestedActivity() {
    const next = suggestedActivities[theme];
    setAssignments((current) => {
      if (current.some((assignment) => assignment.id === next.id)) {
        return current;
      }

      return [...current, next];
    });
  }

  function addCustomBlock() {
    const nextCount = assignments.length + 1;
    const normalizedVision = vision.toLowerCase();
    const next: ActivityAssignmentView = {
      id: `aa-custom-${nextCount}`,
      time: nextCount % 2 === 0 ? "11:30" : "17:20",
      title: normalizedVision.includes("silence")
        ? "Unscripted silence experience"
        : normalizedVision.includes("adventure")
          ? "Joyful release experience"
          : "Personal vision experience",
      pillar: theme,
      location: scarSharedJourneyModel.destinationHub,
      guide: "SCAR local field network",
      status: "open"
    };

    setAssignments((current) => [...current, next]);
  }

  function removeAssignment(id: string) {
    setAssignments((current) => current.filter((assignment) => assignment.id !== id));
  }

  return (
    <div>
      <section className="page-hero">
        <h1>Create Your Own Himalayan Rhythm</h1>
        <p>
          Begin the journey together, then enter the mountains on your own terms through experiences shaped by silence, culture, adventure or slow village life.
        </p>
      </section>

      <div className="dashboard-grid">
        <Surface className="span-12 hero-flow-surface">
          <div className="journey-command">
            <div>
              <StatusBadge tone="good">Arrive together, unfold separately</StatusBadge>
              <h2>{scarSharedJourneyModel.departure} to {scarSharedJourneyModel.destinationHub}</h2>
              <p>{scarSharedJourneyModel.promise}</p>
            </div>
            <div className="vision-panel">
              <label>
                Your retreat vision
                <textarea
                  value={vision}
                  onChange={(event) => setVision(event.target.value)}
                  rows={3}
                />
              </label>
              <button className="action-button" type="button" onClick={addCustomBlock}>Shape my experience</button>
            </div>
          </div>

          <div className="route-splitter" aria-label="Shared route and traveler dispersal">
            <div className="shared-route">
              {scarSharedJourneyModel.route.map((stop, index) => (
                <div key={stop} className="route-node">
                  <span>{index + 1}</span>
                  <strong>{stop}</strong>
                </div>
              ))}
            </div>
            <div className="dispersion-zone">
              {scarTourismVerticals.map((vertical) => (
                <button
                  key={vertical.id}
                  type="button"
                  className={`dispersion-card ${theme === vertical.id ? "dispersion-card--active" : ""}`}
                  onClick={() => setTheme(vertical.id)}
                >
                  <span>{vertical.label}</span>
                  <strong>{vertical.tourismName}</strong>
                  <small>{vertical.expression}</small>
                </button>
              ))}
            </div>
          </div>
        </Surface>

        <Surface className="span-12">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
            <div>
              <StatusBadge tone="good">One SCAR system</StatusBadge>
              <h2 className="mt-3 text-2xl font-black">{scarUnifiedTourismModel.label}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{scarUnifiedTourismModel.description}</p>
              <p className="mt-3 text-sm font-bold leading-6">{scarUnifiedTourismModel.operatingRule}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {scarTourismVerticals.map((vertical) => (
                <button
                  key={vertical.id}
                  type="button"
                  className="list-row text-left"
                  onClick={() => setTheme(vertical.id)}
                >
                  <span>
                    <h3>{vertical.tourismName}</h3>
                    <p>{vertical.expression}</p>
                  </span>
                  <StatusBadge tone={theme === vertical.id ? "good" : "neutral"}>
                    {theme === vertical.id ? "active" : "separate"}
                  </StatusBadge>
                </button>
              ))}
            </div>
          </div>
        </Surface>

        <Surface className="span-5">
          <h2 className="mb-3 text-xl font-black">Silent Echo Profiler</h2>
          <div className="grid gap-3">
            <label className="grid gap-2 text-sm font-bold text-muted">
              Current inner state
              <select className="rounded-theme border border-line bg-canvas px-3 py-3 text-ink" value={intent} onChange={(event) => setIntent(event.target.value)}>
                <option value="corporate burnout">Burnout and mental fatigue</option>
                <option value="grief recovery">Grief and emotional recovery</option>
                <option value="creative block">Creative block and life pause</option>
              </select>
            </label>
            <div className="row-list">
              {rankedPillars.map((pillar, index) => (
                <button key={pillar} className="list-row text-left" type="button" onClick={() => setTheme(pillar)}>
                  <span>
                    <h3>{index + 1}. {scarTourismVerticals.find((vertical) => vertical.id === pillar)?.tourismName}</h3>
                    <p>{scarThemes[pillar].portalName}</p>
                  </span>
                  <StatusBadge tone={theme === pillar ? "good" : "neutral"}>{theme === pillar ? "active" : "ranked"}</StatusBadge>
                </button>
              ))}
            </div>
          </div>
        </Surface>

        <Surface className="span-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black">Personal Experience Flow</h2>
              <p className="mt-1 text-sm text-muted">{scarSharedJourneyModel.travelerFreedom}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="ghost-button" type="button" onClick={addCustomBlock}>Add quiet space</button>
              <button className="action-button" type="button" onClick={addSuggestedActivity}>Add {scarThemes[theme].label} experience</button>
            </div>
          </div>
          <div className="timeline">
            {assignments.map((assignment) => (
              <article key={assignment.id} className="timeline-item">
                <div className="timeline-time">{assignment.time}</div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3>{assignment.title}</h3>
                      <p>{assignment.location} with {assignment.guide}</p>
                    </div>
                    <StatusBadge tone={assignment.status === "validated" ? "good" : "warn"}>{assignment.status}</StatusBadge>
                  </div>
                  <button className="ghost-button mt-3" type="button" onClick={() => removeAssignment(assignment.id)}>Remove assignment</button>
                </div>
              </article>
            ))}
          </div>
        </Surface>

        <Metric label="Shared arrival" value="1 route" tone="accent" />
        <Metric label="Personal experiences" value={String(assignments.length)} />
        <Metric label="Active tourism" value={scarThemes[theme].label} />

        <Surface className="span-12">
          <PublicInquiryForm
            regionSlug="kullu-manali"
            defaultMessage={`I want a ${scarThemes[theme].label.toLowerCase()} Himachal plan around: ${vision}`}
          />
        </Surface>
      </div>
    </div>
  );
}
