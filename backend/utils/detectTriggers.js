import { CRITICAL_KEYWORDS } from "./safetyCheck.js";

export const checkForTriggers = (text) => {
  const lowerText = text.toLowerCase();

  return CRITICAL_KEYWORDS.some((word) => lowerText.includes(word));
};
