// utils/languageCheck.js

// Common Hinglish keywords to detect if user is typing Hindi in Roman script
const hinglishKeywords = [
  "mai", "main", "mera", "meri", "tum", "tera", "tere",
  "hu", "tha", "kya", "kyu", "nahi", "haan", "acha",
  "bahut", "kam", "bada", "chhota", "samajh", "dost",
  "kar", "raha", "rahi", "hogaya", "hogyi"
];

// Detect language type
export function detectLanguage(text) {
  const lower = text.toLowerCase();

  // If any Hinglish keyword is found → treat as Hinglish
  const isHinglish = hinglishKeywords.some(word => lower.includes(word));

  if (isHinglish) return "hinglish";

  // Basic heuristic: if it’s mostly English words
  return "english";
}
