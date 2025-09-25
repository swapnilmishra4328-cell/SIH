import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      const res = await fetch(`https://backend-0e93.onrender.com/api/session/user/${userId}`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      toast.error("Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔹 Handle booking creation/update
  const handleConfirm = async () => {
    if (!problem || !date) return toast.warn("Please fill all fields");

    try {
      if (editId) {
        // Update booking
        const res = await fetch(`https://backend-0e93.onrender.com/api/session/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionName: problem, date }),
        });

        if (res.ok) {
          toast.success("Booking updated successfully!");
          await fetchBookings();
        } else {
          const errData = await res.json();
          toast.error(errData.message || "Failed to update booking");
        }

        setEditId(null);
      } else {
        // New booking
        const res = await fetch("https://backend-0e93.onrender.com/api/session/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            counsellorId: "6504a8e9e3d5b4c96f7d5678", // placeholder
            sessionName: problem,
            date,
          }),
        });

        if (res.ok) {
          toast.success("Session booked successfully!");
          await fetchBookings();
        } else {
          const errData = await res.json();
          toast.error(errData.message || "Failed to book session");
        }
      }
    } catch (err) {
      console.error("❌ Booking error:", err);
      toast.error("Something went wrong!");
    }

    setProblem("");
    setDate("");
  };

  // 🔹 Edit booking
  const handleEdit = (booking) => {
    setProblem(booking.sessionName);
    setDate(booking.date.split("T")[0]);
    setEditId(booking._id);
  };

  // 🔹 Delete booking
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://backend-0e93.onrender.com/api/session/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Session deleted successfully!");
        await fetchBookings();
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Failed to delete session");
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      toast.error("Something went wrong!");
    }
  };

  // 🔹 Handle form submit to prevent refresh
  const handleSubmit = (e) => {
    e.preventDefault();
    handleConfirm();
  };

  return (
    <div className="booking-wrapper">
      <h1 className="booking-title">Book a Session</h1>

      {/* Form */}
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="booking-input-group">
          <label>Problem</label>
          <input
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="E.g., Stress, Anxiety"
          />
        </div>

        <div className="booking-input-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="booking-btn">
          {editId ? "Update Booking" : "Confirm Booking"}
        </button>
      </form>

      {/* Sessions */}
      <h2 className="booking-subtitle">My Sessions</h2>
      {loading ? (
        <p className="loading">Loading sessions...</p>
      ) : bookings.length === 0 ? (
        <p className="no-booking">No sessions booked yet.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              <div className="booking-info">
                <h3>{b.sessionName}</h3>
                <p>📅 {new Date(b.date).toLocaleDateString()}</p>
                <p className={`booking-status ${b.status?.toLowerCase() || "pending"}`}>
                  {b.status || "Pending"}
                </p>
              </div>

              <div className="booking-actions">
                <button type="button" onClick={() => handleEdit(b)}>Edit</button>
                <button type="button" onClick={() => handleDelete(b._id)}>Delete</button>
                <button
                  type="button"
                  onClick={() =>
                    navigate("/AvailbleCounsellor", {
                      state: { problem: b.sessionName, date: b.date },
                    })
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
