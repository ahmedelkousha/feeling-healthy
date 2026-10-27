"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Clock, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type Service, type ServiceOption, services } from "@/data/services";
import { cn } from "@/lib/utils";
import { ChoiceButton, StepShell } from "./BookingUI";

const categoryTitles: Record<string, string> = {
  physical: "Physical Health & Massage",
  mind: "Psychotherapy & Counselling",
  nutrition: "Nutrition & Dietetics",
  womens: "Women's Health",
  packages: "Transformation Packages",
  other: "Other Therapies & Services",
};

interface StepServiceSelectProps {
  serviceSlug: string | null;
  optionId: string | null;
  selectedService: Service | undefined;
  selectedOption: ServiceOption | undefined;
  onSelectService: (slug: string) => void;
  onSelectOther: () => void;
  onSelectOption: (optionId: string) => void;
}

export function StepServiceSelect({
  serviceSlug,
  optionId,
  selectedService,
  selectedOption,
  onSelectService,
  onSelectOther,
  onSelectOption,
}: StepServiceSelectProps) {
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");
  const [viewMode, setViewMode] = useState<"dropdown" | "grid">("dropdown");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServiceDropdownOpen(false);
      }
    }
    if (serviceDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [serviceDropdownOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && serviceDropdownOpen) {
        setServiceDropdownOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [serviceDropdownOpen]);

  // Focus search input on open
  useEffect(() => {
    if (serviceDropdownOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setServiceSearch("");
    }
  }, [serviceDropdownOpen]);

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    const q = serviceSearch.trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.short.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (categoryTitles[s.category] && categoryTitles[s.category].toLowerCase().includes(q)),
    );
  }, [serviceSearch]);

  // Group services by category
  const servicesByCategory = useMemo(() => {
    const order = ["physical", "mind", "nutrition", "womens", "packages", "other"];
    const groups: { categoryId: string; title: string; items: typeof services }[] = [];

    for (const cat of order) {
      const items = filteredServices.filter((s) => s.category === cat);
      if (items.length > 0) {
        groups.push({
          categoryId: cat,
          title: categoryTitles[cat] || cat,
          items,
        });
      }
    }

    const restCats = [...new Set(filteredServices.map((s) => s.category))].filter(
      (c) => !order.includes(c),
    );
    for (const cat of restCats) {
      const items = filteredServices.filter((s) => s.category === cat);
      if (items.length > 0) {
        groups.push({
          categoryId: cat,
          title: categoryTitles[cat] || cat,
          items,
        });
      }
    }

    return groups;
  }, [filteredServices]);

  const showOtherService =
    !serviceSearch.trim() ||
    "other service consultation general inquiry wellness non-listed"
      .toLowerCase()
      .includes(serviceSearch.trim().toLowerCase());

  return (
    <StepShell
      title="Select a service & option"
      hint="Choose a service and select your preferred duration or session option."
    >
      {/* View Mode Toggle Header */}
      <div className="xl:flex flex-wrap hidden items-center justify-between gap-2 mb-4">
        <div>
          <Label htmlFor="service-dropdown-trigger" className="text-sm font-semibold text-foreground">
            Select a Service
          </Label>
          <p className="text-xs text-muted-foreground">
            {services.length} therapies available across all wellness disciplines
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs bg-sand/60 p-1 rounded-xl border border-border/60">
          <button
            type="button"
            onClick={() => setViewMode("dropdown")}
            className={cn(
              "px-3 py-1 rounded-lg font-medium transition-all cursor-pointer",
              viewMode === "dropdown"
                ? "bg-brand text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Drop-down Menu
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={cn(
              "px-3 py-1 rounded-lg font-medium transition-all cursor-pointer",
              viewMode === "grid"
                ? "bg-brand text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            All Cards
          </button>
        </div>
      </div>

      {/* Drop-down View */}
      {viewMode === "dropdown" ? (
        <div className="space-y-4">
          <div ref={dropdownRef} className="relative">
            <button
              id="service-dropdown-trigger"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={serviceDropdownOpen}
              onClick={() => setServiceDropdownOpen((prev) => !prev)}
              className={cn(
                "w-full flex items-center justify-between gap-3 text-left rounded-lg border p-4 sm:py-4 sm:px-5 transition-all duration-200 cursor-pointer bg-card hover:border-brand/50",
                serviceDropdownOpen
                  ? "border-brand shadow-soft"
                  : serviceSlug
                    ? "border-brand bg-sand/20"
                    : "border-border hover:bg-sand/20",
              )}
            >
              <div className="flex-1 min-w-0">
                {selectedService ? (
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-sm md:text-base text-foreground">
                        {selectedService.name}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {selectedService.short}
                    </p>
                  </div>
                ) : serviceSlug === "other" ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base md:text-lg text-foreground">
                        Other Service / Consultation
                      </span>
                      <span className="rounded-full bg-sand text-muted-foreground px-2 py-0.5 text-xs font-medium">
                        General
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      General inquiry, wellness consultation, or non-listed service.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <span className="font-medium text-base text-muted-foreground">
                      Choose a therapy or service…
                    </span>
                    <p className="text-xs text-muted-foreground/80">
                      Click to open the service list (Naturopathy, Remedial Massage, Hypnotherapy & more)
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="hidden sm:inline-block text-xs font-medium text-muted-foreground bg-sand/70 px-2.5 py-1 rounded-lg border border-border/50">
                  {serviceDropdownOpen
                    ? "Close list"
                    : serviceSlug
                      ? "Change service"
                      : "Browse list"}
                </span>
                <div
                  className={cn(
                    "grid size-8 place-items-center rounded-xl bg-sand/70 text-foreground transition-transform duration-200",
                    serviceDropdownOpen && "rotate-180 bg-brand text-brand-foreground",
                  )}
                >
                  <ChevronDown className="size-4" />
                </div>
              </div>
            </button>

            {/* Dropdown Menu Panel */}
            {serviceDropdownOpen && (
              <div
                role="listbox"
                className="absolute top-full left-0 right-0 mt-2 z-40 rounded-lg border border-border bg-card shadow-lift overflow-hidden animate-in fade-in zoom-in-95 duration-150"
              >
                {/* Search Bar */}
                <div className="p-3 border-b border-border/70 bg-sand/40">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      placeholder="Search service, e.g. massage, naturopathy, hypnosis…"
                      className="w-full rounded-xl bg-background border border-border pl-9 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                    />
                    {serviceSearch && (
                      <button
                        type="button"
                        onClick={() => setServiceSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-md"
                      >
                        <X className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Services List Scrollable */}
                <div
                  id="scrollable-dropdown"
                  className="max-h-84 overflow-y-auto divide-y divide-border/40 p-2"
                >
                  {servicesByCategory.length === 0 && !showOtherService ? (
                    <div className="py-8 text-center px-4">
                      <p className="text-sm font-medium text-foreground">
                        No services match &ldquo;{serviceSearch}&rdquo;
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Try searching for &quot;massage&quot;, &quot;naturopathy&quot;,
                        &quot;counselling&quot;, etc.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setServiceSearch("")}
                        className="mt-3 text-xs"
                      >
                        Clear search
                      </Button>
                    </div>
                  ) : (
                    <>
                      {servicesByCategory.map((group) => (
                        <div key={group.categoryId} className="py-2 first:pt-0 last:pb-0">
                          <div className="px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center justify-between">
                            <span>{group.title}</span>
                            <span className="text-[0.65rem] font-normal lowercase opacity-70">
                              {group.items.length}{" "}
                              {group.items.length === 1 ? "option" : "options"}
                            </span>
                          </div>
                          <hr className="border-t-brand" />
                          <div className="grid gap-1 mt-1">
                            {group.items.map((s) => {
                              const isSelected = serviceSlug === s.slug;
                              return (
                                <button
                                  key={s.slug}
                                  type="button"
                                  role="option"
                                  aria-selected={isSelected}
                                  onClick={() => {
                                    onSelectService(s.slug);
                                    setServiceDropdownOpen(false);
                                  }}
                                  className={cn(
                                    "w-full text-left rounded-xl p-3 transition-colors flex items-start justify-between gap-3 cursor-pointer group",
                                    isSelected
                                      ? "bg-brand/10 border border-brand/30 text-foreground"
                                      : "hover:bg-sand/60 border border-transparent",
                                  )}
                                >
                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span
                                        className={cn(
                                          "font-medium text-sm",
                                          isSelected
                                            ? "text-foreground"
                                            : "text-foreground group-hover:text-foreground",
                                        )}
                                      >
                                        {s.name}
                                      </span>
                                      {s.priceDisplay && (
                                        <span className="text-[0.7rem] font-medium text-muted-foreground">
                                          • From {s.priceDisplay}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                      {s.short}
                                    </p>
                                  </div>
                                  <div
                                    className={cn(
                                      "size-5 rounded-full border grid place-items-center shrink-0 mt-0.5 transition-colors",
                                      isSelected
                                        ? "border-brand bg-brand text-brand-foreground"
                                        : "border-border/60 opacity-0 group-hover:opacity-100",
                                    )}
                                  >
                                    {isSelected && <Check className="size-3" />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      {/* Other / Consultation Option */}
                      {showOtherService && (
                        <div className="py-2 border-t border-border/60">
                          <div className="px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground/80">
                            General Inquiries & Non-Listed Services
                          </div>
                          <button
                            type="button"
                            role="option"
                            aria-selected={serviceSlug === "other"}
                            onClick={() => {
                              onSelectOther();
                              setServiceDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full text-left rounded-xl p-3 transition-colors flex items-start justify-between gap-3 cursor-pointer group",
                              serviceSlug === "other"
                                ? "bg-brand/10 border border-brand/30 text-foreground"
                                : "hover:bg-sand/60 border border-transparent",
                            )}
                          >
                            <div className="flex-1 min-w-0">
                              <span className="font-medium text-sm text-foreground">
                                Other Service / Consultation
                              </span>
                              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                General inquiry, wellness consultation, or non-listed service.
                              </p>
                            </div>
                            <div
                              className={cn(
                                "size-5 rounded-full border grid place-items-center shrink-0 mt-0.5 transition-colors",
                                serviceSlug === "other"
                                  ? "border-brand bg-brand text-brand-foreground"
                                  : "border-border/60 opacity-0 group-hover:opacity-100",
                              )}
                            >
                              {serviceSlug === "other" && <Check className="size-3" />}
                            </div>
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {!serviceSlug && (
            <div className="rounded-2xl border border-dashed border-border/80 p-6 text-center text-xs text-muted-foreground bg-sand/15">
              Please use the drop-down menu above to select a service to see its session options.
            </div>
          )}
        </div>
      ) : (
        /* Grid View Fallback */
        <div className="grid gap-2.5 sm:grid-cols-2">
          {services.map((s) => (
            <ChoiceButton
              key={s.slug}
              selected={serviceSlug === s.slug}
              onClick={() => onSelectService(s.slug)}
              title={s.name}
              subtitle={s.short}
            />
          ))}
          <ChoiceButton
            selected={serviceSlug === "other"}
            onClick={onSelectOther}
            title="Other Service / Consultation"
            subtitle="General inquiry, wellness consultation, or non-listed service."
          />
        </div>
      )}

      {/* Service Options / Variations */}
      {selectedService && selectedService.options.length > 0 && (
        <div className="mt-8 border-t border-border/80 pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="mb-4">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Available Options for {selectedService.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Select your preferred appointment length or session package:
            </p>
          </div>

          <div className="grid gap-3">
            {selectedService.options.map((opt) => {
              const isSelected =
                (selectedOption?.id ?? selectedService.options[0]?.id) === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectOption(opt.id)}
                  className={cn(
                    "group relative flex flex-col text-left rounded-lg border px-4 py-3 transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "font-semibold border-brand bg-brand/70 shadow-xs"
                      : "font-medium border-border/80 bg-background/50 hover:border-brand/40 hover:bg-sand/30",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-foreground">{opt.name}</span>
                        {opt.newClientsOnly && (
                          <span className="rounded-full bg-ink text-brand px-2 py-0.5 text-[0.65rem] font-bold">
                            New Clients Only
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-medium text-foreground">
                          <Clock className="size-3 text-ink" /> {opt.durationDisplay}
                        </span>
                        <span>•</span>
                        <span className="font-medium text-foreground">{opt.priceDisplay}</span>
                      </div>

                      {opt.note && (
                        <p className="text-xs text-muted-foreground leading-relaxed pt-0.5 font-normal">
                          {opt.note}
                        </p>
                      )}
                    </div>

                    <div
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-full border transition-colors mt-0.5",
                        isSelected
                          ? "border-brand bg-ink text-brand"
                          : "border-border group-hover:border-brand/50",
                      )}
                    >
                      {isSelected && <Check className="size-3" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </StepShell>
  );
}
