"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  INTAKE_SYMPTOMS_GROUP_1,
  INTAKE_SYMPTOMS_GROUP_2,
  INTAKE_SYMPTOMS_GROUP_3,
  type IntakeFormData,
} from "@/data/intake-form";
import { SignaturePad } from "@/components/site/SignaturePad";
import { cn } from "@/lib/utils";
import { StepShell } from "./BookingUI";

interface StepHealthIntakeProps {
  details: IntakeFormData;
  onChange: (field: keyof IntakeFormData, value: any) => void;
  onSymptomToggle: (symptomId: string, type: "past" | "present") => void;
  onSignatureChange: (dataUrl: string, type: "draw" | "type", typedName?: string) => void;
}

export function StepHealthIntake({
  details,
  onChange,
  onSymptomToggle,
  onSignatureChange,
}: StepHealthIntakeProps) {
  const isSignatureValid =
    details.signatureType === "draw"
      ? Boolean(details.signatureDataUrl)
      : Boolean(details.typedSignature?.trim() || details.printName?.trim() || details.name.trim());

  return (
    <StepShell
      title="Initial Client Health Intake Form"
      hint="Please complete your personal details, health history, symptom checklist, and digital signature prior to your appointment."
    >
      <div className="space-y-8">
        {/* Section 1: Personal Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/80 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <span className="grid size-5 place-items-center rounded-full bg-brand text-brand-foreground text-[0.65rem] font-bold">
                1
              </span>
              Personal Details
            </h3>
            <span className="text-[0.7rem] text-muted-foreground">
              <span className="text-destructive">*</span> indicates required field
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2">
              <Label htmlFor="intake-name" className="text-xs font-semibold mb-1 block">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="intake-name"
                type="text"
                required
                placeholder="e.g. Jane Doe"
                value={details.name}
                onChange={(e) => onChange("name", e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="intake-dob" className="text-xs font-semibold mb-1 block">
                Date of Birth
              </Label>
              <Input
                id="intake-dob"
                type="date"
                value={details.dob}
                onChange={(e) => onChange("dob", e.target.value)}
                className="h-10 py-0 rounded-xl w-auto"
              />
            </div>

            <div>
              <Label htmlFor="intake-phone" className="text-xs font-semibold mb-1 block">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="intake-phone"
                type="tel"
                required
                placeholder="04xx xxx xxx"
                value={details.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="intake-email" className="text-xs font-semibold mb-1 block">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="intake-email"
                type="email"
                required
                placeholder="email@example.com"
                value={details.email}
                onChange={(e) => onChange("email", e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            <div className="sm:col-span-3">
              <Label htmlFor="intake-address" className="text-xs font-semibold mb-1 block">
                Street Address
              </Label>
              <Input
                id="intake-address"
                type="text"
                placeholder="Street Address"
                value={details.address}
                onChange={(e) => onChange("address", e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="intake-suburb" className="text-xs font-semibold mb-1 block">
                Suburb
              </Label>
              <Input
                id="intake-suburb"
                type="text"
                placeholder="Suburb"
                value={details.suburb}
                onChange={(e) => onChange("suburb", e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="intake-postcode" className="text-xs font-semibold mb-1 block">
                Post Code
              </Label>
              <Input
                id="intake-postcode"
                type="text"
                placeholder="e.g. 2485"
                value={details.postCode}
                onChange={(e) => onChange("postCode", e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="intake-occupation" className="text-xs font-semibold mb-1 block">
                Occupation
              </Label>
              <Input
                id="intake-occupation"
                type="text"
                placeholder="Occupation"
                value={details.occupation}
                onChange={(e) => onChange("occupation", e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            <div className="sm:col-span-3">
              <Label htmlFor="intake-howheard" className="text-xs font-semibold mb-1 block">
                How did you hear about us?
              </Label>
              <Input
                id="intake-howheard"
                type="text"
                placeholder="Google, Social Media, Friend / Referral, etc."
                value={details.howHeard}
                onChange={(e) => onChange("howHeard", e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Primary Health Concerns */}
        <div className="space-y-3 pt-2 border-t border-border/80">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded-full bg-brand text-brand-foreground text-[0.65rem] font-bold">
              2
            </span>
            Primary Health Concerns
          </h3>
          <div>
            <Label
              htmlFor="intake-healthconcerns"
              className="text-xs font-medium text-muted-foreground mb-1.5 block"
            >
              What are your main concerns in regards to your health? What do you hope to
              achieve through consulting us?
            </Label>
            <Textarea
              id="intake-healthconcerns"
              rows={3}
              placeholder="Describe your current symptoms, health goals, or specific reasons for your visit..."
              value={details.healthConcerns}
              onChange={(e) => onChange("healthConcerns", e.target.value)}
              className="rounded-xl text-xs placeholder:text-xs"
            />
          </div>
        </div>

        {/* Section 3: Symptom Checklist */}
        <div className="space-y-4 pt-2 border-t border-border/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <span className="grid size-5 place-items-center rounded-full bg-brand text-brand-foreground text-[0.65rem] font-bold">
                3
              </span>
              Symptom Checklist
            </h3>
            <span className="text-xs font-medium text-amber-800 dark:text-amber-400">
              Tick Past or Present for any conditions you have or had:
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
            <div className="min-w-[700px] grid grid-cols-3 divide-x divide-border bg-muted/40 text-[0.7rem] font-bold uppercase tracking-wider text-foreground py-2 px-1 text-center">
              <div className="grid grid-cols-[1fr_45px_45px] items-center px-2">
                <span className="text-left">Emotional &amp; Neurological</span>
                <span>Past</span>
                <span>Present</span>
              </div>
              <div className="grid grid-cols-[1fr_45px_45px] items-center px-2">
                <span className="text-left">Musculoskeletal</span>
                <span>Past</span>
                <span>Present</span>
              </div>
              <div className="grid grid-cols-[1fr_45px_45px] items-center px-2">
                <span className="text-left">Digestive &amp; Systemic</span>
                <span>Past</span>
                <span>Present</span>
              </div>
            </div>

            <div className="min-w-[700px] grid grid-cols-3 divide-x divide-border bg-card text-xs">
              {/* Column 1: Group 1 */}
              <div className="divide-y divide-border/60">
                {INTAKE_SYMPTOMS_GROUP_1.map((item) => {
                  const state = details.symptomState[item.id] || {
                    past: false,
                    present: false,
                  };
                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-[1fr_45px_45px] items-center p-2 hover:bg-muted/40 transition-colors"
                    >
                      <span className="text-foreground font-medium text-[0.78rem]">
                        {item.name}
                      </span>
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={state.past}
                          onChange={() => onSymptomToggle(item.id, "past")}
                          className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer accent-brand"
                        />
                      </div>
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={state.present}
                          onChange={() => onSymptomToggle(item.id, "present")}
                          className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer accent-brand"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column 2: Group 2 */}
              <div className="divide-y divide-border/60">
                {INTAKE_SYMPTOMS_GROUP_2.map((item) => {
                  const state = details.symptomState[item.id] || {
                    past: false,
                    present: false,
                  };
                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-[1fr_45px_45px] items-center p-2 hover:bg-muted/40 transition-colors"
                    >
                      <span className="text-foreground font-medium text-[0.78rem]">
                        {item.name}
                      </span>
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={state.past}
                          onChange={() => onSymptomToggle(item.id, "past")}
                          className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer accent-brand"
                        />
                      </div>
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={state.present}
                          onChange={() => onSymptomToggle(item.id, "present")}
                          className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer accent-brand"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column 3: Group 3 */}
              <div className="divide-y divide-border/60">
                {INTAKE_SYMPTOMS_GROUP_3.map((item) => {
                  const state = details.symptomState[item.id] || {
                    past: false,
                    present: false,
                  };
                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-[1fr_45px_45px] items-center p-2 hover:bg-muted/40 transition-colors"
                    >
                      <span className="text-foreground font-medium text-[0.78rem]">
                        {item.name}
                      </span>
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={state.past}
                          onChange={() => onSymptomToggle(item.id, "past")}
                          className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer accent-brand"
                        />
                      </div>
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={state.present}
                          onChange={() => onSymptomToggle(item.id, "present")}
                          className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer accent-brand"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Medical History & Lifestyle */}
        <div className="space-y-4 pt-2 border-t border-border/80">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded-full bg-brand text-brand-foreground text-[0.65rem] font-bold">
              4
            </span>
            Medical History &amp; Lifestyle
          </h3>

          <div>
            <Label htmlFor="intake-accidents" className="text-xs font-semibold mb-1 block">
              Have you ever had any accidents, strains, fractures, concussions, etc.?
            </Label>
            <Input
              id="intake-accidents"
              type="text"
              placeholder="Describe any past major injuries or accidents..."
              value={details.accidentsHistory}
              onChange={(e) => onChange("accidentsHistory", e.target.value)}
              className="h-10 rounded-xl"
            />
          </div>

          <div className="rounded-xl border border-border p-4 bg-muted/20 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-semibold text-foreground">
                Are you taking any medication, natural remedies or supplements?
              </span>
              <div className="flex items-center gap-4 text-xs font-medium">
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="takingMedications"
                    value="yes"
                    checked={details.takingMedications === "yes"}
                    onChange={() => onChange("takingMedications", "yes")}
                    className="accent-brand"
                  />
                  Yes
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="takingMedications"
                    value="no"
                    checked={details.takingMedications === "no"}
                    onChange={() => onChange("takingMedications", "no")}
                    className="accent-brand"
                  />
                  No
                </label>
              </div>
            </div>

            {details.takingMedications === "yes" && (
              <div className="pt-2 border-t border-border/60 animate-in fade-in duration-200">
                <Label
                  htmlFor="intake-medsdetails"
                  className="text-xs font-medium text-muted-foreground mb-1 block"
                >
                  If yes, please list medications/supplements:
                </Label>
                <Textarea
                  id="intake-medsdetails"
                  rows={2}
                  placeholder="List prescription medications, vitamins, herbs or supplements..."
                  value={details.medicationsDetails}
                  onChange={(e) => onChange("medicationsDetails", e.target.value)}
                  className="rounded-xl text-xs"
                />
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border p-3 flex items-center justify-between bg-muted/20">
              <span className="text-xs font-semibold">Do you smoke?</span>
              <div className="flex items-center gap-3 text-xs">
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="intake-smoke"
                    value="yes"
                    checked={details.smoke === "yes"}
                    onChange={() => onChange("smoke", "yes")}
                    className="accent-brand"
                  />
                  Yes
                </label>
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="intake-smoke"
                    value="no"
                    checked={details.smoke === "no"}
                    onChange={() => onChange("smoke", "no")}
                    className="accent-brand"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="rounded-xl border border-border p-3 flex items-center justify-between bg-muted/20">
              <span className="text-xs font-semibold">Drink alcohol?</span>
              <div className="flex items-center gap-3 text-xs">
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="intake-drink"
                    value="yes"
                    checked={details.drinkAlcohol === "yes"}
                    onChange={() => onChange("drinkAlcohol", "yes")}
                    className="accent-brand"
                  />
                  Yes
                </label>
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="intake-drink"
                    value="no"
                    checked={details.drinkAlcohol === "no"}
                    onChange={() => onChange("drinkAlcohol", "no")}
                    className="accent-brand"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="rounded-xl border border-border p-3 flex items-center justify-between bg-muted/20">
              <span className="text-xs font-semibold">Take drugs?</span>
              <div className="flex items-center gap-3 text-xs">
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="intake-drugs"
                    value="yes"
                    checked={details.takeDrugs === "yes"}
                    onChange={() => onChange("takeDrugs", "yes")}
                    className="accent-brand"
                  />
                  Yes
                </label>
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="intake-drugs"
                    value="no"
                    checked={details.takeDrugs === "no"}
                    onChange={() => onChange("takeDrugs", "no")}
                    className="accent-brand"
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div>
            <Label
              htmlFor="intake-additionalnotes"
              className="text-xs font-semibold mb-1 block"
            >
              Is there anything else we should know?
            </Label>
            <Textarea
              id="intake-additionalnotes"
              rows={2}
              placeholder="Any additional medical conditions, allergies, or context for your practitioner..."
              value={details.additionalNotes}
              onChange={(e) => onChange("additionalNotes", e.target.value)}
              className="rounded-xl text-xs"
            />
          </div>
        </div>

        {/* Section 5: Confirmation & Digital Signature */}
        <div className="space-y-5 pt-2 border-t border-border/80">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded-full bg-brand text-brand-foreground text-[0.65rem] font-bold">
              5
            </span>
            Confirmation &amp; Digital Signature
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="intake-printname" className="text-xs font-semibold mb-1 block">
                Print Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="intake-printname"
                type="text"
                placeholder="Full Name as Signature"
                value={details.printName || details.name}
                onChange={(e) => onChange("printName", e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="intake-date" className="text-xs font-semibold mb-1 block">
                Date
              </Label>
              <Input
                id="intake-date"
                type="date"
                readOnly
                value={details.date}
                className="h-10 py-0 w-auto rounded-xl bg-muted/40 text-muted-foreground"
              />
            </div>
          </div>

          <SignaturePad
            defaultName={details.printName || details.name}
            onSignatureChange={onSignatureChange}
          />

          {/* Cancellation Policy Box */}
          <div className="rounded-2xl border border-amber-300/80 bg-amber-50/80 p-4.5 text-xs dark:border-amber-900/50 dark:bg-amber-950/20">
            <h4 className="font-bold text-amber-950 dark:text-amber-300 uppercase tracking-wider text-xs">
              Cancellation Policy Notice
            </h4>
            <p className="mt-1 text-amber-900/90 dark:text-amber-400 leading-relaxed">
              A fee for $50 will be charged if we are not provided 24 hour notice or if you
              fail to attend an appointment.
            </p>
            <label className="mt-3 flex items-start gap-2.5 cursor-pointer font-medium text-foreground select-none">
              <input
                type="checkbox"
                required
                checked={details.cancellationAgreed}
                onChange={(e) => onChange("cancellationAgreed", e.target.checked)}
                className="size-4 mt-0.5 rounded border-amber-400 text-brand focus:ring-brand accent-brand cursor-pointer"
              />
              <span>
                I have read, understood and agree to the Feeling Healthy Tweed Heads
                Cancellation Policy. <span className="text-destructive">*</span>
              </span>
            </label>
          </div>

          {/* Validation helper status bar */}
          <div className="rounded-xl border border-border/80 bg-sand/30 p-3 text-xs">
            <span className="font-semibold text-foreground">Required to proceed:</span>
            <div className="flex flex-wrap items-center gap-x-3 mt-2 gap-y-1 text-muted-foreground">
              <span
                className={cn(
                  "inline-flex items-center gap-1",
                  details.name.trim()
                    ? "text-emerald-700 dark:text-emerald-400 font-medium"
                    : "text-destructive",
                )}
              >
                {details.name.trim() ? "✓ Name" : "• Full Name"}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1",
                  /.+@.+\..+/.test(details.email)
                    ? "text-emerald-700 dark:text-emerald-400 font-medium"
                    : "text-destructive",
                )}
              >
                {/.+@.+\..+/.test(details.email) ? "✓ Email" : "• Valid Email"}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1",
                  details.phone.trim().length > 5
                    ? "text-emerald-700 dark:text-emerald-400 font-medium"
                    : "text-destructive",
                )}
              >
                {details.phone.trim().length > 5 ? "✓ Phone" : "• Phone Number"}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1",
                  isSignatureValid
                    ? "text-emerald-700 dark:text-emerald-400 font-medium"
                    : "text-destructive",
                )}
              >
                {isSignatureValid ? "✓ Signature" : "• Signature"}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1",
                  details.cancellationAgreed
                    ? "text-emerald-700 dark:text-emerald-400 font-medium"
                    : "text-destructive",
                )}
              >
                {details.cancellationAgreed
                  ? "✓ Cancellation Policy Agreed"
                  : "• Policy Agreement"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </StepShell>
  );
}
