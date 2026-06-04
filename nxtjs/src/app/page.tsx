"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, Lightning, Palette, Cube, Stack, Sun, Moon } from "@phosphor-icons/react";

type Health = {
  db_connected: boolean;
  latency_ms: number;
};

const colors = [
  { name: "primary", class: "bg-primary" },
  { name: "secondary", class: "bg-secondary" },
  { name: "accent", class: "bg-accent" },
  { name: "muted", class: "bg-muted" },
  { name: "destructive", class: "bg-destructive" },
  { name: "chart-1", class: "bg-chart-1" },
  { name: "chart-2", class: "bg-chart-2" },
  { name: "chart-3", class: "bg-chart-3" },
  { name: "chart-4", class: "bg-chart-4" },
  { name: "chart-5", class: "bg-chart-5" },
];

const variants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const;

export default function Home() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then(setHealth)
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <div className="flex flex-col items-center gap-12 py-16 px-4 max-w-2xl mx-auto relative">

      {/* Hero */}
      <div className="flex flex-col items-center gap-1.5 text-center">
        <div className="flex items-center gap-2 text-primary">
          <Cube size={28} weight="duotone" />
          <Stack size={28} weight="duotone" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Actix + Next.js</h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          Monorepo boilerplate with PostgreSQL, nginx, shadcn, and Tailwind v4.
        </p>
      </div>

      {/* Health status */}
      <div className="w-full bg-card border border-border rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Database size={20} weight="duotone" className="text-primary" />
          <span className="text-sm font-medium">PostgreSQL</span>
        </div>
        {error && <span className="text-destructive text-sm font-semibold">Error</span>}
        {!health && !error && <span className="text-muted-foreground text-sm">Checking…</span>}
        {health && (
          <div className="flex items-center gap-2.5">
            <span className="text-sm text-muted-foreground">{health.latency_microseconds}μs</span>
            <span
              className={
                "text-xs font-bold px-2 py-0.5 rounded-full " +
                (health.db_connected
                  ? "bg-primary/15 text-primary"
                  : "bg-destructive/15 text-destructive")
              }
            >
              {health.db_connected ? "Connected" : "Disconnected"}
            </span>
          </div>
        )}
      </div>

      {/* Buttons */}
      <section className="w-full space-y-3">
        <div className="flex items-center gap-2">
          <Palette size={16} weight="duotone" className="text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Button variants
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <Button key={v} variant={v}>{v}</Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <Button key={v} variant={v} size="sm">{v}</Button>
          ))}
        </div>
      </section>

      {/* Color palette */}
      <section className="w-full space-y-3">
        <div className="flex items-center gap-2">
          <Palette size={16} weight="duotone" className="text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Color palette
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-1.5">
              <div className={"size-10 rounded-lg border border-border " + c.class} />
              <span className="text-[11px] text-muted-foreground">{c.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
