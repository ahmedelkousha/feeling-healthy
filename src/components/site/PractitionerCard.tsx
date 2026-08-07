import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Practitioner } from "@/data/practitioners";

export function PractitionerCard({ practitioner }: { practitioner: Practitioner }) {
  return (
    <Link
      href={`/practitioners/${practitioner.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg bg-card shadow-soft transition-all duration-500 ease-[var(--ease-calm)] hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <img
          src={practitioner.image || "/images/practitioner-1.jpg"}
          alt={`Portrait of ${practitioner.name}`}
          loading="lazy"
          width={1024}
          height={1024}
          className="size-full object-cover transition-transform duration-700 ease-[var(--ease-calm)] group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold">{practitioner.name}</h3>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{practitioner.title}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {practitioner.specialty}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
          View Profile
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
