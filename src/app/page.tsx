import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero, ApproachSection } from "@/components/site/HomeSections";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CategoryCard } from "@/components/site/CategoryCard";
import { ServiceCard } from "@/components/site/ServiceCard";
import { PractitionerCard } from "@/components/site/PractitionerCard";
import { ServiceFinder } from "@/components/site/ServiceFinder";
import { Testimonials } from "@/components/site/Testimonials";
import { LocationSection } from "@/components/site/LocationSection";
import { CtaSection } from "@/components/site/CtaSection";
import { featuredServices, helpCategories } from "@/data/services";
import { practitioners } from "@/data/practitioners";

const title = "Feeling Healthy — Holistic Health & Wellbeing Centre";
const description =
  "Holistic health and wellbeing with personalised support for body and mind. Massage, counselling, naturopathy, nutrition, clinical hypnosis and more.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

import { SubscriptionSection } from "@/components/site/SubscriptionSection";
import { WelcomeSection } from "@/components/site/WelcomeSection";

export default function Home() {
  return (
    <>
      <Hero />
      <WelcomeSection />

      {/* <Section tone="sand">
        <div className="container-page">
          <SectionHeading
            eyebrow="How Can We Help?"
            title="How Can We Support You?"
            description="Explore our services based on what matters most to you."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {helpCategories.map((category, i) => (
              <Reveal key={category.id} delay={i * 90}>
                <CategoryCard
                  title={category.title}
                  blurb={category.blurb}
                  services={category.services}
                  cta={category.cta}
                  image={category.image}
                  href="/services"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Section> */}

      <ApproachSection href="/about" buttonText="Get To Know Us" reversed={false}/>

      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Services"
            title="Explore Our Services"
            description="A range of holistic services under one roof, so your care can join up around you."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, i) => (
              <Reveal key={service.slug} delay={i * 70}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Button asChild variant="ink" size="default">
              <Link href="/services">
                View All Services <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </Section>
      <SubscriptionSection />

      <Section tone="white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Team"
            title="Meet the People Behind Your Care"
            description="Our team of fully qualified, registered practitioners is dedicated to your health and wellbeing."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {practitioners.map((practitioner, i) => (
              <Reveal key={practitioner.slug} delay={i * 80}>
                <PractitionerCard practitioner={practitioner} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Button asChild variant="outline" size="default">
              <Link href="/practitioners">
                Meet Practitioners <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </Section>

      <ServiceFinder />
      <Testimonials />


      <Section tone="white">
        <LocationSection />
      </Section>

      <CtaSection />
    </>
  );
}
