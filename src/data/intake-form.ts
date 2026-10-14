export interface IntakeSymptom {
  id: string;
  name: string;
  category: "emotional_neurological" | "musculoskeletal" | "digestive_systemic";
}

export const INTAKE_SYMPTOMS_GROUP_1: IntakeSymptom[] = [
  { id: "poor_sleep", name: "Poor Sleep Patterns", category: "emotional_neurological" },
  { id: "nervousness", name: "Nervousness", category: "emotional_neurological" },
  { id: "depression", name: "Depression", category: "emotional_neurological" },
  { id: "anxiety", name: "Anxiety", category: "emotional_neurological" },
  { id: "emotionally_unstable", name: "Emotionally Unstable", category: "emotional_neurological" },
  { id: "fatigue", name: "Fatigue", category: "emotional_neurological" },
  { id: "irritability", name: "Irritability", category: "emotional_neurological" },
  { id: "headaches", name: "Headaches", category: "emotional_neurological" },
  { id: "dizziness", name: "Dizziness", category: "emotional_neurological" },
  { id: "poor_concentration", name: "Poor Concentration", category: "emotional_neurological" },
  { id: "dental_problems", name: "Dental Problems", category: "emotional_neurological" },
];

export const INTAKE_SYMPTOMS_GROUP_2: IntakeSymptom[] = [
  { id: "neck_pain", name: "Neck Pain", category: "musculoskeletal" },
  { id: "pins_arms", name: "Pins & Needles in Arms", category: "musculoskeletal" },
  { id: "numbness_fingers", name: "Numbness in Fingers", category: "musculoskeletal" },
  { id: "shortness_breath", name: "Shortness of Breath", category: "musculoskeletal" },
  { id: "low_back_pain", name: "Low Back Pain", category: "musculoskeletal" },
  { id: "pins_legs", name: "Pins & Needles in Legs", category: "musculoskeletal" },
  { id: "numbness_toes", name: "Numbness in Toes", category: "musculoskeletal" },
  { id: "hip_pain", name: "Hip Pain", category: "musculoskeletal" },
  { id: "foot_ankle_pain", name: "Foot/Ankle Pain", category: "musculoskeletal" },
  { id: "knee_pain", name: "Knee Pain", category: "musculoskeletal" },
  { id: "mid_back_pain", name: "Mid Back Pain", category: "musculoskeletal" },
];

export const INTAKE_SYMPTOMS_GROUP_3: IntakeSymptom[] = [
  { id: "diarrhoea", name: "Diarrhoea", category: "digestive_systemic" },
  { id: "constipation", name: "Constipation", category: "digestive_systemic" },
  { id: "cold_hands", name: "Cold Hands", category: "digestive_systemic" },
  { id: "cold_feet", name: "Cold Feet", category: "digestive_systemic" },
  { id: "cold_sweats", name: "Cold Sweats", category: "digestive_systemic" },
  { id: "upset_stomach", name: "Upset Stomach", category: "digestive_systemic" },
  { id: "chest_pain", name: "Chest Pain", category: "digestive_systemic" },
  { id: "loss_smell_taste", name: "Loss of Smell/Taste", category: "digestive_systemic" },
  { id: "buzzing_ears", name: "Buzzing in Ears", category: "digestive_systemic" },
  { id: "loss_balance", name: "Loss of Balance", category: "digestive_systemic" },
];

export interface IntakeFormData {
  date: string;
  name: string;
  dob: string;
  occupation: string;
  address: string;
  suburb: string;
  postCode: string;
  phone: string;
  email: string;
  howHeard: string;
  healthConcerns: string;
  symptomState: Record<string, { past: boolean; present: boolean }>;
  accidentsHistory: string;
  takingMedications: "yes" | "no" | "";
  medicationsDetails: string;
  smoke: "yes" | "no" | "";
  drinkAlcohol: "yes" | "no" | "";
  takeDrugs: "yes" | "no" | "";
  additionalNotes: string;
  printName: string;
  signatureDataUrl: string;
  signatureType: "draw" | "type";
  typedSignature: string;
  cancellationAgreed: boolean;
}
