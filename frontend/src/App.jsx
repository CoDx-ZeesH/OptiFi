import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/Landing/Landing";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard";
import ProfileSettings from "./components/ProfileSettings";

import Transactions from "./components/Transactions";
import Analytics from "./components/Analytics";
import Goals from "./components/Goals";
import OptiBrain from "./components/OptiBrain";

const App = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <Router>
      <Routes>

        {/* Landing + Auth */}
        <Route
          path="/"
          element={<LandingPage theme={theme} setTheme={setTheme} />}
        />
        <Route path="/auth" element={<Auth />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Transactions Page */}
        <Route path="/transactions" element={<Transactions />} />

        {/* Analytics Page */}
        <Route path="/analytics" element={<Analytics />} />

        {/* Goals Page */}
        <Route path="/goals" element={<Goals />} />

        {/* OptiBrain AI Insights */}
        <Route path="/optibrain" element={<OptiBrain />} />

        {/* Profile Settings */}
        <Route
          path="/profile"
          element={<ProfileSettings theme={theme} setTheme={setTheme} />}
        />

      </Routes>
    </Router>
  );
};

export default App;
