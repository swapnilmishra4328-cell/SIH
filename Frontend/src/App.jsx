import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/AdminPage/NavbarForAdmin/Navbar.jsx";
import CounsellorPage from "./Components/CounsellorPage/CounsellorPageNavbar/CounsellorPageNavbar.jsx";
import UserNavbar from "./Components/UserPage/UserNavbar/UserNavbar.jsx";
import LoginPage from "./Components/LoginPage/LoginPage.jsx";
import SignupPage from "./Components/SignUp/SignUp.jsx";
import Homepage from "./Components/Homepage/Homepage.jsx";
import Booking from "./Components/AdminPage/BookingStatus/booking.jsx";
import Counsellors from "./Components/Consellor/Counsellor.jsx";
import CounsellorPageDashboard from "./Components/CounsellorPage/CounsellorPageDashboard/CounsellorPageDashboard.jsx";
import CounsellorPageBooking from "./Components/CounsellorPage/CounsellorPageBooking/CounsellorPageBooking.jsx";
import CounsellorConnect from "./Components/CounsellorConnect/CounsellorConnect.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Signup" element={<SignupPage/>}/>
      <Route path="/user/*" element={<UserNavbar />} />
      <Route path="/counsellor/*" element={<CounsellorPage />} />
      <Route path="/admin/*" element={<Navbar/>} />
      <Route path="/AvailbleCounsellor/*" element={<Counsellors/>} />
      <Route path="/counsellorConnect" element={<CounsellorConnect/>} />

      
      

      
      
            {/* <Route path="/Booking" element={<Booking/>} /> */}
  

       
      
    </Routes>
  );
}

export default App;

