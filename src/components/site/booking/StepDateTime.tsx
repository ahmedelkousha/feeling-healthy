"use client";

import { cn } from "@/lib/utils";
import { StepShell } from "./BookingUI";

interface StepDateTimeProps {
  days: Date[];
  date: string | null;
  time: string | null;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  availability?: string[];
}

const defaultAvailability = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

export function StepDateTime({
  days,
  date,
  time,
  onSelectDate,
  onSelectTime,
  availability = defaultAvailability,
}: StepDateTimeProps) {
  return (
    <StepShell title="Select a date & time" hint="Times shown are sample clinic operating hours.">
      <div id="scrollable-schedule" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {days.map((d) => {
          const value = d.toISOString().slice(0, 10);
          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelectDate(value)}
              className={cn(
                "min-w-20 shrink-0 cursor-pointer rounded-lg border px-4 py-3 text-center transition-colors",
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
        {availability.map((slot) => (
          <button
            key={slot}
            type="button"
            disabled={!date}
            onClick={() => onSelectTime(slot)}
            className={cn(
              "h-11 cursor-pointer rounded-md border text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40",
              time === slot
                ? "border-brand bg-brand text-brand-foreground"
                : "border-border hover:border-ink/40",
            )}
          >
            {slot}
          </button>
        ))}
      </div>
    </StepShell>
  );
}
