"use client";

import React, { useState, useRef } from "react";
import { format } from "date-fns";
import { Check, Printer, Send, AlertCircle, FileText, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { SignaturePad } from "@/components/site/SignaturePad";
import { site } from "@/data/site";
import {
  INTAKE_SYMPTOMS_GROUP_1,
  INTAKE_SYMPTOMS_GROUP_2,
  INTAKE_SYMPTOMS_GROUP_3,
  type IntakeFormData,
} from "@/data/intake-form";

export function ClientIntakeForm() {
  const printRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const [formData, setFormData] = useState<IntakeFormData>({
    date: format(new Date(), "yyyy-MM-dd"),
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

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof IntakeFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSymptomToggle = (symptomId: string, type: "past" | "present") => {
    setFormData((prev) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter your Full Name.");
      return;
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      toast.error("Please provide at least a Phone Number or Email address.");
      return;
    }
    if (!formData.cancellationAgreed) {
      toast.error("Please acknowledge the Cancellation Policy to proceed.");
      return;
    }
    if (formData.signatureType === "draw" && !formData.signatureDataUrl) {
      toast.error("Please provide your digital signature.");
      return;
    }
    if (formData.signatureType === "type" && !formData.typedSignature.trim()) {
      toast.error("Please type your name as digital signature.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Initial Health Intake Form submitted successfully!");
    }, 800);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-lift text-center print:border-none print:shadow-none">
        <div ref={printRef} className="p-4">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            <Check className="size-8" />
          </div>
          <h2 className="text-2xl font-bold">Intake Form Submitted Successfully!</h2>
          <p className="mt-2 text-muted-foreground">
            Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. Your health history and intake details have been recorded. Our reception team at Feeling Healthy will review your form prior to your appointment.
          </p>

          <div className="my-6 rounded-xl border border-border bg-muted/40 p-4 text-left text-sm space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-muted-foreground">Name:</span> {formData.name}</div>
              <div><span className="text-muted-foreground">Date:</span> {formData.date}</div>
              <div><span className="text-muted-foreground">Phone:</span> {formData.phone || "N/A"}</div>
              <div><span className="text-muted-foreground">Email:</span> {formData.email || "N/A"}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
          <Button onClick={() => handlePrint()} variant="outline" className="gap-2">
            <Printer className="size-4" /> Print / Save Copy (PDF)
          </Button>
          <Button
            onClick={() => setSubmitted(false)}
            variant="ghost"
            className="text-xs text-muted-foreground"
          >
            Edit Form Responses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-8">
      {/* Paper Header styled matching Image 1 */}
      <div ref={printRef} className="rounded-2xl border border-border bg-white p-6 md:p-10 shadow-soft dark:bg-zinc-900 print:shadow-none print:border-none print:p-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="" className="inline-flex sm:size-15 size-12 items-center justify-center font-bold text-ink text-sm shadow-xs" />

              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                Client Health History & Intake Form
              </h1>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {site.name} • {site.contact.address} • {site.contact.phone}
            </p>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Date:</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
        </div>

        {/* Section 1: Patient Details */}
        <div className="mt-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-1">
            1. Personal Details
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1">
                Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">DOB (Date of Birth)</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange("dob", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Occupation</label>
              <input
                type="text"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={(e) => handleInputChange("occupation", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1">Address</label>
              <input
                type="text"
                placeholder="Street Address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Suburb</label>
              <input
                type="text"
                placeholder="Suburb"
                value={formData.suburb}
                onChange={(e) => handleInputChange("suburb", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Post Code</label>
              <input
                type="text"
                placeholder="Post Code"
                value={formData.postCode}
                onChange={(e) => handleInputChange("postCode", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Best Contact Phone #</label>
              <input
                type="tel"
                placeholder="(04xx xxx xxx)"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold mb-1">How did you hear about us?</label>
              <input
                type="text"
                placeholder="Google, Social Media, Friend / Referral, etc."
                value={formData.howHeard}
                onChange={(e) => handleInputChange("howHeard", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Main Health Concerns */}
        <div className="mt-8 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-1">
            2. Primary Health Concerns
          </h2>
          <div>
            <label className="block text-xs font-semibold mb-1.5">
              What are your main concerns in regards to your health? What do you hope to achieve through consulting us?
            </label>
            <textarea
              rows={3}
              placeholder="Describe your current symptoms, health goals, or specific reasons for your visit..."
              value={formData.healthConcerns}
              onChange={(e) => handleInputChange("healthConcerns", e.target.value)}
              className="w-full rounded-md border border-input bg-background p-3 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
        </div>

        {/* Section 3: Symptom Matrix Table */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              3. Symptom Checklist
            </h2>
            <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
              Do you have or have you had any of the following? (Tick Past or Present)
            </span>
          </div>

          {/* Responsive 3-Column Grid Table */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <div className="min-w-[700px] grid grid-cols-3 divide-x divide-border bg-muted/30 text-xs font-bold uppercase tracking-wider text-foreground py-2 px-1 text-center">
              <div className="grid grid-cols-[1fr_45px_45px] items-center px-2">
                <span className="text-left">Symptom</span>
                <span>Past</span>
                <span>Present</span>
              </div>
              <div className="grid grid-cols-[1fr_45px_45px] items-center px-2">
                <span className="text-left">Symptom</span>
                <span>Past</span>
                <span>Present</span>
              </div>
              <div className="grid grid-cols-[1fr_45px_45px] items-center px-2">
                <span className="text-left">Symptom</span>
                <span>Past</span>
                <span>Present</span>
              </div>
            </div>

            <div className="min-w-[700px] grid grid-cols-3 divide-x divide-border bg-card text-xs">
              {/* Column 1 */}
              <div className="divide-y divide-border/60">
                {INTAKE_SYMPTOMS_GROUP_1.map((item) => {
                  const state = formData.symptomState[item.id] || { past: false, present: false };
                  return (
                    <div key={item.id} className="grid grid-cols-[1fr_45px_45px] items-center p-2 hover:bg-muted/40 transition-colors">
                      <span className="text-foreground font-medium">{item.name}</span>
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={state.past}
                          onChange={() => handleSymptomToggle(item.id, "past")}
                          className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer"
                        />
                      </div>
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={state.present}
                          onChange={() => handleSymptomToggle(item.id, "present")}
                          className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column 2 */}
              <div className="divide-y divide-border/60">
                {INTAKE_SYMPTOMS_GROUP_2.map((item) => {
                  const state = formData.symptomState[item.id] || { past: false, present: false };
                  return (
                    <div key={item.id} className="grid grid-cols-[1fr_45px_45px] items-center p-2 hover:bg-muted/40 transition-colors">
                      <span className="text-foreground font-medium">{item.name}</span>
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={state.past}
                          onChange={() => handleSymptomToggle(item.id, "past")}
                          className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer"
                        />
                      </div>
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={state.present}
                          onChange={() => handleSymptomToggle(item.id, "present")}
                          className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column 3 */}
              <div className="divide-y divide-border/60">
                {INTAKE_SYMPTOMS_GROUP_3.map((item) => {
                  const state = formData.symptomState[item.id] || { past: false, present: false };
                  return (
                    <div key={item.id} className="grid grid-cols-[1fr_45px_45px] items-center p-2 hover:bg-muted/40 transition-colors">
                      <span className="text-foreground font-medium">{item.name}</span>
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={state.past}
                          onChange={() => handleSymptomToggle(item.id, "past")}
                          className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer"
                        />
                      </div>
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={state.present}
                          onChange={() => handleSymptomToggle(item.id, "present")}
                          className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer"
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
        <div className="mt-8 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-1">
            4. Medical History & Lifestyle
          </h2>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Have you ever had any accidents, strains, fractures, concussions, etc.?
            </label>
            <input
              type="text"
              placeholder="Describe any past major injuries or accidents..."
              value={formData.accidentsHistory}
              onChange={(e) => handleInputChange("accidentsHistory", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <div className="rounded-lg border border-border p-4 bg-muted/20 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-semibold text-foreground">
                Are you undertaking any medication, natural remedies/supplements?
              </span>
              <div className="flex items-center gap-4 text-xs font-medium">
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="meds"
                    value="yes"
                    checked={formData.takingMedications === "yes"}
                    onChange={() => handleInputChange("takingMedications", "yes")}
                    className="text-brand focus:ring-brand"
                  />
                  Yes
                </label>
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="meds"
                    value="no"
                    checked={formData.takingMedications === "no"}
                    onChange={() => handleInputChange("takingMedications", "no")}
                    className="text-brand focus:ring-brand"
                  />
                  No
                </label>
              </div>
            </div>

            {formData.takingMedications === "yes" && (
              <div className="pt-2 border-t border-border/60">
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  If yes, please describe:
                </label>
                <textarea
                  rows={2}
                  placeholder="List current prescription medications, vitamins, herbs or supplements..."
                  value={formData.medicationsDetails}
                  onChange={(e) => handleInputChange("medicationsDetails", e.target.value)}
                  className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border p-3 flex items-center justify-between bg-muted/20">
              <span className="text-xs font-semibold">Do you smoke?</span>
              <div className="flex items-center gap-3 text-xs">
                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="smoke"
                    value="yes"
                    checked={formData.smoke === "yes"}
                    onChange={() => handleInputChange("smoke", "yes")}
                  />
                  Yes
                </label>
                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="smoke"
                    value="no"
                    checked={formData.smoke === "no"}
                    onChange={() => handleInputChange("smoke", "no")}
                  />
                  No
                </label>
              </div>
            </div>

            <div className="rounded-lg border border-border p-3 flex items-center justify-between bg-muted/20">
              <span className="text-xs font-semibold">Do you drink alcohol?</span>
              <div className="flex items-center gap-3 text-xs">
                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="drink"
                    value="yes"
                    checked={formData.drinkAlcohol === "yes"}
                    onChange={() => handleInputChange("drinkAlcohol", "yes")}
                  />
                  Yes
                </label>
                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="drink"
                    value="no"
                    checked={formData.drinkAlcohol === "no"}
                    onChange={() => handleInputChange("drinkAlcohol", "no")}
                  />
                  No
                </label>
              </div>
            </div>

            <div className="rounded-lg border border-border p-3 flex items-center justify-between bg-muted/20">
              <span className="text-xs font-semibold">Do you take drugs?</span>
              <div className="flex items-center gap-3 text-xs">
                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="drugs"
                    value="yes"
                    checked={formData.takeDrugs === "yes"}
                    onChange={() => handleInputChange("takeDrugs", "yes")}
                  />
                  Yes
                </label>
                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="drugs"
                    value="no"
                    checked={formData.takeDrugs === "no"}
                    onChange={() => handleInputChange("takeDrugs", "no")}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Is there anything else we should know?</label>
            <textarea
              rows={2}
              placeholder="Any additional medical conditions, allergies, or context for your practitioner..."
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
              className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
        </div>

        {/* Section 5: Signature & Policy */}
        <div className="mt-8 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-1">
            5. Confirmation & Digital Signature
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold mb-1">
                Print Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Full Name as Signature"
                value={formData.printName || formData.name}
                onChange={(e) => handleInputChange("printName", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Date</label>
              <input
                type="date"
                readOnly
                value={formData.date}
                className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground"
              />
            </div>
          </div>

          <SignaturePad
            defaultName={formData.printName || formData.name}
            onSignatureChange={(dataUrl, type, typedName) => {
              setFormData((prev) => ({
                ...prev,
                signatureDataUrl: dataUrl,
                signatureType: type,
                typedSignature: typedName,
              }));
            }}
          />

          {/* Cancellation Policy Box matching Image 1 */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs dark:border-amber-900/50 dark:bg-amber-950/20">
            <h3 className="font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
              Cancellation Policy
            </h3>
            <p className="mt-1 text-amber-800 dark:text-amber-400 leading-relaxed">
              A fee for $50 will be charged if we are not provided 24 hour notice or if you fail to attend an appointment.
            </p>
            <label className="mt-3 flex items-start gap-2 cursor-pointer font-medium text-foreground">
              <input
                type="checkbox"
                required
                checked={formData.cancellationAgreed}
                onChange={(e) => handleInputChange("cancellationAgreed", e.target.checked)}
                className="mt-0.5 size-4 rounded border-amber-400 text-brand focus:ring-brand"
              />
              <span>I understand and agree to the Feeling Healthy cancellation policy.</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 print:hidden">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrint}
            className="gap-2"
          >
            <Printer className="size-4" /> Print / Save as PDF
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="gap-2 bg-brand text-ink hover:bg-brand/90 font-bold px-6 py-2.5 shadow-soft"
          >
            {isSubmitting ? (
              "Submitting Intake Form..."
            ) : (
              <>
                <Send className="size-4" /> Submit Client Intake Form
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
