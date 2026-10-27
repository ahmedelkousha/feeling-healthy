export type CategoryId = "mind" | "physical" | "nutrition" | "womens" | "other" | "packages";

export type ServiceCategory = {
  id: CategoryId;
  title: string;
  blurb: string;
  image: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "physical",
    title: "Physical Health & Massage",
    blurb: "Naturopathy, remedial massage, relaxation, and pregnancy bodywork tailored to your body.",
    image: "/images/service-massage.jpg",
  },
  {
    id: "mind",
    title: "Psychotherapy & Counselling",
    blurb: "Counselling, clinical hypnosis, and thought field therapy supporting clarity, calm, and emotional healing.",
    image: "/images/service-counselling.jpg",
  },
  {
    id: "other",
    title: "Other Services",
    blurb: "Bowen therapy, acute phone support, and comprehensive health reviews.",
    image: "/images/service-testing.jpg",
  },
  {
    id: "packages",
    title: "Transformation Packages",
    blurb: "Structured multi-session transformation programs for lasting breakthroughs.",
    image: "/images/service-hypnosis.jpg",
  },
];

export type Faq = { question: string; answer: string };

export type ServiceOption = {
  id: string;
  name: string;
  durationMins: number;
  durationDisplay: string;
  priceInCents: number;
  priceDisplay: string;
  note?: string;
  newClientsOnly?: boolean;
};

export type Service = {
  slug: string;
  name: string;
  category: CategoryId;
  short: string;
  description: string;
  /** Price in cents AUD, e.g. 12000 = $120.00 */
  priceInCents: number;
  /** Human-readable price, e.g. "$120" */
  priceDisplay: string;
  image?: string;
  featured?: boolean;
  options: ServiceOption[];
  howItHelps: string[];
  whatToExpect: string[];
  whoItsFor: string[];
  faqs?: Faq[];
  related?: string[];
};

const defaultExpect = (name: string) => [
  `Your first ${name.toLowerCase()} appointment starts with a relaxed conversation about your health, history and what you'd like support with.`,
  "Your practitioner explains what a session involves and answers any questions before you begin.",
  "Together you agree a simple, realistic plan and decide whether follow-up appointments would be useful.",
];

const defaultFaqs = (name: string): Faq[] => [
  {
    question: `How long is a ${name.toLowerCase()} appointment?`,
    answer:
      "Appointment lengths typically range from 45 to 90 minutes. Initial consultations include a full health assessment.",
  },
  {
    question: "Do I need a referral?",
    answer:
      "No referral is needed. You can book directly with us online or over the phone. If anything falls outside our scope, we will gladly signpost you to your GP.",
  },
  {
    question: "What should I bring?",
    answer:
      "Please bring yourself and any relevant health records or notes you would like to share with your practitioner.",
  },
];

type ServiceSeed = Omit<Service, "whatToExpect" | "faqs" | "options"> & {
  options?: ServiceOption[];
} & Partial<Pick<Service, "whatToExpect" | "faqs">>;

/** Helper: shorthand for defining a price (dollars → cents). */
const price = (dollars: number) => ({
  priceInCents: dollars * 100,
  priceDisplay: dollars === 0 ? "Free" : `$${dollars}`,
});

