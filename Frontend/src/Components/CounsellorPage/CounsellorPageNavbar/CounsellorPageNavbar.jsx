import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './CounsellorPageNavbar.css';
import studentimage from '../../../assets/Student image.webp';
import CounsellorPageSidebar from "../../CounsellorPage/CounsellorPageSidebar/CounsellorPageSidebar.jsx";
import CounsellorPageBooking from '../CounsellorPageBooking/CounsellorPageBooking.jsx';
import CounsellorPageDashboard from '../CounsellorPageDashboard/CounsellorPageDashboard.jsx';

const CounsellorPage = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div className="counsellor-layout">
      <CounsellorPageSidebar extended={extended} setExtended={setExtended} />
      <div className={`counsellor-main-content ${extended ? "counsellor-sidebar-expanded" : "counsellor-sidebar-collapsed"}`}>
        <div className="counsellor-navbar">
          <div className="counsellor-navbar-icon">
            <img src={studentimage} alt="logo" />
          </div>
          <div className="counsellor-navbar-text">
            <p>About Us</p>
            <p>Guide</p>
            <p>Login</p>
            <div className="counsellor-signup">
              <p>SignUp</p>
            </div>
          </div>
        </div>

        <div className="page-content">
          <Routes>
            <Route path="booking" element={<CounsellorPageBooking />}/>
            <Route path="dashboard" element={<CounsellorPageDashboard />}/> 
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default CounsellorPage;