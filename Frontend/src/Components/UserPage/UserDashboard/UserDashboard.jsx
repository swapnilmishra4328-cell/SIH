import React from "react";
import "./UserDashboard.css";
import Banner from "../../../assets/Dashbord-banner.png";

const UserDashboard = ({ darkMode }) => {
  return (
    <div className={`user-dashboard ${darkMode ? "user-dark" : "user-light"}`}>
      <img src={Banner} alt="Classroom" className="user-banner" />

      <p className="user-quote">
        "All data is 100% anonymous and aggregated to protect student privacy."
      </p>

      <div className="user-cards">
        <div className="user-card">
          <h2 className="user-card-number user-blue">12,000+</h2>
          <p className="user-card-title">Students Benefited</p>
          <small className="user-card-subtext">
            Direct student wellness support.
          </small>
        </div>

        <div className="user-card">
          <h2 className="user-card-number user-green">100+</h2>
          <p className="user-card-title">Counselors Connected</p>
          <small className="user-card-subtext">
            Bridging students with experts.
          </small>
        </div>

        <div className="user-card">
          <h2 className="user-card-number user-purple">8+</h2>
          <p className="user-card-title">Languages Supported</p>
          <small className="user-card-subtext">
            Multilingual accessibility across India.
          </small>
        </div>

        <div className="user-card">
          <h2 className="user-card-number user-red">100%</h2>
          <p className="user-card-title">Anonymous Insights</p>
          <small className="user-card-subtext">
            Secure, aggregated data for admins.
          </small>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
