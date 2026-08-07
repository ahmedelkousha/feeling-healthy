"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { bookCta, AboutUsNav, primaryNav, site } from "@/data/site";
import { serviceCategories, services, type Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { useLinkClickEvent } from "@/hooks/useLinkClickEvent";

export function Navbar() {
  const handleLinkClick = useLinkClickEvent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileStoryOpen, setMobileStoryOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [storyDropdownOpen, setStoryDropdownOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<Service | null>(null);

  const closeAllMenus = (callback?: () => void) => {
    setOpen(false);
    setDropdownOpen(false);
    setStoryDropdownOpen(false);
    setMobileServicesOpen(false);
    setMobileStoryOpen(false);
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
    <>
      {/* Brand Top Bar (Static - scrolls away naturally with page) */}
      <div className={`bg-brand text-brand-foreground text-xs font-medium py-2 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${pathname === '/' ? 'block' : 'hidden'}`}>
        <div className="container-page flex flex-nowrap items-center justify-between gap-x-6 gap-y-1">
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
            <a href={`tel:${site.contact.phone}`} className="inline-flex items-center gap-1.5 hover:underline">
              <Phone className="size-3.5 shrink-0" />
              <span className="text-nowrap">{site.contact.phone}</span>
            </a>
            <a href={`mailto:${site.contact.email}`} className="hidden md:inline-flex items-center gap-1.5 hover:underline">
              <Mail className="size-3.5 shrink-0" />
              <span className="text-nowrap">{site.contact.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={cn(
          "top-0 sticky flex flex-col justify-center items-center z-50 transition-all duration-300 ease-[var(--ease-calm)]",
          scrolled ? "bg-background shadow-sm sm:h-16 h-12" : "bg-background",
        )}
      >
        {/* Main Navbar */}
        <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-1 z-55 lg:z-5">
        <Link href="/" onClick={(e) => handleLinkClick(e, "/", closeAllMenus)} className="flex max-w-fit items-center gap-2" aria-label={`${site.name} home`}>
          <img src="/images/logo.png" alt={site.name} className={`${scrolled? 'h-10 sm:h-14 transition-all duration-300': 'transition-all duration-300 h-12 sm:h-18'} w-auto object-contain`} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
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
                    <div className="absolute top-full left-0 mt-1.5 w-64 rounded-2xl bg-background border border-border shadow-lift p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {AboutUsNav.map((subItem) => {
                        const isSubActive = pathname === subItem.to;
                        return (
                          <Link
                            key={subItem.to}
                            href={subItem.to}
                            onClick={(e) => handleLinkClick(e, subItem.to, closeAllMenus)}
                            className={cn(
                              "group flex flex-col rounded-xl p-2.5 text-sm transition-colors hover:bg-sand/80",
                              isSubActive ? "bg-sand font-semibold text-foreground" : "text-foreground/90",
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
            <Link href={bookCta.to} onClick={(e) => handleLinkClick(e, bookCta.to, closeAllMenus)}>{bookCta.label}</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
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
          className="absolute top-full left-0 right-0 w-full bg-background shadow-lift z-50 animate-in fade-in slide-in-from-top-2 duration-250 hidden lg:block"
        >
          <div className="container-page py-10 grid grid-cols-[1fr_22rem] gap-12 items-start">
            {/* Left: 3-column Organized Service Categories */}
            <div className="grid grid-cols-3 gap-x-8 gap-y-7">
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
                            onClick={(e) => handleLinkClick(e, `/services/${service.slug}`, closeAllMenus)}
                            className="group flex items-center justify-between rounded-xl px-2.5 py-1.5 text-sm font-medium text-foreground/85 transition-all hover:bg-accent hover:text-foreground"
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
                      src={hoveredService ? (hoveredService.image || "/images/logo.png") : "/images/logo.png"}
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
          "fixed inset-0 z-50 flex flex-col bg-background/98 backdrop-blur-2xl lg:hidden transition-all duration-500 ease-[var(--ease-calm)] pt-22 sm:pt-30", open ? "translate-x-0" : "translate-x-full pointer-events-none",
        )}
      >
        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          {/* Quick Contact Chips */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${site.contact.phone}`}
              className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card p-3 shadow-xs transition-all active:scale-98 hover:border-brand"
            >
              <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand text-ink font-semibold">
                <Phone className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">Call Us</p>
                <p className="truncate text-xs font-semibold text-foreground">{site.contact.phone}</p>
              </div>
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card p-3 shadow-xs transition-all active:scale-98 hover:border-brand"
            >
              <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand text-ink font-semibold">
                <MapPin className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">Location</p>
                <p className="truncate text-xs font-semibold text-foreground">Tweed Heads</p>
              </div>
            </a>
          </div>

          {/* Navigation Accordions List */}
          <nav className="space-y-3" aria-label="Mobile Navigation">
            {/* Services Accordion Card */}
            <div className="rounded-2xl border border-border/80 bg-card/60 overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex w-full items-center justify-between p-4 text-left font-display text-xl font-semibold text-foreground cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid size-7 place-items-center rounded-lg bg-brand/20 text-xs font-bold text-ink-foreground">16</span>
                  <span>Services</span>
                </div>
                <ChevronDown
                  className={cn(
                    "size-5 text-muted-foreground transition-transform duration-250",
                    mobileServicesOpen && "rotate-180 text-foreground",
                  )}
                />
              </button>

              {mobileServicesOpen && (
                <div className="border-t border-border/60 bg-background/50 p-4 space-y-5 animate-in fade-in slide-in-from-top-1 duration-500">
                  {serviceCategories.map((cat) => {
                    const catServices = services.filter((s) => s.category === cat.id);
                    return (
                      <div key={cat.id} className="space-y-2">
                        <h5 className="text-[0.7rem] font-bold uppercase tracking-wider text-brand-foreground/90 bg-brand/30 rounded-md px-2 py-0.5 w-fit">
                          {cat.title}
                        </h5>
                        <ul className="grid grid-cols-1 gap-1 pt-1">
                          {catServices.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.slug}`}
                                onClick={(e) => handleLinkClick(e, `/services/${s.slug}`, closeAllMenus)}
                                className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-foreground/90 transition-all hover:bg-sand hover:text-foreground"
                              >
                                <span>{s.name}</span>
                                <ArrowRight className="size-3.5 opacity-40 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 text-brand-dark" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                  <div className="pt-2 border-t border-border/40">
                    <Link
                      href="/services"
                      onClick={(e) => handleLinkClick(e, "/services", closeAllMenus)}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-ink/5 py-2.5 text-xs font-semibold text-foreground hover:bg-ink/10 transition-colors"
                    >
                      View All {services.length} Services <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* PEMF / THz Direct Link Card */}
            <div className="rounded-2xl border border-border/80 bg-card/60 overflow-hidden">
              <Link
                href="/pemf-thz"
                onClick={(e) => handleLinkClick(e, "/pemf-thz", closeAllMenus)}
                className="flex items-center justify-between p-4 font-display text-xl font-semibold text-foreground hover:bg-sand/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid size-7 place-items-center rounded-lg bg-brand/20 text-xs font-bold text-ink-foreground">New</span>
                  <span>PEMF / THz</span>
                </div>
                <ArrowRight className="size-5 text-muted-foreground" />
              </Link>
            </div>

            {/* Your Wellbeing Direct Link Card */}
            <div className="rounded-2xl border border-border/80 bg-card/60 overflow-hidden">
              <Link
                href="/your-wellbeing"
                onClick={(e) => handleLinkClick(e, "/your-wellbeing", closeAllMenus)}
                className="flex items-center justify-between p-4 font-display text-xl font-semibold text-foreground hover:bg-sand/60 transition-colors"
              >
                <span>Your Wellbeing</span>
                <ArrowRight className="size-5 text-muted-foreground" />
              </Link>
            </div>

            {/* About Us Accordion Card */}
            <div className="rounded-2xl border border-border/80 bg-card/60 overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileStoryOpen(!mobileStoryOpen)}
                className="flex w-full items-center justify-between p-4 text-left font-display text-xl font-semibold text-foreground cursor-pointer"
              >
                <span>About Us</span>
                <ChevronDown
                  className={cn(
                    "size-5 text-muted-foreground transition-transform duration-250",
                    mobileStoryOpen && "rotate-180 text-foreground",
                  )}
                />
              </button>

              {mobileStoryOpen && (
                <div className="border-t border-border/60 bg-background/50 p-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-500">
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
                </div>
              )}
            </div>
          </nav>

          {/* Footer Info Card inside Drawer */}
          <div className="rounded-3xl border border-brand/40 bg-sand/60 p-5 space-y-3">
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
              <div className="flex items-center gap-3">
                {site.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-foreground hover:text-brand-dark hover:underline"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-10 flex items-center justify-end border-b border-border/60 bg-background/95 px-5 py-3.5 backdrop-blur-md">
         
          <div className="flex items-center gap-2.5">
            <Button asChild size="sm" onClick={() => setOpen(false)}>
              <Link href={bookCta.to}>{bookCta.label}</Link>
            </Button>
           
          </div>
        </div>

      </div>

    </header>
  </>
  );
}
