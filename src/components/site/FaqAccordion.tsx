import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/data/services";

export function FaqAccordion({ faqs, className }: { faqs: Faq[]; className?: string }) {
  return (
    <Accordion type="single" collapsible className={className}>
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.question} value={`item-${i}`} className="border-b border-border">
          <AccordionTrigger className="py-5 text-left font-display text-sm sm:text-base font-semibold hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
