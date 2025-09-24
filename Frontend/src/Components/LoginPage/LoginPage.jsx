import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import "./LoginPage.css";
import StudentImage from '../../assets/Student image.webp';
import axios from 'axios';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:4000/api/user/login", {
        email: data.email,
        password: data.password,
      }, { withCredentials: true });

      // Save token to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Logged in successfully!");

      // Redirect to dashboard (example)
      window.location.href = "user/Userdashboard";
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to ThinkFit!</h1>

        <img
          src={StudentImage}
          alt="ThinkFit Mascot"
          className="login-image"
          onError={(e) => { e.target.src = "https://placehold.co/150x150?text=Image+Error"; }}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="login-form" autoComplete="off">
          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
              className={`login-input ${errors.email ? 'error' : ''}`}
            />
          </div>
          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className={`login-input ${errors.password ? 'error' : ''}`}
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
          <br></br>
          Don't have an account? <a href='/signUp'>Cick here</a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
