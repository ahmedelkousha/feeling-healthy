import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { ServiceListItem } from "@/components/site/ServiceCard";
import { CtaSection } from "@/components/site/CtaSection";
import { getPractitioner, practitioners } from "@/data/practitioners";
import { getService } from "@/data/services";
import { bookCta } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return practitioners.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const practitioner = getPractitioner(slug);
  if (!practitioner) {
    return { title: "Unavailable — Feeling Healthy", robots: { index: false } };
  }
  const title = `${practitioner.name} — ${practitioner.title} | Feeling Healthy`;
  return {
    title,
    description: practitioner.specialty,
    openGraph: {
      title,
      description: practitioner.specialty,
      type: "profile",
      url: `/practitioners/${slug}`,
    },
    alternates: {
      canonical: `/practitioners/${slug}`,
    },
  };
}

export default async function PractitionerProfilePage({ params }: Props) {
  const { slug } = await params;
  const practitioner = getPractitioner(slug);
  if (!practitioner) notFound();

  const services = practitioner.serviceSlugs
    .map((sSlug) => getService(sSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <section className="bg-sand pt-10 pb-14 md:pb-20">
        <div className="container-page">
          <Breadcrumbs
            items={[{ label: "Practitioners", href: "/practitioners" }, { label: practitioner.name }]}
          />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
            <Reveal className="relative">
              <span aria-hidden="true" className="absolute -bottom-6 -left-6 size-28 blob bg-brand" />
              <img
                src={practitioner.image || "/images/practitioner-1.jpg"}
                alt={`Portrait of ${practitioner.name}`}
                loading="lazy"
                width={1024}
                height={1024}
                className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-soft"
              />
            </Reveal>
            <Reveal delay={90}>
              <p className="eyebrow">Our Practitioner</p>
              <h1 className="mt-3 text-3xl leading-tight font-semibold md:text-5xl">
                {practitioner.name}
              </h1>
              <p className="mt-2 text-lg font-medium text-muted-foreground">{practitioner.title}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{practitioner.specialty}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button className=" w-full sm:w-auto" asChild size="default">
                  <Link href={bookCta.to}>{bookCta.label}</Link>
                </Button>
                <Button className=" w-full sm:w-auto" asChild variant="outline" size="default">
                  <Link href="/contact">Ask a Question</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section tone="white">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold md:text-3xl">Biography</h2>
            {practitioner.bio.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-relaxed text-muted-foreground text-sm md:text-base">
                {paragraph}
              </p>
            ))}
            <h3 className="mt-10 font-display text-xl font-semibold">Areas of expertise</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {practitioner.expertise.map((item) => (
                <li key={item} className="rounded-full bg-accent px-3.5 py-1.5 text-sm">
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="mt-10 font-display text-xl font-semibold">Qualifications</h3>
            <ul className="mt-3 text-sm text-muted-foreground">
              {practitioner.qualifications.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <SectionHeading eyebrow="Services" title="Services offered" />
            <div className="mt-6 grid gap-3">
              {services.map((service) => (
                <ServiceListItem key={service.slug} service={service} />
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaSection title={`Book with ${practitioner.name.split(" ")[0]}`} />
    </>
  );
}
