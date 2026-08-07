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
        description="Online booking isn't connected yet, so this flow prepares your appointment request rather than reserving a time."
        crumbs={[{ label: "Book" }]}
      />
      <Section>
        <BookingFlow />
      </Section>
    </>
  );
}
