"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function StepShell({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{hint}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function ChoiceButton({
  title,
  subtitle,
  selected,
  onClick,
}: {
  title: string;
  subtitle: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "cursor-pointer rounded-lg border p-4 text-left transition-colors",
        selected ? "border-ink/10 bg-brand/70" : "border-border hover:border-ink/30",
      )}
    >
      <span className="block font-medium">{title}</span>
      <span className="mt-1 block text-xs text-ink/70">{subtitle}</span>
    </button>
  );
}

export function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="text-right font-medium text-xs">{value}</dd>
    </div>
  );
}
