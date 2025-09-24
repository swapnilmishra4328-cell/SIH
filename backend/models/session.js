import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  counsellorId: { type: mongoose.Schema.Types.ObjectId, ref: "Counsellor", required: true },
  sessionName: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Completed", "Cancelled"], default: "Pending" },
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);

export default Session;
