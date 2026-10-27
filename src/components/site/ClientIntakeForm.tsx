"use client";

import React, { useState, useRef } from "react";
import { format } from "date-fns";
import { Check, Printer, Send, AlertCircle, FileText, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
      <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card px-1 py-6 shadow-lift text-center print:border-none print:shadow-none">
        <div ref={printRef} className="p-4">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check className="size-8" />
          </div>
          <h2 className="text-xl font-bold">Intake Form Submitted Successfully!</h2>
          <p className="mt-2 text-muted-foreground text-xs sm:text-sm">
            Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. Your health history and intake details have been recorded. Our reception team at Feeling Healthy will review your form prior to your appointment.
          </p>

          <div className="my-6 rounded-lg border border-border bg-muted/40 p-4 text-left text-sm space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 text-xs sm:text-sm gap-2">
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
      <div ref={printRef} className="rounded-2xl border border-border bg-white p-4 md:p-6 shadow-soft print:shadow-none print:border-none print:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="" className="inline-flex sm:size-15 size-12 items-center justify-center font-bold text-ink text-sm shadow-xs" />

              <h1 className="text-lg md:text-2xl font-bold tracking-tight text-foreground">
                Client Health History & Intake Form
              </h1>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {site.name} <br /> {site.contact.address}, {site.contact.phone}
            </p>
           
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
             
            <Label htmlFor="intake-date" className="text-xs font-medium text-muted-foreground whitespace-nowrap">Date:</Label>
            <Input
              id="intake-date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="w-auto h-8 px-2 py-0 text-xs"
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
              <Label htmlFor="intake-name" className="block text-xs font-semibold mb-1">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="intake-name"
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="intake-dob" className="block text-xs font-semibold mb-1">DOB (Date of Birth)</Label>
              <Input
                id="intake-dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange("dob", e.target.value)}
                className="w-auto py-0"
              />
            </div>
            <div>
              <Label htmlFor="intake-occupation" className="block text-xs font-semibold mb-1">Occupation</Label>
              <Input
                id="intake-occupation"
                type="text"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={(e) => handleInputChange("occupation", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="intake-address" className="block text-xs font-semibold mb-1">Address</Label>
              <Input
                id="intake-address"
                type="text"
                placeholder="Street Address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="intake-suburb" className="block text-xs font-semibold mb-1">Suburb</Label>
              <Input
                id="intake-suburb"
                type="text"
                placeholder="Suburb"
                value={formData.suburb}
                onChange={(e) => handleInputChange("suburb", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="intake-postcode" className="block text-xs font-semibold mb-1">Post Code</Label>
              <Input
                id="intake-postcode"
                type="text"
                placeholder="Post Code"
                value={formData.postCode}
                onChange={(e) => handleInputChange("postCode", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="intake-phone" className="block text-xs font-semibold mb-1">Best Contact Phone #</Label>
              <Input
                id="intake-phone"
                type="tel"
                placeholder="(04xx xxx xxx)"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="intake-email" className="block text-xs font-semibold mb-1">Email</Label>
              <Input
                id="intake-email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="intake-howheard" className="block text-xs font-semibold mb-1">How did you hear about us?</Label>
              <Input
                id="intake-howheard"
                type="text"
                placeholder="Google, Social Media, Friend / Referral, etc."
                value={formData.howHeard}
                onChange={(e) => handleInputChange("howHeard", e.target.value)}
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
            <Label htmlFor="intake-health-concerns" className="block text-xs font-semibold mb-1.5">
              What are your main concerns in regards to your health? What do you hope to achieve through consulting us?
            </Label>
            <Textarea
              id="intake-health-concerns"
              rows={3}
              placeholder="Describe your current symptoms, health goals, or specific reasons for your visit..."
              value={formData.healthConcerns}
              onChange={(e) => handleInputChange("healthConcerns", e.target.value)}
            />
          </div>
        </div>

        {/* Section 3: Symptom Matrix Table */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              3. Symptom Checklist
            </h2>
            <span className="text-xs font-medium text-amber-700">
              Do you have or have you had any of the following? (Tick Past or Present)
            </span>
          </div>

          {/* Responsive 3-Column HTML Table */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[700px] border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-foreground">
                  <th className="py-2.5 px-2 text-left">Symptom</th>
                  <th className="py-2.5 px-2 text-center w-12">Past</th>
                  <th className="py-2.5 px-2 text-center w-12 border-r border-border">Present</th>

                  <th className="py-2.5 px-2 text-left">Symptom</th>
                  <th className="py-2.5 px-2 text-center w-12">Past</th>
                  <th className="py-2.5 px-2 text-center w-12 border-r border-border">Present</th>

                  <th className="py-2.5 px-2 text-left">Symptom</th>
                  <th className="py-2.5 px-2 text-center w-12">Past</th>
                  <th className="py-2.5 px-2 text-center w-12">Present</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                {Array.from({
                  length: Math.max(
                    INTAKE_SYMPTOMS_GROUP_1.length,
                    INTAKE_SYMPTOMS_GROUP_2.length,
                    INTAKE_SYMPTOMS_GROUP_3.length,
                  ),
                }).map((_, i) => {
                  const item1 = INTAKE_SYMPTOMS_GROUP_1[i];
                  const item2 = INTAKE_SYMPTOMS_GROUP_2[i];
                  const item3 = INTAKE_SYMPTOMS_GROUP_3[i];

                  const state1 = item1
                    ? formData.symptomState[item1.id] || { past: false, present: false }
                    : null;
                  const state2 = item2
                    ? formData.symptomState[item2.id] || { past: false, present: false }
                    : null;
                  const state3 = item3
                    ? formData.symptomState[item3.id] || { past: false, present: false }
                    : null;

                  return (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      {/* Column 1 */}
                      {item1 ? (
                        <>
                          <td className="py-1.5 px-2 font-medium text-foreground">{item1.name}</td>
                          <td className="py-1.5 px-2 text-center">
                            <input
                              type="checkbox"
                              checked={state1?.past || false}
                              onChange={() => handleSymptomToggle(item1.id, "past")}
                              className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer"
                            />
                          </td>
                          <td className="py-2 px-2 text-center border-r border-border">
                            <input
                              type="checkbox"
                              checked={state1?.present || false}
                              onChange={() => handleSymptomToggle(item1.id, "present")}
                              className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer"
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-1.5 px-3"></td>
                          <td className="py-1.5 px-2"></td>
                          <td className="py-1.5 px-2 border-r border-border"></td>
                        </>
                      )}

                      {/* Column 2 */}
                      {item2 ? (
                        <>
                          <td className="py-2 px-3 font-medium text-foreground">{item2.name}</td>
                          <td className="py-2 px-2 text-center">
                            <input
                              type="checkbox"
                              checked={state2?.past || false}
                              onChange={() => handleSymptomToggle(item2.id, "past")}
                              className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer"
                            />
                          </td>
                          <td className="py-2 px-2 text-center border-r border-border">
                            <input
                              type="checkbox"
                              checked={state2?.present || false}
                              onChange={() => handleSymptomToggle(item2.id, "present")}
                              className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer"
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-2 px-3"></td>
                          <td className="py-2 px-2"></td>
                          <td className="py-2 px-2 border-r border-border"></td>
                        </>
                      )}

                      {/* Column 3 */}
                      {item3 ? (
                        <>
                          <td className="py-2 px-3 font-medium text-foreground">{item3.name}</td>
                          <td className="py-2 px-2 text-center">
                            <input
                              type="checkbox"
                              checked={state3?.past || false}
                              onChange={() => handleSymptomToggle(item3.id, "past")}
                              className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer"
                            />
                          </td>
                          <td className="py-2 px-2 text-center">
                            <input
                              type="checkbox"
                              checked={state3?.present || false}
                              onChange={() => handleSymptomToggle(item3.id, "present")}
                              className="size-4 rounded border-input text-brand focus:ring-brand cursor-pointer"
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-2 px-3"></td>
                          <td className="py-2 px-2"></td>
                          <td className="py-2 px-2"></td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Medical History & Lifestyle */}
        <div className="mt-8 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-1">
            4. Medical History & Lifestyle
          </h2>

          <div>
            <Label htmlFor="intake-accidents" className="block text-xs font-semibold mb-1">
              Have you ever had any accidents, strains, fractures, concussions, etc.?
            </Label>
            <Input
              id="intake-accidents"
              type="text"
              placeholder="Describe any past major injuries or accidents..."
              value={formData.accidentsHistory}
              onChange={(e) => handleInputChange("accidentsHistory", e.target.value)}
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
                <Label htmlFor="intake-medications-details" className="block text-xs font-medium text-muted-foreground mb-1">
                  If yes, please describe:
                </Label>
                <Textarea
                  id="intake-medications-details"
                  rows={2}
                  placeholder="List current prescription medications, vitamins, herbs or supplements..."
                  value={formData.medicationsDetails}
                  onChange={(e) => handleInputChange("medicationsDetails", e.target.value)}
                  className="text-xs"
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
            <Label htmlFor="intake-additional-notes" className="block text-xs font-semibold mb-1">Is there anything else we should know?</Label>
            <Textarea
              id="intake-additional-notes"
              rows={2}
              placeholder="Any additional medical conditions, allergies, or context for your practitioner..."
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
              className="text-xs"
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
              <Label htmlFor="intake-print-name" className="block text-xs font-semibold mb-1">
                Print Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="intake-print-name"
                type="text"
                required
                placeholder="Full Name as Signature"
                value={formData.printName || formData.name}
                onChange={(e) => handleInputChange("printName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="intake-print-date" className="block text-xs font-semibold mb-1">Date</Label>
              <Input
                id="intake-print-date"
                type="date"
                readOnly
                value={formData.date}
                className="bg-muted/50 text-muted-foreground w-auto py-0"
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
          <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-4 text-xs">
            <h3 className="font-bold text-amber-900 uppercase tracking-wider">
              Cancellation Policy
            </h3>
            <p className="mt-1 text-amber-800 leading-relaxed">
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
            className="gap-2 w-full sm:w-fit"
            size='default'
          >
            <Printer className="size-4" /> Print / Save as PDF
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            size='default'
            className="gap-2 bg-brand text-ink hover:bg-brand/90 font-medium px-6 py-2.5 shadow-soft w-full sm:w-fit"
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
