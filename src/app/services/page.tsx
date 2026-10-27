import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { ServiceCard } from "@/components/site/ServiceCard";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { Button } from "@/components/ui/button";
import { bookCta } from "@/data/site";
import { serviceCategories, servicesByCategory } from "@/data/services";

const title = "Services Designed Around You — Feeling Healthy";
const description =
  "Explore holistic services at Feeling Healthy: massage, counselling, naturopathy, nutrition, clinical hypnosis, diagnostic testing, women's health and more.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/services",
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Services Designed Around You"
        description="We look at the whole person rather than a single symptom, so your care can combine hands-on therapies, talking support and practical nutrition guidance in whatever mix suits you."
        crumbs={[{ label: "Services" }]}
      >
        <Button className="w-full sm:w-auto" asChild size="default">
          <Link href={bookCta.to}>{bookCta.label}</Link>
        </Button>
        <Button className="w-full sm:w-auto" asChild variant="outline" size="default">
          <Link href="/your-wellbeing">Browse by Wellbeing Area</Link>
        </Button>
      </PageHero>

      {serviceCategories.map((category, index) => (
        <Section key={category.id} tone={index % 2 === 0 ? "cream" : "white"} id={category.id}>
          <div className="container-page">
            <SectionHeading
              eyebrow={`0${index + 1}`}
              title={category.title}
              description={category.blurb}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {servicesByCategory(category.id).map((service, i) => (
                <Reveal key={service.slug} delay={i * 70}>
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <CtaSection />
    </>
  );
}
