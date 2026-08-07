import Link from "next/link";
import { ArrowRight, HeartHandshake, Leaf, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookCta } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

export function Hero() {

  return (
    <section
      className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[750px] flex items-center overflow-hidden py-16 md:py-24 bg-cover bg-center lg:bg-fixed bg-[url('/images/hero-consultation.jpg')] lg:bg-[url('/images/hero-rosanna.png')]"
    >
      {/* Gradient Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-ink/40 to-ink/35" />

      {/* Hero Content */}
      <div className="container-page relative z-10 w-full">
        <Reveal className="max-w-2xl text-ink-foreground">
          <p className="eyebrow text-ink font-medium tracking-wider p-1 bg-brand -skew-x-12">RESTORE HEALTH &amp; WELLNESS</p>
          
          <h1 className="mt-4 text-3xl leading-[1.05] font-semibold text-white sm:text-5xl lg:text-[4rem]">
            Your Health. {<br/>} Your Journey. <br />
            <span className="relative inline-block mt-1 sm:mt-0">
              <span className="relative z-10 text-white">Your Care.</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-[-0.15em] bottom-[0.05em] z-0 h-[0.2em] rotate-2 bg-brand/80"
              />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
            A holistic approach to better health and wellbeing, with personalised support for your body and mind in Tweed Heads.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto shadow-md">
              <Link href={bookCta.to}>{bookCta.label}</Link>
            </Button>
            <Button asChild variant="onDark" size="lg" className="w-full sm:w-auto">
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const pillars = [
  { icon: HelpCircle, title: "Personalised", copy: "Care tailored to your individual needs." },
  { icon: Leaf, title: "Holistic", copy: "Looking at the bigger picture of your wellbeing." },
  { icon: HeartHandshake, title: "Supportive", copy: "Working with you throughout your health journey." },
];

export function ApproachSection({reversed=true, href, buttonText}:{reversed:boolean, href:string, buttonText:string}) {
  return (
    <Section tone="white" id="approach">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className={`relative order-1 lg:order-${reversed? '2' :'1'}`}>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-6 -left-6 size-32 blob bg-brand/40"
          />
          <img
            src="/images/approach-studio.jpg"
            alt="A calm treatment room at the Feeling Healthy clinic"
            loading="lazy"
            width={1280}
            height={1280}
            className="relative aspect-video lg:aspect-square w-full rounded-[2.5rem] object-cover shadow-soft"
          />
        </Reveal>

        <div className={`order-2 lg:order-${reversed? '1':'2'}`}>
          <SectionHeading
            eyebrow="Our Approach"
            title="A More Holistic Approach to Your Health"
            description="We believe your health is about more than treating individual symptoms. Our approach considers the whole person — your physical wellbeing, emotional health, lifestyle and individual needs."
          />
          <ul className="mt-9 grid gap-5">
            {pillars.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} delay={i * 90} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                  <pillar.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display md:text-lg text-sm font-semibold">{pillar.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{pillar.copy}</span>
                </span>
              </Reveal>
            ))}
          </ul>
          <Button asChild variant="outline" className="mt-9">
            <Link href={href}>
              {buttonText} <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
