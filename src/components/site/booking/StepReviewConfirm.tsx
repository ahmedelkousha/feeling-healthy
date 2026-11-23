"use client";

import { useState } from "react";
import { ArrowLeft, Check, CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Service, type ServiceOption } from "@/data/services";
import { type Practitioner } from "@/data/practitioners";
import { type IntakeFormData } from "@/data/intake-form";
import { SummaryRow } from "./BookingUI";

interface StepReviewConfirmProps {
  serviceSlug: string | null;
  selectedService: Service | undefined;
  selectedOption: ServiceOption | undefined;
  practitionerSlug: string | null;
  practitioner: Practitioner | undefined;
  date: string | null;
  time: string | null;
  details: IntakeFormData;
  onBack: () => void;
  onFreeBookingSuccess: () => void;
}

export function StepReviewConfirm({
  serviceSlug,
  selectedService,
  selectedOption,
  practitionerSlug,
  practitioner,
  date,
  time,
  details,
  onBack,
  onFreeBookingSuccess,
}: StepReviewConfirmProps) {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const handleFreeConfirm = () => {
    setCheckoutLoading(true);
    setTimeout(() => {
      onFreeBookingSuccess();
      setCheckoutLoading(false);
    }, 500);
  };

  const handleStripeCheckout = async () => {
    setCheckoutLoading(true);
    setCheckoutError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "service",
          slug: serviceSlug,
          optionId: selectedOption?.id,
          quantity: 1,
          customerEmail: details.email,
          customerName: details.name,
          metadata: {
            serviceName: selectedService?.name,
            optionName: selectedOption?.name,
            practitioner: practitionerSlug,
            date,
            time,
            phone: details.phone,
            dob: details.dob,
            occupation: details.occupation,
            address: [details.address, details.suburb, details.postCode]
              .filter(Boolean)
              .join(", "),
            healthConcerns: details.healthConcerns,
            notes: details.additionalNotes || details.healthConcerns,
            cancellationAgreed: String(details.cancellationAgreed),
          },
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError(data.error || "Something went wrong. Please try again.");
        setCheckoutLoading(false);
      }
    } catch {
      setCheckoutError("Network error. Please check your connection and try again.");
      setCheckoutLoading(false);
    }
  };

  return (
    <div>
      <p className="script-accent text-2xl">Review &amp; confirm</p>
      <h2 className="mt-3 text-2xl font-semibold">Confirm your booking</h2>
      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
        Please review your appointment summary below.{" "}
        {selectedOption?.priceInCents === 0 ? (
          <span>
            This session is <strong>100% complimentary</strong>. Click confirm to complete your
            booking.
          </span>
        ) : (
          <span>
            Click <strong>Pay &amp; Confirm</strong> to be securely redirected to Stripe to
            finalise your booking.
          </span>
        )}
      </p>

      <dl className="mt-6 grid gap-3 rounded-2xl bg-sand p-5 text-sm">
        <SummaryRow
          label="Service"
          value={
            serviceSlug === "other"
              ? "Other Service / Consultation"
              : (selectedService?.name ?? "—")
          }
        />
        {selectedOption && (
          <>
            <SummaryRow label="Appointment Option" value={selectedOption.name} />
            <SummaryRow label="Duration" value={selectedOption.durationDisplay} />
            <SummaryRow
              label="Price"
              value={
                selectedOption.priceDisplay + (selectedOption.priceInCents > 0 ? " AUD" : "")
              }
            />
          </>
        )}
        <SummaryRow
          label="Practitioner"
          value={practitionerSlug === "any" ? "No preference" : (practitioner?.name ?? "—")}
        />
        <SummaryRow label="Date" value={date ?? "—"} />
        <SummaryRow label="Time" value={time ?? "—"} />
        <SummaryRow label="Name" value={details.name || "—"} />
        <SummaryRow label="Email" value={details.email || "—"} />
        <SummaryRow label="Phone" value={details.phone || "—"} />
        {details.dob && <SummaryRow label="DOB" value={details.dob} />}
        {details.occupation && <SummaryRow label="Occupation" value={details.occupation} />}
        {details.address && (
          <SummaryRow
            label="Address"
            value={[details.address, details.suburb, details.postCode]
              .filter(Boolean)
              .join(", ")}
          />
        )}
        {details.healthConcerns && (
          <SummaryRow label="Primary Concerns" value={details.healthConcerns} />
        )}
        <SummaryRow
          label="Cancellation Policy"
          value={details.cancellationAgreed ? "Agreed ✓" : "Pending"}
        />
        <SummaryRow
          label="Signature"
          value={
            details.signatureType === "draw"
              ? details.signatureDataUrl
                ? "Digital Signature (Drawn) ✓"
                : "Pending"
              : details.typedSignature || details.printName || "Digital Signature (Typed) ✓"
          }
        />
      </dl>

      {checkoutError && (
        <div className="mt-4 rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
          {checkoutError}
        </div>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-3">
        {selectedOption?.priceInCents === 0 ? (
          <Button
            size="default"
            disabled={checkoutLoading}
            onClick={handleFreeConfirm}
          >
            {checkoutLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Processing…
              </>
            ) : (
              <>
                <Check className="size-4" /> Confirm Free Appointment
              </>
            )}
          </Button>
        ) : (
          <div className="flex gap-2 flex-wrap">
            <Button
              className="sm:w-fit w-full"
              variant="outline"
              size="default"
              disabled={checkoutLoading}
              onClick={onBack}
            >
              <ArrowLeft /> Back
            </Button>

            <Button
              size="default"
              className="sm:w-fit w-full"
              disabled={checkoutLoading || serviceSlug === "other"}
              onClick={handleStripeCheckout}
            >
              {checkoutLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Processing…
                </>
              ) : (
                <>
                  <CreditCard className="size-4" /> Pay &amp; Confirm (
                  {selectedOption?.priceDisplay} AUD)
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {serviceSlug === "other" && (
        <p className="mt-4 text-sm text-muted-foreground">
          Online payment is not available for general consultations. Please{" "}
          <a href="/contact" className="underline underline-offset-2 hover:text-foreground">
            contact us
          </a>{" "}
          to arrange your appointment.
        </p>
      )}

      <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5" /> Payments are securely processed by Stripe. We never see
        your card details.
      </p>
    </div>
  );
}
