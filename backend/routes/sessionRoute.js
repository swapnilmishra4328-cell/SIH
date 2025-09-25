import express from "express";
import Session from "../models/session.js";

const router = express.Router();

// User books a session
router.post("/book", async (req, res) => {
  try {
    const { userId, counsellorId, sessionName, date } = req.body;

    const newSession = new Session({
      userId,
      counsellorId,
      sessionName,
      date,
    });

    await newSession.save();
    res.status(201).json({ message: "Session booked successfully", session: newSession });
  } catch (error) {
    res.status(500).json({ message: "Failed to book session", error });
  }
});

// Counsellor fetches their booked sessions
// routes/sessionRoute.js

// Get sessions for a specific counsellor
router.get('/counsellor/:id', async (req, res) => {
  try {
    const sessions = await Session.find({ counsellorId: req.params.id });
    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch sessions", error: err });
  }
});




// Get all sessions for a student
router.get("/user/:id", async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.params.id })
      .populate("counsellorId", "name specialization");

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student sessions", error });
  }
});

// Express example
router.get('/session/counsellor/:id', async (req, res) => {
  const counsellorId = req.params.id;
  const sessions = await Session.find({ counsellorId });
  res.json(sessions);
});

//session status

router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Pending", "In Progress", "Completed", "Cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const session = await Session.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.json({ message: "Status updated", session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

//Edit session

router.put("/:id", async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id,
      { sessionName: req.body.sessionName, date: req.body.date },
      { new: true } // Important! returns the updated doc
    );
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json({ message: "Session updated successfully", session });
  } catch (err) {
    console.error("❌ Update session error:", err);
    res.status(500).json({ message: "Server error" });
  }
});




// Delete a session
router.delete("/:id", async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json({ message: "Session deleted successfully", session });
  } catch (err) {
    console.error("❌ Delete session error:", err);
    res.status(500).json({ message: "Server error" });
  }
});





export default router;
