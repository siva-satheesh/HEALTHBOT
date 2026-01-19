export const intents = [
  {
    id: "greeting",
    patterns: [
      /^(hi|hello|hey|hlo)\b/i,
      /\bgood (morning|afternoon|evening)\b/i,
    ],
    keywords: ["hi", "hello", "hey"],
  },

  {
    id: "hydration",
    patterns: [
      /\b(dehydration|dehydrated|thirsty)\b/i,
      /\b(sweating a lot|lost fluids)\b/i,
    ],
    keywords: ["water", "thirsty", "dehydrated", "sweat", "electrolyte"],
  },

  {
    id: "headache",
    patterns: [
      /\b(headache|head pain|migraine)\b/i,
      /\b(pressure in head)\b/i,
    ],
    keywords: ["headache", "migraine", "headpain"],
  },

  {
    id: "cold_fever",
    patterns: [
      /\b(fever|temperature|high temp)\b/i,
      /\b(cold|cough|sore throat|runny nose)\b/i,
    ],
    keywords: ["fever", "cold", "cough", "throat"],
  },

  {
    id: "sleep",
    patterns: [
      /\b(can't sleep|insomnia|sleep problem)\b/i,
      /\b(sleep schedule|sleep late)\b/i,
    ],
    keywords: ["sleep", "insomnia", "tired"],
  },

  {
    id: "workout_plan",
    patterns: [
      /\b(workout plan|gym plan|exercise plan)\b/i,
      /\b(build muscle|fat loss|lose weight)\b/i,
    ],
    keywords: ["workout", "exercise", "gym", "muscle", "fat loss"],
  },

  // Safety / emergency red flags
  {
    id: "emergency",
    patterns: [
      /\b(chest pain|trouble breathing|can't breathe|breathless)\b/i,
      /\b(fainting|passed out|unconscious)\b/i,
      /\b(sudden weakness|face droop|slurred speech)\b/i,
      /\b(severe bleeding)\b/i,
    ],
    keywords: ["chest pain", "breathing", "faint", "stroke", "bleeding"],
    priority: 100,
  },
];
