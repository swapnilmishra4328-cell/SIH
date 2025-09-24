import express from "express";
import Counsellor from "../models/doctorModel.js";

const router = express.Router();

// ➕ Add new counsellor (admin only)
router.post("/add", async (req, res) => {
  try {
    const counsellor = new Counsellor(req.body);
    await counsellor.save();
    res.json({ message: "Counsellor added successfully", counsellor });
  } catch (error) {
    res.status(500).json({ message: "Failed to add counsellor", error });
  }
});

// 📋 Get all counsellors
router.get("/", async (req, res) => {
  try {
    const counsellors = await Counsellor.find();
    res.json(counsellors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch counsellors", error });
  }
});

export default router;
