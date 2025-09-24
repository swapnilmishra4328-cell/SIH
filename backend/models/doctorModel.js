import mongoose from "mongoose";

const counsellorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true }, // e.g. Stress, Anxiety
  experience: { type: Number, required: true }, // in years
  availability: { type: [String], default: [] }, // ["Mon 3pm-5pm", "Wed 6pm-8pm"]
  imageUrl: { type: String }, // if you uploaded via Cloudinary
}, { timestamps: true });

const Counsellor = mongoose.model("Counsellor", counsellorSchema);

export default Counsellor;
