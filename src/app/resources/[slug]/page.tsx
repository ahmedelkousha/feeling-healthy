import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { getArticle, articles } from "@/data/resources";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "Unavailable — Feeling Healthy", robots: { index: false } };
  }
  const title = `${article.title} — Feeling Healthy`;
  return {
    title,
    description: article.excerpt,
    openGraph: {
      title,
      description: article.excerpt,
      type: "article",
      url: `/resources/${slug}`,
    },
    alternates: {
      canonical: `/resources/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <section className="bg-sand pt-10 pb-14">
        <div className="container-page max-w-3xl">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: article.title }]} />
          <Reveal className="mt-8">
            <p className="eyebrow">
              {article.category} · {article.readingTime} · {article.date}
            </p>
            <h1 className="mt-4 text-3xl leading-tight font-semibold md:text-5xl">{article.title}</h1>
            <p className="mt-5 leading-relaxed text-muted-foreground">{article.excerpt}</p>
          </Reveal>
        </div>
      </section>

      <Section tone="white">
        <article className="container-page max-w-3xl">
          <img
            src={article.image || "/images/service-hypnosis.jpg"}
            alt={article.title}
            loading="lazy"
            width={1024}
            height={768}
            className="aspect-[16/9] w-full rounded-[2rem] object-cover shadow-soft"
          />
          {article.body.map((block, i) => (
            <Reveal key={i} delay={i * 60} className="mt-8">
              {block.heading ? (
                <h2 className="font-display text-2xl font-semibold">{block.heading}</h2>
              ) : null}
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          ))}
        </article>
      </Section>

      <CtaSection />
    </>
  );
}
