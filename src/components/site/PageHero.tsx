import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  script,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  script?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-34 pb-14 md:pt-34 md:pb-20 rounded-b-4xl">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 size-72 blob bg-brand/30 md:size-96"
      />
      <div className="container-page relative">
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <Reveal className="mt-6 max-w-3xl">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="mt-3 text-3xl leading-[1.05] font-semibold md:text-4xl lg:text-5xl text-ink-foreground/90">
            {title}
            {script ? <span className="script-accent ml-2">{script}</span> : null}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-foreground/50 md:text-base">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}
