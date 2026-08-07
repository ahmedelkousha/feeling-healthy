"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/data/services";
import { practitioners, practitionersForService } from "@/data/practitioners";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const steps = ["Service", "Practitioner", "Date & Time", "Your Details", "Confirmation"] as const;

const mockAvailability = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

const nextDays = (count: number) =>
  Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date;
  });

export function BookingFlow() {
  const [step, setStep] = useState(0);
  const [serviceSlug, setServiceSlug] = useState<string | null>(null);
  const [practitionerSlug, setPractitionerSlug] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState({ name: "", email: "", phone: "", notes: "" });

  const days = useMemo(() => nextDays(8), []);
  const service = services.find((s) => s.slug === serviceSlug);
  const eligible = serviceSlug ? practitionersForService(serviceSlug) : practitioners;
  const practitioner = practitioners.find((p) => p.slug === practitionerSlug);

  const canContinue = [
    Boolean(serviceSlug),
    Boolean(practitionerSlug),
    Boolean(date && time),
    details.name.trim().length > 1 && /.+@.+\..+/.test(details.email),
    true,
  ][step];

  return (
    <div className="container-page max-w-3xl">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs" aria-label="Booking steps">
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
            <span className={cn(i === step ? "font-medium" : "text-muted-foreground")}>{label}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-3xl bg-card p-6 shadow-soft md:p-9">
        {step === 0 ? (
          <Step title="Select a service" hint="Choose the service you'd like to book.">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {services.map((s) => (
                <Choice
                  key={s.slug}
                  selected={serviceSlug === s.slug}
                  onClick={() => {
                    setServiceSlug(s.slug);
                    setPractitionerSlug(null);
                  }}
                  title={s.name}
                  subtitle={s.short}
                />
              ))}
            </div>
          </Step>
        ) : null}

        {step === 1 ? (
          <Step
            title="Select a practitioner"
            hint="Choose a specific team member or select 'No preference'."
          >
            <div className="grid gap-2.5 sm:grid-cols-2">
              {eligible.map((p) => (
                <Choice
                  key={p.slug}
                  selected={practitionerSlug === p.slug}
                  onClick={() => setPractitionerSlug(p.slug)}
                  title={p.name}
                  subtitle={p.title}
                />
              ))}
              <Choice
                selected={practitionerSlug === "any"}
                onClick={() => setPractitionerSlug("any")}
                title="No preference"
                subtitle="The clinic will match you with a suitable practitioner."
              />
            </div>
          </Step>
        ) : null}

        {step === 2 ? (
          <Step title="Select a date & time" hint="Times shown are sample availability only.">
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
              {days.map((d) => {
                const value = d.toISOString().slice(0, 10);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setDate(value)}
                    className={cn(
                      "min-w-20 shrink-0 cursor-pointer rounded-2xl border px-4 py-3 text-center transition-colors",
                      date === value
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border hover:border-ink/40",
                    )}
                  >
                    <span className="block text-xs uppercase">
                      {d.toLocaleDateString(undefined, { weekday: "short" })}
                    </span>
                    <span className="block font-display text-lg font-semibold">{d.getDate()}</span>
                    <span className="block text-xs">
                      {d.toLocaleDateString(undefined, { month: "short" })}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
              {mockAvailability.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  disabled={!date}
                  onClick={() => setTime(slot)}
                  className={cn(
                    "h-11 cursor-pointer rounded-full border text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                    time === slot
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border hover:border-ink/40",
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </Step>
        ) : null}

        {step === 3 ? (
          <Step title="Your details" hint="We'll use these to confirm your appointment request.">
            <div className="grid gap-5 sm:grid-cols-2">
              {(
                [
                  ["name", "Name", "text"],
                  ["email", "Email", "email"],
                  ["phone", "Phone", "tel"],
                ] as const
              ).map(([key, label, type]) => (
                <div key={key} className="grid gap-2">
                  <Label htmlFor={key}>{label}</Label>
                  <Input
                    id={key}
                    type={type}
                    className="h-11 rounded-xl"
                    value={details[key]}
                    onChange={(e) => setDetails({ ...details, [key]: e.target.value })}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-2">
              <Label htmlFor="notes">Anything you'd like us to know?</Label>
              <Textarea
                id="notes"
                rows={4}
                maxLength={1000}
                className="rounded-xl"
                value={details.notes}
                onChange={(e) => setDetails({ ...details, notes: e.target.value })}
              />
            </div>
          </Step>
        ) : null}

        {step === 4 ? (
          <div>
            <p className="script-accent text-2xl">Almost there</p>
            <h2 className="mt-3 text-2xl font-semibold">Your appointment request is ready</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Online booking is not yet connected, so <strong>no appointment has been reserved</strong>.
              Please call {site.contact.phone} or send us a message to confirm these details.
            </p>
            <dl className="mt-6 grid gap-3 rounded-2xl bg-sand p-5 text-sm">
              <Summary label="Service" value={service?.name ?? "—"} />
              <Summary
                label="Practitioner"
                value={practitionerSlug === "any" ? "No preference" : (practitioner?.name ?? "—")}
              />
              <Summary label="Date" value={date ?? "—"} />
              <Summary label="Time" value={time ?? "—"} />
              <Summary label="Name" value={details.name || "—"} />
              <Summary label="Email" value={details.email || "—"} />
            </dl>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Send These Details</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setStep(0);
                  setServiceSlug(null);
                  setPractitionerSlug(null);
                  setDate(null);
                  setTime(null);
                }}
              >
                Start Again
              </Button>
            </div>
          </div>
        ) : null}

        {step < 4 ? (
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft /> Back
            </Button>
            <Button size="lg" disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>
              Continue <ArrowRight />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Step({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Choice({
  title,
  subtitle,
  selected,
  onClick,
}: {
  title: string;
  subtitle: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "cursor-pointer rounded-2xl border p-4 text-left transition-colors",
        selected ? "border-brand bg-accent" : "border-border hover:border-ink/40",
      )}
    >
      <span className="block font-medium">{title}</span>
      <span className="mt-1 block text-xs text-muted-foreground">{subtitle}</span>
    </button>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
