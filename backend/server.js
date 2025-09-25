import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import 'dotenv/config'
import { GoogleGenerativeAI } from "@google/generative-ai";

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoute.js';
import counsellorRouter from "./routes/doctorRoute.js";
import sessionRouter from "./routes/sessionRoute.js";
import { generateFromGemini } from './services/gemeniServices.js';




// app config

const app = express();
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json())
app.use(cors({ origin: 
  ["https://frontend-1ioz.onrender.com", 
  "https://aichatbot-raim.onrender.com"], credentials: true }))
app.use(bodyParser.json())

// api endpoints
app.use('/api/admin',adminRouter)
//localhost:4000/api/admin/add-doctor
app.use('/api/user/',userRouter)

app.get('/',(req,res)=>{
    res.send('API WORKING GREAT');
})
//Cousellor
app.use("/api/counsellor", counsellorRouter);
//session
app.use("/api/session", sessionRouter);


// api for gemeni chatbot

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat Route
app.post("/api/chat", async (req, res) => {
  const { prompt, language } = req.body; // frontend sends target language
  try {
    const responseText = await generateFromGemini(prompt, language || "English");
    res.json({ text: responseText, markdown: true });
  } catch (error) {
    res.status(500).json({ text: "Failed to generate response" });
  }
});







app.listen(port,()=>{
    console.log(`Server started on port: ${port}`)
})
