"use client";

import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { testimonials } from "@/data/testimonials";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";

import "swiper/css";
import "swiper/css/pagination";

export function Testimonials() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Section tone="sand" className="overflow-hidden">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Kind Words"
            title="What Our Clients Say"
            description="Read authentic experiences from clients who have transformed their health with us."
          />

        </div>

        <Reveal className="mt-10">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
            loop={true}
            spaceBetween={24}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-14 cursor-grab active:cursor-grabbing"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} className="h-auto!">
                <div className="group relative flex h-full flex-col justify-between rounded-lg bg-card p-8 shadow-soft transition-all duration-500 hover:scale-95 hover:shadow-lift border border-border/50">
                  <Quote className="absolute top-6 right-6 size-10 text-brand/25 transition-transform duration-500 group-hover:scale-110" />

                  <div>
                    <div className="flex items-center gap-1" aria-label={`${t.rating ?? 5} out of 5 stars`}>
                      {Array.from({ length: t.rating ?? 5 }).map((_, s) => (
                        <Star key={s} className="size-4.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <blockquote className="mt-5 text-sm md:text-[15px] leading-relaxed text-foreground/90">
                      “{t.quote}”
                    </blockquote>
                  </div>

                  <footer className="mt-8 pt-5 border-t border-border/60">
                    <div className="font-display font-semibold text-base text-foreground">
                      {t.author}
                    </div>
                    {t.role ? (
                      <div className="text-xs font-medium text-muted-foreground mt-0.5">
                        {t.role}
                      </div>
                    ) : null}
                  </footer>
                </div>
              </SwiperSlide>
            ))}

          </Swiper>
          <div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous testimonial"
                className="grid size-11 place-items-center rounded-full border border-ink/20 bg-background text-foreground transition-all duration-300 hover:bg-brand hover:text-brand-foreground hover:border-brand cursor-pointer shadow-sm"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next testimonial"
                className="grid size-11 place-items-center rounded-full border border-ink/20 bg-background text-foreground transition-all duration-300 hover:bg-brand hover:text-brand-foreground hover:border-brand cursor-pointer shadow-sm"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
            <div className="swiper-pagination-custom mt-4 flex justify-center gap-2 [&_.swiper-pagination-bullet]:size-2.5 [&_.swiper-pagination-bullet]:bg-ink/20 [&_.swiper-pagination-bullet-active]:!bg-brand [&_.swiper-pagination-bullet-active]:w-8 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300" />


          </div>
        </Reveal>
      </div>
    </Section>
  );
}
