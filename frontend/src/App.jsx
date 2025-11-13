import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/Landing";
import Auth from "./components/Auth/Auth";
import ProfileSettings from "./components/ProfileSettings";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-700 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0A0118] via-[#0B0220] to-[#050010] text-white"
          : "bg-gradient-to-b from-[#E2E8F0] to-[#CBD5E1] text-black"
      }`}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage theme={theme} setTheme={setTheme} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfileSettings theme={theme} setTheme={setTheme} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
