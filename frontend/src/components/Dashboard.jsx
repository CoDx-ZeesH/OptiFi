import React, { Suspense, useMemo, lazy, useEffect, useState } from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import CountUp from "react-countup";

import Card from "./ui/Card";
import LoadShimmer from "./ui/Loadshimmer";
import { chartGradients } from "../utils/chartGradients";
import profilePic from "../assets/group_profile.png";

/* Lazy-loaded charts */
const AreaChartSection = lazy(() => import("./charts/FinancialStats"));
const BarChartSection = lazy(() => import("./charts/AIInsights"));

export default function Dashboard() {
  const location = useLocation();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access_token");
  const backendUrl = "http://localhost:8000";

  // Add monthlyData state
const [monthlyData, setMonthlyData] = useState([]);

// load dashboard + monthly summary
useEffect(() => {
  if (!token) return console.error("No token found");

  // dashboard
  fetch(`${backendUrl}/api/users/dashboard/`, {
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(data => {
      setDashboardData(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Dashboard fetch error:", err);
      setLoading(false);
    });

  // monthly summary
  fetch(`${backendUrl}/api/analytics/monthly-summary/`, {
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(data => {
      // Defensive normalization:
      // If the API returned an object with a list under a key, try to extract it.
      let arr = [];

      if (Array.isArray(data)) {
        arr = data;
      } else if (data && Array.isArray(data.results)) {
        arr = data.results;
      } else if (data && typeof data === "object") {
        // maybe the API returned { "Jan 2025": {...}, ... } or { months: [...] }
        if (Array.isArray(data.months)) arr = data.months;
        else if (data.data && Array.isArray(data.data)) arr = data.data;
        else {
          // try to coerce object values into array
          arr = Object.values(data).filter(v => v && (v.income || v.expenses || v.month));
        }
      } else {
        arr = [];
      }

      // final shape-normalize: make sure each entry has numeric income/expenses
      arr = arr.map((r) => ({
        month: r.month || r.month_name || (r.month_date ? String(r.month_date) : undefined) || "",
        income: typeof r.income === "number" ? r.income : parseFloat(r.income) || 0,
        expenses: typeof r.expenses === "number" ? r.expenses : parseFloat(r.expenses) || 0,
      }));

      setMonthlyData(arr);
    })
    .catch(err => {
      console.error("Monthly summary fetch error:", err);
      setMonthlyData([]);
    });

}, []);



  if (loading || !dashboardData) {
    return <LoadShimmer height="100vh" />;
  }

  // 🔥 Stats from backend
  const stats = {
    balance: dashboardData.balance,
    income: dashboardData.monthly_income,
    savings: dashboardData.monthly_savings,
    expenses: dashboardData.monthly_expenses,
  };

  // 🔥 Transactions
  const transactions = dashboardData.transactions || [];

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/analytics" },
    { name: "Goals", path: "/goals" },
    { name: "Transactions", path: "/transactions" },
    { name: "OptiBrain Insights", path: "/optibrain" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] flex flex-col">
      <div className="grid grid-cols-12 gap-6 p-6">

        {/* ============ SIDEBAR ============ */}
        <aside className="col-span-2 bg-gradient-to-b from-[#4b6ff5] to-[#06B6D4]
rounded-tr-3xl rounded-br-3xl p-6 sticky top-6 h-[calc(100vh-48px)] flex flex-col justify-between">

          {/* Logo + Nav */}
          <div>
            <div className="flex items-center gap-2 mb-10">
              <div>
                <h1 className="font-bold text-lg text-white tracking-tight">OptiFi</h1>
                <p className="text-xs text-white/70">Personal Finance</p>
              </div>
            </div>

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

          {/* Settings */}
          <div className="space-y-3 pt-6">
            <Link to="/profile" className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/10">
              <FiSettings />
              <span className="text-sm">Settings</span>
            </Link>

            <Link to="/auth" className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/10">
              <FiLogOut />
              <span className="text-sm">Logout</span>
            </Link>
          </div>
        </aside>

        {/* ============ MAIN CONTENT ============ */}
        <main className="col-span-10">
          
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold">Dashboard</h1>
              <p className="text-sm text-[#94A3B8] mt-1">
                Welcome back, {dashboardData.username} 👋
              </p>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  className="bg-[#1E293B]/60 border border-white/10 rounded-full px-4 py-2 text-sm"
                  placeholder="Search..."
                />
                <FiSearch className="absolute right-3 top-2.5 text-[#94A3B8]" />
              </div>

              <FiBell className="text-xl hover:text-cyan-400 transition" />

              <img src={profilePic} className="w-10 h-10 rounded-full border-2 border-cyan-400" />
            </div>
          </header>

          {/* ============ STATS ============ */}
          <section className="grid grid-cols-4 gap-6 mb-8">
            {[stats.balance, stats.income, stats.savings, stats.expenses].map(
              (value, index) => (
                <Card
                  key={index}
                  className="bg-[#1E293B]/40 border border-white/10 rounded-2xl p-5"
                >
                  <div className="text-sm text-[#CBD5E1]">
                    {["Balance", "Income", "Savings", "Expenses"][index]}
                  </div>
                  <div className="text-2xl font-bold mt-2 text-white">
                    <CountUp end={value} decimals={2} prefix="₹" separator="," />
                  </div>
                </Card>
              )
            )}
          </section>

          {/* ============ CHARTS ============ */}
          <section className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-8">
              <Suspense fallback={<LoadShimmer height="320px" />}>
                <AreaChartSection data={monthlyData} gradients={chartGradients} />
              </Suspense>
            </div>

            <div className="col-span-4">
              <Suspense fallback={<LoadShimmer height="280px" />}>
                <BarChartSection />
              </Suspense>
            </div>
          </section>

          {/* ============ TRANSACTIONS ============ */}
          <section className="bg-[#1E293B]/60 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              <Link to="/transactions" className="text-sm text-[#94A3B8] hover:text-cyan-400">
                View all
              </Link>
            </div>

            <ul className="space-y-3">
              {transactions.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between p-3 bg-[#0F172A]/60 rounded-xl border border-white/10 hover:border-cyan-400/30"
                >
                  <div>
                    <div className="font-medium">{t.merchant}</div>
                    <div className="text-xs text-[#94A3B8]">
                      {t.category} • {t.time}
                    </div>
                  </div>

                  <div
                    className={`text-sm font-semibold ${
                      t.amount < 0 ? "text-[#EF4444]" : "text-[#22C55E]"
                    }`}
                  >
                    ₹{t.amount.toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          </section>

        </main>
      </div>
    </div>
  );
}
