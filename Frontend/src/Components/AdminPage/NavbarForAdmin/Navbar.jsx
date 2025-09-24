import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import "./Navbar.css";
import studentimage from "../../../assets/Student image.webp";
import Sidebar from "../SidebarForAdmin/Sidebar2";
import Dashboard from '../DashboardForAdmin/Dashboard.jsx';
import Booking from "../BookingStatus/booking.jsx";

const Navbar = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div className="layout">
      <Sidebar extended={extended} setExtended={setExtended} />
      <div className={`main-content ${extended ? "sidebar-expanded" : "sidebar-collapsed"}`}>
        <div className="navbar">
          <div className="navbar-icon">
            <img src={studentimage} alt="logo" />
          </div>
          <div className="navbar-text">
            <p>About Us</p>
            <p>Guide</p>
            <p>Login</p>
            <div className="signup">
              <p>SignUp</p>
            </div>
          </div>
        </div>

        <div className="page-content">
         <Routes>
  <Route path="" element={<Dashboard />} />
  <Route path="Booking" element={<Booking />} />
</Routes>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

