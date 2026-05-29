"use client";

import Link from "next/link";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Check, Lock, ShieldCheck, UserRound } from "lucide-react";

type RoleLogin = {
  role: string;
  title: string;
  detail: string;
  returnHref: Route;
};

export function AuthPage({
  mode,
  title,
  detail,
  role,
  returnHref = "/customer"
}: {
  mode: "login" | "signup";
  title: string;
  detail: string;
  role?: string;
  returnHref?: Route;
}) {
  const router = useRouter();
  const [email, setEmail] = useState(role?.toLowerCase().includes("admin") ? "admin@scar.local" : "");
  const [password, setPassword] = useState(role?.toLowerCase().includes("admin") ? "Scar@12345" : "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loginRole = role?.toLowerCase().includes("admin")
    ? "admin"
    : role?.toLowerCase().includes("guide")
      ? "guide"
      : role?.toLowerCase().includes("driver")
        ? "driver"
        : role?.toLowerCase().includes("vendor")
          ? "vendor"
          : "traveler";

  function completeDemoLogin(provider: "email" | "google") {
    document.cookie = `scar_demo_session=${provider}-${loginRole}; path=/; max-age=604800; samesite=lax`;
    document.cookie = `scar_demo_role=${loginRole}; path=/; max-age=604800; samesite=lax`;
    router.push(returnHref);
  }

  async function completeLogin(provider: "email" | "google") {
    setError("");

    if (loginRole !== "admin") {
      completeDemoLogin(provider);
      return;
    }

    if (provider === "google") {
      setError("Google admin login is prepared for later. Use email login for now.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error ?? "Login failed.");
        return;
      }

      window.location.assign(payload.redirectTo ?? returnHref);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-shell">
      <section className="auth-visual">
        <span>{role ?? "Traveler Account"}</span>
        <h1>{title}</h1>
        <p>{detail}</p>
        <div className="auth-proof-list">
          {["Profile and saved travel book", "Privacy and security settings", "Google sign-in ready", "Role-based access after login"].map((item) => (
            <div key={item}><Check size={16} /> {item}</div>
          ))}
        </div>
      </section>
      <section className="auth-panel" aria-label={title}>
        <div className="auth-panel__icon"><Lock size={20} /></div>
        <h2>{mode === "login" ? "Sign in" : "Create account"}</h2>
        <button className="google-button" type="button" onClick={() => completeLogin("google")}>
          <span>G</span>
          Continue with Google
        </button>
        <div className="auth-divider">or use email</div>
        <form className="auth-email-form" onSubmit={(event) => {
          event.preventDefault();
          completeLogin("email");
        }}>
          <label>
            Email
            <input type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Password
            <input type="password" placeholder="Minimum 8 characters" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          {mode === "signup" ? (
            <label>
              Phone
              <input type="tel" placeholder="+91" />
            </label>
          ) : null}
          {error ? <p className="auth-error">{error}</p> : null}
          <button className="action-button auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Checking..." : mode === "login" ? "Login" : "Sign up"} <ArrowRight size={16} />
          </button>
        </form>
        <div className="auth-switch">
          {mode === "login" ? (
            <>New traveler? <Link href="/signup">Create profile</Link></>
          ) : (
            <>Already have a profile? <Link href="/login">Login</Link></>
          )}
        </div>
        <Link className="ghost-button auth-return" href={returnHref}>Continue to role area</Link>
      </section>
    </div>
  );
}

export function RoleLoginPage({ role, title, detail, returnHref }: RoleLogin) {
  return (
    <AuthPage
      mode="login"
      role={role}
      title={title}
      detail={detail}
      returnHref={returnHref}
    />
  );
}

export function OperatorLoginIndex() {
  const roles = [
    { href: "/guides/login", role: "Guide", detail: "Micro-booking ledger, checklist sync and code verification." },
    { href: "/drivers/login", role: "Driver", detail: "Waypoint status, passenger drops and hazard routing." },
    { href: "/vendors/login", role: "Vendor", detail: "Inventory, baseline pricing and local asset availability." },
    { href: "/admin/login", role: "Admin", detail: "Bulk imports, role assignment, ledgers and source review." }
  ] as const;

  return (
    <div className="account-page">
      <section className="page-hero">
        <h1>Operator access</h1>
        <p>Guides, drivers, vendors and admins sign in before operating SCAR data. Public travelers browse the website; operators manage the backend only after role approval.</p>
      </section>
      <div className="account-grid">
        {roles.map((role) => (
          <Link key={role.href} href={role.href} className="account-card">
            <ShieldCheck aria-hidden="true" />
            <span>{role.role}</span>
            <p>{role.detail}</p>
            <strong>Login <ArrowRight size={16} /></strong>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function TravelerProfilePage() {
  return (
    <div className="account-page">
      <section className="account-hero">
        <UserRound size={36} />
        <div>
          <span>Traveler profile</span>
          <h1>Ira Mehta</h1>
          <p>Corporate burnout reset, mindful pace, low-crowd routes and saved Himachal chapters.</p>
        </div>
      </section>
      <div className="account-grid account-grid--three">
        {[
          ["Personal information", "Name, phone, emergency contact, departure city and preferred language."],
          ["Travel filtration", "Spiritual, cultural, rural and adventure weighting for itinerary recommendations."],
          ["Saved Travel Book", "Offline chapters, safety notes, local rules and active route handoff."],
          ["Security", "Password, Google login connection, trusted devices and session controls."],
          ["Privacy", "Profile visibility, data-sharing preferences and local-provider contact consent."],
          ["Notifications", "Trip alerts, safety warnings, guide updates and quiet-hour settings."]
        ].map(([title, detail]) => (
          <article key={title} className="account-card">
            <span>{title}</span>
            <p>{detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function TravelerSettingsPage() {
  const sections = [
    ["Basic profile", "Name, email, phone, date of birth, city and emergency contact."],
    ["Security settings", "Password, Google sign-in, two-step verification and active sessions."],
    ["Privacy settings", "Share preferences, saved data visibility, provider contact permissions and deletion requests."],
    ["Travel preferences", "Budget range, pace, activity intensity, accessibility needs, food preferences and no-go rules."],
    ["Content filters", "States, regions, spiritual/cultural/adventure/rural weighting and saved local rules."],
    ["Communication", "WhatsApp alerts, email updates, app notifications and quiet hours."]
  ] as const;

  return (
    <div className="account-page">
      <section className="page-hero">
        <h1>Traveler settings</h1>
        <p>All customer needs live here: basic profile, privacy, security, personalization and filtering controls for the travel book.</p>
      </section>
      <div className="settings-list">
        {sections.map(([title, detail]) => (
          <article key={title} className="settings-row">
            <div>
              <h2>{title}</h2>
              <p>{detail}</p>
            </div>
            <button type="button">Manage</button>
          </article>
        ))}
      </div>
    </div>
  );
}
