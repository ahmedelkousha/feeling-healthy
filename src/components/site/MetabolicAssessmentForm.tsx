"use client";

import React, { useState, useMemo, useRef } from "react";
import { Star, Check, Printer, Send, Sparkles, Activity, Info, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { METABOLIC_CATEGORIES, type AssessmentUserDetails } from "@/data/metabolic-assessment";

export function MetabolicAssessmentForm() {
  const printRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, boolean>>({});
  const [userDetails, setUserDetails] = useState<AssessmentUserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    practitionerNotes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute live score stats
  const { totalChecked, starredChecked, categoryBreakdown } = useMemo(() => {
    let total = 0;
    let starred = 0;
    const breakdown: Record<number, { title: string; checked: number; starredChecked: number }> =
      {};

    METABOLIC_CATEGORIES.forEach((cat) => {
      let catChecked = 0;
      let catStarredChecked = 0;

      cat.symptoms.forEach((symptom) => {
        if (selectedSymptoms[symptom.id]) {
          total++;
          catChecked++;
          if (symptom.isStarred) {
            starred++;
            catStarredChecked++;
          }
        }
      });

      breakdown[cat.id] = {
        title: cat.title,
        checked: catChecked,
        starredChecked: catStarredChecked,
      };
    });

    return { totalChecked: total, starredChecked: starred, categoryBreakdown: breakdown };
  }, [selectedSymptoms]);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms((prev) => ({
      ...prev,
      [symptomId]: !prev[symptomId],
    }));
  };

  const handleInputChange = (field: keyof AssessmentUserDetails, value: string) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userDetails.firstName.trim() || !userDetails.lastName.trim()) {
      toast.error("Please enter your First Name and Last Name.");
      return;
    }
    if (!userDetails.email.trim()) {
      toast.error("Please enter your Email address.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Metabolic Health Assessment submitted successfully!");
    }, 800);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-200 bg-white p-8 shadow-lift dark:bg-zinc-900 dark:border-emerald-900 print:shadow-none print:border-none">
        <div ref={printRef} className="p-4">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <Check className="size-8" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Metabolic Assessment Complete!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you,{" "}
            <span className="font-semibold text-foreground">
              {userDetails.firstName} {userDetails.lastName}
            </span>
            . Your metabolic health symptoms and pattern summary have been recorded.
          </p>

          {/* Metabolic Assessment Result Summary Card */}
          <div className="my-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/40 p-6 text-left dark:from-zinc-900 dark:to-zinc-800/80 dark:border-amber-900/50">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-4 dark:border-zinc-700">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  Pattern Recognition Results
                </span>
                <h3 className="text-lg font-bold text-foreground">Symptom Overview</h3>
              </div>
              <div className="flex gap-3 text-center">
                <div className="rounded-xl bg-white px-3 py-2 shadow-xs dark:bg-zinc-800">
                  <span className="block text-2xl font-black text-emerald-700 dark:text-emerald-400">
                    {totalChecked}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">
                    Total Symptoms
                  </span>
                </div>
                <div className="rounded-xl bg-amber-100 px-3 py-2 shadow-xs dark:bg-amber-950">
                  <span className="block text-2xl font-black text-amber-700 dark:text-amber-400 flex items-center justify-center gap-0.5">
                    <Star className="size-4 fill-amber-500 text-amber-500 inline" />{" "}
                    {starredChecked}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-amber-900 dark:text-amber-300">
                    Starred (★)
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              {starredChecked >= 3 ? (
                <span className="font-medium text-amber-900 dark:text-amber-300">
                  ★ You have identified {starredChecked} key metabolic indicators. Symptoms across
                  these systems suggest a strong metabolic pattern connection. We recommend
                  reviewing these results with Rosanna Mosca or Edmore Mahleka during your
                  consultation.
                </span>
              ) : (
                <span>
                  You have recorded {totalChecked} total symptom indicators. Sharing these results
                  with your practitioner helps tailor your personalized holistic wellbeing plan.
                </span>
              )}
            </p>

            <div className="mt-4 border-t border-amber-200/50 pt-4 dark:border-zinc-700">
              <h4 className="text-xs font-bold text-foreground uppercase mb-2">
                Category Summary:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {METABOLIC_CATEGORIES.map((cat) => {
                  const stat = categoryBreakdown[cat.id];
                  if (!stat || stat.checked === 0) return null;
                  return (
                    <div
                      key={cat.id}
                      className="flex justify-between items-center bg-white/70 dark:bg-zinc-800/70 p-2 rounded-md"
                    >
                      <span className="truncate pr-2 font-medium">{cat.title}</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                        {stat.checked} {stat.starredChecked > 0 ? `(★ ${stat.starredChecked})` : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
          <Button onClick={() => handlePrint()} variant="outline" className="gap-2">
            <Printer className="size-4" /> Print / Save Assessment PDF
          </Button>
          <Button asChild className="gap-2 bg-brand text-ink hover:bg-brand/90 font-bold">
            <Link href="/book">
              <BookOpen className="size-4" /> Book Practitioner Consultation
            </Link>
          </Button>
          <Button
            onClick={() => setSubmitted(false)}
            variant="ghost"
            className="text-xs text-muted-foreground block w-full mt-2"
          >
            Review / Modify Assessment Answers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-8">
      <div ref={printRef} className="space-y-8">
        {/* Sticky / Top Floating Live Counter Header */}
        {/* <div className="sticky top-26 z-30 rounded-2xl border border-border/80 bg-white/95 backdrop-blur-md p-4 shadow-soft dark:bg-zinc-900/95 print:hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <Activity className="size-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Live Progress</span>
              <h3 className="text-sm font-bold text-foreground">Metabolic Symptom Tracker</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>Total Selected:</span>
              <span className="font-bold">{totalChecked}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
              <Star className="size-3.5 fill-amber-500 text-amber-500" />
              <span>Starred (★):</span>
              <span className="font-bold">{starredChecked}</span>
            </div>
          </div>
        </div>
      </div> */}

        {/* Styled Cover Header matching Reference Image 2 */}
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/60 via-white to-amber-50/30 p-4 md:p-12 text-center shadow-soft">
          <div className="mx-auto max-w-2xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-emerald-950">
              Metabolic Health Assessment
            </h1>
            <p className="script-accent text-xl md:text-2xl text-emerald-800 italic">
              Could your symptoms be connected?
            </p>

            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground max-w-xl mx-auto pt-2">
              Many people experience symptoms that seem completely unrelated. Fatigue, weight gain,
              poor sleep, brain fog, digestive issues, hormone changes and more are often treated as
              separate problems.
            </p>

            <div className="my-4 rounded-lg border border-emerald-200/80 bg-white/80 p-4 text-xs sm:text-sm font-medium text-emerald-900 shadow-xs">
              <strong className="block text-emerald-950 mb-1 font-bold">
                But what if they were all connected?
              </strong>
              This assessment is designed to help identify patterns that may point to an underlying
              metabolic imbalance. It is not intended to diagnose disease, but it can provide
              valuable clues that may help explain why seemingly unrelated symptoms often occur
              together.
            </div>

            <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-300/60 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800">
              <Check className="size-4" /> Simply tick every symptom that applies to you.
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-4 text-xs text-left">
              <div className="flex items-start gap-2.5">
                <Star className="size-4 fill-amber-500 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-amber-900 uppercase tracking-wider block mb-0.5">
                    WHAT DO THE STARS MEAN?
                  </strong>
                  <p className="text-amber-800 leading-relaxed">
                    Symptoms marked with a gold star (★) are often stronger indicators of an
                    underlying metabolic imbalance.
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="inline-flex items-center rounded-full bg-emerald-100/80 px-4 py-1.5 text-xs font-semibold text-emerald-800 tracking-wider">
            Awareness • Pattern Recognition • Empowerment
          </div> */}
          </div>
        </div>

        {/* 10 Assessment Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {METABOLIC_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className={`flex flex-col rounded-2xl border ${category.colorTheme.border} bg-white shadow-soft transition-all hover:shadow-lift dark:bg-zinc-900`}
            >
              {/* Category Header */}
              <div
                className={`flex items-center justify-between rounded-t-2xl px-5 py-3.5 ${category.colorTheme.headerBg}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-white/20 text-xs font-extrabold">
                    {category.numberLabel}
                  </span>
                  <h2 className="text-xs font-bold uppercase tracking-wider">{category.title}</h2>
                </div>
                <span className="text-[11px] opacity-80 font-medium">
                  {category.symptoms.filter((s) => selectedSymptoms[s.id]).length} /{" "}
                  {category.symptoms.length}
                </span>
              </div>

              {/* Symptom Checklist Items */}
              <div className="flex-1 space-y-2 p-5 text-xs">
                {category.symptoms.map((symptom) => {
                  const isChecked = Boolean(selectedSymptoms[symptom.id]);
                  return (
                    <label
                      key={symptom.id}
                      className={`flex items-start gap-3 rounded-lg border p-2.5 transition-all cursor-pointer ${
                        isChecked
                          ? "border-emerald-400 bg-emerald-50/50"
                          : "border-transparent hover:border-border hover:bg-muted/30"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSymptomToggle(symptom.id)}
                        className="mt-0.5 size-4 rounded border-input text-brand focus:ring-brand cursor-pointer shrink-0"
                      />
                      <div className="flex-1 leading-snug">
                        <span className="text-foreground font-medium flex items-center gap-1.5">
                          {symptom.isStarred && (
                            <Star className="size-3.5 fill-amber-400 text-amber-500 shrink-0 inline-block" />
                          )}
                          <span>{symptom.label}</span>
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Informational Callouts matching Page 3 & Page 4 of reference image */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-emerald-50/40 p-4 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold uppercase tracking-wider mb-2">
              <Info className="size-4" /> Remember
            </div>
            <p className="text-muted-foreground leading-relaxed">
              You don't have to tick everything. Even a few symptoms can provide valuable clues when
              we look at the bigger picture.
            </p>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold uppercase tracking-wider mb-2">
              <Star className="size-4 fill-amber-500 text-amber-500" /> Why Some Symptoms Are Marked
              With A Star
            </div>
            <p className="text-amber-900/80 leading-relaxed">
              Symptoms marked with a gold star (★) are often stronger indicators of underlying
              metabolic imbalance. If you've experienced 3 or more — especially ★ symptoms — there
              may be a clear metabolic pattern connecting them.
            </p>
          </div>
        </div>

        {/* Patient Details & Practitioner Notes Section matching Page 4 */}
        <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-soft dark:bg-zinc-900">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-6">
            Your Details & Practitioner Notes
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold mb-1">
                First Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="First Name"
                value={userDetails.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">
                Last Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Last Name"
                value={userDetails.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">
                Email Address <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={userDetails.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Phone Number (optional)</label>
              <input
                type="tel"
                placeholder="(04xx xxx xxx)"
                value={userDetails.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1">
                PRACTITIONER NOTES (optional)
              </label>
              <textarea
                rows={3}
                placeholder="Any comments, additional context, or questions for your practitioner..."
                value={userDetails.practitionerNotes}
                onChange={(e) => handleInputChange("practitionerNotes", e.target.value)}
                className="w-full rounded-md border border-input bg-background p-3 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
          </div>

          {/* What Happens Next Card matching Page 4 */}
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 text-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              What Happens Next?
            </h3>
            <p className="mt-1 text-xs text-emerald-800 max-w-xl mx-auto leading-relaxed">
              Once you've completed this assessment, please submit your details for a personalised
              review and guidance on your next steps towards better metabolic health. You don't have
              to do this alone.
            </p>
            {/* <div className="mt-3 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
            Awareness • Pattern Recognition • Empowerment
          </div> */}
          </div>

          {/* Action Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 print:hidden">
            <Button
              type="button"
              variant="outline"
              onClick={() => handlePrint()}
              className="gap-2 w-full sm:w-fit"
            >
              <Printer className="size-4" /> Print / Save as PDF
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 bg-brand text-ink hover:bg-brand/90 font-bold px-6 py-2.5 shadow-soft w-full sm:w-fit"
            >
              {isSubmitting ? (
                "Analyzing Symptoms..."
              ) : (
                <>
                  <Send className="size-4" /> Submit Metabolic Assessment
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
