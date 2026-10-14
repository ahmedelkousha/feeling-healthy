import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { MetabolicAssessmentForm } from "@/components/site/MetabolicAssessmentForm";

const title = "Metabolic Health Assessment — Feeling Healthy";
const description =
  "Identify underlying symptom patterns with our 10-category Metabolic Health Assessment at Feeling Healthy Tweed Heads.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/forms/metabolic-assessment",
  },
  alternates: {
    canonical: "/forms/metabolic-assessment",
  },
};

export default function MetabolicAssessmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Health Assessment"
        title="Metabolic Health Assessment"
        script="Could your symptoms be connected?"
        description="Tick your symptoms to uncover hidden connections across digestion, sleep, mood, energy, inflammation, and hormones."
        crumbs={[{ label: "Forms", href: "/forms" }, { label: "Metabolic Assessment" }]}
      />

      <Section className="bg-sand/30 py-8 md:py-12">
        <div className="container-page">
          <MetabolicAssessmentForm />
        </div>
      </Section>
    </>
  );
}
