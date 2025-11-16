import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { FiFilter, FiChevronDown, FiSettings, FiLogOut, FiUser, FiBell, FiSearch } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import profilePic from "../assets/group_profile.png";

/* -------------------- Sample Data -------------------- */
const monthlyExpenses = [
  { month: "Jan", expense: 18000 },
  { month: "Feb", expense: 15000 },
  { month: "Mar", expense: 17000 },
  { month: "Apr", expense: 21000 },
  { month: "May", expense: 24500 },
  { month: "Jun", expense: 23000 },
  { month: "Jul", expense: 19800 },
  { month: "Aug", expense: 22000 },
  { month: "Sep", expense: 24000 },
  { month: "Oct", expense: 26000 },
  { month: "Nov", expense: 24500 },
  { month: "Dec", expense: 25000 },
];

const weeklySpend = [
  { week: "W1", value: 4200 },
  { week: "W2", value: 8200 },
  { week: "W3", value: 6000 },
  { week: "W4", value: 6100 },
];

const categoryData = [
  { name: "Food", value: 7200 },
  { name: "Travel", value: 4200 },
  { name: "Bills", value: 3600 },
  { name: "Shopping", value: 3000 },
  { name: "Entertainment", value: 1600 },
  { name: "Misc", value: 900 },
];

const COLORS = ["#06B6D4", "#3B82F6", "#22C55E", "#F59E0B", "#8B5CF6", "#F97316"];

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-[#1E293B]/40 border border-white/10 backdrop-blur-xl rounded-2xl p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export default function Analytics() {
  const location = useLocation();
  const [showInsightModal, setShowInsightModal] = useState(false);

  const totalSpentThisMonth = 24500;
  const totalIncomeThisMonth = 20000;
  const biggestCategory = { name: "Food & Dining", amount: 7200, pct: 30 };
  const savingsProgress = { saved: 3500, goal: 10000 };

  const forecast = useMemo(() => ({ predicted: 26800, confidence: 0.76 }), []);

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
        {/* ================= SIDE BAR ================= */}
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

          {/* Bottom Controls */}
          <div className="space-y-3 pt-6 border-t border-white/30">
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

        {/* ================= MAIN CONTENT ================= */}
        <main className="col-span-10">
          {/* HEADER */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold">Analytics & Insights</h1>
              <p className="text-sm text-[#94A3B8] mt-1">
                Visualize your spending trends with AI-powered insights.
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

          {/* ================= SUMMARY CARDS ================= */}
          {/* ================= SUMMARY CARDS ================= */}
<div className="grid grid-cols-4 gap-6 mb-8">

  {/* Total Spent */}
  <Card
    className="
      hover:bg-gradient-to-br hover:from-[#4b6ff5] hover:to-[#06B6D4]
      hover:shadow-[0_0_25px_rgba(127,124,255,0.25)]
    "
  >
    <div className="text-sm text-[#f2f3f4]">Total Spent This Month</div>
    <div className="text-2xl font-bold mt-2">₹{totalSpentThisMonth.toLocaleString()}</div>
    <p className="mt-3 text-xs text-[#ccd5e1]">AI: Week 2 spike due to food orders</p>
  </Card>

  {/* Total Income */}
  <Card
    className="
      hover:bg-gradient-to-br hover:from-[#4b6ff5] hover:to-[#06B6D4]
      hover:shadow-[0_0_25px_rgba(127,124,255,0.25)]
    "
  >
    <div className="text-sm text-[#f2f3f4]">Total Income</div>
    <div className="text-2xl font-bold mt-2">₹{totalIncomeThisMonth.toLocaleString()}</div>
  </Card>

  {/* Biggest Category */}
  <Card
    className="
      hover:bg-gradient-to-br hover:from-[#4b6ff5] hover:to-[#06B6D4]
      hover:shadow-[0_0_25px_rgba(127,124,255,0.25)]
    "
  >
    <div className="text-sm text-[#f2f3f4]">Biggest Category</div>
    <div className="text-xl font-semibold mt-2">{biggestCategory.name}</div>
    <div className="text-2xl font-bold mt-2">₹{biggestCategory.amount}</div>
  </Card>

  {/* Savings Progress */}
  <Card
    className="
      hover:bg-gradient-to-br hover:from-[#4b6ff5] hover:to-[#06B6D4] 
      hover:shadow-[0_0_25px_rgba(127,124,255,0.25)]
    "
  >
    <div className="text-sm text-[#f2f3f4]">Savings Progress</div>
    <div className="text-2xl font-semibold mt-2">₹{savingsProgress.saved}</div>

    <div className="mt-3 w-full bg-[#0F172A] rounded-full h-3 overflow-hidden border border-white/10">
      <div
        className="h-3 rounded-full"
        style={{
          width: `${(savingsProgress.saved / savingsProgress.goal) * 100}%`,
          background: "linear-gradient(90deg,#6366F1,#06B6D4)",
        }}
      />
    </div>
  </Card>

</div>


          {/* ================= CHARTS ROW ================= */}
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT 8 COLUMNS */}
            <div className="col-span-8 space-y-6">

              {/* Monthly Trend */}
              <Card>
                <div className="text-lg font-semibold mb-4">Monthly Spending Trend</div>
                <div className="h-50">
                  <ResponsiveContainer>
                    <LineChart data={monthlyExpenses}>
                      <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip />
                      <Line dataKey="expense" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              
              {/* Weekly Bar */}
              <Card>
                <div className="text-lg font-semibold">Weekly Spend Pattern</div>
                <div className="h-40 w-3.5mt-4">
                  <ResponsiveContainer>
                    <BarChart data={weeklySpend}>
                      <CartesianGrid stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="week" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6366F1" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

            </div>

            {/* RIGHT SIDEBAR COLUMN (4) */}
            <div className="col-span-4 space-y-6">
              
              {/* Donut */}
              <Card>
                <div className="text-lg font-semibold">Category Breakdown</div>
                <div className="flex gap-4 mt-4">
                  <div className="w-1/2 h-50">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={categoryData} dataKey="value" innerRadius={40} outerRadius={60}>
                          {categoryData.map((c, i) => (
                            <Cell key={i} fill={COLORS[i]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-2 text-sm">
                    {categoryData.map((c, i) => (
                      <div key={c.name} className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded" style={{ background: COLORS[i] }} />
                          {c.name}
                        </div>
                        <span className="text-[#94A3B8]">₹{c.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* OptiBrain */}
              <Card>
                <div className="text-lg font-semibold mb-3">OptiBrain Highlights</div>
                <p className="text-sm text-[#E6EEF8] h-25 mb-3">
                  💡 You're overspending on Food this month (28% ↑).
                </p>
                <button
                  onClick={() => setShowInsightModal(true)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white text-sm"
                >
                  View Full Report
                </button>
              </Card>

            </div>
          </div>
        </main>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {showInsightModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowInsightModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#0F172A]/90 border border-white/10 p-6 rounded-2xl max-w-xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Full OptiBrain Report</h3>
              <p className="text-sm text-[#94A3B8] mb-4">
                Complete AI-generated insights for your month.
              </p>
              <button
                className="px-4 py-2 rounded-full bg-white/10"
                onClick={() => setShowInsightModal(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
