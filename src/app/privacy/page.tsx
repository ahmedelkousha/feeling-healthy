import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { site } from "@/data/site";

const title = "Privacy Policy — Feeling Healthy";
const description =
  "How Feeling Healthy collects, uses, and protects your personal health information and privacy.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/privacy",
  },
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="We are committed to maintaining the confidentiality and security of your personal health information."
        crumbs={[{ label: "Privacy Policy" }]}
      />
      <Section tone="white">
        <div className="container-page max-w-3xl space-y-8 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">1. Collection of Personal Information</h2>
            <p className="mt-3">
              Feeling Healthy collects personal and health information necessary to provide safe and effective healthcare services, including your contact details, medical history, lifestyle information, and treatment notes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">2. Use and Disclosure</h2>
            <p className="mt-3">
              Your information is strictly used for clinical care, appointment scheduling, and communication with you. We do not sell or rent personal information to third parties. Information is only disclosed to other health professionals with your explicit consent or where required by law.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">3. Data Security</h2>
            <p className="mt-3">
              We store your clinical records securely in encrypted health systems in compliance with Australian Privacy Principles (APPs). Physical files are maintained in locked storage areas accessible only to authorised staff.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">4. Accessing Your Records</h2>
            <p className="mt-3">
              You have the right to request access to your personal health records. To request a copy or update your details, please contact us at {site.contact.email} or call {site.contact.phone}.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
