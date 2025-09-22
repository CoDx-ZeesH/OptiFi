import React, { useState } from "react";
import "./LoginSignup.css"
import user_icon from '../assets/user.png'
import email_icon from '../assets/gmail.png'
import password_icon from '../assets/password.png'

const LoginSignup = ()=>{
    const [action, setAction] = useState("Login");
    return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      {/* Inputs */}
      <div className="inputs">
        {action === "Signup" && (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Full Name" />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
      </div>

      {/* Forgot Password (only for Login) */}
      {action === "Login" && (
        <div className="forgot-password">
          Lost Password? <span>Click Here</span>
        </div>
      )}

      {/* Buttons */}
      <div className="submit-container">
        <div
          className={action === "Signup" ? "submit active" : "submit"}
          onClick={() => setAction("Signup")}
        >
          Sign Up
        </div>
        <div
          className={action === "Login" ? "submit active" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
    </div>
  );
};
export default LoginSignup;