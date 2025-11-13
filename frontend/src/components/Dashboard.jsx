import React, { Suspense, useMemo, lazy } from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut
} from "react-icons/fi";
import CountUp from "react-countup";
import Card from "./ui/Card";
import LoadShimmer from "./ui/Loadshimmer";
import { chartGradients } from "../utils/chartGradients";
import { useDashboardData } from "../hooks/useDashboardData";
import { assets } from "../assets/assets";
import profilePic from "../assets/group_profile.png";


/* ✅ Lazy-loaded Charts */
const AreaChartSection = lazy(() => import("./charts/FinancialStats"));
const BarChartSection = lazy(() => import("./charts/AIInsights"));

export default function Dashboard() {
  const { data } = useDashboardData();

  // Fallback demo data
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

  const stats = useMemo(() => ({
    balance: 9000.5,
    income: 2450.5,
    savings: 2000.7,
    expenses: 290.1,
  }), []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] flex flex-col">
      <div className="grid grid-cols-12 gap-6 p-6">

        {/* === Sidebar === */}
        <aside className="col-span-2 bg-gradient-to-b from-[#4b6ff5]  to-[#06B6D4]  rounded-tr-3xl rounded-br-3xl p-6 sticky top-6 h-[calc(100vh-48px)] shadow-[inset_0_0_30px_rgba(0,0,0,0.2)] flex flex-col justify-between">
          
          {/* --- Logo Section --- */}
          <div>
            <div className="flex items-center gap-1 mb-10">
              <img
                src={assets.logo}
                alt="OptiFi Logo"
                className="w-20 h-20 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] hover:scale-105 transition-all duration-300"
              />
              <div>
                <h1 className="font-bold text-lg text-white tracking-tight">OptiFi</h1> 
                <p className="text-xs text-white/70">Personal Finance</p>
              </div>
            </div>

            {/* --- Navigation Tabs --- */}
            <nav className="space-y-3">
              {["Dashboard", "Analytics", "Goals", "OptiBrain Insights"].map((tab, i) => (
                <div
                  key={tab}
                  className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                    i === 0
                      ? "bg-[#071030] text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <FiUser /> <span className="text-sm">{tab}</span>
                </div>
              ))}
            </nav>
          </div>

          {/* --- Settings + Logout --- */}
          <div className="space-y-3 pt-6 border-t border-white/20">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-all">
              <FiSettings className="text-white/90" />
              <span className="text-sm text-white/90">Settings</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-all">
              <FiLogOut className="text-white/90" />
              <span className="text-sm text-white/90">Logout</span>
            </div>
          </div>
        </aside>

        {/* === Main Content === */}
        <main className="col-span-10">
          {/* --- Header --- */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
              <p className="text-sm text-[#94A3B8] mt-1">Welcome back, Anshi 👋</p>
            </div>

            {/* --- Right-side Controls --- */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  className="bg-[#1E293B]/60 border border-white/5 rounded-full px-4 py-2 text-sm text-[#F1F5F9]/90 placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  placeholder="Search..."
                />
                <FiSearch className="absolute right-3 top-2.5 text-[#94A3B8]" />
              </div>
              <FiBell className="text-xl opacity-80 cursor-pointer hover:text-cyan-400 transition" />
              <img
                src={profilePic}
                alt="Anshi Agarwal"
                className="w-10 h-10 rounded-full border-2 border-cyan-400 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.4)] object-cover"
              />
            </div>
          </header>

          {/* --- Stat Cards --- */}
          <section className="grid grid-cols-4 gap-6 mb-8">
            {[
              { title: "Balance", value: stats.balance, color: "from-[#6366F1] to-[#06B6D4]" },
              { title: "Income", value: stats.income, color: "from-[#22C55E] to-[#15803D]" },
              { title: "Savings", value: stats.savings, color: "from-[#FACC15] to-[#FDE047]" },
              { title: "Expenses", value: stats.expenses, color: "from-[#EF4444] to-[#B91C1C]" },
            ].map((item) => (
              <Card
                key={item.title}
                className={`bg-gradient-to-br ${item.color} p-5 text-white shadow-[0_10px_40px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all duration-300`}
              >
                <div className="text-sm opacity-90">{item.title}</div>
                <div className="text-2xl font-bold mt-2">
                  <CountUp end={item.value} decimals={2} prefix="$" separator="," />
                </div>
              </Card>
            ))}
          </section>

          {/* --- Charts --- */}
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

          {/* --- Transactions --- */}
          <section className="bg-[#1E293B]/60 rounded-2xl p-6 border border-white/5 shadow-[0_8px_30px_rgba(99,102,241,0.08)] backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              <button className="text-sm text-[#94A3B8] hover:text-cyan-400 transition">
                View all
              </button>
            </div>
            <ul className="space-y-3">
              {transactions.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between p-3 bg-[#0F172A]/60 rounded-lg border border-white/5 hover:border-cyan-500/20 transition-all"
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
