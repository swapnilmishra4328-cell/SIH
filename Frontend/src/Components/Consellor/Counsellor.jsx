import React from 'react'
import "./Counsellor.css"
import { motion } from "framer-motion";
import FDoc from "../../assets/FemaleDoc.jpg"
import MDoc1 from "../../assets/MaleDoc1.jpeg"
import MDoc2 from "../../assets/MaleDoc2.jpeg"
import { useNavigate } from 'react-router-dom';

export default function Counsellors() {
  const navigate = useNavigate(); // ✅ must be inside component

  // 🔹 Dummy data (replace with backend later)
  const counsellors = [
    {
      name: "Dr. Priya Sharma",
      degree: "PhD Psychology",
      speciality: "Stress & Anxiety",
      availability: "Mon–Fri, 10am–5pm",
      experience: "8 years",
      img: FDoc,
    },
    {
      name: "Dr. Aarav Mehta",
      degree: "MSc Clinical Psychology",
      speciality: "Student Counseling stress",
      availability: "Mon–Sat, 2pm–8pm",
      experience: "5 years",
      img: MDoc1,
    },
    {
      name: "Dr. Neha Patel",
      degree: "MPhil Psychiatry",
      speciality: "Depression & Wellness",
      availability: "Tue–Sun, 9am–3pm",
      experience: "10 years",
      img: MDoc2,
    },
  ];

  return (
    <div className="counsellors-page">
      {/* 🔹 Banner */}
      <section className="banner">
        <h1>Our Counsellors</h1>
        <p>Meet the professionals behind ThinkFit</p>
      </section>

      {/* 🔹 Counsellor Cards */}
      <section className="counsellor-list">
        {counsellors.map((c, i) => (
          <motion.div
            key={i}
            className="counsellor-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <img src={c.img} alt={c.name} className="counsellor-img" />
            <h3>{c.name}</h3>
            <p><strong>{c.degree}</strong></p>
            <p><em>Speciality:</em> {c.speciality}</p>
            <p><em>Availability:</em> {c.availability}</p>
            <p><em>Experience:</em> {c.experience}</p>
            <br />
            <button
              className="btn primary"
              onClick={() => navigate("/counsellorConnect")}
            >
              Book Appointment
            </button>
          </motion.div>
        ))}
      </section>

      {/* 🔹 Footer */}
      <footer className="footer">
        <p>© 2025 ThinkFit. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
