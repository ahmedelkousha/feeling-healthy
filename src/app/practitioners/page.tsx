import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { PractitionerCard } from "@/components/site/PractitionerCard";
import { CtaSection } from "@/components/site/CtaSection";
import { practitioners } from "@/data/practitioners";

const title = "Practitioners — Feeling Healthy Tweed Heads";
const description =
  "Meet the experienced practitioners at Feeling Healthy offering remedial massage, naturopathy, psychotherapy, and clinical nutrition.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/practitioners",
  },
  alternates: {
    canonical: "/practitioners",
  },
};

export default function PractitionersIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Experienced Health & Wellbeing Practitioners"
        description="Our fully registered practitioners work collaboratively to support your physical, emotional, and nutritional health."
        crumbs={[{ label: "Practitioners" }]}
      >
        <Button className="w-full sm:w-auto" asChild size="default">
          <Link href="/book">Book an Appointment</Link>
        </Button>
      </PageHero>

      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Practitioners"
            title="The People Behind Your Care"
            description="Our team brings decades of clinical experience in holistic health, bodywork, and natural therapy."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {practitioners.map((practitioner, i) => (
              <Reveal key={practitioner.slug} delay={i * 80}>
                <PractitionerCard practitioner={practitioner} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
