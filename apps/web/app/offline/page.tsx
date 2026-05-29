import Link from "next/link";
import { BookOpen, Download, MapPinned, ShieldCheck } from "lucide-react";
import { StatusBadge, Surface } from "@scar/ui";

export default function OfflinePage() {
  return (
    <div>
      <section className="page-hero">
        <h1>Saved Travel Book</h1>
        <p>This page is only about cached access when the network drops. The main offline-market intelligence now lives inside the SCAR Travel Book.</p>
      </section>
      <div className="dashboard-grid">
        <Surface className="span-4"><Download aria-hidden="true" /><h2 className="mt-3 text-xl font-black">Saved chapters</h2><p className="text-sm text-muted">Travel-book pages can be cached for low-signal reading.</p></Surface>
        <Surface className="span-4"><MapPinned aria-hidden="true" /><h2 className="mt-3 text-xl font-black">Route memory</h2><p className="text-sm text-muted">Shared route, hub and branch points remain visible after saving.</p></Surface>
        <Surface className="span-4"><ShieldCheck aria-hidden="true" /><h2 className="mt-3 text-xl font-black">Safety visibility</h2><p className="text-sm text-muted">Emergency notes and safety chapters should remain available offline.</p></Surface>
        <Surface className="span-12">
          <StatusBadge tone="good">Cached access layer</StatusBadge>
          <h2 className="mt-3 text-2xl font-black">Ground reality is in the Travel Book</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Local vehicles, self-drive restrictions, horsemen, camping charges, guide rules and danger zones are not called offline because of internet. They are the offline local market realities that the Travel Book explains.</p>
          <Link href="/travel-book" className="action-button mt-4 inline-flex"><BookOpen size={16} /> Open SCAR Travel Book</Link>
        </Surface>
      </div>
    </div>
  );
}
