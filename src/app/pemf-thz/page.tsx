"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
 Activity,
  Battery,
  Brain,
  CheckCircle,
  Star,
  Quote,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { LocationSection } from "@/components/site/LocationSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  pemfThzOverview,
  practitionerRecommendations,
  pemfThzProducts,
  pemfThzReviews,
  pemfThzFaqs,
} from "@/data/pemfThz";
import { PemfThzProducts } from "@/components/site/PemfThzProducts";
import { PemfThzOrderForm } from "@/components/site/PemfThzOrderForm";

export default function PemfThzPage() {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    pemfThzProducts[0].id,
  );

  const iconsMap = {
    ShieldCheck: <ShieldCheck className="size-6 text-brand-dark" />,
    Activity: <Activity className="size-6 text-brand-dark" />,
    Battery: <Battery className="size-6 text-brand-dark" />,
    Brain: <Brain className="size-6 text-brand-dark" />,
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
  };

  return (
    <>
      {/* 1. Hero Section */}
      <PageHero
        eyebrow="Frequency Energy Wellness"
        title="Recharge Your Body at the Cellular Level"
        script="PEMF & THz Therapy"
        description="Discover non-invasive Pulsed Electromagnetic Field (PEMF) and Terahertz (THz) bio-frequency devices recommended by Rosanna Mosca & Edmore Mahleka to accelerate recovery, ease pain, and boost daily energy."
        crumbs={[{ label: "PEMF / THz Products" }]}
      >
        <div className="flex flex-wrap items-center gap-3 w-full">
          <Button asChild size="default" className="gap-2 font-semibold w-full sm:w-auto">
            <a href="#products">
              <ShoppingBag className="size-4" />
              <span>Explore Products</span>
            </a>
          </Button>
          <Button asChild variant="outline" size="default" className="gap-2 w-full sm:w-auto">
            <a href="#order-form">
              <span>Order Form</span>
            </a>
          </Button>
        </div>
      </PageHero>

      {/* 2. PEMF / THz Technology Explained (Brief & Converting) */}
      <Section tone="white">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <SectionHeading
                eyebrow={pemfThzOverview.eyebrow}
                title={pemfThzOverview.title}
                description={pemfThzOverview.subtitle}
              />

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                {pemfThzOverview.introParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4 pt-4 border-t border-border/60">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <ShieldCheck className="size-4 text-brand-dark" />
                  <span>100% Non-Invasive Bio-Resonance</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Award className="size-4 text-brand-dark" />
                  <span>Clinic Tested & Practitioner Approved</span>
                </div>
              </div>
            </div>

            {/*here*/}
            <Reveal className="relative order-1 lg:order-2">
              <span aria-hidden="true" className="absolute -bottom-6 -left-6 size-28 blob bg-brand" />
              <img
                src={pemfThzProducts[0].image}
                alt={`Portrait of ${pemfThzProducts[0].name}`}
                loading="lazy"
                width={1024}
                height={1024}
                className="relative lg:aspect-square aspect-[4/2.5] w-full rounded-[2.5rem] object-cover object-[0%_80%] lg:object-center shadow-soft"
              />
            </Reveal>
          </div>

{/* Feature Pillars Grid */}
            <div className="grid gap-3 sm:gap-5 grid-cols-2 lg:grid-cols-4 mt-16">
              {pemfThzOverview.pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 80}>
                  <div className="group h-full rounded-sm border border-border/80 bg-card lg:p-6 p-4 shadow-soft transition-all duration-300 hover:border-brand hover:shadow-lift">
                    <div className="grid size-11 place-items-center rounded-2xl bg-brand mb-4 transition-all duration-300 group-hover:scale-110">
                      {iconsMap[pillar.iconName as keyof typeof iconsMap]}
                    </div>
                    <h3 className="font-display text-xs sm:text-base font-bold text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-[0.7rem] leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

        </div>
      </Section>

      {/* 3. Why Rosanna & Edmore Recommend These Products */}
      <Section tone="sand">
        <div className="container-page">
          <SectionHeading
            eyebrow="Practitioner Recommendation"
            title={practitionerRecommendations.title}
            description={practitionerRecommendations.subtitle}
          />

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Rosanna Mosca Endorsement Card */}
            <Reveal delay={100}>
              <div className="flex flex-col justify-between h-full rounded-lg border border-border/80 bg-card p-8 shadow-soft">
                <div>
                  <div className="flex items-center gap-4 border-b border-border/60 pb-6 mb-6">
                    <img
                      src={practitionerRecommendations.rosanna.image}
                      alt={practitionerRecommendations.rosanna.name}
                      className="size-16 rounded-full object-cover shadow-xs border-2 border-brand"
                    />
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {practitionerRecommendations.rosanna.name}
                      </h3>
                      <p className="text-xs font-semibold text-brand-dark">
                        {practitionerRecommendations.rosanna.role}
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-6">
                    <Quote className="absolute -left-1 -top-2 size-6 text-brand/40 rotate-180" />
                    <p className="sm:text-sm text-[13px] italic leading-relaxed text-foreground/90">
                      "{practitionerRecommendations.rosanna.quote}"
                    </p>
                  </div>

                  {/* <div className="mt-6 pt-6 border-t border-border/60">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Rosanna's Naturopathic Perspective
                    </p>
                    <ul className="space-y-2">
                      {practitionerRecommendations.rosanna.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                          <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand-dark" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div> */}
                </div>

                <div className="mt-8 pt-4 border-t border-border/40">
                  <Link
                    href="/practitioners/rosanna-mosca"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark hover:underline"
                  >
                    <span>Read Rosanna's Practitioner Profile</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Edmore Mahleka Endorsement Card */}
            <Reveal delay={200}>
              <div className="flex flex-col justify-between h-full rounded-lg border border-border/80 bg-card p-8 shadow-soft">
                <div>
                  <div className="flex items-center gap-4 border-b border-border/60 pb-6 mb-6">
                    <img
                      src={practitionerRecommendations.edmore.image}
                      alt={practitionerRecommendations.edmore.name}
                      className="size-16 rounded-full object-cover shadow-xs border-2 border-brand"
                    />
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {practitionerRecommendations.edmore.name}
                      </h3>
                      <p className="text-xs font-semibold text-brand-dark">
                        {practitionerRecommendations.edmore.role}
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-6">
                    <Quote className="absolute -left-1 -top-2 size-6 text-brand/40 rotate-180" />
                    <p className="sm:text-sm text-[13px] italic leading-relaxed text-foreground/90">
                      "{practitionerRecommendations.edmore.quote}"
                    </p>
                  </div>

                  {/* <div className="mt-6 pt-6 border-t border-border/60">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Edmore's Remedial & Athletic Recovery Take
                    </p>
                    <ul className="space-y-2">
                      {practitionerRecommendations.edmore.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                          <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand-dark" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div> */}
                </div>

                <div className="mt-8 pt-4 border-t border-border/40">
                  <Link
                    href="/practitioners/edmore-mahleka"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark hover:underline"
                  >
                    <span>Read Edmore's Practitioner Profile</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 4. Products Presented in Grid View */}
      <Section tone="white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Recommended Devices"
            title="PEMF & Terahertz Product Collection"
            description="Selected for safety, effectiveness, and ease of use at home or in office. Press 'Order' on any product to jump down to our direct order form."
          />

          <div className="mt-10">
            <PemfThzProducts onSelectProduct={handleSelectProduct} />
          </div>
        </div>
      </Section>

      {/* 5. Reviews from Current Customers */}
      <Section tone="sand">
        <div className="container-page">
          <SectionHeading
            eyebrow="Client Experiences"
            title="What Our Clients Say About PEMF & THz Products"
            description="Real feedback from people who integrated frequency therapy into their daily wellness routine."
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pemfThzReviews.map((rev, i) => (
              <Reveal key={rev.id} delay={i * 70}>
                <div className="flex flex-col justify-between h-full rounded-lg border border-border/80 bg-card p-6 shadow-soft">
                  <div>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} className="size-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <span className="rounded-full bg-sand px-2.5 py-0.5 text-[0.68rem] font-bold text-muted-foreground">
                      {rev.productName}
                    </span>

                    <h4 className="mt-3 font-display text-sm font-bold text-foreground">
                      "{rev.title}"
                    </h4>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-4">
                      {rev.comment}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-foreground">{rev.author}</p>
                      <p className="text-[0.68rem] text-muted-foreground">{rev.location}</p>
                    </div>
                    <span className="text-[0.65rem] font-medium text-muted-foreground">{rev.date}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 6. FAQs About These Products */}
      <Section tone="white">
        <div className="container-page max-w-4xl">
          <SectionHeading
            eyebrow="Got Questions?"
            title="Frequently Asked Questions"
            description="Everything you need to know about PEMF, Terahertz light waves, safety, and ordering."
          />

          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {pemfThzFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-sm border border-border/80 bg-card px-6 py-1 shadow-xs transition-colors data-[state=open]:border-brand"
                >
                  <AccordionTrigger className="text-left font-display text-base font-bold text-foreground hover:no-underline cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground pt-1 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>

      {/* 7. Product Order Form at Bottom of Page */}
      <Section tone="sand">
        <div className="container-page max-w-4xl">
          <PemfThzOrderForm
            selectedProductId={selectedProductId}
            onProductChange={setSelectedProductId}
          />
        </div>
      </Section>

      {/* Clinic Location & CTA */}
      {/* <Section tone="white">
        <LocationSection
          title="Visit Us in Tweed Heads"
          description="Have questions or want to try a device in person? Drop by the clinic or give us a call."
        />
      </Section> */}

      <CtaSection />
    </>
  );
}
