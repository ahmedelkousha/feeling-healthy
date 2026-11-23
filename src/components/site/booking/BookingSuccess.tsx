"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Service, type ServiceOption } from "@/data/services";
import { type Practitioner } from "@/data/practitioners";
import { type IntakeFormData } from "@/data/intake-form";

interface BookingSuccessProps {
  details: IntakeFormData;
  selectedService: Service | undefined;
  selectedOption: ServiceOption | undefined;
  practitionerSlug: string | null;
  practitioner: Practitioner | undefined;
  date: string | null;
  time: string | null;
}

export function BookingSuccess({
  details,
  selectedService,
  selectedOption,
  practitionerSlug,
  practitioner,
  date,
  time,
}: BookingSuccessProps) {
  return (
    <div className="container-page max-w-2xl py-12">
      <div className="rounded-3xl bg-card p-8 md:p-12 shadow-soft border border-border text-center space-y-6">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-brand/10 text-brand">
          <Check className="size-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-display font-semibold">
            We Look Forward to Seeing You
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
            Thank you, <strong>{details.name}</strong>. Your complimentary appointment request has
            been lodged successfully.
          </p>
        </div>

        <div className="rounded-2xl bg-sand/70 p-5 text-left text-sm space-y-2.5 max-w-md mx-auto">
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Service:</span>
            <span className="font-semibold">{selectedService?.name}</span>
          </div>
          {selectedOption && (
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Option:</span>
              <span className="font-semibold">{selectedOption.name}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-semibold">{selectedOption?.durationDisplay}</span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Practitioner:</span>
            <span className="font-semibold">
              {practitionerSlug === "any" ? "Clinic Team" : practitioner?.name}
            </span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Date &amp; Time:</span>
            <span className="font-semibold">
              {date} at {time}
            </span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-muted-foreground">Fee:</span>
            <span className="font-bold text-ink">Free</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          We have sent confirmation details to <strong>{details.email}</strong>. Our reception
          team will get in touch if any details need confirming.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Button asChild size="default">
            <Link href="/">Return to Homepage</Link>
          </Button>
          <Button asChild variant="outline" size="default">
            <Link href="/services">Browse More Services</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
