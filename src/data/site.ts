/**
 * Global site configuration.
 * Real contact details from feelinghealthy.com.au
 */
export const site = {
  name: "Feeling Healthy",
  tagline: "Remedial Massage, Naturopathy & Psychotherapy in Tweed Heads.",
  contact: {
    address: "17 Bay St, Tweed Heads NSW 2485",
    phone: "(07) 5607 4152",
    email: "reception@feelinghealthy.com.au",
    openingHours: [
      { days: "Monday – Saturday", hours: "9:00 AM – 5:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    mapsQuery: "17 Bay St, Tweed Heads NSW 2485",
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/FeelingHealthyWellnessHub/" },
    { label: "Instagram", href: "https://www.instagram.com/feelinghealthywellnesshub/" },
  ],
} as const;

export type NavItem = { label: string; to: string; isDropdown?: boolean };

export const AboutUsNav = [
  { label: "Our Story", to: "/about", description: "Our philosophy, history, and holistic approach." },
  { label: "Practitioners", to: "/practitioners", description: "Meet Rosanna Mosca and Edmore Mahleka." },
  { label: "Resources", to: "/resources", description: "Health articles, guidance, and patient tools." },
  { label: "Contact", to: "/contact", description: "Clinic location, opening hours, and inquiries." },
] as const;

export const primaryNav: NavItem[] = [
  { label: "Services", to: "/services", isDropdown: true },
  { label: "PEMF / THz", to: "/pemf-thz" },
  { label: "Your Wellbeing", to: "/your-wellbeing" },
  { label: "About Us", to: "/about", isDropdown: true },
];

export const bookCta = { label: "Book an Appointment", to: "/book" } as const;
