export type PemfThzProduct = {
  id: string;
  name: string;
  tagline: string;
  category: "Terahertz" | "PEMF" | "Dual-Tech";
  badge?: string;
  price: string;
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
    id: "tera-p90-plus",
    name: "OlyLife THz Tera-P90+",
    tagline: "All-in-One Wellness Ecosystem with PEMF, THz, RF & EMS",
    category: "Dual-Tech",
    badge: "Flagship Model",
    price: "$1,500 USD",
    description:
      "The OlyLife THz Tera-P90+ is an all-in-one wellness device combining PEMF technology with beauty and massage tools for comprehensive relaxation and rejuvenation.",
    benefits: [
      "All-in-One Wellness Ecosystem: Integrated platform combining Pulsed Electromagnetic Field (PEMF), Terahertz (THz) waves, Radio Frequency (RF), and EMS for total body health.",
      "Dual-Frequency Core: World's first integrated PEMF and Terahertz technology to charge cells, activate dormant energy, and improve microcirculation.",
      "Frost Age Beauty Device: Dedicated attachment using RF and EMS to stimulate collagen, firm skin, and provide anti-aging benefits for a youthful complexion.",
      "Revitaluxe 3-in-1 Massager: Combines magnetic fusion, TENS/EMS, and Red Light Therapy to target muscle relaxation, pain relief, and scalp/hair health.",
    ],
    specs: [
      "Customized Intensity: 20-level intensity control system (from walking to sprinting modes)",
      "Deep Tissue Penetration: Delivers bio-resonance energy 3–5 cm deep to support natural repair",
      "Upgraded Ergonomics: Enlarged foot pedal design (up to shoe size 13/47 UK) & wireless remote",
      "Comprehensive Health Support: Assists with inflammation, metabolic waste removal, & sleep quality",
    ],
    image: "/images/products/thz_tera-p90+.png",
  },
  {
    id: "tera-p90",
    name: "OlyLife THz Tera-P90",
    tagline: "Bio-Electromagnetic & Terahertz Cellular Health Device",
    category: "Dual-Tech",
    badge: "Best Seller",
    price: "$1,000 USD",
    description:
      "The OlyLife THz Tera-P90 boosts cellular health by combining bioelectromagnetic and terahertz energy.",
    benefits: [
      "Dual-Frequency Technology: Integrates Pulsed Electromagnetic Field (PEMF) and Terahertz-based frequency patterns for a comprehensive wellness experience.",
      "Terahertz 'Light of Life': Utilizes a focused energy band (3−3000μm) that resonates with body molecules to improve microcirculation.",
      "Deep Penetration: Delivers energy 4–5 cm beneath the skin to enhance cellular interaction and improve tissue health.",
      "PEMF Support: Uses low-frequency signals to support relaxation, general wellness, and the body's natural balance.",
    ],
    specs: [
      "Terahertz Spectrum: 3−3000μm focused energy band",
      "Penetration Depth: 4–5 cm beneath the skin",
      "Revitalizing Benefits: Promotes vitality, physical comfort, & daily self-care routines",
      "User-Centric Design: Non-invasive, gentle, and easy-to-use interface",
    ],
    image: "/images/products/tera-p90.png",
  },
  {
    id: "galaxy-g-one",
    name: "OlyLife Galaxy G-One",
    tagline: "Foldable Smart Eye Massager with PEMF Technology",
    category: "PEMF",
    badge: "Eye Wellness",
    price: "$500 USD",
    description:
      "The GALAXY G-one is a foldable smart eye massager with PEMF technology, offering 7 eye care modes, 4 technologies, and easy one-button control for on-the-go comfort.",
    benefits: [
      "Smart Eye Wellness: Dedicated device designed to support relaxation and visual comfort around the eye area.",
      "Low-Frequency PEMF: Core pulsed electromagnetic field technology to support general wellness and relaxation.",
      "Multi-Mode Massage: Six-zone airbag and intermittent vibration massage functions for a soothing experience.",
      "Warm Compress Technology: Gentle, constant-temperature warm compress to enhance the calming effect.",
    ],
    specs: [
      "7 Care Modes: Customize massage, vibration, and warmth for a tailored session",
      "Technologies: PEMF, 6-Zone Airbag, Intermittent Vibration, Warm Compress",
      "Portable & User-Friendly: Lightweight, foldable design with simple one-button operation",
      "Restorative Benefits: Provides relief after long periods of screen time",
    ],
    image: "/images/products/galaxy_g-one.png",
  },
  {
    id: "shaken-massager",
    name: "OlyLife Shaken Massager",
    tagline: "7-in-1 Waist & Core Health Shaping Device",
    category: "PEMF",
    badge: "Core Health",
    price: "$1,000 USD",
    description:
      "The Shaken Massager targets stubborn belly fat using 7-in-1 technology including PEMF, ultrasound, and heat therapy to shape the waist and support core health.",
    benefits: [
      "7-in-1 Advanced Technology: Combines PEMF, Ultrasound, RF, EMS, Vibration, Heat Therapy, and Red Light Therapy.",
      "Targeted Fat Reduction: CellBreak™ technology using ultrasound sound waves (acoustic cavitation) to mobilize fat cells.",
      "Deep Cellular Wellness: Ultra-low frequency PEMF to support microcirculation up to 20cm deep.",
      "Skin Firming & Anti-Aging: Employs RF technology and Red Light Therapy to stimulate collagen and improve skin texture.",
    ],
    specs: [
      "Effortless Core Engagement: High-frequency vibration mimics core workout effects",
      "AI Adaptive Control: Tracks heart rate, SpO₂, & body temperature to auto-adjust intensity",
      "Smartwatch Integration: Dedicated smartwatch to switch modes & monitor real-time health data",
      "Ergonomic Design: Soft, hypoallergenic silicone with adjustable fit (24 to 55 inches)",
    ],
    image: "/images/products/shaken_massager.png",
  },
  {
    id: "vitality-wand",
    name: "OlyLife Vitality Wand",
    tagline: "Ultra-Long & Terahertz Bio-Energy Wave Wand",
    category: "Terahertz",
    badge: "Hands-Free Design",
    price: "$600 USD",
    description:
      "The Vitality Wand uses ultra-long and biological energy waves with adjustable heat and airflow for a hands-free, fatigue-relieving experience.",
    benefits: [
      "Core Frequency Technology: Utilizes ultra-long wave frequency (PEMF) and Terahertz waves (1 THz) for deep-penetrating wellness.",
      "Triple-Action Support: Combines frequency technology with gentle warmth and air pressure massage.",
      "Circulation & Detox: Supports healthy microcirculation, assists in detoxification, and removes cold & dampness.",
      "Meridian Care: Engineered to dredge meridians, promoting smoother energy flow.",
    ],
    specs: [
      "Frequency: Ultra-long wave (PEMF) + 1 THz Terahertz wave",
      "Thermal Relief: Alleviates muscle tension, reduces inflammation, and increases tissue flexibility",
      "Intuitive Air Massage: Controlled airflow for uniform and consistent pressure",
      "Hands-Free Ease: Intelligent stand allows hands-free use during self-care sessions",
    ],
    image: "/images/products/vitality_wand.png",
  },
  {
    id: "h-plus-bar",
    name: "OlyLife H+ Bar",
    tagline: "Hydrogen-Rich Water Generator with MRET Low-Frequency Resonance",
    category: "Terahertz",
    badge: "Cellular Hydration",
    price: "$600 USD",
    description:
      "The H+ Bar is a portable water bottle that produces antioxidant-rich hydrogen water and enhances absorption with MRET low-frequency resonance technology.",
    benefits: [
      "Dual-Function Wellness: Combines molecular hydrogen infusion with MRET (Molecular Resonance Effect Technology).",
      "MRET Low-Frequency Resonance: Restructures water molecules into a linear structure for enhanced cellular absorption.",
      "Selective Antioxidant Power: Infuses water with dissolved molecular hydrogen (H₂) to neutralize free radicals.",
      "Deep Cellular Hydration: Small structured water clusters pass through aquaporins efficiently for deeper hydration.",
    ],
    specs: [
      "Energy & Recovery: Supports mitochondrial function to reduce cellular fatigue & lactic acid buildup",
      "Anti-Aging & Skin Support: Promotes healthier-looking skin & protects DNA from oxidative stress",
      "Dual-Chamber Design: Proton exchange membrane (Dry Membrane) & pressure injection tech",
      "Portable & Durable: Heat-resistant, non-slip, and waterproof design for any beverage",
    ],
    image: "/images/products/h+_bar.png",
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
