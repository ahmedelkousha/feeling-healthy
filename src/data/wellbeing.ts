/** Wellbeing areas — SEO landing pages that route visitors to relevant services. */
export type WellbeingArea = {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  body: string[];
  serviceSlugs: string[];
  image: string;
};

export const wellbeingAreas: WellbeingArea[] = [
  {
    slug: "stress-anxiety",
    name: "Stress & Anxiety",
    headline: "Support for Stress & Anxiety",
    intro:
      "If your mind feels busy, tense or constantly on alert, there are gentle, practical ways we can support you.",
    body: [
      "Stress shows up differently for everyone — broken sleep, tight shoulders, a short fuse, or a sense that everything is slightly too much.",
      "We start by understanding what's happening for you, then agree a supportive approach together. That might be talking, mind-based techniques, hands-on care, or a combination.",
    ],
    serviceSlugs: [
      "counselling",
      "clinical-hypnosis",
      "thought-field-therapy",
      "relaxation-massage",
      // "massage",
    ],
    image: "/images/service-stress.jpg",
  },
  {
    slug: "womens-health",
    name: "Women's Health",
    headline: "Support for Women's Health",
    intro: "Time to talk properly about your health, at whatever stage of life you're in.",
    body: [
      "Cycles, hormones and energy change through life, and general advice doesn't always fit.",
      "Practitioners take an unhurried, personalised approach and work alongside your existing medical care.",
    ],
    serviceSlugs: [
      "naturopathy",
      "counselling",
      "free-holistic-health-review",
      "pregnancy-massage",
      // "womens-health", "nutrition",
    ],
    image: "/images/service-woman-health.jpg",
  },
  {
    slug: "childrens-health",
    name: "Children's Health",
    headline: "Support for Children's Health",
    intro: "Family-friendly guidance around food, routine and everyday wellbeing.",
    body: [
      "Appointments involve parents and carers throughout, with practical suggestions suited to your child's age.",
      "Where something needs medical review, we'll say so clearly and suggest speaking with your GP.",
    ],
    serviceSlugs: [
      "naturopathy",
      "free-holistic-health-review",
      // "childrens-health", "nutrition", "dietary-advice", "digestive-problems",
    ],
    image: "/images/service-children-health.jpg",
  },
  {
    slug: "digestive-problems",
    name: "Digestive Problems",
    headline: "Support for Digestive Problems",
    intro: "A careful, step-by-step look at ongoing digestive discomfort.",
    body: [
      "We review your symptoms, diet and daily patterns together before changing anything.",
      "Changes are introduced gradually so you can tell what's genuinely helping.",
    ],
    serviceSlugs: [
      "naturopathy",
      "free-holistic-health-review",
      "acute-telephone-support",
      // "digestive-problems", "nutrition", "diagnostic-testing",
    ],
    image: "/images/service-digestive-problems.jpg",
  },
  {
    slug: "weight-management",
    name: "Weight Management",
    headline: "Support for Weight Management",
    intro: "Non-judgemental support with habits around food, movement and motivation.",
    body: [
      "We focus on routines and how you feel rather than short-term dieting.",
      "Support can combine nutrition guidance with mind-based approaches if that suits you.",
    ],
    serviceSlugs: [
      "clinical-hypnosis",
      "naturopathy",
      "six-session-transformation",
      // "weight-management", "nutrition", "dietary-advice",
    ],
    image: "/images/service-weight.jpg",
  },
  {
    slug: "sports-injuries",
    name: "Sports & Injuries",
    headline: "Support for Sports & Injuries",
    intro: "Hands-on care for training, recovery and everyday aches.",
    body: [
      "Sessions focus on the areas that need attention and how to look after them between appointments.",
      "Your therapist works within your comfort and builds up gradually.",
    ],
    serviceSlugs: [
      "remedial-massage",
      "bowen-therapy",
      "relaxation-massage",
      // "sports-injuries", "massage", "diagnostic-testing",
    ],
    image: "/images/service-sports-injuries.jpg",
  },
  {
    slug: "fatigue",
    name: "Fatigue",
    headline: "Support for Fatigue",
    intro: "A joined-up look at low energy across sleep, food, movement and stress.",
    body: [
      "Persistent tiredness rarely has a single cause, so we look at the whole picture with you.",
      "Plans start small and are reviewed regularly as things change.",
    ],
    serviceSlugs: [
      "naturopathy",
      "relaxation-massage",
      "free-holistic-health-review",
      // "fatigue", "nutrition", "diagnostic-testing",
    ],
    image: "/images/service-fatigue.jpg",
  },
  {
    slug: "fertility-pregnancy",
    name: "Fertility & Pregnancy",
    headline: "Support for Fertility & Pregnancy",
    intro: "Gentle wellbeing support while trying to conceive, during pregnancy and beyond.",
    body: [
      "Our care sits alongside your medical team and focuses on wellbeing, rest and how you're coping.",
      "Partners are welcome and often find the sessions useful too.",
    ],
    serviceSlugs: [
      "pregnancy-massage",
      "counselling",
      "naturopathy",
      // "fertility-pregnancy", "hypnobirthing", "womens-health",
    ],
    image: "/images/service-pregnancy.jpg",
  },
];

export const getWellbeingArea = (slug: string) => wellbeingAreas.find((a) => a.slug === slug);

/** Service finder options for the homepage discovery tool. */
export const finderOptions: { id: string; label: string; serviceSlugs: string[] }[] = [
  {
    id: "stress",
    label: "Stress & Anxiety",
    serviceSlugs: ["counselling", "clinical-hypnosis", "thought-field-therapy", "relaxation-massage"],
  },
  {
    id: "physical",
    label: "Physical Health & Massage",
    serviceSlugs: ["naturopathy", "remedial-massage", "relaxation-massage", "pregnancy-massage", "bowen-therapy"],
  },
  {
    id: "nutrition",
    label: "Nutrition & Naturopathy",
    serviceSlugs: ["naturopathy", "free-holistic-health-review", "acute-telephone-support"],
  },
  {
    id: "womens",
    label: "Women's Health",
    serviceSlugs: ["pregnancy-massage", "naturopathy", "counselling"],
  },
  {
    id: "digestive",
    label: "Digestive Health",
    serviceSlugs: ["naturopathy", "free-holistic-health-review"],
  },
  {
    id: "fertility",
    label: "Fertility & Pregnancy",
    serviceSlugs: ["pregnancy-massage", "naturopathy", "counselling"],
  },
  {
    id: "general",
    label: "General Wellbeing",
    serviceSlugs: ["naturopathy", "remedial-massage", "counselling", "free-holistic-health-review"],
  },
];
