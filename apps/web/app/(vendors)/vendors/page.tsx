"use client";

import { useState } from "react";
import { Bike, Leaf, Mountain } from "lucide-react";
import { Metric, StatusBadge, Surface } from "@scar/ui";

const initialInventory = [
  { id: "bike", label: "Royal Enfield bikes", region: "Kasol", count: 12, price: 1400, Icon: Bike },
  { id: "orchard", label: "Orchard immersion slots", region: "Naggar", count: 8, price: 900, Icon: Leaf },
  { id: "pilot", label: "Paragliding pilot windows", region: "Bir", count: 5, price: 3200, Icon: Mountain }
];

export default function VendorsPage() {
  const [inventory, setInventory] = useState(initialInventory);

  return (
    <div>
      <section className="page-hero">
        <h1>Asset Registry</h1>
        <p>Local providers publish transparent inventory and immutable baseline prices onto the SCAR operational grid.</p>
      </section>

      <div className="dashboard-grid">
        <Surface className="span-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">Local Asset Inventory</h2>
            <StatusBadge tone="good">Price grid active</StatusBadge>
          </div>
          <div className="row-list">
            {inventory.map(({ id, label, region, count, price, Icon }) => (
              <article key={id} className="list-row">
                <Icon aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <h3>{label}</h3>
                  <p>{region} - INR {price.toLocaleString("en-IN")} baseline</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="ghost-button"
                    type="button"
                    onClick={() => setInventory((rows) => rows.map((row) => row.id === id ? { ...row, count: Math.max(0, row.count - 1) } : row))}
                  >
                    -
                  </button>
                  <strong className="min-w-8 text-center">{count}</strong>
                  <button
                    className="action-button"
                    type="button"
                    onClick={() => setInventory((rows) => rows.map((row) => row.id === id ? { ...row, count: row.count + 1 } : row))}
                  >
                    +
                  </button>
                </div>
              </article>
            ))}
          </div>
        </Surface>

        <Surface className="span-4">
          <h2 className="mb-4 text-xl font-black">Anti-Gouging Rule</h2>
          <p className="text-sm leading-6 text-muted">
            Vendors can update available quantity, but published baseline pricing is treated as the transparent traveler-facing grid.
          </p>
        </Surface>

        <Metric label="Active assets" value={String(inventory.length)} tone="accent" />
        <Metric label="Available units" value={String(inventory.reduce((total, item) => total + item.count, 0))} />
        <Metric label="Regions covered" value="3" />
      </div>
    </div>
  );
}
