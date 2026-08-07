import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { PractitionerCard } from "@/components/site/PractitionerCard";
import { LocationSection } from "@/components/site/LocationSection";
import { ApproachSection } from "@/components/site/HomeSections";
import { CtaSection } from "@/components/site/CtaSection";
import { practitioners } from "@/data/practitioners";

const title = "About Feeling Healthy — Our Story & Approach";
const description =
  "Feeling Healthy is a holistic health and wellbeing centre built around people, not symptoms. Meet our approach, our clinic and the practitioners.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/about",
  },
  alternates: {
    canonical: "/about",
  },
};

const reasons = [
  "A range of holistic services under one roof",
  "Unhurried appointments that start with listening",
  "Practical plans that fit around real life",
  "Clear signposting when medical review is appropriate",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Health & Wellbeing, Built Around People"
        script="not symptoms"
        description="Feeling Healthy brings holistic therapies, talking support and nutrition guidance together in one calm, welcoming space."
        crumbs={[{ label: "About Us" }]}
      >
        <Button className="w-full sm:w-auto" asChild size="default">
          <Link href="/book">Book an Appointment</Link>
        </Button>
      </PageHero>

      <Section tone="white">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <span aria-hidden="true" className="absolute -top-6 -right-6 size-32 blob bg-brand/40" />
            <img
              src="/images/clinic-reception.jpg"
              alt="Inside the Feeling Healthy clinic"
              loading="lazy"
              width={1280}
              height={1024}
              className="relative aspect-video lg:aspect-square w-full rounded-[2.5rem] object-cover shadow-soft"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="A calm place to feel properly looked after"
              description="With over 25 years of experience, Feeling Healthy offers high quality remedial massage, naturopathy, psychotherapy and clinical nutrition in Tweed Heads."
            />
            <h3 className="mt-9 font-display text-xl font-semibold">Our Philosophy</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Everyone arrives with a different history and a different goal. We start by listening,
              then agree a plan you actually feel comfortable with.
            </p>
            <h3 className="mt-7 font-display text-xl font-semibold">Why Feeling Healthy?</h3>
            <ul className="mt-4 grid gap-3">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <ApproachSection href="/services" buttonText="Browse Our Services" reversed/>

      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Team"
            title="The people behind your care"
            description="Dedicated holistic health practitioners committed to your wellbeing."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {practitioners.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <PractitionerCard practitioner={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="white">
        <LocationSection title="The Clinic" description="Calm, welcoming and easy to find." />
      </Section>

      <CtaSection />
    </>
  );
}
