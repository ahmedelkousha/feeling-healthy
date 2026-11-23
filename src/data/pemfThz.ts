export type PemfThzProduct = {
  id: string;
  name: string;
  tagline: string;
  category: "Terahertz" | "PEMF" | "Dual-Tech";
  badge?: string;
  price: string;
  /** Price in smallest currency unit, e.g. 150000 = $1,500.00 */
  priceInCents: number;
  /** ISO currency code */
  currency: "usd" | "aud";
  description: string;
  benefits: string[];
  specs: string[];
  image: string;
};

export type PemfThzReview = {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  productName: string;
  title: string;
  comment: string;
  highlight: string;
};

export type PemfThzFaq = {
  question: string;
  answer: string;
};

export const pemfThzOverview = {
  eyebrow: "Advanced Frequency Wellness",
  title: "Recharge Your Cells with PEMF & Terahertz Therapy",
  subtitle: "Natural electromagnetic waves and thermal resonator frequencies designed to jumpstart cellular repair, boost micro-circulation, and release stubborn physical tension.",
  introParagraphs: [
    "At Feeling Healthy, we believe true healing happens when your body's energy system is balanced and operating at its natural vibration. Everyday stress, environmental toxins, poor sleep, and chronic inflammation can drain your cellular energy, leaving you feeling sluggish, sore, or out of sync.",
    "PEMF (Pulsed Electromagnetic Field) and Terahertz (THz) technologies harness safe, natural bio-frequencies that match the resonant energy of healthy human cells. By gently penetrating deep into muscle tissues, blood vessels, and joint spaces, these non-invasive devices help revitalise dormant cells, support nutrient uptake, and accelerate natural recovery.",
  ],
  pillars: [
    {
      title: "CELLULAR REPAIR",
      description: "Your body rebuilds itself. Daily use accelerates the process.",
      iconName: "ShieldCheck",
    },
    {
      title: "DEEP RECOVERY",
      description: "Less soreness. Less tension. More bounce back.",
      iconName: "Activity",
    },
    {
      title: "ENERGY & VITALITY",
      description: "Wake up feeling recharged. Move through your day with ease.",
      iconName: "Battery",
    },
    {
      title: "MENTAL CLARITY",
      description: "When your cells function better, so does your mind.",
      iconName: "Brain",
    },
  ],
};

export const practitionerRecommendations = {
  title: "Why Rosanna & Edmore Recommend PEMF / THz Therapy",
  subtitle: "Insights from our senior health directors at Feeling Healthy Tweed Heads",
  rosanna: {
    name: "Rosanna Mosca",
    role: "Senior Naturopath & Psychotherapist",
    image: "/images/rosanna-rec-profile.jpg",
    quote:
      "In naturopathy, we recognize that every organ and tissue in the human body operates on a unique energetic frequency. When disease or stress manifests physically, cellular energy drops. PEMF and Terahertz therapies work harmoniously with our clinical remedies — gently recharging cellular voltage so your body can absorb remedies faster and restore internal equilibrium.",
    points: [
      "Accelerates natural lymphatic drainage & systemic detox",
      "Restores cellular bio-voltage disrupted by stress and fatigue",
      "Safe, soothing, and easily integrated with naturopathic consultations",
    ],
  },
  edmore: {
    name: "Edmore Mahleka",
    role: "Senior Remedial Massage Therapist",
    image: "/images/edmore-rec-profile.jpg",
    quote:
      "As a remedial massage therapist working daily with chronic muscular pain, sports injuries, and joint stiffness, I have seen firsthand how Terahertz and PEMF waves melt away deep fascial tightness. Using these devices before or between massage sessions opens up blood flow, reduces inflammation, and allows clients to recover twice as fast.",
    points: [
      "Deeply relaxes rigid muscle fibers & stubborn trigger points",
      "Dramatically improves local micro-circulation & joint flexibility",
      "Ideal for pre-workout warmup or post-massage recovery at home",
    ],
  },
};

