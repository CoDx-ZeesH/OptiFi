import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Bell, Lock, User, Camera, Edit3, Shield } from "lucide-react";

export default function ProfileSettings({ theme, setTheme }) {
  const [notifications, setNotifications] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] px-6 py-12 flex justify-center items-start">
      <motion.div
        className="w-full max-w-4xl bg-[#1E293B]/60 backdrop-blur-lg border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 🌐 HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] text-transparent bg-clip-text">
            Profile & Settings
          </h1>
          <p className="text-[#94A3B8] mt-2">Manage your OptiFi profile, preferences, and security.</p>
        </div>

        {/* 🧑🏻 PROFILE CARD */}
        <motion.div
          className="relative bg-[#0F172A]/60 border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          {/* Avatar */}
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-[#6366F1] object-cover shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            />
            <button className="absolute bottom-2 right-2 bg-[#6366F1] hover:bg-[#8B5CF6] p-1.5 rounded-full shadow-md transition">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-[#F1F5F9]">John Doe</h2>
            <p className="text-[#94A3B8] text-sm">john@optifi.ai</p>
            <div className="mt-3 inline-flex items-center gap-2 bg-[#1E293B] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.08)]">
              <Shield size={14} className="text-[#22C55E]" />
              <span className="text-xs text-[#22C55E] font-medium">Verified User</span>
            </div>
          </div>

          {/* Edit Button */}
          <button className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] text-white shadow-[0_0_10px_rgba(99,102,241,0.3)] hover:scale-105 transition">
            <Edit3 size={16} /> Edit Profile
          </button>
        </motion.div>

        {/* ⚙️ SETTINGS */}
        <div className="space-y-8">
          {/* USER INFO */}
          <section>
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-[#38BDF8]" /> Personal Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Full Name" placeholder="John Doe" />
              <InputField label="Email" placeholder="john@optifi.ai" type="email" />
              <div>
                <label className="text-[#94A3B8] text-sm">Income Range</label>
                <select className="w-full mt-1 px-4 py-2 bg-[#0F172A]/60 rounded-lg border border-[rgba(255,255,255,0.08)] focus:outline-none focus:border-[#6366F1] text-[#F1F5F9]">
                  <option>₹0 - ₹50,000</option>
                  <option>₹50,000 - ₹1,00,000</option>
                  <option>₹1,00,000+</option>
                </select>
              </div>
            </div>
          </section>

          <Divider />

          {/* SECURITY */}
          <section>
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-[#38BDF8]" /> Security
            </h2>
            <div className="space-y-4">
              <InputField label="Change Password" placeholder="••••••••" type="password" />
              <Toggle
                label="Two-Factor Authentication"
                enabled={twoFA}
                setEnabled={setTwoFA}
                activeColor="#22C55E"
              />
            </div>
          </section>

          <Divider />

          {/* PREFERENCES */}
          <section>
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-[#38BDF8]" /> Preferences
            </h2>

            <Toggle
              label="AI Nudges Notifications"
              enabled={notifications}
              setEnabled={setNotifications}
              activeColor="#22C55E"
            />

            <div className="flex items-center justify-between bg-[#0F172A]/40 px-4 py-3 rounded-lg border border-[rgba(255,255,255,0.05)] mt-4">
              <span className="text-[#94A3B8]">Theme</span>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-2 text-[#F1F5F9] px-4 py-2 rounded-lg bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:scale-105 transition"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function InputField({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-[#94A3B8] text-sm">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full mt-1 px-4 py-2 bg-[#0F172A]/60 rounded-lg border border-[rgba(255,255,255,0.08)] focus:outline-none focus:border-[#6366F1] text-[#F1F5F9]"
      />
    </div>
  );
}

function Divider() {
  return <hr className="border-t border-[rgba(255,255,255,0.08)] my-6" />;
}

function Toggle({ label, enabled, setEnabled, activeColor }) {
  return (
    <div className="flex items-center justify-between bg-[#0F172A]/40 px-4 py-3 rounded-lg border border-[rgba(255,255,255,0.05)]">
      <span className="text-[#94A3B8]">{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${
          enabled ? "bg-[#22C55E]" : "bg-[#475569]"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transform transition-all duration-300 ${
            enabled ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
