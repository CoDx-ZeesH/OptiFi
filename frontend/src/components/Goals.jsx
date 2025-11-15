// =========================================
// OptiFi — GOALS PAGE (FULL FINAL FILE)
// =========================================

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiBarChart2,
  FiCheckCircle
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

/* -------------------------------------------------------------
   SAMPLE DATA
------------------------------------------------------------- */
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

/* -------------------------------------------------------------
   OPTIFI THEME CONSTANTS
------------------------------------------------------------- */
const BG_GRADIENT =
  "bg-gradient-to-b from-[#0F172A] via-[#0F172A] to-[#090714]";

const CARD_BG = "bg-[#1E293B]/40";
const CARD_BORDER = "border border-white/10";

const PRIMARY_COLOR = "#3B82F6";
const CYAN_COLOR = "#06B6D4";

const PROGRESS_GRADIENT = "linear-gradient(90deg, #3B82F6, #06B6D4)";

/* -------------------------------------------------------------
   UI COMPONENTS
------------------------------------------------------------- */

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

/* -------------------------------------------------------------
   CREATE/EDIT MODAL
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
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -25, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className={`${CARD_BG} ${CARD_BORDER} rounded-xl p-6 max-w-xl w-full`}
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              Create / Edit Goal
            </h3>
            <p className="text-sm text-[#94A3B8] mb-4">
              OptiFi uses AI to estimate how realistic your goal is.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Goal Name */}
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

              {/* Target */}
              <label>
                <div className="text-sm mb-1">Target ₹</div>
                <input
                  type="number"
                  value={form.target}
                  onChange={(e) =>
                    setForm({ ...form, target: e.target.value })
                  }
                  className="w-full p-2 rounded-lg bg-[#0F172A] border border-white/10 text-white"
                />
              </label>

              {/* End Date */}
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

              {/* Category */}
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

/* -------------------------------------------------------------
   MAIN PAGE COMPONENT
------------------------------------------------------------- */
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
    <div className={`min-h-screen px-8 py-10 text-white ${BG_GRADIENT}`}>
      {/* ------------------------------------------- */}
      {/* PAGE HEADER */}
      {/* ------------------------------------------- */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Your Financial Goals</h1>
          <p className="text-sm text-[#94A3B8] mt-1 max-w-xl">
            Plan smart. Track progress. Let AI guide your journey.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white shadow-lg"
        >
          <FiPlus /> Create New Goal
        </button>
      </div>

      {/* ------------------------------------------- */}
      {/* ACTIVE GOALS */}
      {/* ------------------------------------------- */}
      <h2 className="text-xl font-semibold mb-4">Active Goals</h2>

      {activeGoals.length === 0 ? (
        <GlassCard className="text-center py-10">
          <div className="text-lg">No active goals</div>
          <p className="text-[#94A3B8] mt-2 text-sm">
            Create your first goal to get started.
          </p>
        </GlassCard>
      ) : (
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
                  ₹{g.saved.toLocaleString()} / ₹{g.target.toLocaleString()}
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

                {/* Actions */}
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

                  <button className="text-sm text-[#3B82F6] flex items-center gap-2">
                    <FiBarChart2 /> View Insights
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* ------------------------------------------- */}
      {/* AI NUDGES */}
      {/* ------------------------------------------- */}
      <h2 className="text-xl font-semibold mb-4">AI Nudges to Stay on Track</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          {
            title: "Reduce Shopping by 10%",
            text:
              "You spent ₹2,800 extra in Shopping last month. Reducing it by just 10% helps you reach your goal faster.",
            action: "Review Shopping",
          },
          {
            title: "Shift 15% to Savings",
            text:
              "AI suggests re-balancing your discretionary budget — achievable and impactful.",
            action: "Auto Adjust",
          },
          {
            title: "Automate ₹100 Daily",
            text:
              "Small automation keeps your monthly travel goal on perfect track.",
            action: "Automate Now",
          },
          {
            title: "Avoid Weekend Overspending",
            text:
              "You overspend the most on Sundays. Limiting leisure helps boost overall progress.",
            action: "Set Limit",
          },
        ].map((n, i) => (
          <GlassCard key={i} className="p-5">
            <h3 className="font-semibold mb-1">{n.title}</h3>
            <p className="text-sm text-[#94A3B8]">{n.text}</p>
          </GlassCard>
        ))}
      </div>

      {/* ------------------------------------------- */}
      {/* INSIGHT DASHBOARD */}
      {/* ------------------------------------------- */}
      <h2 className="text-xl font-semibold mb-4">Goal Insights Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Pie Chart + Trend */}
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#94A3B8]">Allocation Across Goals</p>
              <h3 className="text-lg font-semibold">Distribution</h3>
            </div>

            <p className="text-sm text-[#94A3B8]">Projected: 3/4 goals</p>
          </div>

          <div className="flex items-center gap-6 mt-6">
            <div style={{ width: 160, height: 160 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                  >
                    {pieData.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={idx === 0 ? PRIMARY_COLOR : CYAN_COLOR}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className="flex-1">
              <p className="text-sm text-[#94A3B8]">
                Monthly savings vs target
              </p>
              <div className="h-40 mt-3">
                <ResponsiveContainer>
                  <LineChart data={trendData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.03)" />
                    <XAxis dataKey="month" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="saved"
                      stroke={CYAN_COLOR}
                      strokeWidth={2.4}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* AI Prediction */}
        <GlassCard>
          <h3 className="text-lg font-semibold">AI Prediction</h3>
          <p className="text-sm text-[#94A3B8] mt-2">
            AI predicts that you will complete 3 out of 4 goals by next
            quarter.
          </p>
        </GlassCard>
      </div>

      {/* ------------------------------------------- */}
      {/* COMPLETED GOALS */}
      {/* ------------------------------------------- */}
      <h2 className="text-xl font-semibold mb-4">Completed Goals</h2>

      {completedGoals.length === 0 ? (
        <GlassCard className="p-6">
          <p className="text-sm text-[#94A3B8]">
            No completed goals yet — keep going!
          </p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedGoals.map((c) => (
            <GlassCard key={c.id}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
                  <FiCheckCircle />
                </div>

                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm text-[#94A3B8]">
                    Achieved — Saved ₹{c.saved.toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#E2E8F0] italic mt-3">
                {c.insight || "Fantastic consistency — well done!"}
              </p>
            </GlassCard>
          ))}
        </div>
      )}

      {/* MODAL */}
      <GoalModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditing(null);
        }}
        onSave={editing ? handleSaveEdit : handleAdd}
        initial={editing}
      />
    </div>
  );
}
