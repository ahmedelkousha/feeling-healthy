import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { Reveal } from "./Reveal";

export function LocationSection({
  title = "Visit Feeling Healthy",
  description = "We'd love to welcome you.",
}: {
  title?: string;
  description?: string;
}) {
  const directionsHref = site.contact.mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapsQuery)}`
    : undefined;

  return (
    <>
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -left-8 size-40 blob-alt bg-brand/40"
          />
          <img
            src="/images/clinic.jpg"
            alt="Reception area of the Feeling Healthy clinic"
            loading="lazy"
            width={1280}
            height={1024}
            className="relative lg:aspect-square aspect-video w-full rounded-[2.5rem] object-cover shadow-soft"
          />
        </Reveal>

        <Reveal delay={80}>
          <p className="eyebrow">Our Clinic</p>
          <h2 className="mt-3 text-2xl leading-[1.1] font-semibold md:text-4xl">{title}</h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-lg">{description}</p>

          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            <Detail icon={MapPin} label="Address" value={site.contact.address} />
            <Detail icon={Phone} label="Phone" value={site.contact.phone} />
            <Detail icon={Mail} label="Email" value={site.contact.email} />
            <div className="flex gap-3">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-accent">
                <Clock className="size-4" />
              </span>
              <div className="min-w-0">
                <dt className="text-sm font-medium">Opening Hours</dt>
                {site.contact.openingHours.map((h) => (
                  <dd key={h.days} className="text-sm text-muted-foreground">
                    {h.days}: {h.hours}
                  </dd>
                ))}
              </div>
            </div>
          </dl>

          <div className="mt-8">
            {directionsHref ? (
              <Button asChild size="default">
                <a href={directionsHref} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </Button>
            ) : (
              <Button size="lg" disabled title="Add the clinic address to enable directions">
                Get Directions
              </Button>
            )}
          </div>
        </Reveal>
        <div className="mt-6 overflow-hidden lg:col-span-2 col-span-1 max-h-[400px] rounded-2xl border border-border shadow-soft aspect-[16/9] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d56275.28490836233!2d153.541659!3d-28.170671!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6675cd5781da5%3A0xea0ddc7158e1c909!2sFeeling%20Healthy%20-%20Remedial%20Massage%2C%20Naturopathy%20%26%20Psychotherapy%20Tweed%20Heads!5e0!3m2!1sen!2sph!4v1785677285162!5m2!1sen!2sph"
              className="size-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Feeling Healthy Tweed Heads Location Map"
            />
          </div>
      </div>

    </>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-accent">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <dt className="text-sm font-medium">{label}</dt>
        <dd className="text-sm break-words text-muted-foreground">{value}</dd>
      </div>
    </div>
  );
}
