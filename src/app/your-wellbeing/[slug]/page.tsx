import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CtaSection } from "@/components/site/CtaSection";
import { breadcrumbJsonLd } from "@/components/site/Breadcrumbs";
import { getWellbeingArea, wellbeingAreas } from "@/data/wellbeing";
import { getService } from "@/data/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return wellbeingAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getWellbeingArea(slug);
  if (!area) {
    return { title: "Unavailable — Feeling Healthy", robots: { index: false } };
  }
  const title = `${area.headline} — Feeling Healthy`;
  return {
    title,
    description: area.intro,
    openGraph: {
      title,
      description: area.intro,
      type: "article",
      url: `/your-wellbeing/${slug}`,
    },
    alternates: {
      canonical: `/your-wellbeing/${slug}`,
    },
  };
}

export default async function WellbeingDetailPage({ params }: Props) {
  const { slug } = await params;
  const area = getWellbeingArea(slug);
  if (!area) notFound();

  const matches = area.serviceSlugs
    .map((sSlug) => getService(sSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", item: "/" },
    { name: "Your Wellbeing", item: "/your-wellbeing" },
    { name: area.name, item: `/your-wellbeing/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Your Wellbeing"
        title={area.headline}
        description={area.intro}
        crumbs={[{ label: "Your Wellbeing", href: "/your-wellbeing" }, { label: area.name }]}
      />

      <Section tone="white">
        <div className="container-page max-w-3xl">
          {area.body.map((paragraph, i) => (
            <Reveal key={i} delay={i * 70}>
              <p className="mt-5 leading-relaxed text-muted-foreground first:mt-0">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <SectionHeading eyebrow="Where to start" title="Services that may support you" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((service, i) => (
              <Reveal key={service.slug} delay={i * 70}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaSection title={`Talk to us about ${area.name.toLowerCase()}`} />
    </>
  );
}
