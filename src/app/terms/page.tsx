import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { site } from "@/data/site";

const title = "Terms & Clinic Policy — Feeling Healthy";
const description =
  "Appointment booking, cancellation, and clinic policies for Feeling Healthy Tweed Heads.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/terms",
  },
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Clinic Policy"
        description="Important information regarding appointment bookings, cancellations, and clinic guidelines."
        crumbs={[{ label: "Terms & Conditions" }]}
      />
      <Section tone="white">
        <div className="container-page max-w-3xl space-y-8 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">1. Appointments & Arrival</h2>
            <p className="mt-3">
              Please arrive 5 minutes prior to your scheduled consultation time. If you are running late, please notify our reception at {site.contact.phone} as soon as possible.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">2. Cancellation & Rescheduling Policy</h2>
            <p className="mt-3">
              We require at least 24 hours&apos; notice for cancellations or rescheduling. This allows us to offer the appointment time to other clients in need of care. Cancellations made with less than 24 hours&apos; notice may incur a cancellation fee.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">3. Payment & Health Fund Rebates</h2>
            <p className="mt-3">
              Payment is due at the time of consultation via EFTPOS, cash, or credit card. On-the-spot health fund rebates are available via HICAPS for eligible remedial massage and naturopathy consultations.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">4. Medical Disclaimer</h2>
            <p className="mt-3">
              Our holistic therapies and consultations complement your general healthcare. They do not replace emergency medical treatment. If you experience severe medical symptoms, please visit your nearest hospital or contact emergency services.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
