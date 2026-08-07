"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Service } from "@/data/services";
import { serviceCategories } from "@/data/services";
import { Button } from "@/components/ui/button";

interface ServiceQuickViewModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceQuickViewModal({ service, isOpen, onClose }: ServiceQuickViewModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!service || !mounted) return null;

  const category = serviceCategories.find((c) => c.id === service.category);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Compact Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-card p-6 shadow-xl border border-border/80 text-card-foreground space-y-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quickview-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 grid size-8 place-items-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-ink hover:text-ink-foreground cursor-pointer"
            >
              <X className="size-4" />
            </button>

            {/* Header / Category */}
            <div className="space-y-1.5 pr-8">
              {category && (
                <span className="inline-block rounded-full bg-background px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  {category.title}
                </span>
              )}
              <h2 id="quickview-title" className="font-display text-lg font-bold leading-snug">
                {service.name}
              </h2>
            </div>

            {/* Brief Paragraph */}
            <p className="text-[13px] text-foreground/80 leading-relaxed font-normal">
              {service.description || service.short}
            </p>

            {/* Actions */}
            <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-3">
              <Button asChild variant="outline" size="sm" onClick={onClose}>
                <Link className="text-xs" href={`/services/${service.slug}`}>
                  Learn More <ArrowRight className="size-3.5" />
                </Link>
              </Button>

              <Button variant="default" size="sm" onClick={onClose} className="text-xs text-muted-foreground">
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