const seeds: ServiceSeed[] = [
  // =========================================================================
  // SELECTED SERVICES
  // =========================================================================

  // 1. NATUROPATHY (Naturapathy)
  {
    slug: "naturopathy",
    name: "Naturopathy",
    category: "physical",
    featured: true,
    ...price(190),
    image: "/images/service-naturopathy.jpg",
    short: "A whole-person look at diet, lifestyle and natural health support.",
    description:
      "Naturopathy considers the whole picture — how you eat, sleep, move and recover — and looks for simple, sustainable changes that support your body's own balance.",
    options: [
      {
        id: "nat-discovery",
        name: "Complimentary Health Discovery Session",
        durationMins: 30,
        durationDisplay: "30 mins",
        priceInCents: 0,
        priceDisplay: "Free",
        newClientsOnly: true,
        note: "A free 30 minute appointment. Invest just 30 minutes with one of our Naturopaths to help you discover where and why you may be struggling with your health. We'll help you navigate the world of contradictory nutritional advice, understand exactly what works for you and determine whether natural medicine can help with your health concerns. Please Note: This session is for new clients only.",
      },
      {
        id: "nat-initial",
        name: "Initial Naturopathic Appointment",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 19000,
        priceDisplay: "$190",
        note: "Your first Naturopathy appointment with Feeling Healthy. All Naturopathy appointments are claimable on private health insurance through our HICAPS machine.",
      },
      {
        id: "nat-sub-30",
        name: "Subsequent Naturopathy",
        durationMins: 30,
        durationDisplay: "30 mins",
        priceInCents: 9500,
        priceDisplay: "$95",
        note: "Ongoing consultation to review progress, adjust remedies, and maintain momentum.",
      },
      {
        id: "nat-sub-45",
        name: "Subsequent Naturopathy",
        durationMins: 45,
        durationDisplay: "45 mins",
        priceInCents: 13500,
        priceDisplay: "$135",
        note: "Follow-up consultation to evaluate remedies and support your ongoing health goals.",
      },
      {
        id: "nat-sub-60",
        name: "Subsequent Naturopathy",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 17500,
        priceDisplay: "$175",
        note: "Comprehensive ongoing consultation for in-depth health review and tailored adjustments.",
      },
    ],
    howItHelps: [
      "A joined-up view of diet, sleep, stress and energy",
      "Personalised, realistic lifestyle suggestions",
      "Ongoing review so your plan adapts over time",
    ],
    whoItsFor: [
      "People wanting a natural, whole-person approach",
      "Anyone juggling several wellbeing concerns at once",
      "Clients looking for long-term habits rather than quick fixes",
    ],
    related: ["counselling", "free-holistic-health-review", "acute-telephone-support"],
  },

  // 2. REMEDIAL MASSAGE
  {
    slug: "remedial-massage",
    name: "Remedial Massage",
    category: "physical",
    featured: true,
    ...price(125),
    image: "/images/service-massage.jpg",
    short: "Targeted remedial and deep tissue bodywork to relieve pain and restore movement.",
    description:
      "Targeted remedial massage consultations with Edmore Mahleka. Includes an assessment of your posture, movement, and specific muscular pain points followed by focused treatment.",
    options: [
      {
        id: "rem-initial-60",
        name: "Initial Remedial Massage",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 13000,
        priceDisplay: "$130",
        note: "Your first remedial massage consultation with Edmore Mahleka. Includes physical assessment and targeted treatment.",
      },
      {
        id: "rem-30",
        name: "Remedial Massage",
        durationMins: 30,
        durationDisplay: "30 mins",
        priceInCents: 7500,
        priceDisplay: "$75",
        note: "Targeted remedial bodywork focusing on a specific problem area.",
      },
      {
        id: "rem-45",
        name: "Remedial Massage",
        durationMins: 45,
        durationDisplay: "45 mins",
        priceInCents: 10000,
        priceDisplay: "$100",
        note: "Focused remedial and trigger point therapy to release tight muscles.",
      },
      {
        id: "rem-60",
        name: "Remedial Massage",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 12500,
        priceDisplay: "$125",
        note: "Comprehensive remedial consultation addressing postural alignment and deep tension.",
      },
    ],
    howItHelps: [
      "Identifies the source of muscular aches, joint restriction, and chronic pain",
      "Releases tight fascia, trigger points, and muscle spasms",
      "Restores range of motion, functional mobility, and physical comfort",
    ],
    whoItsFor: [
      "Anyone experiencing neck, shoulder, back, or hip pain",
      "Athletes and active individuals recovering from physical strain",
      "People seeking private health rebate eligible remedial care",
    ],
    related: ["relaxation-massage", "bowen-therapy", "pregnancy-massage"],
  },

  // 3. RELAXATION MASSAGE
  {
    slug: "relaxation-massage",
    name: "Relaxation Massage",
    category: "physical",
    featured: true,
    ...price(120),
    image: "/images/service-relaxation-massage.png",
    short: "Gentle, flowing full-body massage designed to soothe the nervous system and melt away stress.",
    description:
      "A calming massage that eases everyday stress, relieves physical fatigue, improves circulation, and encourages deep, rejuvenating rest.",
    options: [
      {
        id: "relax-30",
        name: "Relaxation Massage",
        durationMins: 30,
        durationDisplay: "30 mins",
        priceInCents: 7000,
        priceDisplay: "$70",
        note: "Focused relaxation massage targeting upper back, neck, and shoulders.",
      },
      {
        id: "relax-45",
        name: "Relaxation Massage",
        durationMins: 45,
        durationDisplay: "45 mins",
        priceInCents: 9500,
        priceDisplay: "$95",
        note: "Restorative massage soothing the nervous system and easing muscular fatigue.",
      },
      {
        id: "relax-60",
        name: "Relaxation Massage",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 12000,
        priceDisplay: "$120",
        note: "Full-body gentle, flowing massage to encourage deep relaxation and restful sleep.",
      },
    ],
    howItHelps: [
      "Down-regulates the sympathetic (fight-or-flight) nervous system",
      "Improves blood circulation and promotes restful sleep",
      "Gentle release of daily physical tension",
    ],
    whoItsFor: [
      "Anyone feeling overworked, mentally exhausted, or physically drained",
      "People who prefer gentle, relaxing pressure over deep tissue work",
    ],
    related: ["remedial-massage", "pregnancy-massage"],
  },

  // 4. PREGNANCY MASSAGE
  {
    slug: "pregnancy-massage",
    name: "Pregnancy Massage",
    category: "physical",
    featured: true,
    ...price(125),
    image: "/images/service-pregnancy.jpg",
    short: "Specialised prenatal bodywork safely easing pregnancy aches, fluid retention, and back strain.",
    description:
      "Safe, supportive prenatal massage tailored specifically for expectant mothers. Uses nurturing techniques and comfortable positioning to relieve lower back pain, pelvic tightness, and swollen limbs.",
    options: [
      {
        id: "preg-30",
        name: "Pregnancy Massage",
        durationMins: 30,
        durationDisplay: "30 mins",
        priceInCents: 7500,
        priceDisplay: "$75",
        note: "Safe, targeted prenatal massage focusing on lower back, hips, or swollen legs.",
      },
      {
        id: "preg-60",
        name: "Pregnancy Massage",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 12500,
        priceDisplay: "$125",
        note: "Full-body nurturing prenatal massage tailored for comfort and physical relief during pregnancy.",
      },
    ],
    howItHelps: [
      "Relieves strain in the lower back, hips, glutes, and sciatic region",
      "Reduces swelling and fluid retention in legs and ankles",
      "Provides gentle relaxation and restorative comfort during pregnancy",
    ],
    whoItsFor: [
      "Expectant mothers in their second or third trimesters needing physical relief",
    ],
    related: ["relaxation-massage", "remedial-massage"],
  },

  // 5. CLINICAL HYPNOSIS
  {
    slug: "clinical-hypnosis",
    name: "Clinical Hypnosis",
    category: "mind",
    featured: true,
    ...price(190),
    image: "/images/service-hypnosis.jpg",
    short: "A focused, deeply relaxed state communicating with the subconscious to work on specific goals.",
    description:
      "Clinical hypnotherapy combines hypnosis with psychological treatment. It involves entering a deeply relaxed state where the practitioner communicates with the subconscious mind to address symptoms, habits, and mindset blocks.",
    options: [
      {
        id: "hypno-60",
        name: "Clinical Hypnosis",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 19000,
        priceDisplay: "$190",
        note: "Clinical hypnotherapy is a combination of hypnosis and a psychological treatment. It involves getting you into a relaxed state where the therapist can communicate with the subconscious part of your mind and make suggestions relevant to your symptoms.",
      },
    ],
    howItHelps: [
      "Deep relaxation as a starting point for change",
      "Focused work on habits, responses, or specific goals",
      "Empowering techniques you can use again on your own",
    ],
    whoItsFor: [
      "People curious about mind-based approaches",
      "Clients working on a specific, agreed habit or goal",
      "Anyone who finds relaxation-based methods helpful",
    ],
    related: ["counselling", "thought-field-therapy", "six-session-transformation"],
  },

  // 6. COUNSELLING
  {
    slug: "counselling",
    name: "Counselling",
    category: "mind",
    featured: true,
    ...price(150),
    image: "/images/service-counselling.jpg",
    short: "A calm, confidential space to talk things through at your own pace.",
    description:
      "Counselling gives you time and space with someone whose only focus is you. Sessions are led by what matters to you, whether that's something specific or a general sense that things feel harder than they should.",
    options: [
      {
        id: "counsel-60",
        name: "Counselling",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 15000,
        priceDisplay: "$150",
        note: "A calm, confidential 60-minute space to talk things through at your own pace with Rosanna Mosca.",
      },
    ],
    howItHelps: [
      "A confidential space to talk without judgement",
      "Support in making sense of difficult feelings or decisions",
      "Practical ways of coping that fit your life",
    ],
    whoItsFor: [
      "Anyone feeling stressed, low, anxious or stuck",
      "People going through change, loss or pressure",
      "Those who prefer talking to being told what to do",
    ],
    related: ["clinical-hypnosis", "thought-field-therapy"],
  },

  // 7. THOUGHT FIELD THERAPY
  {
    slug: "thought-field-therapy",
    name: "Thought Field Therapy",
    category: "mind",
    ...price(140),
    image: "/images/service-thought-field-therapy.jpg",
    short: "A gentle tapping-based technique used for emotional responses, phobias, and stress.",
    description:
      "Thought Field Therapy (TFT) uses a simple sequence of tapping points on meridian lines while focusing on a specific feeling or situation. It helps rapidly neutralise emotional distress naturally.",
    options: [
      {
        id: "tft-60",
        name: "Thought Field Therapy",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 14000,
        priceDisplay: "$140",
        note: "A gentle 60-minute tapping-based therapy to neutralize emotional distress, fears, phobias, and anxiety.",
      },
    ],
    howItHelps: [
      "Rapid reduction in emotional intensity and physiological stress",
      "Focused work on a specific feeling, phobia, or situation",
      "Something you can practise independently between sessions",
    ],
    whoItsFor: [
      "People curious about gentle, drug-free emotional techniques",
      "Clients who prefer practical somatic exercises",
      "Anyone managing stress, fears, or emotional overwhelm",
    ],
    related: ["counselling", "clinical-hypnosis"],
  },

  // 8. OTHER SERVICES: Acute Telephone Support
  {
    slug: "acute-telephone-support",
    name: "Acute Telephone Support",
    category: "other",
    ...price(45),
    image: "/images/service-acute-telephone.jpg",
    short: "15-minute phone consultation with Rosanna Mosca for urgent advice and remedy guidance.",
    description:
      "A focused 15-minute phone appointment with Rosanna Mosca for acute health questions, dosage adjustments, prescription refills, or immediate natural medicine advice when you need guidance quickly.",
    options: [
      {
        id: "acute-phone-15",
        name: "Acute Telephone Support",
        durationMins: 15,
        durationDisplay: "15 mins",
        priceInCents: 4500,
        priceDisplay: "$45",
        note: "A focused 15-minute phone appointment with Rosanna Mosca for acute health questions, dosage adjustments, or prescription refills.",
      },
    ],
    howItHelps: [
      "Quick professional guidance for sudden acute symptoms or seasonal bugs",
      "Clarification of supplement doses, herbal formulations, or interactions",
      "Convenient support from home without travel",
    ],
    whoItsFor: [
      "Clients managing sudden acute conditions needing fast clinical guidance",
      "Existing clients with quick follow-up or dosage questions",
    ],
    related: ["naturopathy", "free-holistic-health-review"],
  },

  // 9. OTHER SERVICES: Bowen Therapy
  {
    slug: "bowen-therapy",
    name: "Bowen Therapy",
    category: "other",
    ...price(110),
    image: "/images/service-bowen-therapy.jpg",
    short: "Gentle soft-tissue rolling moves stimulating the body's natural self-healing and alignment.",
    description:
      "Bowen Therapy is a subtle, non-invasive physical therapy performed by Edmore Mahleka. It uses gentle rolling moves over precise muscles, tendons, and ligaments with deliberate pauses to prompt self-healing and structural realignment.",
    options: [
      {
        id: "bowen-45",
        name: "Bowen Therapy",
        durationMins: 45,
        durationDisplay: "45 mins",
        priceInCents: 11000,
        priceDisplay: "$110",
        note: "Subtle, non-invasive physical therapy using gentle rolling moves over precise muscles, tendons, and ligaments.",
      },
    ],
    howItHelps: [
      "Promotes deep musculoskeletal relaxation and structural rebalancing",
      "Gentle approach suitable when standard deep tissue massage is contraindicated",
      "Can help with back pain, neck stiffness, respiratory, and postural issues",
    ],
    whoItsFor: [
      "Individuals with acute pain, sensitive nervous systems, or chronic fatigue",
      "People seeking a gentle, clothes-on physical bodywork approach",
    ],
    related: ["remedial-massage", "relaxation-massage"],
  },

  // 10. OTHER SERVICES: Free Holistic Health Review
  {
    slug: "free-holistic-health-review",
    name: "Free Holistic Health Review",
    category: "other",
    featured: true,
    priceInCents: 0,
    priceDisplay: "Free",
    image: "/images/service-free-review.jpg",
    short: "A complimentary 60-minute in-depth health review with Rosanna Mosca.",
    description:
      "A comprehensive, complimentary 60-minute holistic health review with Rosanna Mosca to evaluate your overall wellbeing, review lifestyle factors, and establish a clear natural healthcare pathway forward.",
    options: [
      {
        id: "free-review-60",
        name: "Free Holistic Health Review",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 0,
        priceDisplay: "Free",
        note: "A complimentary 60-minute in-depth health review with Rosanna Mosca to evaluate your overall wellbeing and establish a natural healthcare roadmap.",
      },
    ],
    howItHelps: [
      "In-depth 60-minute review of multiple body systems and wellbeing goals",
      "Expert perspective on natural treatment possibilities for your situation",
      "Clear understanding of which therapy or combination of therapies fits best",
    ],
    whoItsFor: [
      "Anyone wanting a generous, comprehensive initial health review at zero cost",
      "New clients exploring natural medicine for the first time",
    ],
    related: ["naturopathy", "clinical-hypnosis", "counselling"],
  },

  // 11. PACKAGES: Six Session Transformation Package
  {
    slug: "six-session-transformation",
    name: "Six Session Transformation Package",
    category: "packages",
    featured: true,
    ...price(900),
    image: "/images/service-woman-health.jpg",
    short: "A 6-session structured transformation journey combining naturopathy, mind-body therapy, and guidance.",
    description:
      "A dedicated six-session holistic transformation journey with Rosanna Mosca. Sessions are structured 60-minute consultations tailored step-by-step to address physical vitality, emotional clarity, and sustainable wellness breakthroughs.",
    options: [
      {
        id: "six-sess-1",
        name: "Session 1",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 15000,
        priceDisplay: "$150",
        note: "60 min transformation session with Rosanna Mosca.",
      },
      {
        id: "six-sess-2",
        name: "Session 2",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 15000,
        priceDisplay: "$150",
        note: "60 min transformation session with Rosanna Mosca.",
      },
      {
        id: "six-sess-3",
        name: "Session 3",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 15000,
        priceDisplay: "$150",
        note: "60 min transformation session with Rosanna Mosca.",
      },
      {
        id: "six-sess-4",
        name: "Session 4",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 15000,
        priceDisplay: "$150",
        note: "60 min transformation session with Rosanna Mosca.",
      },
      {
        id: "six-sess-5",
        name: "Session 5",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 15000,
        priceDisplay: "$150",
        note: "60 min transformation session with Rosanna Mosca.",
      },
      {
        id: "six-sess-6",
        name: "Session 6",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 15000,
        priceDisplay: "$150",
        note: "60 min transformation session with Rosanna Mosca.",
      },
    ],
    howItHelps: [
      "Structured progression tackling physical and emotional obstacles step-by-step",
      "Combines naturopathic guidance, clinical hypnosis, and counselling for lasting change",
      "Regular accountability and tailored adaptations keeping you on track",
    ],
    whoItsFor: [
      "Individuals committed to a structured 6-step health transformation",
      "Anyone desiring consistent, personalized guidance across body and mind",
    ],
    related: ["twelve-session-transformation", "clinical-hypnosis", "naturopathy"],
  },

  // 12. PACKAGES: Twelve Session Transformation Package
  {
    slug: "twelve-session-transformation",
    name: "Twelve Session Transformation Package",
    category: "packages",
    featured: true,
    ...price(1680),
    image: "/images/service-woman-health.jpg",
    short: "A comprehensive 12-session programme for profound, long-term health and mindset breakthroughs.",
    description:
      "A complete twelve-session transformation programme with Rosanna Mosca providing in-depth support, natural therapies, and mindset rebalancing. Delivers deep holistic rehabilitation over a dedicated 12-session lifecycle.",
    options: [
      {
        id: "twelve-sess-1",
        name: "Session 1",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 14000,
        priceDisplay: "$140",
        note: "60 min transformation session with Rosanna Mosca.",
      },
      {
        id: "twelve-sess-followup",
        name: "Ongoing Session (Sessions 2–12)",
        durationMins: 60,
        durationDisplay: "60 mins",
        priceInCents: 14000,
        priceDisplay: "$140",
        note: "60 min transformation session with Rosanna Mosca.",
      },
    ],
    howItHelps: [
      "Complete holistic rehabilitation over a dedicated 12-session lifecycle",
      "Addresses deep-seated health challenges, lifestyle habits, and subconscious beliefs",
      "Comprehensive natural medicine support tailored every step of the journey",
    ],
    whoItsFor: [
      "Clients desiring complete, supported transformation of their health and wellbeing",
      "People navigating complex, long-standing health challenges",
    ],
    related: ["six-session-transformation", "clinical-hypnosis", "counselling"],
  },

  // =========================================================================
  // COMMENTED OUT SERVICES (Not in selected list)
  // =========================================================================
  /*
  {
    slug: "massage",
    name: "Massage",
    category: "physical",
    ...price(120),
    image: "/images/service-massage.jpg",
    short: "Hands-on therapeutic massage tailored to your body, tension and comfort.",
    description:
      "Our massage appointments are tailored to you rather than a fixed routine — from gentle relaxation work to focused attention on areas of tension. Your therapist checks in with you throughout so the pressure and pace always feel right.",
    howItHelps: [
      "May help you feel more relaxed and less physically tense",
      "Often used alongside support for stress, sleep and general wellbeing",
      "Can form part of a wider plan for movement and recovery",
    ],
    whoItsFor: [
      "People carrying everyday tension in the neck, back or shoulders",
      "Anyone wanting dedicated time to slow down",
      "Clients combining hands-on care with other services",
    ],
    related: ["sports-injuries", "stress-anxiety", "fatigue"],
  },
  {
    slug: "nutrition",
    name: "Nutrition",
    category: "nutrition",
    ...price(130),
    image: "/images/service-nutrition.jpg",
    short: "Practical, personalised food guidance without restrictive rules.",
    description:
      "Nutrition appointments translate general advice into something workable for your routine, budget and tastes — with support to keep going once the plan is in place.",
    howItHelps: [
      "Clarity on what to eat and why, in plain language",
      "Plans built around your routine, not an ideal week",
      "Support with energy, digestion and everyday habits",
    ],
    whoItsFor: [
      "Anyone overwhelmed by conflicting food advice",
      "People wanting structure without strict dieting",
      "Clients combining nutrition with other services",
    ],
    related: ["dietary-advice", "weight-management", "naturopathy"],
  },
  {
    slug: "diagnostic-testing",
    name: "Diagnostic Testing",
    category: "other",
    ...price(200),
    image: "/images/service-testing.jpg",
    short: "Optional testing to add useful detail to your wellbeing plan.",
    description:
      "Where it may add something useful, your practitioner can discuss available testing options, what they can and cannot tell you, and how results would shape your plan.",
    howItHelps: [
      "Extra information to guide personalised recommendations",
      "A clear explanation of what results do and don't mean",
      "Only suggested where genuinely useful",
    ],
    whoItsFor: [
      "Clients wanting more detail behind their plan",
      "People with ongoing, unclear symptom patterns",
      "Anyone reviewing progress over time",
    ],
    related: ["naturopathy", "digestive-problems", "fatigue"],
  },
  {
    slug: "stress-anxiety",
    name: "Stress & Anxiety",
    category: "mind",
    ...price(150),
    image: "/images/service-stress.jpg",
    short: "Support for a mind that feels busy, tense or constantly on alert.",
    description:
      "We look at what's driving the pressure you're feeling and combine practical coping tools with the kind of support that suits you best.",
    howItHelps: [
      "Understanding your own stress patterns",
      "Everyday tools for calmer moments",
      "A choice of talking, mind-based or hands-on support",
    ],
    whoItsFor: [
      "People feeling overwhelmed or wound up",
      "Anyone struggling to switch off or sleep",
      "Clients wanting support before things build further",
    ],
    related: ["counselling", "clinical-hypnosis", "relaxation-massage"],
  },
  {
    slug: "sports-injuries",
    name: "Sports & Injuries",
    category: "physical",
    ...price(120),
    image: "/images/service-sports-injuries.jpg",
    short: "Hands-on support for training, recovery and everyday niggles.",
    description:
      "Whether you're training or simply want to move more comfortably, sessions focus on the areas that need attention and how to look after them between appointments.",
    howItHelps: [
      "Targeted hands-on work for specific areas",
      "Guidance on movement and recovery habits",
      "A gradual plan that respects your comfort",
    ],
    whoItsFor: [
      "Active people managing training load",
      "Anyone with recurring aches from work or sport",
      "Clients wanting practical self-care advice",
    ],
    related: ["remedial-massage", "bowen-therapy"],
  },
  {
    slug: "fatigue",
    name: "Fatigue",
    category: "physical",
    ...price(140),
    image: "/images/service-fatigue.jpg",
    short: "A joined-up look at low energy across sleep, food and stress.",
    description:
      "Persistent tiredness rarely has one single cause. We look at the wider picture together and build a gentle, realistic plan that doesn't ask too much of you.",
    howItHelps: [
      "A whole-person view of energy and rest",
      "Small, manageable changes first",
      "Regular review as things shift",
    ],
    whoItsFor: [
      "People feeling drained despite resting",
      "Anyone whose energy dips through the day",
      "Clients managing several demands at once",
    ],
    related: ["naturopathy", "free-holistic-health-review"],
  },
  {
    slug: "weight-management",
    name: "Weight Management",
    category: "physical",
    ...price(130),
    image: "/images/service-weight.jpg",
    short: "Supportive, non-judgemental help with habits around food and movement.",
    description:
      "A calm, practical approach that focuses on habits, routines and how you feel — rather than short-term dieting or numbers alone.",
    howItHelps: [
      "Habit-focused, sustainable planning",
      "Support with motivation and setbacks",
      "Optional links with nutrition or mind-based services",
    ],
    whoItsFor: [
      "People tired of restrictive diets",
      "Anyone wanting steady, supported change",
      "Clients who value accountability",
    ],
    related: ["clinical-hypnosis", "naturopathy"],
  },
  {
    slug: "dietary-advice",
    name: "Dietary Advice",
    category: "nutrition",
    ...price(120),
    image: "/images/service-dietery-advice.jpg",
    short: "Straightforward guidance on eating well for your circumstances.",
    description:
      "Clear, practical dietary guidance shaped around your household, work pattern and preferences, with simple ways to make changes stick.",
    howItHelps: [
      "Plain-language advice you can act on",
      "Adjustments for allergies, budget and time",
      "Ideas for meals and routines that suit you",
    ],
    whoItsFor: [
      "Anyone unsure where to start with food changes",
      "Busy households needing simple structure",
      "Clients following up on nutrition appointments",
    ],
    related: ["naturopathy"],
  },
  {
    slug: "digestive-problems",
    name: "Digestive Problems",
    category: "nutrition",
    ...price(140),
    image: "/images/service-digestive-problems.jpg",
    short: "Support for ongoing digestive discomfort and food-related concerns.",
    description:
      "We take time to understand your symptoms, patterns and diet, and build a careful step-by-step plan — flagging anything that would be better reviewed by your GP.",
    howItHelps: [
      "Careful review of diet and symptom patterns",
      "Gradual, structured changes",
      "Clear signposting when medical review is appropriate",
    ],
    whoItsFor: [
      "People with recurring digestive discomfort",
      "Anyone unsure which foods to change",
      "Clients wanting a methodical approach",
    ],
    related: ["naturopathy"],
  },
  {
    slug: "womens-health",
    name: "Women's Health",
    category: "womens",
    ...price(150),
    image: "/images/service-woman-health.jpg",
    short: "Personalised support across cycles, hormones and life stages.",
    description:
      "Time to talk properly about what you're experiencing, with support shaped around your stage of life and the things that matter most to you.",
    howItHelps: [
      "Unhurried conversation about your health",
      "Support across different life stages",
      "Joined-up care with our wider services",
    ],
    whoItsFor: [
      "Women wanting more time to be heard",
      "Anyone navigating changing symptoms",
      "Clients preferring a holistic approach",
    ],
    related: ["naturopathy", "counselling"],
  },
  {
    slug: "fertility-pregnancy",
    name: "Fertility & Pregnancy",
    category: "womens",
    ...price(160),
    image: "/images/service-pregnancy.jpg",
    short: "Gentle, supportive care while trying to conceive and through pregnancy.",
    description:
      "Supportive care alongside your medical team, focusing on wellbeing, rest and how you're coping emotionally through what can be an uncertain time.",
    howItHelps: [
      "Wellbeing support alongside medical care",
      "Space to talk about how you're feeling",
      "Practical guidance on rest and routine",
    ],
    whoItsFor: [
      "People trying to conceive",
      "Anyone pregnant and wanting extra support",
      "Partners looking for guidance too",
    ],
    related: ["pregnancy-massage", "counselling"],
  },
  {
    slug: "hypnobirthing",
    name: "Hypnobirthing",
    category: "womens",
    ...price(180),
    image: "/images/service-hypnobirthing.jpg",
    short: "Relaxation, breathing and preparation for a calmer birth experience.",
    description:
      "Hypnobirthing sessions teach relaxation and breathing techniques, and help you and your birth partner feel more prepared and confident.",
    howItHelps: [
      "Practical relaxation and breathing techniques",
      "Preparation for you and your birth partner",
      "A calmer, more confident mindset",
    ],
    whoItsFor: [
      "Expectant parents preparing for birth",
      "Anyone feeling anxious about labour",
      "Birth partners wanting a clear role",
    ],
    related: ["clinical-hypnosis", "pregnancy-massage"],
  },
  {
    slug: "childrens-health",
    name: "Children's Health",
    category: "other",
    ...price(120),
    image: "/images/service-children-health.jpg",
    short: "Family-friendly support for children's wellbeing, food and routines.",
    description:
      "Appointments include parents and carers, focusing on practical, age-appropriate suggestions around food, sleep and daily routine.",
    howItHelps: [
      "Family-centred, practical guidance",
      "Age-appropriate suggestions",
      "Clear signposting to your GP where needed",
    ],
    whoItsFor: [
      "Parents wanting nutrition or routine guidance",
      "Families looking for a gentle approach",
      "Carers with questions about everyday wellbeing",
    ],
    related: ["naturopathy"],
  },
  */
];

export const services: Service[] = seeds.map((seed) => ({
  ...seed,
  options: seed.options ?? [
    {
      id: `${seed.slug}-standard`,
      name: seed.name,
      durationMins: 60,
      durationDisplay: "60 mins",
      priceInCents: seed.priceInCents,
      priceDisplay: seed.priceDisplay,
    },
  ],
  whatToExpect: seed.whatToExpect ?? defaultExpect(seed.name),
  faqs: seed.faqs ?? defaultFaqs(seed.name),
}));

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const servicesByCategory = (id: CategoryId) => services.filter((s) => s.category === id);

export const featuredServices = services.filter((s) => s.featured);

/** Homepage "How Can We Support You?" cards */
export const helpCategories = serviceCategories
  .filter((c) => servicesByCategory(c.id).length > 0)
  .map((category) => ({
    ...category,
    services: servicesByCategory(category.id)
      .slice(0, 4)
      .map((s) => s.name),
    cta: `Explore ${category.title}`,
  }));
