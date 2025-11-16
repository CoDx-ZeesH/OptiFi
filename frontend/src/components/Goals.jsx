// =========================================
// OptiFi — GOALS PAGE WITH SIDEBAR (FINAL)
// =========================================

import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiBarChart2,
  FiCheckCircle,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import { assets } from "../assets/assets";

// REST OF YOUR GOALS PAGE LOGIC — unchanged
// -------------------------------------------------------------
// SAMPLE DATA
// -------------------------------------------------------------
const initialGoals = [
  {
    id: 1,
    title: "New Phone Savings",
    target: 30000,
    saved: 15000,
    startDate: "2025-09-01",
    endDate: "2026-01-01",
    category: "Shopping",
    dailyNeeded: 180,
    pace: "On Track",
    insight: "You need to save ₹180/day to reach this goal in 60 days.",
    completed: false,
  },
  {
    id: 2,
    title: "Emergency Fund",
    target: 50000,
    saved: 42000,
    startDate: "2025-06-01",
    endDate: "2025-09-01",
    category: "Savings",
    dailyNeeded: 100,
    pace: "Ahead",
    insight: "Consistent habit — 92% of goal reached.",
    completed: false,
  },
];

const pieData = [
  { name: "New Phone", value: 30 },
  { name: "Emergency Fund", value: 70 },
];

const trendData = [
  { month: "Jul", saved: 2000 },
  { month: "Aug", saved: 2500 },
  { month: "Sep", saved: 4200 },
  { month: "Oct", saved: 3000 },
  { month: "Nov", saved: 3500 },
];

const BG_GRADIENT =
  "bg-gradient-to-b from-[#0F172A] via-[#0F172A] to-[#090714]";

const CARD_BG = "bg-[#1E293B]/40";
const CARD_BORDER = "border border-white/10";

const PRIMARY_COLOR = "#3B82F6";
const CYAN_COLOR = "#06B6D4";

const PROGRESS_GRADIENT = "linear-gradient(90deg, #3B82F6, #06B6D4)";

