import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import counsellorModel from "../models/doctorModel.js";

const loginCounsellor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const counsellor = await counsellorModel.findOne({ email });
    if (!counsellor) return res.status(400).json({ success: false, message: "Counsellor not found" });

    const isMatch = await bcrypt.compare(password, counsellor.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: counsellor._id, role: "counsellor" }, process.env.JWT_SECRET);
    res.json({ success: true, token, counsellor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const registerCounsellor = async (req, res) => {
  try {
    const { name, email, password, qualification } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: "Missing fields" });

    const existing = await counsellorModel.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "Counsellor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCounsellor = await counsellorModel.create({ name, email, password: hashedPassword, qualification });

    const token = jwt.sign({ id: newCounsellor._id, role: "counsellor" }, process.env.JWT_SECRET);
    res.json({ success: true, token, counsellor: newCounsellor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export { loginCounsellor , registerCounsellor};
