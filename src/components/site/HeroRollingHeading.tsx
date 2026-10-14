"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const rollingWords = [
  { text: " Health.", color: "text-white" },
  { text: "Wellbeing.", color: "text-white" },
  { text: "Vitality.", color: "text-white" },
  { text: "Balance.", color: "text-white" },
];

export function HeroRollingHeading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rollingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="mt-4 text-[3rem] leading-[1.08] font-semibold text-white sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem]">
      {/* Your Health. <br />
      Your Journey. <br /> */}
      <span className="text-white">Your </span>
      <br />
      <div className="overflow-hidden h-[1.18em] inline-block align-bottom mt-1 sm:mt-0">
        <div
          className="transition-transform duration-700 ease-in-out"
          style={{ transform: `translateY(-${(index * 100) / rollingWords.length}%)` }}
        >
          {rollingWords.map((word, i) => (
            <div key={i} className="h-[1.18em] flex items-center justify-start">
              <span className="relative inline-block">
                <span className={cn("relative z-10", word.color)}>{word.text}</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[-0.15em] bottom-[0.05em] z-0 h-[0.15em] rotate-1 bg-brand/80"
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </h1>
  );
}
