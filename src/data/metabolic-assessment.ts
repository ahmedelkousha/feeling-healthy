export interface AssessmentSymptom {
  id: string;
  label: string;
  isStarred: boolean;
}

export interface AssessmentCategory {
  id: number;
  numberLabel: string;
  title: string;
  colorTheme: {
    badgeBg: string;
    badgeText: string;
    border: string;
    headerBg: string;
    accentHex: string;
  };
  symptoms: AssessmentSymptom[];
}

export const METABOLIC_CATEGORIES: AssessmentCategory[] = [
  {
    id: 1,
    numberLabel: "1",
    title: "WEIGHT & BODY COMPOSITION",
    colorTheme: {
      badgeBg: "bg-emerald-800 dark:bg-emerald-700",
      badgeText: "text-white",
      border: "border-emerald-200 dark:border-emerald-800",
      headerBg: "bg-emerald-800 text-white",
      accentHex: "#065f46",
    },
    symptoms: [
      {
        id: "w1",
        label: "Stubborn central belly fat (fat mostly around the midsection, often with thinner arms and legs)",
        isStarred: true,
      },
      {
        id: "w2",
        label: "Difficulty losing weight or hitting a plateau despite eating less and making an effort",
        isStarred: true,
      },
      { id: "w3", label: '"Puffy" or inflamed appearance', isStarred: false },
      { id: "w4", label: "Loss of muscle tone", isStarred: false },
      { id: "w5", label: "Fat gain mostly around midsection", isStarred: false },
      { id: "w6", label: "Rapid fat regain after dieting", isStarred: false },
      { id: "w7", label: "Strong hunger during weight loss attempts", isStarred: false },
    ],
  },
  {
    id: 2,
    numberLabel: "2",
    title: "IMMUNE & HEALING",
    colorTheme: {
      badgeBg: "bg-teal-700 dark:bg-teal-600",
      badgeText: "text-white",
      border: "border-teal-200 dark:border-teal-800",
      headerBg: "bg-teal-700 text-white",
      accentHex: "#0f766e",
    },
    symptoms: [
      { id: "im1", label: "Frequent infections (colds, flu, etc.)", isStarred: true },
      { id: "im2", label: "Slow healing of cuts or wounds", isStarred: true },
      { id: "im3", label: "Getting sick more often than others", isStarred: false },
      { id: "im4", label: "Recurring sinus infections", isStarred: false },
      { id: "im5", label: "Frequent sore throats", isStarred: false },
      { id: "im6", label: "Persistent fatigue after illness", isStarred: false },
      { id: "im7", label: "Skin infections or irritations", isStarred: false },
      { id: "im8", label: "Recurring mouth problems (cold sores, mouth sores, or gums that bleed easily)", isStarred: false },
      { id: "im9", label: "Difficulty fully recovering after illness", isStarred: false },
    ],
  },
  {
    id: 3,
    numberLabel: "3",
    title: "CIRCULATION & FLUID BALANCE",
    colorTheme: {
      badgeBg: "bg-sky-700 dark:bg-sky-600",
      badgeText: "text-white",
      border: "border-sky-200 dark:border-sky-800",
      headerBg: "bg-sky-700 text-white",
      accentHex: "#0369a1",
    },
    symptoms: [
      { id: "c1", label: "Cold hands or feet", isStarred: true },
      { id: "c2", label: "Noticeable fluid retention (puffy hands/face or swelling in ankles and feet)", isStarred: true },
      { id: "c3", label: "Feeling lightheaded when standing up", isStarred: false },
      { id: "c4", label: 'Numb, tingling, or "poor circulation" feeling in hands or feet', isStarred: false },
      { id: "c5", label: "Varicose veins", isStarred: false },
      { id: "c6", label: "Leg cramps", isStarred: false },
      { id: "c7", label: "Heavy feeling in legs", isStarred: false },
    ],
  },
  {
    id: 4,
    numberLabel: "4",
    title: "MENTAL & COGNITIVE",
    colorTheme: {
      badgeBg: "bg-purple-800 dark:bg-purple-700",
      badgeText: "text-white",
      border: "border-purple-200 dark:border-purple-800",
      headerBg: "bg-purple-800 text-white",
      accentHex: "#5b21b6",
    },
    symptoms: [
      { id: "mc1", label: "Persistent brain fog (especially worse on some days or after certain foods)", isStarred: true },
      { id: "mc2", label: "Difficulty concentrating or staying focused on tasks", isStarred: true },
      { id: "mc3", label: "Forgetfulness or poor short-term memory", isStarred: false },
      { id: "mc4", label: "Mental fatigue, with slower thinking or processing than usual", isStarred: false },
      { id: "mc5", label: "Difficulty making decisions", isStarred: false },
      { id: "mc6", label: "Low motivation", isStarred: false },
      { id: "mc7", label: "Feeling mentally overwhelmed easily", isStarred: false },
    ],
  },
  {
    id: 5,
    numberLabel: "5",
    title: "DIGESTIVE SIGNALS",
    colorTheme: {
      badgeBg: "bg-olive-800 bg-lime-800 dark:bg-lime-700 text-white",
      badgeText: "text-white",
      border: "border-lime-300 dark:border-lime-800",
      headerBg: "bg-lime-800 text-white",
      accentHex: "#3f6212",
    },
    symptoms: [
      { id: "d1", label: "Frequent bloating after meals", isStarred: true },
      { id: "d2", label: "Excess gas or belching", isStarred: true },
      { id: "d3", label: "Acid reflux or heartburn", isStarred: false },
      { id: "d4", label: "Constipation", isStarred: false },
      { id: "d5", label: "Loose stools or diarrhea", isStarred: false },
      { id: "d6", label: "Feeling overly full or abdominal discomfort after normal meals", isStarred: false },
      { id: "d7", label: "Food sensitivities or intolerances", isStarred: false },
      { id: "d8", label: "Irregular bowel movements", isStarred: false },
      { id: "d9", label: "Nausea after meals", isStarred: false },
    ],
  },
  {
    id: 6,
    numberLabel: "6",
    title: "INFLAMMATION & PAIN",
    colorTheme: {
      badgeBg: "bg-rose-800 dark:bg-rose-700",
      badgeText: "text-white",
      border: "border-rose-200 dark:border-rose-800",
      headerBg: "bg-rose-800 text-white",
      accentHex: "#9f1239",
    },
    symptoms: [
      { id: "ip1", label: "Chronic low-grade inflammation", isStarred: true },
      { id: "ip2", label: "Joint pain or swelling without a clear injury", isStarred: true },
      { id: "ip3", label: "Morning stiffness in joints or muscles", isStarred: false },
      { id: "ip4", label: "Aches or tender muscles, or general body soreness without an obvious cause", isStarred: false },
      { id: "ip5", label: "Frequent headaches", isStarred: false },
      { id: "ip6", label: "Migraines", isStarred: false },
      { id: "ip7", label: "Back pain or neck tension", isStarred: false },
      { id: "ip8", label: "Slow recovery after exercise", isStarred: false },
    ],
  },
  {
    id: 7,
    numberLabel: "7",
    title: "HORMONAL SIGNALS",
    colorTheme: {
      badgeBg: "bg-pink-800 dark:bg-pink-700",
      badgeText: "text-white",
      border: "border-pink-200 dark:border-pink-800",
      headerBg: "bg-pink-800 text-white",
      accentHex: "#9d174d",
    },
    symptoms: [
      { id: "h1", label: "Irregular menstrual cycles", isStarred: true },
      { id: "h2", label: "Difficulty getting pregnant", isStarred: true },
      { id: "h3", label: "Reduced libido", isStarred: false },
      { id: "h4", label: "Erectile dysfunction", isStarred: false },
      { id: "h5", label: "Low morning testosterone (men)", isStarred: false },
      { id: "h6", label: "Premenstrual mood swings", isStarred: false },
      { id: "h7", label: "Excess facial or body hair (women)", isStarred: false },
      { id: "h8", label: "Hair thinning or hair loss", isStarred: false },
      { id: "h9", label: "Breast tenderness or swelling", isStarred: false },
    ],
  },
  {
    id: 8,
    numberLabel: "8",
    title: "SLEEP & RECOVERY",
    colorTheme: {
      badgeBg: "bg-indigo-900 dark:bg-indigo-800",
      badgeText: "text-white",
      border: "border-indigo-200 dark:border-indigo-800",
      headerBg: "bg-indigo-900 text-white",
      accentHex: "#312e81",
    },
    symptoms: [
      { id: "sl1", label: "Difficulty falling asleep", isStarred: true },
      { id: "sl2", label: "Waking during the night (often between 2-4am) and struggling to get back to sleep", isStarred: true },
      { id: "sl3", label: "Waking unrefreshed and still exhausted, even after a full night of sleep or using an alarm", isStarred: false },
      { id: "sl4", label: "Daytime sleepiness", isStarred: false },
      { id: "sl5", label: 'Energy improves late evening ("second wind")', isStarred: false },
      { id: "sl6", label: "Restless or light sleep", isStarred: false },
      { id: "sl7", label: 'Feeling mentally tired but physically "wired" and unable to fully relax or switch off at night', isStarred: false },
      { id: "sl8", label: "Daytime fatigue", isStarred: false },
    ],
  },
  {
    id: 9,
    numberLabel: "9",
    title: "ENERGY & BLOOD SUGAR REGULATION",
    colorTheme: {
      badgeBg: "bg-amber-700 dark:bg-amber-600",
      badgeText: "text-white",
      border: "border-amber-200 dark:border-amber-800",
      headerBg: "bg-amber-700 text-white",
      accentHex: "#b45309",
    },
    symptoms: [
      { id: "e1", label: "Strong sugar or carb cravings", isStarred: true },
      { id: "e2", label: "Energy crash after meals", isStarred: true },
      { id: "e3", label: "Afternoon fatigue (2-4pm slump)", isStarred: false },
      { id: "e4", label: "Feeling shaky or irritable when meals are delayed", isStarred: false },
      { id: "e5", label: "Brain fog after eating", isStarred: false },
      { id: "e6", label: "Needing caffeine to function", isStarred: false },
      { id: "e7", label: "Energy spikes then crashes during the day", isStarred: false },
      { id: "e8", label: "Difficulty concentrating when hungry", isStarred: false },
      { id: "e9", label: "Feeling better after eating something sweet", isStarred: false },
      { id: "e10", label: "Insulin resistance, prediabetes, or diabetes diagnosis", isStarred: false },
    ],
  },
  {
    id: 10,
    numberLabel: "10",
    title: "SKIN & VISIBLE MARKERS",
    colorTheme: {
      badgeBg: "bg-teal-800 dark:bg-teal-700",
      badgeText: "text-white",
      border: "border-teal-200 dark:border-teal-800",
      headerBg: "bg-teal-800 text-white",
      accentHex: "#115e59",
    },
    symptoms: [
      { id: "sk1", label: "Skin tags", isStarred: true },
      { id: "sk2", label: "Dark patches of skin (neck, armpits, groin)", isStarred: true },
      { id: "sk3", label: "Acne beyond teenage years", isStarred: false },
      { id: "sk4", label: "Oily skin", isStarred: false },
      { id: "sk5", label: "Thinning hair or hair loss", isStarred: false },
      { id: "sk6", label: "Dry skin patches", isStarred: false },
      { id: "sk7", label: "Slow wound healing", isStarred: false },
      { id: "sk8", label: "Easy bruising", isStarred: false },
      { id: "sk9", label: "Swollen or puffy face", isStarred: false },
    ],
  },
];

export interface AssessmentUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  practitionerNotes: string;
}
