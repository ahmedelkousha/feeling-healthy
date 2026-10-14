import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { ClientIntakeForm } from "@/components/site/ClientIntakeForm";

const title = "Initial Client Health Intake Form — Feeling Healthy";
const description =
  "Complete your new patient health intake form online prior to your consultation at Feeling Healthy Tweed Heads.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/forms/intake",
  },
  alternates: {
    canonical: "/forms/intake",
  },
};

export default function IntakeFormPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Intake"
        title="Client Health History & Intake Form"
        description="Please complete your personal details, health history, and symptom checklist prior to your appointment."
        crumbs={[{ label: "Forms", href: "/forms" }, { label: "Client Intake Form" }]}
      />

      <Section className="bg-sand/30 py-8 md:py-12">
        <div className="container-page">
          <ClientIntakeForm />
        </div>
      </Section>
    </>
  );
}
