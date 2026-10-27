"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { practitioners, practitionersForService } from "@/data/practitioners";
import { type IntakeFormData } from "@/data/intake-form";
import { cn } from "@/lib/utils";

import { StepServiceSelect } from "./booking/StepServiceSelect";
import { StepPractitioner } from "./booking/StepPractitioner";
import { StepDateTime } from "./booking/StepDateTime";
import { StepHealthIntake } from "./booking/StepHealthIntake";
import { StepReviewConfirm } from "./booking/StepReviewConfirm";
import { BookingSuccess } from "./booking/BookingSuccess";

const steps = [
  "Service & Option",
  "Practitioner",
  "Date & Time",
  "Your Details",
  "Review & Pay",
] as const;

const nextDays = (count: number) =>
  Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date;
  });

export function BookingFlow() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service");
  const initialOption = searchParams.get("option");

  const [step, setStep] = useState(0);
  const [serviceSlug, setServiceSlug] = useState<string | null>(initialService);
  const [optionId, setOptionId] = useState<string | null>(initialOption);
  const [practitionerSlug, setPractitionerSlug] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [freeSuccess, setFreeSuccess] = useState(false);

  // Client Health Intake Form Data
  const [details, setDetails] = useState<IntakeFormData>({
    date: new Date().toISOString().slice(0, 10),
    name: "",
    dob: "",
    occupation: "",
    address: "",
    suburb: "",
    postCode: "",
    phone: "",
    email: "",
    howHeard: "",
    healthConcerns: "",
    symptomState: {},
    accidentsHistory: "",
    takingMedications: "",
    medicationsDetails: "",
    smoke: "",
    drinkAlcohol: "",
    takeDrugs: "",
    additionalNotes: "",
    printName: "",
    signatureDataUrl: "",
    signatureType: "draw",
    typedSignature: "",
    cancellationAgreed: false,
  });

  const handleIntakeChange = (field: keyof IntakeFormData, value: any) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSymptomToggle = (symptomId: string, type: "past" | "present") => {
    setDetails((prev) => {
      const current = prev.symptomState[symptomId] || { past: false, present: false };
      return {
        ...prev,
        symptomState: {
          ...prev.symptomState,
          [symptomId]: {
            ...current,
            [type]: !current[type],
          },
        },
      };
    });
  };

  const handleSignatureChange = (
    dataUrl: string,
    type: "draw" | "type",
    typedName?: string,
  ) => {
    setDetails((prev) => ({
      ...prev,
      signatureDataUrl: dataUrl,
      signatureType: type,
      typedSignature: typedName || "",
    }));
  };

  // Find selected service and option
  const selectedService = services.find((s) => s.slug === serviceSlug);
  const selectedOption =
    selectedService?.options.find((o) => o.id === optionId) || selectedService?.options[0];

  // Set default option when service changes
  useEffect(() => {
    if (selectedService && (!optionId || !selectedService.options.some((o) => o.id === optionId))) {
      setOptionId(selectedService.options[0]?.id || null);
    }
  }, [selectedService, optionId]);

  const days = useMemo(() => nextDays(8), []);
  const eligible =
    serviceSlug && serviceSlug !== "other" ? practitionersForService(serviceSlug) : practitioners;
  const practitioner = practitioners.find((p) => p.slug === practitionerSlug);

  const isDetailsValid =
    details.name.trim().length > 1 &&
    /.+@.+\..+/.test(details.email) &&
    details.phone.trim().length > 5 &&
    details.cancellationAgreed &&
    (details.signatureType === "draw"
      ? Boolean(details.signatureDataUrl)
      : Boolean(
          details.typedSignature?.trim() || details.printName?.trim() || details.name.trim(),
        ));

  const canContinue = [
    Boolean(serviceSlug && (serviceSlug === "other" || selectedOption)),
    Boolean(practitionerSlug),
    Boolean(date && time),
    Boolean(isDetailsValid),
    true,
  ][step];

  const steps_container_ref = useRef<HTMLDivElement>(null);

  const scrollToFormTop = () => {
    setTimeout(() => {
      steps_container_ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  if (freeSuccess) {
    return (
      <BookingSuccess
        details={details}
        selectedService={selectedService}
        selectedOption={selectedOption}
        practitionerSlug={practitionerSlug}
        practitioner={practitioner}
        date={date}
        time={time}
      />
    );
  }

  return (
    <div className="container-page max-w-3xl lg:max-w-4xl">
      <ol
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs"
        aria-label="Booking steps"
      >
        {steps.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={cn(
                "grid size-6 place-items-center rounded-full text-[0.7rem] font-semibold",
                i < step
                  ? "bg-ink text-ink-foreground"
                  : i === step
                    ? "bg-brand text-brand-foreground"
                    : "bg-sand text-muted-foreground",
              )}
              aria-current={i === step ? "step" : undefined}
            >
              {i < step ? <Check className="size-3" /> : i + 1}
            </span>
            <span className={cn(i === step ? "font-medium" : "text-muted-foreground")}>
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div
        ref={steps_container_ref}
        className="mt-8 rounded-3xl bg-card p-6 shadow-soft md:p-9 border border-border/80 scroll-mt-48 sm:scroll-mt-48"
      >
        {step === 0 && (
          <StepServiceSelect
            serviceSlug={serviceSlug}
            optionId={optionId}
            selectedService={selectedService}
            selectedOption={selectedOption}
            onSelectService={(slug) => {
              setServiceSlug(slug);
              const found = services.find((s) => s.slug === slug);
              setOptionId(found?.options[0]?.id || null);
              setPractitionerSlug(null);
            }}
            onSelectOther={() => {
              setServiceSlug("other");
              setOptionId(null);
              setPractitionerSlug(null);
            }}
            onSelectOption={(id) => setOptionId(id)}
          />
        )}

        {step === 1 && (
          <StepPractitioner
            eligible={eligible}
            practitionerSlug={practitionerSlug}
            onSelectPractitioner={(slug) => setPractitionerSlug(slug)}
          />
        )}

        {step === 2 && (
          <StepDateTime
            days={days}
            date={date}
            time={time}
            onSelectDate={(newDate) => setDate(newDate)}
            onSelectTime={(newTime) => setTime(newTime)}
          />
        )}

        {step === 3 && (
          <StepHealthIntake
            details={details}
            onChange={handleIntakeChange}
            onSymptomToggle={handleSymptomToggle}
            onSignatureChange={handleSignatureChange}
          />
        )}

        {step === 4 && (
          <StepReviewConfirm
            serviceSlug={serviceSlug}
            selectedService={selectedService}
            selectedOption={selectedOption}
            practitionerSlug={practitionerSlug}
            practitioner={practitioner}
            date={date}
            time={time}
            details={details}
            onBack={() => {
              setStep((s) => Math.max(0, s - 1));
              scrollToFormTop();
            }}
            onFreeBookingSuccess={() => setFreeSuccess(true)}
          />
        )}

        {step < 4 && (
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
            <Button
              variant="outline"
              onClick={() => {
                setStep((s) => Math.max(0, s - 1));
                scrollToFormTop();
              }}
              disabled={step === 0}
            >
              <ArrowLeft /> Back
            </Button>
            <Button
              size="default"
              disabled={!canContinue}
              onClick={() => {
                setStep((s) => s + 1);
                scrollToFormTop();
              }}
            >
              Continue <ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
