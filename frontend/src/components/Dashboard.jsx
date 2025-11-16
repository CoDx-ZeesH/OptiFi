import React, { Suspense, useMemo, lazy } from "react";
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
import { useDashboardData } from "../hooks/useDashboardData";
import { assets } from "../assets/assets";
import profilePic from "../assets/group_profile.png";

/* Lazy-loaded charts */
const AreaChartSection = lazy(() => import("./charts/FinancialStats"));
const BarChartSection = lazy(() => import("./charts/AIInsights"));

export default function Dashboard() {
  const token = localStorage.getItem('access_token');
  const backendUrl ="http://localhost:8000";
  if (!token) {
  console.log("No access token found — user probably not logged in");
} else {
  fetch(`${backendUrl}/api/users/profile/`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  .then(async response => {
    if (response.ok) {
      const data = await response.json();
      console.log("profile:", data);
    } else {
      if (response.status === 401) {
        console.error("Unauthorized — token missing or invalid/expired");
      } else {
        const text = await response.text();
        console.error("Server returned", response.status, text);
      }
    }
  })
  .catch(err => {
    console.error("Network or CORS error:", err);
  });
}
  const { data } = useDashboardData();
  const location = useLocation();


  const monthlyData = data?.monthlyData || [
    { month: "Jan", income: 4200, expenses: 3100 },
    { month: "Feb", income: 4800, expenses: 3400 },
    { month: "Mar", income: 5200, expenses: 2900 },
    { month: "Apr", income: 6100, expenses: 3600 },
    { month: "May", income: 6800, expenses: 4100 },
    { month: "Jun", income: 7200, expenses: 3900 },
  ];

  const transactions = data?.transactions || [
    { id: 1, merchant: "Amazon", category: "Shopping", amount: -52, time: "2h ago" },
    { id: 2, merchant: "Salary", category: "Income", amount: 2450.5, time: "1d ago" },
    { id: 3, merchant: "Zomato", category: "Food", amount: -12.4, time: "3d ago" },
  ];

  const stats = useMemo(
    () => ({
      balance: 9000.5,
      income: 2450.5,
      savings: 2000.7,
      expenses: 290.1,
    }),
    []
  );

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/analytics" },
    { name: "Goals", path: "/goals" },
    { name: "Transactions", path: "/transactions" },
    { name: "OptiBrain Insights", path: "/optibrain" }, // FIXED PATH
    { name: "Profile", path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] flex flex-col">
      <div className="grid grid-cols-12 gap-6 p-6">

        {/* ============ SIDEBAR ============ */}
        <aside className="col-span-2 bg-gradient-to-b from-[#4b6ff5]  to-[#06B6D4]
 rounded-tr-3xl rounded-br-3xl p-6 sticky top-6 h-[calc(100vh-48px)] shadow-[inset_0_0_30px_rgba(0,0,0,0.2)] flex flex-col justify-between">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-10">
              <img
                src={assets.logo}
                alt="OptiFi Logo"
                className="w-20 h-20 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]"
              />
              <div>
                <h1 className="font-bold text-lg text-white tracking-tight">OptiFi</h1>
                <p className="text-xs text-white/70">Personal Finance</p>
              </div>
            </div>

            {/* Nav Links */}
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

        {/* ============ MAIN CONTENT ============ */}
        <main className="col-span-10">

          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
              <p className="text-sm text-[#94A3B8] mt-1">Welcome back, {data.username} 👋</p>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  className="bg-[#1E293B]/60 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none"
                  placeholder="Search..."
                />
                <FiSearch className="absolute right-3 top-2.5 text-[#94A3B8]" />
              </div>

              <FiBell className="text-xl hover:text-cyan-400 transition" />

              <img
                src={profilePic}
                className="w-10 h-10 rounded-full border-2 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                alt=""
              />
            </div>
          </header>

          {/* ============ STAT CARDS ============ */}
          <section className="grid grid-cols-4 gap-6 mb-8">
            {[stats.balance, stats.income, stats.savings, stats.expenses].map(
              (value, index) => (
                <Card
                  key={index}
                  className="
                    bg-[#1E293B]/40 border border-white/10 rounded-2xl p-5 
                    transition-all duration-300
                    hover:bg-gradient-to-br hover:from-[#4b6ff5]  hover:to-[#06B6D4]
                    hover:shadow-[0_0_25px_rgba(127,124,255,0.55)]
                  "
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
              <Link
                to="/transactions"
                className="text-sm text-[#94A3B8] hover:text-cyan-400"
              >
                View all
              </Link>
            </div>

            <ul className="space-y-3">
              {transactions.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between p-3 bg-[#0F172A]/60 rounded-xl border border-white/10 hover:border-cyan-400/30 transition"
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
                    {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}
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
