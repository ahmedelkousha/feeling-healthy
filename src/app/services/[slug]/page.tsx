import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/Breadcrumbs";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { PractitionerCard } from "@/components/site/PractitionerCard";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { CtaSection } from "@/components/site/CtaSection";
import { getService, services } from "@/data/services";
import { practitionersForService } from "@/data/practitioners";
import { bookCta } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    return { title: "Service unavailable — Feeling Healthy", robots: { index: false } };
  }
  const title = `${service.name} — Feeling Healthy`;
  const description = service.short;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/services/${slug}`,
    },
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const team = practitionersForService(service.slug);
  const related = (service.related ?? [])
    .map((sSlug) => services.find((s) => s.slug === sSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: service.name, item: `/services/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative overflow-hidden bg-ink pt-34 pb-14 md:pb-20 rounded-b-4xl">
        <div className="container-page">
          <Breadcrumbs
            items={[{ label: "Services", href: "/services" }, { label: service.name }]}
          />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow">Service</p>
              <h1 className="mt-3 text-3xl text-ink-foreground/90 leading-[1.05] font-semibold md:text-5xl">
                {service.name}
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-ink-foreground/50 md:text-base">
                {service.short}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="w-full sm:w-auto" asChild size="default">
                  <Link href={bookCta.to}>{bookCta.label}</Link>
                </Button>
                <Button className="w-full sm:w-auto border-0 text-ink-foreground/70" asChild variant="onDark" size="default">
                  <Link href="/contact">Ask a Question</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={100} className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 -right-6 size-28 blob-alt bg-brand"
              />
              <img
                src={service.image || "/images/service-massage.jpg"}
                alt={`${service.name} at Feeling Healthy`}
                loading="lazy"
                width={1024}
                height={768}
                className="relative aspect-video w-full rounded-[2.5rem] object-cover shadow-soft"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <Section tone="white">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold md:text-3xl">About {service.name}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{service.description}</p>

            <h3 className="mt-10 font-display text-xl font-semibold">How it may help</h3>
            <ul className="mt-4 grid gap-3">
              {service.howItHelps.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-display text-xl font-semibold">Who it's for</h3>
            <ul className="mt-4 grid gap-3">
              {service.whoItsFor.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-sm bg-sand p-5 text-xs leading-relaxed text-muted-foreground">
              This page describes our general approach and does not make claims about medical
              outcomes. If you have a medical concern, please also speak with your GP.
            </p>
          </Reveal>

          <Reveal delay={90}>
            {service.options && service.options.length > 0 && (
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft mb-6">
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <h3 className="font-display text-xl font-semibold">Appointment Options</h3>
                  <span className="text-xs font-semibold text-ink">
                    {service.options.length} {service.options.length === 1 ? "Option" : "Options"}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {service.options.map((opt) => (
                    <div
                      key={opt.id}
                      className="rounded-xl border border-border/70 bg-sand/40 p-4 transition-all hover:border-brand/40 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-semibold text-sm text-foreground">{opt.name}</h4>
                            {opt.newClientsOnly && (
                              <span className="rounded-full bg-brand text-ink px-2 py-0.5 text-[0.65rem] font-semibold">
                                New Clients Only
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            <span className="text-foreground">⏱ {opt.durationDisplay}</span>
                            <span>•</span>
                            <span className="font-bold text-foreground text-sm">{opt.priceDisplay}</span>
                          </div>
                        </div>
                        <Button asChild size="sm" className="shrink-0">
                          <Link href={`/book?service=${service.slug}&option=${opt.id}`}>
                            Book
                          </Link>
                        </Button>
                      </div>
                      {opt.note && (
                        <p className="text-xs text-muted-foreground leading-relaxed pt-1 border-t border-border/40">
                          {opt.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-lg bg-sand p-6 md:p-8">
              <h3 className="font-display text-xl font-semibold">What to expect</h3>
              <ol className="mt-5 grid gap-5">
                {service.whatToExpect.map((item, i) => (
                  <li key={item} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-semibold text-brand-foreground">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      {team.length ? (
        <Section>
          <div className="container-page">
            <SectionHeading
              eyebrow="Your Care Team"
              title={`Practitioners offering ${service.name}`}
              description="Meet our experienced practitioners dedicated to supporting your health and wellbeing."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((practitioner, i) => (
                <Reveal key={practitioner.slug} delay={i * 80}>
                  <PractitionerCard practitioner={practitioner} />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {service.faqs?.length ? (
        <Section tone="white">
          <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <SectionHeading eyebrow="FAQs" title="Common questions" />
            <Reveal delay={80}>
              <FaqAccordion faqs={service.faqs} />
            </Reveal>
          </div>
        </Section>
      ) : null}

      {related.length ? (
        <Section tone="sand">
          <div className="container-page">
            <SectionHeading eyebrow="Related" title="You may also be interested in" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <Reveal key={item.slug} delay={i * 70}>
                  <ServiceCard service={item} />
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10">
              <Button asChild variant="ink">
                <Link href="/services">
                  All Services <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </Section>
      ) : null}

      <CtaSection title={`Ready to book ${service.name}?`} />
    </>
  );
}