export const pemfThzProducts: PemfThzProduct[] = [
  {
    id: "galaxy-g1-max",
    name: "OlyLife Galaxy G1-MAX",
    tagline: "Advanced Eye-Care & Wellness Technology",
    category: "PEMF",
    badge: "Coming 2027",
    price: "$500 USD",
    priceInCents: 50000,
    currency: "usd",
    description:
      "The Galaxy G1-MAX is OlyLife's next-generation smart wellness wearable, designed to complement relaxation, meditation, eye-care, and morning wellness routines.",
    benefits: [
      "Dedicated Eye Care: Provides an eye-care experience designed for relaxation and comfort.",
      "Brain Biometric Sensing: Integrated wellness sensing uses sensor-derived information to help personalize the experience for each user.",
      "OtraLive App Connectivity: Supported features adapt to individual preferences and wellness routines over time.",
      "Multi-Function Design: Brings multiple wellness technologies together in one convenient device.",
    ],
    specs: [
      "Technologies: 7.8Hz PEMF, air-pressure massage, vibration massage, heating + cooling, and white noise",
      "Sleep Mode: Designed to complement relaxation and bedtime routines",
      "Meditation Mode: Designed to complement meditation and relaxation routines",
      "Wake-Up Eye Care: Designed to complement a refreshing morning wellness routine",
    ],
    image: "/images/products/galaxy_g1-max.webp",
  },
  {
    id: "circle1-c1",
    name: "OlyLife Circle1 C1 Warm Pad",
    tagline: "Multi-Technology Warming & Wellness System",
    category: "Dual-Tech",
    badge: "Coming 2027",
    price: "$2,000 USD",
    priceInCents: 200000,
    currency: "usd",
    description:
      "The Circle1 C1 is a multi-technology warming and wellness system designed to deliver a touchless wellness experience, combining advanced technologies in one integrated design.",
    benefits: [
      "Touchless Wellness: Designed to deliver multiple wellness technologies without traditional handheld use.",
      "Multi-Technology Core: Combines Apollo technology, PEMF, ultrasound, and far infrared in one system.",
      "Warming Experience: Gentle, consistent warmth to support your wellness routine.",
      "Ultrasound Experience: Includes advanced ultrasound technology with an external ultrasonad probe.",
    ],
    specs: [
      "Technologies: Magnetic, light, sound, and heat technology",
      "Internal Structure: 40,000 internal pyramid structures",
      "Expanded Compatibility: Works with attachments from Tera P90+ for more possibilities",
      "Smarter with OtraLive: App connectivity for a personalized experience within the OlyLife ecosystem",
    ],
    image: "/images/products/circle1_c1.webp",
  },
  {
    id: "sw-max",
    name: "OlyLife Spring Water SW-MAX",
    tagline: "Intelligent Personalized Water System",
    category: "Terahertz",
    badge: "Coming 2027",
    price: "$2,000 USD",
    priceInCents: 200000,
    currency: "usd",
    description:
      "The Spring Water SW-MAX is OlyLife's intelligent personalized water system, combining purification, mineralization, hydrogen-rich water, instant heating, and intelligent dispensing within a connected wellness ecosystem.",
    benefits: [
      "Advanced Purification: Helps remove impurities for cleaner, better-tasting water.",
      "Mineralization Technology: Adds essential minerals to support balanced, great-tasting water.",
      "Hydrogen-Rich Water: Delivers hydrogen-rich water as part of your daily wellness routine.",
      "Personalized Water Experience: Connects with the Smart Bracelet and OtraLive App, where wellness data is analyzed to support more personalized hydration.",
    ],
    specs: [
      "Instant Heating: Provides hot water on demand for greater convenience",
      "Intelligent Dispensing: Dispenses the right water temperature and volume for your needs",
      "Connectivity: Smart Bracelet integration, OtraLive App, and app control",
      "Easy Maintenance: Drawer-style filter replacement",
    ],
    image: "/images/products/sw-max.webp",
  },
  {
    id: "sw-lite",
    name: "OlyLife Spring Water SW-LITE",
    tagline: "Next-Evolution Hydrogen Water Generator with Water Filtration",
    category: "Terahertz",
    badge: "Coming 2027",
    price: "$600 USD",
    priceInCents: 60000,
    currency: "usd",
    description:
      "The Spring Water SW-LITE is the next evolution of the H Bar, with an upgraded, larger design that provides more hydrogen-rich water for everyday hydration.",
    benefits: [
      "Hydrogen Water Generation: Hydrogen generation technology provides hydrogen-rich water as a simple part of your daily routine.",
      "Water Filtration System: Helps reduce impurities for better-tasting, cleaner water.",
      "Instant Larger Capacity: Enhanced capacity delivers more hydrogen water for everyday hydration than the original H Bar.",
      "Upgraded Design: Continues the H Bar legacy with an improved everyday hydration experience at the same price.",
    ],
    specs: [
      "Functions: Cleanser water, hydrogen water, and everyday hydration in one device",
      "Everyday Hydration: Designed to support your daily water intake",
      "Simple to Use: Easy and convenient for daily use at home or in the office",
      "Upgrade Over H Bar: Larger capacity and improved design at the same price",
    ],
    image: "/images/products/sw-lite.webp",
  },
  {
    id: "smart-bracelet-otralive",
    name: "OlyLife Smart Health Bracelet + OtraLive App",
    tagline: "The Intelligence Layer of Your Wellness Journey",
    category: "Dual-Tech",
    badge: "Coming 2027",
    price: "Pricing TBA",
    priceInCents: 0, // TODO: no price published yet
    currency: "usd",
    description:
      "The Smart Health Bracelet and OtraLive App work together to create a smarter, more connected wellness experience, bringing your wellness data into personalized experiences across compatible OlyLife products.",
    benefits: [
      "Sense Your Data: The Smart Health Bracelet collects your personal wellness information.",
      "Understand Your Needs: OtraLive brings your information together and analyzes it to give you deeper insights.",
      "Personalized Wellness Experience: Supports more individualized experiences across compatible OlyLife products.",
      "One Ecosystem: Connects with compatible OlyLife products through OtraLive, such as Spring Water SW-MAX and Galaxy G1-MAX.",
    ],
    specs: [
      "Smart Health Bracelet: Wearable that collects personal wellness information",
      "OtraLive App: Brings your wellness information together in one place",
      "Data Analysis: Processes your data to give you deeper insights",
      "Ongoing Support: Helps you make more informed choices for your everyday wellness journey",
    ],
    image: "/images/products/smart-bracelet-otralive.webp",
  },
];

