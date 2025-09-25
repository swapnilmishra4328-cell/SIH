import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./BookingAppointment.css";

const BookingAppointment = () => {
  const [bookings, setBookings] = useState([]);
  const [problem, setProblem] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userId = "6504a7e0e3d5b4c96f7d1234"; // Replace with actual logged-in userId

  // 🔹 Fetch bookings from backend
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:4000/api/session/user/${userId}`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔹 Confirm or Update booking
  const handleConfirm = async () => {
    if (!problem || !date) return toast.warn("Please fill all fields");

    try {
      if (editId) {
        // Update booking
        const res = await fetch(`http://localhost:4000/api/session/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionName: problem, date }),
        });

        if (!res.ok) throw new Error("Failed to update session");
        const data = await res.json();
        const updated = data.session;

        setBookings(prev => prev.map(b => (b._id === editId ? updated : b)));
        toast.success("Booking updated successfully!");
        setEditId(null);
      } else {
        // New booking
        const res = await fetch("http://localhost:4000/api/session/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            counsellorId: "6504a8e9e3d5b4c96f7d5678", // placeholder
            sessionName: problem,
            date,
          }),
        });

        if (!res.ok) throw new Error("Failed to book session");
        const data = await res.json();
        const newBooking = data.session;
        setBookings(prev => [...prev, newBooking]);
        toast.success("Session booked successfully!");
      }
    } catch (err) {
      console.error("❌ Booking error:", err);
      toast.error(err.message || "Booking failed");
    }

    setProblem("");
    setDate("");
  };

  // 🔹 Edit Booking
  const handleEdit = booking => {
    setProblem(booking.sessionName);
    setDate(booking.date.split("T")[0]);
    setEditId(booking._id);
  };

  // 🔹 Delete Booking
  const handleDelete = async id => {
    try {
      const res = await fetch(`http://localhost:4000/api/session/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete session");
      const data = await res.json();
      setBookings(prev => prev.filter(b => b._id !== data.session._id));
      toast.success("Session deleted successfully!");
    } catch (err) {
      console.error("❌ Delete error:", err);
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <div className="booking-wrapper">
      <h1 className="booking-title">Book a Session</h1>

      {/* Form */}
      <div className="booking-form">
        <div className="booking-input-group">
          <label>Problem</label>
          <input
            type="text"
            value={problem}
            onChange={e => setProblem(e.target.value)}
            placeholder="E.g., Stress, Anxiety"
          />
        </div>

        <div className="booking-input-group">
          <label>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>

        <button className="booking-btn" onClick={handleConfirm}>
          {editId ? "Update Booking" : "Confirm Booking"}
        </button>
      </div>

      {/* Sessions */}
      <h2 className="booking-subtitle">My Sessions</h2>
      {loading ? (
        <p className="loading">Loading sessions...</p>
      ) : bookings.length === 0 ? (
        <p className="no-booking">No sessions booked yet.</p>
      ) : (
        <div className="booking-list">
          {bookings.map(b => (
            <div key={b._id} className="booking-card">
              <div className="booking-info">
                <h3>{b.sessionName}</h3>
                <p>📅 {new Date(b.date).toLocaleDateString()}</p>
                <p className={`booking-status ${b.status?.toLowerCase() || "pending"}`}>
                  {b.status || "Pending"}
                </p>
              </div>

              <div className="booking-actions">
                <button onClick={() => handleEdit(b)}>Edit</button>
                <button onClick={() => handleDelete(b._id)}>Delete</button>
                <button
                  onClick={() =>
                    navigate("/AvailbleCounsellor", { state: { problem: b.sessionName, date: b.date } })
                  }
                >
                  Choose Counsellor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingAppointment;
