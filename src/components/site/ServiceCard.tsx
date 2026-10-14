"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { ServiceQuickViewModal } from "./ServiceQuickViewModal";

export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-lg bg-card shadow-soft transition-all duration-500 ease-[var(--ease-calm)] hover:shadow-lift",
          className,
        )}
      >
        <Link href={`/services/${service.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={service.image || "/images/approach-studio.jpg"}
            alt={`${service.name} at Feeling Healthy`}
            loading="lazy"
            width={1024}
            height={768}
            className="size-full object-cover transition-transform duration-700 ease-[var(--ease-calm)] group-hover:scale-105"
          />
        </Link>

        <Link href={`/services/${service.slug}`} className="flex flex-1 flex-col p-4 sm:p-6">
          <h3 className="text-xl font-semibold">{service.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              Learn More
              <span className="grid size-7 place-items-center rounded-full bg-brand text-brand-foreground transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="size-3.5" />
              </span>
            </span>

            {/* Quick Info Question Mark Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
              title="Quick info about this service"
              aria-label={`Quick info about ${service.name}`}
              className="grid size-8 place-items-center rounded-full border border-border/80 bg-sand/60 text-muted-foreground transition-all hover:bg-brand hover:text-brand-foreground hover:border-brand cursor-pointer"
            >
              <HelpCircle className="size-4" />
            </button>
          </div>
        </Link>
      </div>

      <ServiceQuickViewModal
        service={service}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}

export function ServiceListItem({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand hover:bg-accent/60"
    >
      <span className="min-w-0">
        <span className="block font-medium">{service.name}</span>
        <span className="mt-1 block text-sm text-muted-foreground">{service.short}</span>
      </span>
      <ArrowRight className="mt-1 size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
