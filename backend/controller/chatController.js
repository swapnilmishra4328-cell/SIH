import { generateFromGemini } from "../services/gemeniServices.js"
import { isCriticalPrompt } from "../utils/safetyCheck.js"

export const handleChat = async (req, res) => {
  const { prompt } = req.body

  try {
    // Step 1: Check if prompt is critical
    if (isCriticalPrompt(prompt)) {
      return res.json({
        text: `I hear that you're going through a very difficult time, and I want you to know you're not alone. 💙  
It’s really important to talk to someone who can support you.  

👉 Would you like me to connect you with a counselor and help book an appointment right now?`
      })
    }

    // Step 2: Otherwise, generate with Gemini
    const response = await generateFromGemini(prompt)
    res.json({ text: response })

  } catch (err) {
    console.error("Chat Error:", err)
    res.status(500).json({ error: "Failed to generate response" })
  }
}
