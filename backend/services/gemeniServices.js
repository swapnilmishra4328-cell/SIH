import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';
import { checkForTriggers } from "../utils/detectTriggers.js";
import { detectLanguage } from "../utils/languageCheck.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const generateFromGemini = async (prompt) => {
  try {
    // Step 1: Trigger check
    if (checkForTriggers(prompt)) {
      return "⚠️ I understand you may be going through something difficult. It’s important to talk to a professional. Would you like me to help you book an appointment with a counselor?\n\nTo book an appointment:\n1. Go to the main page.\n2. Navigate to 'Book Appointment'.\n3. Select your preferred date and time, then confirm the booking.";
    }

    // Step 2: Detect language type
    const lang = detectLanguage(prompt);
    const languageInstruction =
      lang === "hinglish"
        ? "Reply ONLY in Hindi (Devanagari script). User typed in Hinglish but you must respond in proper Hindi."
        : "Reply ONLY in English.";

    // Step 3: Generate response
    const result = await model.generateContent(
      `You are a friendly digital assistant for students. Respond in a supportive and professional way in indian region.\n\nUser: ${prompt} ${languageInstruction}`
    );

    return result.response.text();
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    throw new Error("Failed to fetch response from Gemini API");
  }
};
