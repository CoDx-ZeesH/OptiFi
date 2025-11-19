import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Link, useLocation } from "react-router-dom";
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiBell,
  FiSearch,
} from "react-icons/fi";
import { assets } from "../assets/assets";

/* -------------------- SAMPLE DATA -------------------- */
const monthlyTrend = [
  { month: "Jan", spent: 18000, predicted: 19500 },
  { month: "Feb", spent: 15000, predicted: 17500 },
  { month: "Mar", spent: 17000, predicted: 20000 },
  { month: "Apr", spent: 21000, predicted: 22000 },
  { month: "May", spent: 24500, predicted: 26800 },
];

const categoryBreakdown = [
  { name: "Food", value: 32 },
  { name: "Transport", value: 18 },
  { name: "Subscriptions", value: 22 },
  { name: "Shopping", value: 15 },
  { name: "Other", value: 13 },
];

const pieColors = [
  "#3B82F6",
  "#06B6D4",
  "#8B5CF6",
  "#6366F1",
  "#38BDF8",
];

const profilePic = 'https://i.pravatar.cc/150?img=32';

/* -------------------- Animations -------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export default function OptiBrain() {
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
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="grid grid-cols-12 gap-6 p-6">
        {/* ===================================================== */}
        {/*                     SIDEBAR (Original)               */}
        {/* ===================================================== */}
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

            {/* Navigation */}
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

          {/* Bottom */}
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

        {/* ===================================================== */}
        {/*                     MAIN CONTENT                     */}
        {/* ===================================================== */}
        <main className="col-span-10">
          {/* HEADER */}
          <header className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold">OptiBrain Insights</h1>
              <p className="text-[#94A3B8] mt-1 max-w-xl">
                Real-time AI insights designed to optimise your financial life.
              </p>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  className="bg-[#1E293B]/60 border border-white/10 rounded-full px-4 py-2 text-sm
                  placeholder:text-[#94A3B8] focus:outline-none"
                  placeholder="Search..."
                />
                <FiSearch className="absolute right-3 top-2.5 text-[#94A3B8]" />
              </div>

              <FiBell className="text-xl cursor-pointer hover:text-cyan-400 transition" />

              <img
                src={profilePic}
                className="w-10 h-10 rounded-full border-2 border-cyan-400 shadow-lg"
                alt="profile"
              />
            </div>
          </header>

          {/* ===================================================== */}
          {/*                 SECTION 1: SNAPSHOT CARDS             */}
          {/* ===================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

            {/* CARD 1 */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="
                p-6 bg-[#1E293B]/40 rounded-2xl border border-white/10 backdrop-blur-xl 
                transition-all 
                hover:shadow-[0_0_10px_rgba(255,255,255,0.35)]
              "
            >
              <h3 className="text-lg font-semibold mb-3">This Month’s Snapshot</h3>
              <p className="text-sm text-[#94A3B8]">Total Spent</p>
              <h2 className="text-3xl font-bold mt-1 text-[#3B82F6]">₹24,500</h2>

              <p className="mt-4 text-sm text-[#94A3B8]">
                Top Category: <span className="text-white">Food</span>
              </p>
              <p className="text-sm text-[#94A3B8]">
                Savings Progress: <span className="text-white">67%</span>
              </p>

              <p className="mt-6 text-sm text-[#E2E8F0] italic">
                "Spending slightly higher than usual. Reduce discretionary costs."
              </p>
            </motion.div>

            {/* CARD 2 — PIE CHART */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="
                p-6 bg-[#1E293B]/40 rounded-2xl border border-white/10 backdrop-blur-xl 
                transition-all
                hover:shadow-[0_0_10px_rgba(255,255,255,0.35)]
              "
            >
              <h3 className="text-lg font-semibold mb-4">Where Your Money Goes</h3>

              <div className="w-full h-48">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryBreakdown.map((_, i) => (
                        <Cell key={i} fill={pieColors[i]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <p className="mt-4 text-sm text-[#94A3B8] italic">
                "Subscriptions increased due to new recurring services."
              </p>
            </motion.div>

            {/* CARD 3 — WEEKLY TREND */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="
                p-6 bg-[#1E293B]/40 rounded-2xl border border-white/10 backdrop-blur-xl 
                transition-all
                hover:shadow-[0_0_10px_rgba(255,255,255,0.35)]
              "
            >
              <h3 className="text-lg font-semibold">Your Weekly Spending Rhythm</h3>

              <div className="h-48 mt-4">
                <ResponsiveContainer>
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip />
                    <Line type="monotone" dataKey="spent" stroke="#3B82F6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <p className="mt-4 text-sm text-[#94A3B8] italic">
                "Spending peaks on weekends — consider setting weekend limits."
              </p>
            </motion.div>
          </div>

          {/* ===================================================== */}
          {/*                SECTION 2: AI FORECAST GRAPH           */}
          {/* ===================================================== */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="
              p-8 bg-[#1E293B]/40 rounded-2xl border border-white/10 backdrop-blur-xl mb-12
              transition-all
              hover:shadow-[0_0_10px_rgba(255,255,255,0.35)]
            "
          >
            <h2 className="text-2xl font-semibold mb-2">AI Expense Forecast – Next 30 Days</h2>

            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <LineChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="forecast" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip />

                  <Line dataKey="spent" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} />
                  <Line dataKey="predicted" stroke="#06B6D4" strokeWidth={3} strokeDasharray="6 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ===================================================== */}
          {/*            SECTION 3: SMART SUGGESTIONS               */}
          {/* ===================================================== */}
          <h2 className="text-2xl font-semibold mb-6">Smart Suggestions Just for You</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Optimize Your Savings",
                text: "Save ₹2,000 extra by reducing duplicate subscriptions.",
              },
              {
                title: "Recurring Payment Alert",
                text: "3 subscriptions renew this week — review unused ones.",
              },
              {
                title: "Budget Adjustment Needed",
                text: "Your travel expenses have grown 3 months straight.",
              },
              {
                title: "Predictive Insight",
                text: "Most impulse purchases happen between 9–11 PM.",
              },
            ].map((rec, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="
                  p-6 bg-[#1E293B]/40 rounded-2xl border border-white/10 backdrop-blur-xl
                  transition-all
                  hover:shadow-[0_0_10px_rgba(255,255,255,0.35)]
                "
              >
                <h3 className="text-xl font-semibold">{rec.title}</h3>
                <p className="text-[#94A3B8] mt-2">{rec.text}</p>
              </motion.div>
            ))}
          </div>

          {/* ===================================================== */}
          {/*                   MICRO INSIGHTS                     */}
          {/* ===================================================== */}
          <h2 className="text-xl font-bold mb-4">OptiBrain Micro Insights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
            {[
              "You saved ₹800 by skipping food delivery.",
              "Fuel expense increased 9% this month.",
              "Food & Shopping exceeded category limit.",
              "You received 4 cashbacks this month.",
              "Most spending happens on Sundays.",
              "3 subscriptions renewed this week.",
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="
                  p-4 bg-[#1E293B]/40 rounded-2xl border border-white/10 backdrop-blur-xl
                  transition-all 
                  hover:shadow-[0_0_10px_rgba(255,255,255,0.35)]
                "
              >
                {item}
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
