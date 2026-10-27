"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Calendar,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { bookCta, AboutUsNav, primaryNav, site } from "@/data/site";
import { serviceCategories, services, type Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { useLinkClickEvent } from "@/hooks/useLinkClickEvent";

const socialIcons = { Facebook, Instagram, LinkedIn: Linkedin } as const;

export function Navbar() {
  const handleLinkClick = useLinkClickEvent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [storyDropdownOpen, setStoryDropdownOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<Service | null>(null);

  const closeAllMenus = (callback?: () => void) => {
    setOpen(false);
    setDropdownOpen(false);
    setStoryDropdownOpen(false);
    if (callback) callback();
  };
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const storyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    closeAllMenus();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    if (!dropdownOpen) return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [dropdownOpen]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
      setHoveredService(null);
    }, 200);
  };

  const handleStoryMouseEnter = () => {
    if (storyTimeoutRef.current) clearTimeout(storyTimeoutRef.current);
    setStoryDropdownOpen(true);
  };

  const handleStoryMouseLeave = () => {
    storyTimeoutRef.current = setTimeout(() => {
      setStoryDropdownOpen(false);
    }, 200);
  };

  const isServicesActive = pathname.startsWith("/services");
  return (
    <div className={`${pathname?.startsWith('/admin') ? 'hidden' : 'block'} container-page bg-transparent fixed top-0 left-0 right-0 z-60 py-6`}>
      {/* Brand Top Bar (Static - scrolls away naturally with page) */}
      <div>
        <div
          className={`bg-brand rounded-t-md border-0 text-brand-foreground text-xs font-medium overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${pathname === "/" ? "block" : "hidden"} ${scrolled ? "py-1.5 transition-all duration-500" : "py-2 transition-all duration-500"}`}
        >
          <div className="container-page flex flex-nowrap items-center justify-between gap-x-3 gap-y-1">
            <div className="flex flex-nowrap items-center gap-x-6 gap-y-1">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:underline"
              >
                <MapPin className="size-3.5 shrink-0" />
                <span className="text-nowrap">{site.contact.address}</span>
              </a>
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <Clock className="size-3.5 shrink-0" />
                <span className="text-nowrap">Mon–Sat 9:00am – 5:00pm</span>
              </span>
            </div>

            <div className="flex items-center gap-x-6">
              <a
                href={`tel:${site.contact.phone}`}
                className="inline-flex items-center gap-1.5 hover:underline"
              >
                <Phone className="size-3.5 shrink-0" />
                <span className="text-nowrap">{site.contact.phone}</span>
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="hidden md:inline-flex items-center gap-1.5 hover:underline"
              >
                <Mail className="size-3.5 shrink-0" />
                <span className="text-nowrap">{site.contact.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Sticky Header */}
        <header
          className={cn(
            "top-0 sticky flex flex-col justify-center items-center z-60 transition-all duration-300 ease-[var(--ease-calm)]",
            scrolled ? "bg-background shadow-sm" : "bg-background",
            pathname === "/" ? "rounded-b-md" : "rounded-md",
          )}
        >
          {/* Main Navbar */}
          <div
            className={cn(
              "container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-1 z-55 xl:z-5 bg-background",
              pathname === "/" ? "rounded-b-lg" : "rounded-lg",
            )}
          >
            <Link
              href="/"
              onClick={(e) => handleLinkClick(e, "/", closeAllMenus)}
              className="flex max-w-fit items-center gap-2"
              aria-label={`${site.name} home`}
            >
              <img
                src="/images/logo.png"
                alt={site.name}
                className={`${scrolled ? "h-10 sm:h-14 transition-all duration-500" : "transition-all duration-500 h-12 sm:h-16"} w-auto object-contain`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
              {primaryNav.map((item) => {
                const isServices = item.to === "/services";
                const isOurStory = item.label === "About Us";
                const isActive =
                  pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
                const isStoryActive =
                  pathname.startsWith("/about") ||
                  pathname.startsWith("/practitioners") ||
                  pathname.startsWith("/resources") ||
                  pathname.startsWith("/contact");

                if (isServices) {
                  return (
                    <div
                      key={item.to}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="relative"
                    >
                      <Link
                        href={item.to}
                        onClick={(e) => handleLinkClick(e, item.to, closeAllMenus)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-ink/5 hover:text-foreground",
                          isServicesActive && "bg-ink/5 text-foreground",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-transform duration-200",
                            dropdownOpen && "rotate-180",
                          )}
                        />
                      </Link>
                    </div>
                  );
                }

                if (isOurStory) {
                  return (
                    <div
                      key={item.label}
                      onMouseEnter={handleStoryMouseEnter}
                      onMouseLeave={handleStoryMouseLeave}
                      className="relative"
                    >
                      <Link
                        href={item.to}
                        onClick={(e) => handleLinkClick(e, item.to, closeAllMenus)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-ink/5 hover:text-foreground",
                          isStoryActive && "bg-ink/5 text-foreground",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-transform duration-200",
                            storyDropdownOpen && "rotate-180",
                          )}
                        />
                      </Link>

                      {/* About Us Floating Dropdown Menu */}
                      {storyDropdownOpen && (
                        <div className="absolute top-[65px] left-0 w-64 rounded-xl bg-background border border-border shadow-lift p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                          {AboutUsNav.map((subItem) => {
                            const isSubActive = pathname === subItem.to;
                            return (
                              <Link
                                key={subItem.to}
                                href={subItem.to}
                                onClick={(e) => handleLinkClick(e, subItem.to, closeAllMenus)}
                                className={cn(
                                  "group flex flex-col rounded-lg p-2.5 text-sm transition-colors hover:bg-sand/80",
                                  isSubActive
                                    ? "bg-sand font-semibold text-foreground"
                                    : "text-foreground/90",
                                )}
                              >
                                <div className="flex items-center justify-between font-medium text-foreground">
                                  <span>{subItem.label}</span>
                                  <ArrowRight className="size-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-brand-dark" />
                                </div>
                                <span className="text-xs text-muted-foreground mt-0.5 font-normal line-clamp-1">
                                  {subItem.description}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.to}
                    href={item.to}
                    onClick={(e) => handleLinkClick(e, item.to, closeAllMenus)}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-ink/5 hover:text-foreground",
                      isActive && "bg-ink/5 text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Button asChild size="sm" className="ml-3">
                <Link
                  href={bookCta.to}
                  onClick={(e) => handleLinkClick(e, bookCta.to, closeAllMenus)}
                >
                  {bookCta.label} <Calendar />
                </Link>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <Link href={bookCta.to}>{bookCta.label}</Link>
              </Button>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="relative flex size-11 items-center justify-center rounded-full text-foreground cursor-pointer transition-colors hover:bg-accent/60 z-55"
              >
                <div className="relative flex h-4.5 w-6 flex-col justify-between pointer-events-none">
                  <span
                    className={cn(
                      "h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-[var(--ease-calm)] origin-center",
                      open && "translate-y-[8px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-[var(--ease-calm)]",
                      open && "opacity-0 scale-x-0",
                    )}
                  />
                  <span
                    className={cn(
                      "h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-[var(--ease-calm)] origin-center",
                      open && "-translate-y-[8px] -rotate-45",
                    )}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Full-Screen Width Mega Dropdown Menu */}
          {dropdownOpen && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="absolute top-[86px] left-0 right-0 w-full bg-background shadow-lift z-50 animate-in fade-in slide-in-from-top-2 duration-250 hidden xl:block rounded-xl"
            >
              <div className="container-page py-10 grid grid-cols-[1fr_18rem] gap-4 items-start">
                {/* Left: 3-column Organized Service Categories */}
                <div className="grid grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-7">
                  {serviceCategories.map((cat) => {
                    const catServices = services.filter((s) => s.category === cat.id);
                    return (
                      <div key={cat.id} className="space-y-2">
                        <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase px-2 border-b border-border/60 pb-2">
                          {cat.title}
                        </h4>
                        <ul className="space-y-1 pt-1">
                          {catServices.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/services/${service.slug}`}
                                onMouseEnter={() => setHoveredService(service)}
                                onClick={(e) =>
                                  handleLinkClick(e, `/services/${service.slug}`, closeAllMenus)
                                }
                                className="group flex items-center justify-between rounded-xl px-2.5 py-1.5 text-sm font-medium text-foreground/85 transition-all hover:bg-sand/80 hover:text-foreground"
                              >
                                <span>{service.name}</span>
                                <ArrowRight className="size-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-brand-foreground" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Right: Large Hover Image Preview Panel */}
                <div className="flex flex-col justify-between overflow-hidden rounded-3xl p-0 border-1 border-brand shadow-soft">
                  <div>
                    <div className="relative aspect-[1/1] overflow-hidden rounded-2xl shadow-soft">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.img
                          key={hoveredService ? hoveredService.slug : "default-logo"}
                          src={
                            hoveredService
                              ? hoveredService.image || "/images/logo.png"
                              : "/images/logo.png"
                          }
                          alt={hoveredService ? hoveredService.name : site.name}
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.02 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0 size-full object-cover"
                        />
                      </AnimatePresence>
                      {hoveredService?.featured ? (
                        <span className="absolute top-3 left-3 z-10 rounded-full bg-brand px-3 py-0.5 text-xs font-semibold text-brand-foreground shadow-sm">
                          Popular
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Slide Menu (Modern, Unique & Organized Drawer) */}
          <div
            className={cn(
              "fixed inset-0 z-50 flex flex-col bg-background backdrop-blur-2xl xl:hidden transition-all duration-500 ease-[var(--ease-calm)] pt-22 sm:pt-30",
              open ? "translate-x-0" : "translate-x-full pointer-events-none",
            )}
          >
            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto px-5 py-8 space-y-6">
              {/* Navigation Accordions List using Radix UI Accordion */}
              <nav className="space-y-3" aria-label="Mobile Navigation">
                <Accordion collapsible type="single" className="w-full space-y-3">
                  {/* Services Accordion Card */}
                  <AccordionItem
                    value="services"
                    className="rounded-sm border border-border/80 overflow-hidden"
                  >
                    <AccordionTrigger className="p-4 font-display bg-brand text-xl font-semibold text-foreground hover:no-underline py-4">
                      <span>Services</span>
                    </AccordionTrigger>

                    <AccordionContent className="border-t border-border/60 bg-background/50 p-3 space-y-2 pb-3">
                      <Accordion type="multiple" className="w-full space-y-2">
                        {serviceCategories.map((cat) => {
                          const catServices = services.filter((s) => s.category === cat.id);
                          return (
                            <AccordionItem
                              key={cat.id}
                              value={cat.id}
                              className="rounded-sm border border-border/60 bg-card overflow-hidden"
                            >
                              <AccordionTrigger className="px-3.5 py-2.5 hover:no-underline text-left text-[0.75rem] font-bold uppercase tracking-wider text-foreground/90">
                                {cat.title}
                              </AccordionTrigger>

                              <AccordionContent className="border-t border-border/50 bg-background/40 p-2 pb-2">
                                <ul className="space-y-1">
                                  {catServices.map((s) => (
                                    <li key={s.slug}>
                                      <Link
                                        href={`/services/${s.slug}`}
                                        onClick={(e) =>
                                          handleLinkClick(e, `/services/${s.slug}`, closeAllMenus)
                                        }
                                        className="group flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-sand hover:text-foreground"
                                      >
                                        <span>{s.name}</span>
                                        <ArrowRight className="size-3.5 opacity-40 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 text-brand-dark" />
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                      <div className="pt-1 border-t border-border/40">
                        <Link
                          href="/services"
                          onClick={(e) => handleLinkClick(e, "/services", closeAllMenus)}
                          className="flex items-center justify-center gap-1.5 rounded-sm bg-ink/5 py-2 text-xs font-semibold text-foreground hover:bg-ink/10 transition-colors"
                        >
                          View All {services.length} Services <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* About Us Accordion Card */}
                  <AccordionItem
                    value="about"
                    className="rounded-sm border border-border/80 bg-card overflow-hidden"
                  >
                    <AccordionTrigger className="p-4 font-display bg-brand text-xl font-semibold text-foreground hover:no-underline py-4">
                      <span>About Us</span>
                    </AccordionTrigger>

                    <AccordionContent className="border-t border-border/60 bg-background/50 p-2 space-y-1 pb-2">
                      {AboutUsNav.map((subItem) => (
                        <Link
                          key={subItem.to}
                          href={subItem.to}
                          onClick={(e) => handleLinkClick(e, subItem.to, closeAllMenus)}
                          className="group flex flex-col rounded-xl p-3 text-sm transition-colors hover:bg-sand"
                        >
                          <div className="flex items-center justify-between font-semibold text-foreground">
                            <span>{subItem.label}</span>
                            <ArrowRight className="size-3.5 opacity-40 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 text-brand-dark" />
                          </div>
                          <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1 font-normal">
                            {subItem.description}
                          </span>
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* PEMF / THz Direct Link Card */}
                <div className="rounded-sm border border-border/80 bg-card overflow-hidden">
                  <Link
                    href="/pemf-thz"
                    onClick={(e) => handleLinkClick(e, "/pemf-thz", closeAllMenus)}
                    className="flex items-center justify-between p-4 font-display text-xl font-semibold text-foreground hover:bg-sand/60 transition-colors"
                  >
                    <span>PEMF / THz</span>
                    <ArrowRight className="size-5 text-muted-foreground" />
                  </Link>
                </div>

                {/* Your Wellbeing Direct Link Card */}
                <div className="rounded-sm border border-border/80 bg-card overflow-hidden">
                  <Link
                    href="/your-wellbeing"
                    onClick={(e) => handleLinkClick(e, "/your-wellbeing", closeAllMenus)}
                    className="flex items-center justify-between p-4 font-display text-xl font-semibold text-foreground hover:bg-sand/60 transition-colors"
                  >
                    <span>Your Wellbeing</span>
                    <ArrowRight className="size-5 text-muted-foreground" />
                  </Link>
                </div>
              </nav>

              {/* Quick Contact Chips */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${site.contact.phone}`}
                  className="flex items-center gap-2.5 rounded-sm border border-border/80 bg-card p-3 shadow-xs transition-all active:scale-98 hover:border-brand"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand text-ink font-semibold">
                    <Phone className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                      Call Us
                    </p>
                    <p className="truncate text-xs font-semibold text-foreground">
                      {site.contact.phone}
                    </p>
                  </div>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-sm border border-border/80 bg-card p-3 shadow-xs transition-all active:scale-98 hover:border-brand"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand text-ink font-semibold">
                    <MapPin className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                      Location
                    </p>
                    <p className="truncate text-xs font-semibold text-foreground">Tweed Heads</p>
                  </div>
                </a>
              </div>

              {/* Footer Info Card inside Drawer */}
              <div className="rounded-sm border border-brand/40 bg-sand/60 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                  <Clock className="size-4 text-brand-dark shrink-0" />
                  <span>Mon–Sat 9:00am – 5:00pm</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {site.contact.address}
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-border/60">
                  <span className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
                    Follow Us
                  </span>
                  <div className="flex items-center gap-2">
                    {site.social.map((s) => {
                      const Icon = socialIcons[s.label as keyof typeof socialIcons];
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          aria-label={s.label}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid size-8 place-items-center rounded-full border border-border/80 bg-card text-foreground transition-all hover:border-brand hover:bg-brand hover:text-brand-foreground"
                        >
                          {Icon ? (
                            <Icon className="size-4" />
                          ) : (
                            <span className="text-xs font-semibold">{s.label}</span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky top-0 z-10 flex items-center justify-start border-b border-border/60 bg-background/95 px-5 py-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <Button asChild size="sm" onClick={() => setOpen(false)}>
                  <Link href={bookCta.to}>{bookCta.label}</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
