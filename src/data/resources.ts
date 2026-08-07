import type { Faq } from "./services";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  image: string;
  body: { heading?: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "simple-ways-to-wind-down",
    title: "Simple Ways to Wind Down Before Bed",
    excerpt: "Small evening habits that help your body transition smoothly from a busy day into restorative rest.",
    category: "Mind & Emotional Wellbeing",
    readingTime: "4 min read",
    date: "May 2024",
    image: "/images/service-hypnosis.jpg",
    body: [
      {
        paragraphs: [
          "Winding down effectively starts with consistency. Creating a predictable evening routine signals to your nervous system that it is safe to relax.",
          "Simple steps such as dimming overhead lights an hour before sleep, setting aside screens, and engaging in gentle breathing exercises can significantly improve sleep quality.",
        ],
      },
      {
        heading: "Start Small",
        paragraphs: [
          "Choose a single habit—like ten minutes of light stretching or reading—and maintain it consistently for two weeks before introducing new routines.",
        ],
      },
    ],
  },
  {
    slug: "what-to-expect-first-appointment",
    title: "What to Expect at Your First Appointment",
    excerpt: "A guide to your initial visit at Feeling Healthy, from our comprehensive health assessment to agreeing your care plan.",
    category: "At the Clinic",
    readingTime: "3 min read",
    date: "April 2024",
    image: "/images/clinic-reception.jpg",
    body: [
      {
        paragraphs: [
          "Your initial consultation is focused on understanding your complete health picture. We take time to discuss your current symptoms, medical history, lifestyle, and wellness goals.",
          "Every session is collaborative—we work together to build a realistic, tailored care plan that fits naturally into your routine.",
        ],
      },
    ],
  },
  {
    slug: "building-meals-around-your-week",
    title: "Building Meals Around Your Busy Week",
    excerpt: "Practical nutrition and food planning tailored for real schedules rather than idealized diets.",
    category: "Nutrition & Wellness",
    readingTime: "5 min read",
    date: "March 2024",
    image: "/images/service-nutrition.jpg",
    body: [
      {
        paragraphs: [
          "Healthy eating doesn't require complex recipes or rigid diets. Focus on whole foods, adequate protein, and nourishing fats that sustain your energy throughout the day.",
          "Identify your busiest weekdays in advance and prepare simple meal components ahead of time to reduce stress.",
        ],
      },
    ],
  },
  {
    slug: "moving-comfortably-every-day",
    title: "Moving Comfortably: Daily Stretch & Mobility",
    excerpt: "Gentle mobility ideas for easing everyday muscle tension and supporting posture between appointments.",
    category: "Physical Health",
    readingTime: "4 min read",
    date: "February 2024",
    image: "/images/service-massage.jpg",
    body: [
      {
        paragraphs: [
          "Short, frequent movement breaks throughout your day are far more beneficial for joint health and postural alignment than occasional intense workouts.",
          "Gentle neck rolls, shoulder rolls, and hip openers performed daily can prevent everyday stiffness from turning into chronic discomfort.",
        ],
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const generalFaqs: Faq[] = [
  {
    question: "Where is Feeling Healthy located?",
    answer:
      "We are located at 17 Bay Street, Tweed Heads NSW 2485, conveniently situated near Coolangatta.",
  },
  {
    question: "Are private health insurance rebates available?",
    answer:
      "Yes! Remedial massage and naturopathy consultations may be eligible for private health rebate claims, depending on your health fund cover.",
  },
  {
    question: "What are your clinic hours?",
    answer:
      "We are open Monday through Saturday from 9:00 AM to 5:00 PM. Appointments outside regular hours can be arranged by contacting our reception.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book online directly through our website, or call our reception team at (07) 5607 4152.",
  },
];
