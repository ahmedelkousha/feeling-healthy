"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { featuredServices } from "@/data/services";
import { wellbeingAreas } from "@/data/wellbeing";
import { useLinkClickEvent } from "@/hooks/useLinkClickEvent";

const socialIcons = { Facebook, Instagram, LinkedIn: Linkedin } as const;

export function Footer() {
  const handleLinkClick = useLinkClickEvent();

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5 lg:py-20">
        <div className="lg:col-span-1">
          <Link href="/" onClick={(e) => handleLinkClick(e, "/")} aria-label={`${site.name} home`}>
            <img src="/images/logo.png" alt={site.name} className="h-18 w-auto object-contain" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-foreground/70">{site.tagline}</p>
          <div className="mt-6 flex gap-2">
            {site.social.map((s) => {
              const Icon = socialIcons[s.label as keyof typeof socialIcons];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  className="grid size-10 place-items-center rounded-full border border-ink-foreground/20 transition-colors hover:bg-brand hover:text-brand-foreground"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        <FooterColumn title="Services">
          {featuredServices.map((s) => (
            <FooterLink key={s.slug} href={`/services/${s.slug}`}>
              {s.name}
            </FooterLink>
          ))}
          <FooterLink href="/services">View All Services</FooterLink>
        </FooterColumn>

        <FooterColumn title="Your Wellbeing">
          {wellbeingAreas.slice(0, 5).map((a) => (
            <FooterLink key={a.slug} href={`/your-wellbeing/${a.slug}`}>
              {a.name}
            </FooterLink>

          ))}
          <FooterLink href="/pemf-thz">PEMF / THz Therapy</FooterLink>

        </FooterColumn>

        <FooterColumn title="About">
          <FooterLink href="/about">Our Story</FooterLink>
          <FooterLink href="/#approach">Our Approach</FooterLink>
          <FooterLink href="/practitioners">Practitioners</FooterLink>
          <FooterLink href="/resources">Resources</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterColumn>

        <FooterColumn title="Contact">
          <li className="flex gap-2 text-sm text-ink-foreground/70" suppressHydrationWarning>
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {site.contact.address}
            </a>
          </li>
          <li className="flex gap-2 text-sm text-ink-foreground/70">
            <Phone className="mt-0.5 size-4 shrink-0" />
            <a href={`tel:${site.contact.phone}`} className="hover:underline">
              {site.contact.phone}
            </a>
          </li>
          <li className="flex gap-2 text-sm text-ink-foreground/70">
            <Mail className="mt-0.5 size-4 shrink-0" />
            <a href={`mailto:${site.contact.email}`} className="hover:underline">
              {site.contact.email}
            </a>
          </li>
          <li className="pt-2 text-sm text-ink-foreground/70">
            {site.contact.openingHours.map((h) => (
              <span key={h.days} className="block">
                {h.days}: {h.hours}
              </span>
            ))}
          </li>
        </FooterColumn>
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ink-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" onClick={(e) => handleLinkClick(e, "/privacy")} className="hover:text-ink-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" onClick={(e) => handleLinkClick(e, "/terms")} className="hover:text-ink-foreground">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-wide text-ink-foreground">{title}</h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink(props: { children: React.ReactNode; href: string }) {
  const handleLinkClick = useLinkClickEvent();

  return (
    <li>
      <Link
        href={props.href}
        onClick={(e) => handleLinkClick(e, props.href)}
        className="text-sm text-ink-foreground/70 transition-colors hover:text-brand"
      >
        {props.children}
      </Link>
    </li>
  );
}
