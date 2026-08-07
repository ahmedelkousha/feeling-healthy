import Link from "next/link";
import { Button } from "@/components/ui/button";
import { bookCta } from "@/data/site";
import { Reveal } from "./Reveal";

export function CtaSection({
  title = "Ready to Feel Great About Yourself?",
  description = "Take the first step towards supporting your health and wellbeing.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand py-20 text-brand-foreground md:py-28">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 size-80 blob-alt bg-brand-foreground/10"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-[-6rem] size-96 blob bg-brand-foreground/[0.07]"
      />
      <div className="container-page relative text-center">
        <Reveal className="mx-auto max-w-2xl">
          <p className="script-accent text-2xl">Feeling Healthy</p>
          <h2 className="mt-4 text-3xl leading-[1.08] font-semibold md:text-5xl">{title}</h2>
          <p className="mt-4 text-base text-brand-foreground/80 md:text-lg">{description}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button className="sm:w-auto w-full" asChild variant="ink" size="lg">
              <Link href={bookCta.to}>{bookCta.label}</Link>
            </Button>
            <Button className="sm:w-auto w-full" asChild variant="onBrand" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
