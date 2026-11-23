"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, HelpCircle, X, Phone, Calendar, Mail, MapPin, MessageSquare, MessageCircle, HelpCircleIcon, HelpingHand } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { site, bookCta } from "@/data/site";
import { useLinkClickEvent } from "@/hooks/useLinkClickEvent";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function FloatingButtons() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const handleLinkClick = useLinkClickEvent();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 280);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 useEffect(() => {
    if (!helpOpen) return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [helpOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 pointer-events-none ${pathname?.startsWith('/admin') ? 'hidden' : 'block'}`}>
      {/* Quick Help Popover Modal */}
      <AnimatePresence>
        {helpOpen && (
          <>
            {/* Backdrop click listener */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHelpOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs pointer-events-auto"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-50 w-72 sm:w-80 rounded-xl border border-border/80 bg-background/95 py-4 px-3 shadow-lift backdrop-blur-xl pointer-events-auto mb-2"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="grid size-8 place-items-center rounded-xl bg-brand text-ink">
                    <HelpCircle className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">How can we help?</h3>
                    <p className="text-[0.7rem] text-muted-foreground">We're here for your wellbeing</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setHelpOpen(false)}
                  className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Close help options"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Action Links */}
              <div className="mt-4 space-y-2">
                <Link
                  href={bookCta.to}
                  onClick={(e) =>
                    handleLinkClick(e, bookCta.to, (cb) => {
                      setHelpOpen(false);
                      cb?.();
                    })
                  }
                  className="group flex items-center gap-3 rounded-2xl bg-brand hover:bg-brand/80 p-3 text-sm font-medium text-brand-foreground shadow-xs transition-all"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-card text-brand">
                    <Calendar className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold leading-none">{bookCta.label}</p>
                    <p className="text-[0.65rem] opacity-80 mt-0.5">Quick & simple online scheduling</p>
                  </div>
                </Link>

                <a
                  href="https://wa.me/61756074152?text=Hello%20Feeling%20Healthy%2C%20I%20have%20a%20question%20about..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500 p-3 text-sm transition-all hover:border-emerald-500 hover:bg-emerald-500/80"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-card text-emerald-600 ">
                    <MessageCircle className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <span>Chat on WhatsApp</span>
                      {/* <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse" /> */}
                    </p>
                    <p className="text-[0.65rem] text-ink mt-0.5">Instant messaging support</p>
                  </div>
                </a>

                <a
                  href={`tel:${site.contact.phone}`}
                  className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3 text-sm transition-all hover:border-brand/50 hover:bg-sand/60"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand text-ink">
                    <Phone className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">Call Us Directly</p>
                    <p className="text-[0.65rem] text-muted-foreground mt-0.5">{site.contact.phone}</p>
                  </div>
                </a>

                <Link
                  href="/contact"
                  onClick={(e) =>
                    handleLinkClick(e, "/contact", (cb) => {
                      setHelpOpen(false);
                      cb?.();
                    })
                  }
                  className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3 text-sm transition-all hover:border-brand/50 hover:bg-sand/60"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand text-ink">
                    <Mail className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">Ask a Question</p>
                    <p className="text-[0.65rem] text-muted-foreground mt-0.5">Send a quick inquiry form</p>
                  </div>
                </Link>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3 text-sm transition-all hover:border-brand/50 hover:bg-sand/60"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand text-ink">
                    <MapPin className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">Visit Clinic</p>
                    <p className="text-[0.65rem] text-muted-foreground mt-0.5 truncate">{site.contact.address}</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Triggers Row */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {/* Help Floating Button */}
        <div className="relative flex items-center justify-center">
          {!helpOpen && (
            <span className="absolute inset-0 rounded-full bg-brand/80 animate-ping opacity-50 pointer-events-none duration-1000" />
          )}
          <motion.button
            type="button"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setHelpOpen(!helpOpen)}
            className={cn(
              "relative z-10 group flex items-center gap-2 rounded-full border border-brand/40 bg-brand px-4 py-2.5 text-xs font-semibold text-foreground shadow-lift backdrop-blur-md transition-all cursor-pointer hover:bg-brand/70 hover:text-brand-foreground hover:border-brand",
              helpOpen && "bg-brand text-brand-foreground border-brand",
            )}
            aria-label="Help & Contact"
          >
            <HelpCircle className="size-4.5 text-brand-dark group-hover:text-brand-foreground transition-colors" />
            <span className="hidden sm:inline">Help</span>
          </motion.button>
        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 10 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={scrollToTop}
              className="grid size-10.5 place-items-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-lift backdrop-blur-md transition-colors hover:bg-ink hover:text-ink-foreground cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="size-4.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
