import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CategoryCard({
  title,
  blurb,
  services,
  cta,
  image,
  href,
}: {
  title: string;
  blurb: string;
  services: string[];
  cta: string;
  image: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-7 text-ink-foreground shadow-soft transition-all duration-500 ease-[var(--ease-calm)] hover:-translate-y-1 hover:shadow-lift md:min-h-[26rem]"
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={768}
        className="absolute inset-0 size-full object-cover opacity-55 transition-transform duration-700 ease-[var(--ease-calm)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
      <span className="absolute -top-10 -right-10 size-32 blob bg-brand/85 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <h3 className="text-2xl font-semibold md:text-[1.7rem]">{title}</h3>
        <p className="mt-2 max-w-sm text-sm text-ink-foreground/75">{blurb}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {services.map((s) => (
            <li
              key={s}
              className="rounded-full border border-ink-foreground/25 px-3 py-1 text-xs text-ink-foreground/85"
            >
              {s}
            </li>
          ))}
        </ul>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand">
          {cta}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
