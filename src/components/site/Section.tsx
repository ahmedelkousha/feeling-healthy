import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Section({
  children,
  className,
  tone = "cream",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "sand" | "white" | "ink" | "brand";
  id?: string;
}) {
  const tones = {
    cream: "bg-background text-foreground",
    sand: "bg-sand text-foreground",
    white: "bg-card text-card-foreground",
    ink: "bg-ink text-ink-foreground",
    brand: "bg-brand text-brand-foreground",
  } as const;

  return (
    <section id={id} className={cn("relative py-16 md:py-24", tones[tone], className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  script,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  script?: string;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-2xl leading-[1.08] font-semibold md:text-3xl lg:text-4xl">
        {title}
        {script ? <span className="script-accent ml-2 align-baseline">{script}</span> : null}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{description}</p>
      ) : null}
    </Reveal>
  );
}
