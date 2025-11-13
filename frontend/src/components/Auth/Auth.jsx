import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Auth.css"
import optifiLogo from "../../assets/logo.png";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/users/login/' : '/api/users/register/';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password, username: formData.fullName };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Store tokens in localStorage
        localStorage.setItem('access_token', data.tokens.access);
        localStorage.setItem('refresh_token', data.tokens.refresh);
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(data.detail || 'An error occurred');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* ===== LEFT SIDE BRAND PANEL ===== */}
      <motion.div
        className="auth-left"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img src={optifiLogo} alt="Optifi Logo" className="auth-logo" />
        <h1>OptiFi</h1>
        <p>AI-powered expense tracker that helps you spend smarter and save better.</p>
      </motion.div>

      {/* ===== RIGHT SIDE FORM ===== */}
      <motion.div
        className="auth-right"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="auth-box">
          <h2>{isLogin ? "Welcome Back 👋" : "Create Account 🚀"}</h2>
          <p className="auth-subtext">
            {isLogin
              ? "Login to track your finances and access insights."
              : "Sign up to start managing your expenses with AI."}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <motion.input
                type="text"
                placeholder="Full Name"
                className="input-field"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                whileFocus={{ scale: 1.03 }}
                required={!isLogin}
              />
            )}
            <motion.input
              type="email"
              placeholder="Email Address"
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              whileFocus={{ scale: 1.03 }}
              required
            />
            <motion.input
              type="password"
              placeholder="Password"
              className="input-field"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              whileFocus={{ scale: 1.03 }}
              required
            />
            {error && <p className="error-text">{error}</p>}
            <motion.button
              type="submit"
              className="btn-gradient"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
            >
              {loading ? "Loading..." : (isLogin ? "Login" : "Sign Up")}
            </motion.button>
          </form>

          {/* OR Divider */}
          <div className="divider">
            <span></span> or <span></span>
          </div>

          {/* Google Login */}
          <motion.button
            className="google-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="Google"
            />
            Continue with Google
          </motion.button>

          <p className="toggle-text">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <span onClick={() => setIsLogin(false)}>Sign Up</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>Login</span>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
