import React, { useState } from 'react';
import './UserNavbar.css';
import userimage from '../../../assets/Student image.webp';
import UserSidebar from "../../UserPage/UserSidebar/UserSidebar";
import UserDashboard from '../UserDashboard/UserDashboard.jsx';
import { Routes, Route } from 'react-router-dom';
import BookingAppointment from '../BookingAppointment/BookingAppointment.jsx'
import { useNavigate } from "react-router-dom";
import LoginPage from '../../LoginPage/LoginPage.jsx';
const UserNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="user-layout">
        <UserSidebar expanded={expanded} setExpanded={setExpanded} />
        <div
          className={`user-main-content ${
            expanded ? "user-sidebar-expanded" : "user-sidebar-collapsed"
          }`}
        >
          <div className="user-navbar">
            <div className="user-navbar-icon">
              <img src={userimage} alt="logo" />
            </div>
            <div className="user-navbar-text">
              <p>About Us</p>
              <p>Guide</p>
              <div className="user-signup">
                <p onClick={() => navigate("/")}>Logout</p>
              </div>
            </div>
          </div>
           <div className="pages">
          <Routes>
           <Route path="UserDashboard" element={<UserDashboard />} />
  <Route path="appointment" element={<BookingAppointment />} />
            
          </Routes>
        </div>
        </div>
      </div>
    </>
  );
};

export default UserNavbar;


