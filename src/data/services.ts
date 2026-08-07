

export type CategoryId = "mind" | "physical" | "nutrition" | "womens" | "other";

export type ServiceCategory = {
  id: CategoryId;
  title: string;
  blurb: string;
  image: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "mind",
    title: "Mind & Emotional Wellbeing",
    blurb: "Talking therapies and mind-based approaches for how you feel day to day.",
    image: "/images/service-counselling.jpg",
  },
  {
    id: "physical",
    title: "Physical Health",
    blurb: "Hands-on and practical support for your body, movement and energy.",
    image: "/images/service-massage.jpg",
  },
  {
    id: "nutrition",
    title: "Nutrition & Wellness",
    blurb: "Food, digestion and natural health guidance built around your life.",
    image: "/images/service-nutrition.jpg",
  },
  {
    id: "womens",
    title: "Women's Health & Pregnancy",
    blurb: "Personalised care through every stage, from cycles to birth and beyond.",
    image: "/images/service-hypnosis.jpg",
  },
  {
    id: "other",
    title: "Other Services",
    blurb: "Additional therapies and testing that complement your wider care.",
    image: "/images/service-testing.jpg",
  },
];

export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  name: string;
  category: CategoryId;
  short: string;
  description: string;
  image?: string;
  featured?: boolean;
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
    answer: "Appointment lengths typically range from 45 to 90 minutes. Initial consultations include a full health assessment.",
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

type ServiceSeed = Omit<Service, "whatToExpect" | "faqs"> &
  Partial<Pick<Service, "whatToExpect" | "faqs">>;

const seeds: ServiceSeed[] = [
  {
    slug: "massage",
    name: "Massage",
    category: "physical",
    featured: true,
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
    slug: "counselling",
    name: "Counselling",
    category: "mind",
    featured: true,
    image: "/images/service-counselling.jpg",
    short: "A calm, confidential space to talk things through at your own pace.",
    description:
      "Counselling gives you time and space with someone whose only focus is you. Sessions are led by what matters to you, whether that's something specific or a general sense that things feel harder than they should.",
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
    related: ["stress-anxiety", "clinical-hypnosis", "thought-field-therapy"],
  },
  {
    slug: "naturopathy",
    name: "Naturopathy",
    category: "nutrition",
    featured: true,
    image: "/images/service-naturopathy.jpg",
    short: "A whole-person look at diet, lifestyle and natural health support.",
    description:
      "Naturopathy considers the whole picture — how you eat, sleep, move and recover — and looks for simple, sustainable changes that support your body's own balance.",
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
    related: ["nutrition", "dietary-advice", "digestive-problems"],
  },
  {
    slug: "nutrition",
    name: "Nutrition",
    category: "nutrition",
    featured: true,
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
    slug: "clinical-hypnosis",
    name: "Clinical Hypnosis",
    category: "mind",
    featured: true,
    image: "/images/service-hypnosis.jpg",
    short: "A focused, deeply relaxed state used to work on specific goals.",
    description:
      "Clinical hypnosis uses guided relaxation and focused attention to work on a particular goal you've agreed with your practitioner. You stay aware and in control the whole time.",
    howItHelps: [
      "Deep relaxation as a starting point for change",
      "Focused work on habits, responses or specific goals",
      "Techniques you can use again on your own",
    ],
    whoItsFor: [
      "People curious about mind-based approaches",
      "Clients working on a specific, agreed goal",
      "Anyone who finds relaxation-based methods helpful",
    ],
    related: ["counselling", "thought-field-therapy", "stress-anxiety"],
  },
  {
    slug: "diagnostic-testing",
    name: "Diagnostic Testing",
    category: "other",
    featured: true,
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
    related: ["counselling", "clinical-hypnosis", "massage"],
  },
  {
    slug: "sports-injuries",
    name: "Sports & Injuries",
    category: "physical",
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
    related: ["massage", "fatigue", "diagnostic-testing"],
  },
  {
    slug: "fatigue",
    name: "Fatigue",
    category: "physical",
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
    related: ["naturopathy", "nutrition", "diagnostic-testing"],
  },
  {
    slug: "weight-management",
    name: "Weight Management",
    category: "physical",
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
    related: ["nutrition", "dietary-advice", "clinical-hypnosis"],
  },
  {
    slug: "dietary-advice",
    name: "Dietary Advice",
    category: "nutrition",
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
    related: ["nutrition", "naturopathy", "digestive-problems"],
  },
  {
    slug: "digestive-problems",
    name: "Digestive Problems",
    category: "nutrition",
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
    related: ["naturopathy", "nutrition", "diagnostic-testing"],
  },
  {
    slug: "womens-health",
    name: "Women's Health",
    category: "womens",
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
    related: ["fertility-pregnancy", "hypnobirthing", "naturopathy"],
  },
  {
    slug: "fertility-pregnancy",
    name: "Fertility & Pregnancy",
    category: "womens",
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
    related: ["hypnobirthing", "womens-health", "counselling"],
  },
  {
    slug: "hypnobirthing",
    name: "Hypnobirthing",
    category: "womens",
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
    related: ["fertility-pregnancy", "womens-health", "clinical-hypnosis"],
  },
  {
    slug: "thought-field-therapy",
    name: "Thought Field Therapy",
    category: "other",
    image: "/images/service-thought-field-therapy.jpg",
    short: "A gentle tapping-based technique used for emotional responses.",
    description:
      "Thought Field Therapy uses a simple sequence of tapping points while focusing on a specific feeling or situation. Your practitioner will explain the approach fully before you try it.",
    howItHelps: [
      "A simple technique you can learn quickly",
      "Focused work on a specific feeling or situation",
      "Something you can practise between sessions",
    ],
    whoItsFor: [
      "People curious about gentle, drug-free techniques",
      "Clients who prefer practical exercises",
      "Anyone combining approaches for stress",
    ],
    related: ["stress-anxiety", "counselling", "clinical-hypnosis"],
  },
  {
    slug: "childrens-health",
    name: "Children's Health",
    category: "other",
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
    related: ["nutrition", "dietary-advice", "digestive-problems"],
  },
];

export const services: Service[] = seeds.map((seed) => ({
  ...seed,
  whatToExpect: seed.whatToExpect ?? defaultExpect(seed.name),
  faqs: seed.faqs ?? defaultFaqs(seed.name),
}));

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const servicesByCategory = (id: CategoryId) => services.filter((s) => s.category === id);

export const featuredServices = services.filter((s) => s.featured);

/** Homepage "How Can We Support You?" cards — the four public-facing groupings. */
export const helpCategories = serviceCategories
  .filter((c) => c.id !== "other")
  .map((category) => ({
    ...category,
    services: servicesByCategory(category.id)
      .slice(0, 4)
      .map((s) => s.name),
    cta: `Explore ${category.title}`,
  }));
