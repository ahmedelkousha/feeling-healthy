"use client";

import { type Practitioner } from "@/data/practitioners";
import { ChoiceButton, StepShell } from "./BookingUI";

interface StepPractitionerProps {
  eligible: Practitioner[];
  practitionerSlug: string | null;
  onSelectPractitioner: (slug: string) => void;
}

export function StepPractitioner({
  eligible,
  practitionerSlug,
  onSelectPractitioner,
}: StepPractitionerProps) {
  return (
    <StepShell
      title="Select a practitioner"
      hint="Choose a specific team member or select 'No preference'."
    >
      <div className="grid gap-2.5 sm:grid-cols-2">
        {eligible.map((p) => (
          <ChoiceButton
            key={p.slug}
            selected={practitionerSlug === p.slug}
            onClick={() => onSelectPractitioner(p.slug)}
            title={p.name}
            subtitle={p.title}
          />
        ))}
        <ChoiceButton
          selected={practitionerSlug === "any"}
          onClick={() => onSelectPractitioner("any")}
          title="No preference"
          subtitle="The clinic will match you with a suitable practitioner."
        />
      </div>
    </StepShell>
  );
}
