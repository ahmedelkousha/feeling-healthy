export type Practitioner = {
  slug: string;
  name: string;
  title: string;
  specialty: string;
  bio: string[];
  expertise: string[];
  serviceSlugs: string[];
  qualifications: string[];
  image: string;
  placeholder?: boolean;
};

export const practitioners: Practitioner[] = [
  {
    slug: "rosanna-mosca",
    name: "Rosanna Mosca",
    title: " Naturopath, Therapist & Wellness Practitioner",
    specialty:
      "Naturopathy, Clinical Hypnosis, Psychotherapy, Counselling & Holistic Energy Health",
    bio: [
      "With over 35 years of experience in natural medicine, Rosanna Mosca brings a caring, whole-person approach that looks beyond symptoms to the story behind them.",
      "Her background includes a Bachelor of Health Science in Naturopathy, along with qualifications in clinical hypnosis and psychotherapy. For the past two years, she has also consulted as a naturopath and health retreat consultant with Barbara O'Neill at respected wellness retreats.",
      "In clinic, Rosanna combines traditional naturopathic care with modern frequency technologies, including PEMF support, alongside gentle emotional therapies. She uses tools such as hair bio-profile testing to guide individualised care, helping clients understand what might be contributing to imbalance and what can support their recovery.",
      "Clients come to her seeking clear explanations, practical steps, and a plan that feels personal, not one size fits all.",
      "At Feeling Healthy Wellness Hub, she offers compassionate consultations designed to help people feel heard, supported, and confident about their next steps.",
    ],
    expertise: [
      "Naturopathy",
      "Clinical Hypnotherapy",
      "Psychotherapy",
      "Counselling",
      "TFT / EFT Therapy",
      "Energy & Emotional Balance",
      "Clinical Nutrition & Detox",
      "Diagnostic Testing",
    ],
    serviceSlugs: [
      // Selected services
      "naturopathy",
      "clinical-hypnosis",
      "counselling",
      "bowen-therapy",
      "thought-field-therapy",
      "acute-telephone-support",
      "free-holistic-health-review",
      "six-session-transformation",
      "twelve-session-transformation",
      // Commented out other services:
      // "dietary-advice",
      // "nutrition",
      // "weight-management",
      // "digestive-problems",
      // "womens-health",
      // "hypnobirthing",
      // "childrens-health",
      // "diagnostic-testing",
    ],
    qualifications: [
      "Degree in Naturopathy",
      "Qualifications in Clinical Hypnosis",
      "Qualifications in Psychotherapy & Counselling",
      "Certified TFT / EFT Practitioner",
      "ATMS Registered Member",
    ],
    image: "/images/rosanna-mosca.jpg",
  },
  {
    slug: "edmore-mahleka",
    name: "Edmore Mahleka",
    title: "Senior Remedial Massage Therapist",
    specialty: "Remedial, Sports, Trigger Point, Myofascial Release & Relaxation Massage",
    bio: [
      "Edmore is a massage therapist passionately dedicated to giving you the best treatment ever! For over 15 years, this practitioner has been treating all sorts of clients all over Australia, from Adelaide and Melbourne all the way to the Gold Coast. His excellent technique comes from the ability to listen to his clients and understand their every need.",
      "Edmore firmly believes that massage is not just about physical aptitude as a practitioner: a true professional needs to empathize with the person, recognize and differentiate emotional symptoms from physical and chronic pain.",
      "He gets huge satisfaction in helping people overcome their pain and injuries. Having played professional soccer for twenty years and being a keen cyclist, Edmore knows about injuries that come with playing sport. Every massage you have with Edmore is specifically tailored to suit your individual needs.",
      "If you are seeking relief from an injury, pain, stress, fluid retention or perhaps just wanting to take time out to enhance your health in a relaxing environment, then a massage with Edmore is a great place to start.",
    ],
    expertise: [
      "Remedial Massage",
      "Sports Massage",
      "Trigger Point Therapy",
      "Pregnancy Massage",
      "Stretching",
      "Myofascial Release",
      "Relaxation & Therapeutic Massage",
    ],
    serviceSlugs: [
      // Selected services
      "remedial-massage",
      "relaxation-massage",
      "pregnancy-massage",
      // Commented out other services:
      // "massage",
      // "sports-injuries",
      // "stress-anxiety",
      // "fatigue",
      // "fertility-pregnancy",
    ],
    qualifications: [
      "Diploma of Remedial Massage",
      "15+ Years National Practice Experience",
      "Ex-Professional Athlete & Sports Specialist",
      "Health Fund Rebates Available",
    ],
    image: "/images/edmore-mahleka.jpg",
  },
];

export const getPractitioner = (slug: string) => practitioners.find((p) => p.slug === slug);

export const practitionersForService = (serviceSlug: string) =>
  practitioners.filter((p) => p.serviceSlugs.includes(serviceSlug));
