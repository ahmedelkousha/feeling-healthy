import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { CtaSection } from "@/components/site/CtaSection";
import { generalFaqs } from "@/data/resources";
import { getBlogs } from "@/lib/firebase/services";

const title = "Resources, Guides & FAQs — Feeling Healthy";
const description =
  "Health and wellbeing articles, helpful guides and frequently asked questions from the Feeling Healthy team.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/resources",
  },
  alternates: {
    canonical: "/resources",
  },
};

export default async function ResourcesPage() {
  const articles = await getBlogs();

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Guides & Wellbeing Articles"
        description="Explore our health articles, wellness tips, and answers to common questions about your care."
        crumbs={[{ label: "Resources" }]}
      />

      <Section>
        <div className="container-page">
          <SectionHeading eyebrow="Articles" title="Health & wellbeing reading" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <Reveal key={article.slug} delay={i * 70}>
                <Link
                  href={`/resources/${article.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
                  <img
                    src={article.image || "/images/service-hypnosis.jpg"}
                    alt={article.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">
                      {article.category}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold">{article.title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                      Read article
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
          <Reveal delay={80}>
            <FaqAccordion faqs={generalFaqs} />
          </Reveal>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