export const pemfThzReviews: PemfThzReview[] = [
  {
    id: "rev-1",
    author: "Sarah M.",
    location: "Tweed Heads, NSW",
    rating: 5,
    date: "12 May 2026",
    productName: "OlyLife THz Tera-P90+",
    title: "Changed my morning joint stiffness completely!",
    comment:
      "Rosanna recommended the OlyLife Tera-P90+ to support my chronic shoulder stiffness alongside my naturopathic remedies. Using it daily has made a noticeable difference. The dual-frequency warmth is deeply comforting and my range of motion has improved remarkably.",
    highlight: "Daily use made a noticeable difference in range of motion.",
  },
  {
    id: "rev-2",
    author: "David K.",
    location: "Coolangatta, QLD",
    rating: 5,
    date: "28 April 2026",
    productName: "OlyLife THz Tera-P90",
    title: "Best investment for sleep and athletic recovery",
    comment:
      "After Edmore worked on my hamstring strain, he suggested trying the Tera-P90 for home maintenance. I use it every evening for 20 minutes before bed. Not only did my muscle recovery speed up, but my sleep score on my watch has gone through the roof. Worth every cent!",
    highlight: "My muscle recovery sped up and my sleep quality improved tremendously.",
  },
  {
    id: "rev-3",
    author: "Elena P.",
    location: "Kingscliff, NSW",
    rating: 5,
    date: "3 June 2026",
    productName: "OlyLife Shaken Massager",
    title: "Relief for back tightness while sitting at work",
    comment:
      "I sit at a computer 8 hours a day and used to end every afternoon with severe lower back ache. The Shaken Massager gives instant warmth and deep magnetic pulse relief. Highly recommend!",
    highlight: "Instant warmth and deep pulse relief while sitting at my desk.",
  },
  {
    id: "rev-4",
    author: "Robert T.",
    location: "Murwillumbah, NSW",
    rating: 5,
    date: "19 June 2026",
    productName: "OlyLife Galaxy G-One",
    title: "My eyes feel refreshed and well-rested",
    comment:
      "I suffered from eye strain and headaches from screen time. Using the Galaxy G-One eye massager in the evening has been a game-changer. My eyes feel refreshed and relaxed within 15 minutes.",
    highlight: "My eyes feel refreshed and relaxed within 15 minutes.",
  },
  {
    id: "rev-5",
    author: "Michelle B.",
    location: "Gold Coast, QLD",
    rating: 5,
    date: "10 July 2026",
    productName: "OlyLife Vitality Wand",
    title: "Deep soothing warmth and hands-free convenience",
    comment:
      "The Vitality Wand has been incredible for relieving persistent tension in my neck and upper back. Setting it up on the stand lets me relax completely while the Terahertz heat and airflow do their work.",
    highlight: "Deep soothing warmth and hands-free setup.",
  },
  {
    id: "rev-6",
    author: "Anthony H.",
    location: "Banora Point, NSW",
    rating: 5,
    date: "25 July 2026",
    productName: "OlyLife H+ Bar",
    title: "Instant energy boost and noticeable hydration",
    comment:
      "I started drinking hydrogen water from the H+ Bar daily after my workout sessions. I've noticed less muscle fatigue during the day and better overall energy levels. Easy to take with me everywhere.",
    highlight: "Less muscle fatigue and better overall energy levels.",
  },
];

