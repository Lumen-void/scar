import { AlertTriangle, MapPinned, Navigation } from "lucide-react";
import { himachalWaypoints } from "@scar/domain";
import { Metric, StatusBadge, Surface } from "@scar/ui";

export default function DriversPage() {
  return (
    <div>
      <section className="page-hero">
        <h1>Driver Engine</h1>
        <p>Fleet dispatch tracks mountain waypoints, passenger split logic, and route hazards across the Himalayan corridor.</p>
      </section>

      <div className="dashboard-grid">
        <Surface className="span-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">Vehicle Waypoints</h2>
            <StatusBadge tone="warn">Mandi watch</StatusBadge>
          </div>
          <div className="timeline">
            {himachalWaypoints.map((waypoint, index) => (
              <article key={waypoint} className="timeline-item">
                <div className="timeline-time">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{waypoint}</h3>
                  <p>{index < 3 ? "Shared macro-logistics route" : "Decentralized micro-experience branch"}</p>
                </div>
              </article>
            ))}
          </div>
        </Surface>

        <Surface className="span-5">
          <h2 className="mb-4 text-xl font-black">Passenger Drop Logic</h2>
          <div className="row-list">
            <div className="list-row">
              <MapPinned aria-hidden="true" />
              <div><h3>Rafting staging point</h3><p>Drop 4 travelers, continue with 3.</p></div>
            </div>
            <div className="list-row">
              <Navigation aria-hidden="true" />
              <div><h3>Monastery ridge</h3><p>Final branch for spiritual portal users.</p></div>
            </div>
            <div className="list-row">
              <AlertTriangle aria-hidden="true" />
              <div><h3>Hazard broadcast</h3><p>Demo feed: Mandi-Kullu corridor watch.</p></div>
            </div>
          </div>
        </Surface>

        <Metric label="Vehicle" value="HP01SCAR7" tone="accent" />
        <Metric label="Travelers aboard" value="7" />
        <Metric label="Active hazards" value="1" />
      </div>
    </div>
  );
}
