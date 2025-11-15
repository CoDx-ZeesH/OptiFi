import React from "react";
import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
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
  return (
    <div className="min-h-screen px-8 py-12 bg-gradient-to-b from-[#0F172A] via-[#0F172A] to-[#090714] text-[#F1F5F9]">

      {/* PAGE TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight bg-[#FFFFFF] bg-clip-text text-transparent">
          OptiBrain Insights
        </h1>
        <p className="text-[#94A3B8] mt-2 max-w-xl">
          Real-time AI insights, monthly forecasts, and personalized recommendations crafted to optimise your financial life.
        </p>
      </motion.div>

      {/* SECTION 1 — AI SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

        {/* CARD 1 */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="p-6 rounded-2xl  bg-[#1E293B]/40 rounded-1xl border border-white/10 rounded-xl text-sm backdrop-blur-xl hover:scale-[1.03] transition-all"
        >
          <h3 className="text-lg font-semibold mb-3">This Month’s Snapshot</h3>
          <p className="text-sm text-[#94A3B8]">Total Spent</p>
          <h2 className="text-3xl font-bold mt-1 text-[#3B82F6]">₹24,500</h2>

          <p className="mt-4 text-sm text-[#94A3B8]">
            Top Category: <span className="text-white">Food</span>
          </p>
          <p className="text-sm text-[#94A3B8]">Savings Progress: <span className="text-white">67%</span></p>

          <div className="mt-6 text-sm text-[#E2E8F0] italic">
            “Your spending this month is slightly higher than usual. Consider limiting discretionary expenses.”
          </div>
        </motion.div>

        {/* CARD 2 — PIE CHART */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="p-6 rounded-2xl bg-[#1E293B]/40 rounded-1xl border border-white/10 rounded-xl text-sm backdrop-blur-xl hover:scale-[1.03] transition-all"
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
            “Subscriptions increased by 22% this month due to new recurring services.”
          </p>
        </motion.div>

        {/* CARD 3 — WEEKLY TREND */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="p-6 rounded-2xl bg-[#1E293B]/40 rounded-1xl border border-white/10 rounded-xl text-sm backdrop-blur-xl hover:scale-[1.03] transition-all"
        >
          <h3 className="text-lg font-semibold mb-2">Your Weekly Spending Rhythm</h3>

          <div className="h-48 mt-4">
            <ResponsiveContainer>
              <LineChart data={monthlyTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="spent"
                  stroke="#3B82F6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-4 text-sm text-[#94A3B8] italic">
            “You tend to overspend on weekends. Consider setting weekend limits to reduce leakage.”
          </p>
        </motion.div>
      </div>

      {/* SECTION 2 — FORECAST GRAPH */}
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="p-8  bg-[#1E293B]/40 rounded-1xl border border-white/10 rounded-xl text-sm backdrop-blur-xl mb-12"
      >
        <h2 className="text-2xl font-semibold mb-2">AI Expense Forecast — Next 30 Days</h2>
        <p className="text-[#94A3B8] mb-6">Projection based on your recent spending patterns.</p>

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

        <div className="mt-6 space-y-2 text-sm text-[#E2E8F0]">
          <p>Expected Range: <span className="text-white">₹23,000 – ₹27,000</span></p>
          <p>Top Category Next Month: <span className="text-white">Shopping</span></p>
          <p>Financial Health: <span className="text-green-400">Stable</span></p>
        </div>
      </motion.div>

      {/* SECTION 3 — SMART RECOMMENDATIONS */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-6"
      >
        Smart Suggestions Just for You
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {[
          {
            title: "Optimize Your Savings",
            text: "Save ₹2,000 extra each month by reducing duplicate subscriptions.",
          },
          {
            title: "Recurring Payment Alert",
            text: "3 subscriptions renew this week — consider pausing unused ones.",
          },
          {
            title: "Budget Adjustment Needed",
            text: "Your travel expenses have grown for 3 straight months.",
          },
          {
            title: "Predictive Insight",
            text: "You make most impulse purchases between 9–11 PM.",
          },
        ].map((rec, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="p-6 bg-[#1E293B]/40 rounded-1xl border border-white/10 rounded-xl text-sm backdrop-blur-xl"
          >
            <h3 className="text-xl font-semibold">{rec.title}</h3>
            <p className="text-[#94A3B8] mt-2">{rec.text}</p>
          </motion.div>
        ))}
      </div>

      {/* MICRO INSIGHTS */}
      <h2 className="text-xl font-bold mb-4">OptiBrain Micro Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
        {[
          "You saved ₹800 by skipping food delivery for 3 days.",
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
            className="p-4 bg-[#1E293B]/40 rounded-1xl border border-white/10 rounded-xl text-sm backdrop-blur-xl"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
