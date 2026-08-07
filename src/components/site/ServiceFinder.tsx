"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { finderOptions } from "@/data/wellbeing";
import { getService } from "@/data/services";
import { bookCta } from "@/data/site";
import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";

export function ServiceFinder() {
  const [activeId, setActiveId] = useState(finderOptions[0]!.id);
  const active = finderOptions.find((o) => o.id === activeId)!;
  const matches = active.serviceSlugs.map((slug) => getService(slug)).filter(Boolean);

  return (
    <Section tone="ink">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[-6rem] left-[-4rem] size-80 blob bg-brand/15"
      />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="Service Finder"
          align="center"
          title="Not Sure Where to Start?"
          description="Tell us what you'd like support with and explore services that may be right for you."
          className="[&_p]:text-ink-foreground/70"
        />

        <Reveal className="mt-10 flex justify-center" delay={80}>
          <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden scrollbar-none text-nowrap gap-2.5" role="tablist" aria-label="Wellbeing areas">
            {finderOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={option.id === activeId}
                onClick={() => setActiveId(option.id)}
                className={cn(
                  "h-11 cursor-pointer rounded-full border px-5 text-sm font-medium transition-all duration-300 ease-[var(--ease-calm)]",
                  option.id === activeId
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-ink-foreground/20 text-ink-foreground/80 hover:border-ink-foreground/50",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 rounded-3xl border border-ink-foreground/10 bg-ink-foreground/[0.04] p-6 md:p-9">
          <p className="text-sm text-ink-foreground/60">Services that may support you with</p>
          <p className="mt-1 font-display text-2xl font-semibold">{active.label}</p>

          <ul key={active.id} className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((service, i) => (
              <li
                key={service!.slug}
                style={{ animationDelay: `${i * 140}ms`}}
                className="animate-in fade-in-50 duration-300"
              >
                <Link
                  href={`/services/${service!.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-ink-foreground/[0.06] p-5 transition-colors hover:bg-brand hover:text-brand-foreground"
                >
                  <span className="flex items-center justify-between gap-3 font-medium">
                    {service!.name}
                    <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="mt-2 text-sm text-ink-foreground/65 group-hover:text-brand-foreground/75">
                    {service!.short}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3 w-full md:w-fit">
            <Button className="sm:w-auto w-full" asChild size="default">
              <Link href={bookCta.to}>{bookCta.label}</Link>
            </Button>
            <Button className="sm:w-auto w-full" asChild variant="onDark" size="default">
              <Link href="/your-wellbeing">Browse Your Wellbeing</Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
