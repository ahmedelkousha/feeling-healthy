"use client";

import { useState } from "react";
import { CheckCircle2, Send, Loader2, LockOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "./Reveal";
import { addSubscriber } from "@/lib/firebase/services";
import { toast } from "sonner";

export function SubscriptionSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addSubscriber({
        name: name.trim() || "Community Member",
        email: email.trim(),
      });
      setSubmitted(true);
      toast.success("Thank you for subscribing!", {
        description: "You're now subscribed to our health & wellness updates.",
      });
    } catch (err: any) {
      console.error("Subscription error:", err);
      toast.error(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-brand py-16 text-brand-foreground md:py-24">
      {/* Decorative Blobs matching CTA section */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 size-80 blob-alt bg-brand-foreground/10"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-[-6rem] size-96 blob bg-brand-foreground/[0.07]"
      />

      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center text-center lg:text-left">
          {/* Left Column: Heading & Text */}
          <Reveal className="lg:justify-items-start justify-items-center">
            <p className="script-accent text-2xl">Feeling Healthy Community</p>
            <h2 className="mt-3 text-3xl leading-[1.08] font-semibold md:text-4xl lg:text-5xl">
              Subscribe to Our Newsletter
            </h2>
            <p className="mt-4 text-sm text-brand-foreground/85 md:text-base max-w-xl">
              Receive practical holistic health guidance, naturopathic insights, and clinic updates directly in your inbox.
            </p>
          </Reveal>

          {/* Right Column: Subscription Form / Success State */}
          <Reveal className="justify-items-center" delay={100}>
            {submitted ? (
              <div className="rounded-2xl bg-card backdrop-blur-sm p-6 sm:p-8 text-left animate-in fade-in duration-300 border border-ink/15 shadow-xl">
                <div className="grid size-12 place-items-center rounded-full bg-brand text-brand-foreground mb-4 shadow-sm">
                  <CheckCircle2 className="size-7" />
                </div>
                <h4 className="font-display text-xl font-bold text-foreground">
                  Thank You, {name || "there"}!
                </h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  You have been successfully subscribed to the Feeling Healthy wellness newsletter. Check your inbox soon for health tips!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                  }}
                  className="mt-4 text-xs font-semibold text-ink/85 hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  Subscribe another email <ArrowRight className="size-3"/>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:max-w-sm w-full">
                <div className="grid grid-cols-1 gap-3">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-sm bg-white/95 border-brand-foreground/20 text-foreground placeholder:text-muted-foreground text-sm px-5 focus-visible:ring-2 focus-visible:ring-ink shadow-soft"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 rounded-sm bg-white/95 border-brand-foreground/20 text-foreground placeholder:text-muted-foreground text-sm px-5 focus-visible:ring-2 focus-visible:ring-ink shadow-soft"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    type="submit"
                    variant="ink"
                    size="default"
                    disabled={isSubmitting}
                    className="px-4 font-bold gap-2 cursor-pointer w-full sm:w-auto shadow-soft"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        <span className="font-medium">Subscribe Now</span>
                      </>
                    )}
                  </Button>
                  <p className="text-[11px] text-brand-foreground/70 sm:ml-auto inline-flex gap-1 justify-center items-center">
                    <LockOpen className="size-3" /> Unsubscribe at any time with 1-click.
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
