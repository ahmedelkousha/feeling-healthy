"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  line1: string;
  line2: string;
  ariaLabel: string;
}

const stats: StatItem[] = [
  {
    id: "years",
    target: 25,
    suffix: "+",
    line1: "Years of Wellness",
    line2: "Expertise",
    ariaLabel: "Over 25 years of wellness expertise and holistic care",
  },
  {
    id: "clients",
    target: 5,
    suffix: "k+",
    line1: "Happy & Relaxed",
    line2: "Clients",
    ariaLabel: "Over 5,000 happy and relaxed clients",
  },
  {
    id: "treatments",
    target: 15,
    suffix: "+",
    line1: "Signature Healing",
    line2: "Treatments",
    ariaLabel: "Over 15 signature healing treatments and modalities",
  },
  {
    id: "satisfaction",
    target: 98,
    suffix: "%",
    line1: "Client Satisfaction",
    line2: "Rate",
    ariaLabel: "98% client satisfaction rate",
  },
];

function CounterNumber({ target, isInView }: { target: number; isInView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1], // smooth deceleration
      });
      return controls.stop;
    }
  }, [isInView, count, target]);

  return <motion.span>{rounded}</motion.span>;
}

function StatItemDisplay({ stat, isInView }: { stat: StatItem; isInView: boolean }) {
  return (
    <div
      className="flex flex-col lg:flex-row items-center gap-3 sm:gap-4"
      aria-label={stat.ariaLabel}
    >
      <span className="relative text-brand font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-tight leading-none">
        <CounterNumber target={stat.target} isInView={isInView} />
        {stat.suffix}
      </span>
      <div className="text-xs text-ink-foreground/70 sm:text-sm font-normal leading-tight text-center lg:text-left">
        <div>{stat.line1}</div>
        <div>{stat.line2}</div>
      </div>
    </div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <section
      ref={sectionRef}
      id="stats"
      aria-label="Key clinic statistics"
      className="relative bg-transparent py-10 sm:py-12 md:py-14 border-b border-neutral-100"
    >
      <div className="container-page">
        <div className="relative bg-ink p-6 rounded-lg grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 sm:gap-x-8 md:gap-x-12 items-center sm:justify-items-center">
          {stats.map((stat) => (
            <StatItemDisplay key={stat.id} stat={stat} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
