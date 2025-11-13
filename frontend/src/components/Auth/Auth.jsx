import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Auth.css"
import optifiLogo from "../../assets/logo.png";
// Firebase temporarily disabled in the frontend to restore auth page functionality
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
<<<<<<< HEAD
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
=======
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api/users/';
  const [errorMsg, setErrorMsg] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const DEBUG_FIREBASE = import.meta.env.VITE_DEBUG_FIREBASE === 'true';

  // Firebase redirect handling disabled while Firebase is removed from the frontend.
  // Keep this effect as a no-op and avoid referencing bindings that are
  // declared later (would throw due to TDZ). Use an empty dependency array.
  useEffect(() => { /* no-op */ }, []);

  const postIdTokenToBackend = React.useCallback(async (idToken) => {
    setIsProcessing(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`${API_BASE}google-login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.error || 'Google login failed');
      localStorage.setItem('access', data.tokens.access);
      localStorage.setItem('refresh', data.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      setLoggedInUser(data.user);
      alert(`Signed in as ${data.user.username || data.user.email}`);
      console.log('Google auth success', data.user);
    } catch (err) {
      console.error('Google login backend error', err);
      setErrorMsg(err.message || String(err));
    } finally {
      setIsProcessing(false);
    }
  }, [API_BASE]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? 'login/' : 'register/';
      const body = isLogin ? { email, password } : { email, password, username: fullName || email.split('@')[0] };
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Auth failed');
      // on login/register backend returns { tokens: {access, refresh}, user: { ... } }
      if (data.tokens) {
        localStorage.setItem('access', data.tokens.access);
        localStorage.setItem('refresh', data.tokens.refresh);
        // optionally store user
        localStorage.setItem('user', JSON.stringify(data.user));
        setLoggedInUser(data.user);
        alert(`Signed in as ${data.user.username || data.user.email}`);
        // TODO: navigate to protected area
        console.log('Auth success', data.user);
      }
    } catch (err) {
      console.error('Auth error', err);
      alert(err.message);
    }
  };

  useEffect(() => {
    // debug: confirm this component mounted when navigating to /auth
    console.log('[Auth] mounted');
  }, []);

  const handleGoogleSignIn = async () => {
    // Firebase Google sign-in is temporarily disabled in the frontend.
    // This keeps the auth page functional while backend verification is fixed.
    setErrorMsg('Google sign-in is temporarily disabled. Use email/password login.');
    setIsProcessing(false);
  };

  useEffect(() => {
    // update local state if storage changed elsewhere
    const handler = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoggedInUser(user || null);
      } catch {
        setLoggedInUser(null);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    setLoggedInUser(null);
    // sign out from firebase client as well (best-effort)
  try { /* firebase removed from frontend; nothing to sign out */ } catch { /* ignore */ }
  };
>>>>>>> 9e761b800d42e9ef6ff3fd36088195b804b663cf

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
          {loggedInUser ? (
            <div className="logged-in-box">
              <h2>You're in 🎉</h2>
              <p>Signed in as <strong>{loggedInUser.username || loggedInUser.email}</strong></p>
              <motion.button className="btn-gradient" onClick={handleLogout}>Logout</motion.button>
            </div>
          ) : null}
          <h2>{isLogin ? "Welcome Back 👋" : "Create Account 🚀"}</h2>
          <p className="auth-subtext">
            {isLogin
              ? "Login to track your finances and access insights."
              : "Sign up to start managing your expenses with AI."}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <motion.input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              whileFocus={{ scale: 1.03 }}
              required
            />
            <motion.input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleGoogleSignIn}
            disabled={isProcessing}
            style={{ opacity: isProcessing ? 0.7 : 1 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="Google"
            />
            Continue with Google
          </motion.button>

          {errorMsg ? (
            <div className="text-red-400 text-sm mt-3">{errorMsg}</div>
          ) : null}

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
