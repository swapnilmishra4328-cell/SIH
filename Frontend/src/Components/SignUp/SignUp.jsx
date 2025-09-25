import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Studentimage from '../../assets/Student image.webp';

const SignupPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://backend-0e93.onrender.com/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }

      toast.success("Signed up successfully!");
      navigate("/user/Userdashboard"); // Redirect to login page
    } catch (err) {
      toast.error(err.message);
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create your account!</h1>

        <img
          src={Studentimage}
          alt="ThinkFit Mascot"
          className="signup-image"
          onError={(e) => { e.target.src = "https://placehold.co/150x150?text=Image+Error"; }}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="signup-form" autoComplete="off">
          {/* Username */}
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Username"
              {...register('username', { required: 'Username is required' })}
              className={`input-field ${errors.username ? 'input-error' : ''}`}
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
              className={`input-field ${errors.email ? 'input-error' : ''}`}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className={`input-field ${errors.password ? 'input-error' : ''}`}
            />
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: value => value === password || 'Passwords do not match'
              })}
              className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span>or</span>
          <br></br>

          Already have an account? <a href='/login'>Click here</a>
        </div>

        {/* Social Signup Buttons */}
        <div className="social-buttons">
          <button className="social-btn facebook">
            <FaFacebookF />
          </button>
          <button className="social-btn google">
            <FaGoogle />
          </button>
          <button className="social-btn twitter">
            <FaTwitter />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
