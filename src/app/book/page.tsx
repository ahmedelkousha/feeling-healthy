import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { BookingFlow } from "@/components/site/BookingFlow";

const title = "Book an Appointment — Feeling Healthy";
const description =
  "Start an appointment request at Feeling Healthy: choose a service, practitioner and time that suits you.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/book",
  },
  alternates: {
    canonical: "/book",
  },
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Book an Appointment"
        description="Choose your preferred service, session option, practitioner, and time to book your visit."
        crumbs={[{ label: "Book" }]}
      />
      <Section>
        <Suspense fallback={<div className="container-page py-12 text-center text-muted-foreground">Loading booking options…</div>}>
          <BookingFlow />
        </Suspense>
      </Section>
    </>
  );
}
