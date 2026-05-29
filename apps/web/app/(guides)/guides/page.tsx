import { CheckCircle2, CloudOff, QrCode } from "lucide-react";
import { Metric, StatusBadge, Surface } from "@scar/ui";

const guideLedger = [
  ["06:20", "Silent ridge meditation", "3 travelers", "claimed"],
  ["10:40", "Orchard immersion", "2 travelers", "open"],
  ["15:10", "Bir launch-window briefing", "3 travelers", "open"]
];

export default function GuidesPage() {
  return (
    <div>
      <section className="page-hero">
        <h1>Guide Switchboard</h1>
        <p>Field-vetted experts claim micro-bookings, verify traveler codes, and sync safety checklists after signal returns.</p>
      </section>

      <div className="dashboard-grid">
        <Surface className="span-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">Today&apos;s Micro-Booking Ledger</h2>
            <StatusBadge tone="good">IndexedDB ready</StatusBadge>
          </div>
          <div className="row-list">
            {guideLedger.map(([time, title, travelers, status]) => (
              <article key={time} className="list-row">
                <div>
                  <h3>{time} - {title}</h3>
                  <p>{travelers} from the Manali master trip.</p>
                </div>
                <button className={status === "claimed" ? "ghost-button" : "action-button"} type="button">
                  {status === "claimed" ? "Verify code" : "Claim"}
                </button>
              </article>
            ))}
          </div>
        </Surface>

        <Surface className="span-4">
          <h2 className="mb-4 text-xl font-black">Offline Matrix</h2>
          <div className="row-list">
            <div className="list-row">
              <CloudOff aria-hidden="true" />
              <div><h3>Offline write queue</h3><p>Checklist changes cache locally.</p></div>
            </div>
            <div className="list-row">
              <QrCode aria-hidden="true" />
              <div><h3>Code verification</h3><p>Traveler token scan surface.</p></div>
            </div>
            <div className="list-row">
              <CheckCircle2 aria-hidden="true" />
              <div><h3>Safety checklist</h3><p>Sync timestamp tracked per guide.</p></div>
            </div>
          </div>
        </Surface>

        <Metric label="Claimed slots" value="3" tone="accent" />
        <Metric label="Open slots" value="5" />
        <Metric label="Pending syncs" value="0" />
      </div>
    </div>
  );
}