// -------------------------------------------------------------
// Small UI Components
// -------------------------------------------------------------
function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`${CARD_BG} ${CARD_BORDER} backdrop-blur-xl rounded-xl p-5 shadow-[0_6px_20px_rgba(6,182,212,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

function ProgressBar({ percent }) {
  const safe = Math.min(100, Math.max(0, percent));
  return (
    <div className="w-full h-3 rounded-full bg-[#0F172A] border border-white/5 overflow-hidden">
      <div
        className="h-3 rounded-full transition-all duration-700"
        style={{
          width: `${safe}%`,
          background: PROGRESS_GRADIENT,
          boxShadow: "0 8px 30px rgba(59,130,246,0.20)",
        }}
      />
    </div>
  );
}

// -------------------------------------------------------------
// Sidebar Component (Imported from Dashboard)
// -------------------------------------------------------------
function Sidebar() {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/analytics" },
    { name: "Goals", path: "/goals" },
    { name: "Transactions", path: "/transactions" },
    { name: "OptiBrain Insights", path: "/optibrain" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <aside className="col-span-2 bg-gradient-to-b from-[#4b6ff5] to-[#06B6D4] 
      rounded-tr-3xl rounded-br-3xl p-6 sticky top-6 h-[calc(100vh-48px)] 
      shadow-[inset_0_0_30px_rgba(0,0,0,0.2)] flex flex-col justify-between">

      {/* Logo */}
               <div>
                 <div className="flex items-center gap-2 mb-10">
                   <img src={assets.logo} alt="OptiFi Logo" className="w-20 h-20 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]" />
                   <div>
                     <h1 className="font-bold text-lg text-white tracking-tight">OptiFi</h1>
                     <p className="text-xs text-white/70">Personal Finance</p>
                   </div>
                 </div>
        {/* Nav */}
        <nav className="space-y-3">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-[#071030] text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <FiUser />
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Settings + Logout */}
      <div className="space-y-3 pt-6 border-t border-white/20">
        <Link
          to="/profile"
          className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/10 transition"
        >
          <FiSettings />
          <span className="text-sm">Settings</span>
        </Link>

        <Link
          to="/auth"
          className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/10 transition"
        >
          <FiLogOut />
          <span className="text-sm">Logout</span>
        </Link>
      </div>
    </aside>
  );
}

// -------------------------------------------------------------
// MAIN PAGE — GOALS PAGE
// -------------------------------------------------------------
/* -------------------------------------------------------------
   CREATE / EDIT MODAL (FULL AND WORKING)
------------------------------------------------------------- */
function GoalModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(
    initial || {
      title: "",
      target: "",
      saved: 0,
      endDate: "",
      category: "Savings",
    }
  );

  useEffect(() => {
    setForm(
      initial || {
        title: "",
        target: "",
        saved: 0,
        endDate: "",
        category: "Savings",
      }
    );
  }, [initial]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -25, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#1E293B]/40 border border-white/10 rounded-xl p-6 max-w-xl w-full"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              Create / Edit Goal
            </h3>
            <p className="text-sm text-[#94A3B8] mb-4">
              OptiFi uses AI to estimate how realistic your goal is.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label>
                <div className="text-sm mb-1">Goal Name</div>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="w-full p-2 rounded-lg bg-[#0F172A] border border-white/10 text-white"
                />
              </label>

              <label>
                <div className="text-sm mb-1">Target (₹)</div>
                <input
                  type="number"
                  value={form.target}
                  onChange={(e) =>
                    setForm({ ...form, target: e.target.value })
                  }
                  className="w-full p-2 rounded-lg bg-[#0F172A] border border-white/10 text-white"
                />
              </label>

              <label>
                <div className="text-sm mb-1">End Date</div>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm({ ...form, endDate: e.target.value })
                  }
                  className="w-full p-2 rounded-lg bg-[#0F172A] border border-white/10 text-white"
                />
              </label>

              <label>
                <div className="text-sm mb-1">Category</div>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full p-2 rounded-lg bg-[#0F172A] border border-white/10 text-white"
                >
                  <option>Shopping</option>
                  <option>Travel</option>
                  <option>Health</option>
                  <option>Education</option>
                  <option>Savings</option>
                  <option>Custom</option>
                </select>
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-white/20 text-white/70"
              >
                Cancel
              </button>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => onSave(form)}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white"
              >
                Save Goal
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Goals() {
  const [goals, setGoals] = useState(initialGoals);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const activeGoals = goals.filter((g) => !g.completed);
  const completedGoals = goals.filter((g) => g.completed);

  function handleAdd(form) {
    const newGoal = {
      id: Date.now(),
      title: form.title,
      target: Number(form.target),
      saved: 0,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: form.endDate,
      category: form.category,
      dailyNeeded: Math.ceil(Number(form.target) / 90),
      pace: "Behind",
      insight: "AI will customise your plan.",
      completed: false,
    };
    setGoals([newGoal, ...goals]);
    setShowModal(false);
  }

  function handleSaveEdit(form) {
    setGoals(goals.map((g) => (g.id === editing.id ? { ...g, ...form } : g)));
    setEditing(null);
    setShowModal(false);
  }

  function handleDelete(id) {
    setGoals(goals.filter((g) => g.id !== id));
  }

  function toggleComplete(id) {
    setGoals(
      goals.map((g) =>
        g.id === id ? { ...g, completed: !g.completed } : g
      )
    );
  }

  return (
    <div className={`min-h-screen ${BG_GRADIENT} text-white p-6`}>
      <div className="grid grid-cols-12 gap-6">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <main className="col-span-10">

          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold">Your Financial Goals</h1>
              <p className="text-sm text-[#94A3B8]">Plan smart. Track progress.</p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
            >
              <FiPlus /> Create New Goal
            </button>
          </div>

          {/* ACTIVE GOALS */}
          <h2 className="text-xl font-semibold mb-3">Active Goals</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {activeGoals.map((g) => {
              const percent = Math.round((g.saved / g.target) * 100);

              return (
                <GlassCard key={g.id}>
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{g.title}</h3>
                    <span className="text-sm text-[#94A3B8]">{percent}%</span>
                  </div>

                  <p className="text-sm text-[#94A3B8] mt-2">
                    ₹{g.saved} / ₹{g.target}
                  </p>

                  <div className="mt-4">
                    <ProgressBar percent={percent} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-[#A7B4C8] mt-3">
                    <div>Start: <div className="text-white">{g.startDate}</div></div>
                    <div>End: <div className="text-white">{g.endDate}</div></div>
                    <div>Daily: <div className="text-white">₹{g.dailyNeeded}</div></div>
                    <div>Pace: <div className="text-white">{g.pace}</div></div>
                  </div>

                  <p className="text-sm mt-3 text-[#E6EEF8] italic">{g.insight}</p>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(g);
                          setShowModal(true);
                        }}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(g.id)}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10"
                      >
                        <FiTrash2 />
                      </button>
                      <button
                        onClick={() => toggleComplete(g.id)}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10"
                      >
                        <FiCheckCircle />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* COMPLETED GOALS */}
          <h2 className="text-xl font-semibold mb-3">Completed Goals</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {completedGoals.map((c) => (
              <GlassCard key={c.id}>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]">
                    <FiCheckCircle />
                  </div>
                  <div>
                    <h3 className="font-semibold">{c.title}</h3>
                    <p className="text-sm text-[#94A3B8]">
                      Achieved — ₹{c.saved}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#E6EEF8] mt-3 italic">
                  {c.insight || "Amazing consistency!"}
                </p>
              </GlassCard>
            ))}
          </div>

        </main>
      </div>

      {/* MODAL */}
      <GoalModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={editing ? handleSaveEdit : handleAdd}
        initial={editing}
      />
    </div>
  );
}