export const pemfThzFaqs: PemfThzFaq[] = [
  {
    question: "What is the difference between PEMF and Terahertz (THz) therapy?",
    answer:
      "PEMF (Pulsed Electromagnetic Field) uses low-frequency magnetic pulses to stimulate cellular voltage and repair, similar to Earth's natural magnetic frequency. Terahertz (THz) therapy utilizes non-ionizing light-wave frequencies between microwave and infrared bands, penetrating deep into tissue to vibrate water molecules, dilate micro-vessels, and ease tissue stiffness. Combined in devices like the OlyLife Tera-P90+, they offer comprehensive cellular & circulation support.",
  },
  {
    question: "Are OlyLife PEMF and Terahertz products safe to use at home?",
    answer:
      "Yes, OlyLife products use safe, non-ionizing frequencies that match natural bio-resonance. They are non-invasive and easy to operate. However, if you have a pacemaker, active medical implant, epilepsy, or are pregnant, please consult Rosanna or your doctor prior to use.",
  },
  {
    question: "How quickly can I expect to feel results?",
    answer:
      "Many clients experience immediate soothing warmth, muscle relaxation, and reduced tension during their first session. For chronic conditions, cumulative cellular benefits typically build over 2 to 4 weeks of regular daily use.",
  },
  {
    question: "Can I try these products at the Feeling Healthy clinic before buying?",
    answer:
      "Absolutely! We encourage clients to discuss OlyLife devices with Rosanna Mosca or Edmore Mahleka during your consultation or massage session. You can experience the devices firsthand and receive personalized guidance tailored to your health goals.",
  },
  {
    question: "How do I order a product, and how is it delivered?",
    answer:
      "Simply fill out the Order Form at the bottom of this page by clicking 'Order' on your preferred product card. You can choose express home shipping across Australia or select free clinic pick-up at Feeling Healthy in Tweed Heads. Our clinic reception team will confirm your order details and payment options promptly.",
  },
  {
    question: "Do OlyLife products come with a warranty and support?",
    answer:
      "Yes! All our recommended OlyLife products come with a 12-month manufacturer warranty, power safety plug, user manual, and ongoing guidance from our clinic team whenever you have questions.",
  },
];
