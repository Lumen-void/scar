"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Search } from "lucide-react";
import type { ScarTheme } from "@scar/domain";
import { AmbientEffects } from "./ambient-effects";
import { ThemeProvider } from "./theme-provider";
import { WaveWipe } from "./wave-wipe";

const pathTheme: Record<string, ScarTheme> = {
  "/customer": "spiritual",
  "/guides": "adventure",
  "/drivers": "adventure",
  "/vendors": "rural",
  "/admin": "cultural"
};

function themeForPath(pathname: string): ScarTheme {
  const match = Object.entries(pathTheme).find(([path]) => pathname.startsWith(path));
  return match?.[1] ?? "spiritual";
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const initialTheme = themeForPath(pathname);

  return (
    <ThemeProvider initialTheme={initialTheme}>
      <ShellInner>{children}</ShellInner>
    </ThemeProvider>
  );
}

function ShellInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const publicLinks = [
    { href: "/states", label: "Destinations" },
    { href: "/trips", label: "Trips" },
    { href: "/experiences", label: "Experiences" },
    { href: "/travel-book", label: "Travel Book" },
    { href: "/customer", label: "Plan Your Trip" }
  ] as const;

  const roleLinks = [
    { href: "/guides/login", label: "Guide Login" },
    { href: "/drivers/login", label: "Driver Login" },
    { href: "/vendors/login", label: "Vendor Login" },
    { href: "/admin/login", label: "Admin Login" }
  ] as const;

  return (
    <div className="min-h-screen bg-canvas text-ink transition-colors duration-theme ease-theme">
      <AmbientEffects />
      <WaveWipe />
      <header className="site-header">
        <div className="site-header__utility">
          <Link href="/travel-book/himachal-pradesh/kullu-lahaul/safety">Safety & ground reality</Link>
          <Link href="/offline">Saved Travel Book</Link>
          <Link href="/login">Traveler Login</Link>
          <Link href="/operator-login">Operator Login</Link>
        </div>
        <div className="site-header__inner">
          <Link href="/" className="brand-lockup" aria-label="SCAR home">
            <span className="brand-mark">S</span>
            <span>
              <strong>SCAR</strong>
              <small>Scars to Remove, Recreate the World.</small>
            </span>
          </Link>

          <nav className="site-nav" aria-label="Recommended pages">
            {publicLinks.map(({ href, label }) => {
              const active = pathname.startsWith(href);
              return (
                <Link key={href} href={href} className={`nav-link ${active ? "nav-link--active" : ""}`}>
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="site-header__actions">
            <Link href="/travel-book" className="header-search"><Search size={16} /> Search</Link>
            <Link href="/customer" className="header-cta">Plan a trip</Link>
          </div>
        </div>
      </header>

      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="site-footer__media" aria-hidden="true" />
        <div className="site-footer__grid">
          <section>
            <Link href="/" className="brand-lockup brand-lockup--footer" aria-label="SCAR home">
              <span className="brand-mark">S</span>
              <span>
                <strong>SCAR</strong>
                <small>Scars to Remove, Recreate the World.</small>
              </span>
            </Link>
            <p>A visual travel book for shared Himalayan arrivals, personal itineraries, local rules and field-verified ground reality.</p>
          </section>
          <nav aria-label="Explore SCAR">
            <h2>Explore</h2>
            {publicLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>
          <nav aria-label="Traveler account">
            <h2>Traveler</h2>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign up</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/settings">Settings</Link>
          </nav>
          <nav aria-label="Operator access">
            <h2>Operator Access</h2>
            {roleLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            <Link href="/operator-login">All operator logins</Link>
          </nav>
        </div>
        <div className="site-footer__legal">
          <span>SCAR Travel Architecture</span>
          <span>Source records are reviewed before becoming traveler-facing facts.</span>
        </div>
      </footer>
    </div>
  );
}
