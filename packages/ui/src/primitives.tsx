import type { ReactNode } from "react";

export function Surface({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`surface ${className}`}>{children}</section>;
}

export function Metric({
  label,
  value,
  tone = "neutral"
}: {
  label: string;
  value: string;
  tone?: "neutral" | "accent";
}) {
  return (
    <div className={`metric metric--${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function StatusBadge({
  children,
  tone = "neutral"
}: {
  children: ReactNode;
  tone?: "neutral" | "good" | "warn";
}) {
  return <span className={`status-badge status-badge--${tone}`}>{children}</span>;
}
