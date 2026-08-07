"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { featuredServices } from "@/data/services";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { ServiceCard } from "./ServiceCard";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/pagination";

export function ServicesSlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Section>
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our Services"
            title="Explore Our Services"
            description="A range of holistic services under one roof, so your care can join up around you."
          />
          
        </div>

        <Reveal className="mt-10">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: true, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, el: ".swiper-pagination-services" }}
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
            {featuredServices.map((service) => (
              <SwiperSlide key={service.slug} className="h-auto!">
                <ServiceCard service={service} />
              </SwiperSlide>
            ))}
            
          </Swiper>
          <div>
<div className="flex items-center justify-end gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous service"
              className="grid size-11 place-items-center rounded-full border border-ink/20 bg-background text-foreground transition-all duration-300 hover:bg-brand hover:text-brand-foreground hover:border-brand cursor-pointer shadow-sm"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next service"
              className="grid size-11 place-items-center rounded-full border border-ink/20 bg-background text-foreground transition-all duration-300 hover:bg-brand hover:text-brand-foreground hover:border-brand cursor-pointer shadow-sm"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
          <div className="swiper-pagination-services mt-4 flex justify-center gap-2 [&_.swiper-pagination-bullet]:size-2.5 [&_.swiper-pagination-bullet]:bg-ink/20 [&_.swiper-pagination-bullet-active]:!bg-brand [&_.swiper-pagination-bullet-active]:w-8 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300" />
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <Button asChild variant="ink" size="default">
            <Link href="/services">
              View All Services <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
