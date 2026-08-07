import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { ContactForm } from "@/components/site/ContactForm";
import { LocationSection } from "@/components/site/LocationSection";
import { CtaSection } from "@/components/site/CtaSection";

const title = "Contact Feeling Healthy";
const description =
  "Get in touch with Feeling Healthy — send a message, find our opening hours, or ask which service might suit you best.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        description="Not sure which service is right for you? Send us a message and we'll help you work it out."
        crumbs={[{ label: "Contact" }]}
      />
      <Section>
        <div className="container-page max-w-3xl">
          <ContactForm />
        </div>
      </Section>
      <Section tone="white">
        <LocationSection title="Find Us" description="We'd love to welcome you." />
      </Section>
      <CtaSection />
    </>
  );
}
