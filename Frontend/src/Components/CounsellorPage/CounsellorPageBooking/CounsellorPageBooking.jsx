// CounsellorPageBooking.jsx
import React, { useEffect, useState } from "react";
import "./CounsellorPageBooking.css";

const CounsellorPageBooking = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const counsellorId = "6504a8e9e3d5b4c96f7d5678"; // TODO: get from auth

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(`https://backend-0e93.onrender.com/api/session/counsellor/${counsellorId}`);
        const data = await res.json();
        setSessions(data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [counsellorId]);

  // 🔑 Update session status
  const handleStatusChange = async (sessionId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:4000/api/session/${sessionId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        setSessions((prev) =>
          prev.map((s) => (s._id === sessionId ? data.session : s))
        );
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("❌ Status update failed:", err);
    }
  };

  if (loading) return <p>Loading sessions...</p>;

  return (
    <div className="counsellor-dashboard-wrapper">
      <h1>Booked Sessions</h1>
      {sessions.length === 0 ? (
        <p>No sessions booked yet.</p>
      ) : (
        sessions.map((s) => (
          <div key={s._id} className="session-card">
            <h2><i>{s.sessionName}</i></h2>
            <p>📅 {new Date(s.date).toLocaleDateString()}</p>
            <p>Status: <strong>{s.status}</strong></p>

            <div className="session-actions">
              <button onClick={() => handleStatusChange(s._id, "In Progress")}>
                ⏳ In Progress
              </button>
              <button onClick={() => handleStatusChange(s._id, "Completed")}>
                Completed
              </button>
              <button onClick={() => handleStatusChange(s._id, "Cancelled")}>
                Cancelled
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CounsellorPageBooking;
