import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { wellbeingAreas } from "@/data/wellbeing";

const title = "Your Wellbeing — Support Areas | Feeling Healthy";
const description =
  "Explore support for stress and anxiety, women's health, digestive problems, fatigue, weight management, sports injuries, children's health, fertility and pregnancy.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/your-wellbeing",
  },
  alternates: {
    canonical: "/your-wellbeing",
  },
};

export default function WellbeingIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Your Wellbeing"
        title="Support Built Around How You Feel"
        description="Start with what you'd like support with, and we'll show the services that may be right for you."
        crumbs={[{ label: "Your Wellbeing" }]}
      />
      <Section>
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wellbeingAreas.map((area, i) => (
            <Reveal key={area.slug} delay={i * 60}>
              <Link
                href={`/your-wellbeing/${area.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg bg-card shadow-soft transition-all duration-500 ease-[var(--ease-calm)] hover:-translate-y-1 hover:shadow-lift"
              >
                <img
                  src={area.image || "/images/service-counselling.jpg"}
                  alt={area.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-semibold">{area.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {area.intro}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                    Explore support
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaSection />
    </>
  );
}
