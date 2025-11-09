import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/Landing";
import Auth from "./components/Auth/Auth";
import ProfileSettings from "./components/ProfileSettings";

const App = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage theme={theme} setTheme={setTheme} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<ProfileSettings theme={theme} setTheme={setTheme} />} />
      </Routes>
    </Router>
  );
};

export default App;
