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
  Legend,
} from "recharts";
import { FiFilter, FiInfo, FiChevronDown } from "react-icons/fi";
import { assets } from "../assets/assets";

/*
  Analytics.jsx
  - Place in src/components/
  - Uses Tailwind for styling (Tailwind must be configured)
  - Charts use recharts
  - Theme uses OptiFi dark palette
*/

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

/* -------------------- Small UI helpers -------------------- */
function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#1E293B]/80 border border-[#334155] rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  );
}

function SparkTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F172A] text-sm text-white p-2 rounded shadow-lg border border-white/10">
        <div>{payload[0].payload.month}</div>
        <div className="font-semibold">₹{payload[0].value}</div>
      </div>
    );
  }
  return null;
}

/* -------------------- Main Component -------------------- */
export default function Analytics() {
  const [compareFrom, setCompareFrom] = useState("October");
  const [compareTo, setCompareTo] = useState("November");
  const [showInsightModal, setShowInsightModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Food");

  const totalSpentThisMonth = 24500;
  const totalIncomeThisMonth = 20000;
  const biggestCategory = { name: "Food & Dining", amount: 7200, pct: 30 };
  const savingsProgress = { saved: 3500, goal: 10000 };

  const forecast = useMemo(() => ({ predicted: 26800, confidence: 0.76 }), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#050010] text-[#F8FAFC] px-8 py-10">
      {/* PAGE TITLE */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold">Analytics & Insights</h1>
          <p className="text-sm text-[#94A3B8] mt-1 max-w-xl">
            Visualize your spending patterns, track trends, and understand how your money moves. Powered by AI for deeper financial clarity.
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] shadow-[0_8px_30px_rgba(6,182,212,0.12)]">
            <img src={assets.logo} alt="logo" className="w-5 h-5" />
            OptiBrain Reports
          </button>
          <div className="text-sm text-[#94A3B8] flex items-center gap-2 px-3 py-2 rounded-full bg-[#0F172A]/50 border border-white/6">
            <FiFilter />
            Filters
            <FiChevronDown />
          </div>
        </div>
      </div>

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-[#94A3B8]">Total Spent This Month</div>
              <div className="text-2xl font-semibold mt-2">₹{totalSpentThisMonth.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#94A3B8]">Change</div>
              <div className="mt-2 text-red-400 font-semibold">↑ 12%</div>
            </div>
          </div>
          <div className="mt-4 text-xs text-[#94A3B8]">AI: Spike in Week 2 due to food orders</div>
        </Card>

        <Card>
          <div>
            <div className="text-sm text-[#94A3B8]">Total Income This Month</div>
            <div className="text-2xl font-semibold mt-2">₹{totalIncomeThisMonth.toLocaleString()}</div>
            <div className="mt-3 text-xs text-[#94A3B8]">On track with your monthly average.</div>
          </div>
        </Card>

        <Card>
          <div>
            <div className="text-sm text-[#94A3B8]">Biggest Category Spend</div>
            <div className="text-xl font-semibold mt-2">{biggestCategory.name}</div>
            <div className="mt-2 text-2xl font-bold">₹{biggestCategory.amount.toLocaleString()}</div>
            <div className="mt-3 text-xs text-[#94A3B8]">{biggestCategory.pct}% of total spend</div>
          </div>
        </Card>

        <Card>
          <div>
            <div className="text-sm text-[#94A3B8]">Savings Progress</div>
            <div className="text-2xl font-semibold mt-2">₹{savingsProgress.saved.toLocaleString()}</div>
            <div className="mt-3">
              <div className="w-full bg-[#0F172A] rounded-full h-3 overflow-hidden border border-white/6">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: `${(savingsProgress.saved / savingsProgress.goal) * 100}%`,
                    background: "linear-gradient(90deg,#6366F1,#06B6D4)",
                    boxShadow: "0 6px 16px rgba(99,102,241,0.12)",
                  }}
                />
              </div>
              <div className="mt-2 text-xs text-[#94A3B8]">{Math.round((savingsProgress.saved / savingsProgress.goal) * 100)}% Complete</div>
            </div>
          </div>
        </Card>
      </div>

      {/* MAIN AREA - Charts + Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Spending Trend + Forecast */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm text-[#94A3B8]">Monthly Spending Trend</div>
                <div className="text-lg font-semibold">Compare your expenses month over month</div>
              </div>
              <div className="text-xs text-[#94A3B8]">AI Insight: Spend spike in Week 2 due to food orders</div>
            </div>

            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <LineChart data={monthlyExpenses} margin={{ top: 8, right: 24, left: -10, bottom: 8 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.03)" strokeDasharray="4 6" />
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.06)" }} />
                  <Line type="monotone" dataKey="expense" stroke="#3B82F6" strokeWidth={2.4} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[#94A3B8]">Next Month Expense Forecast</div>
                <div className="text-lg font-semibold">Predicted total spend next month: ₹{forecast.predicted.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#94A3B8]">Confidence</div>
                <div className="text-sm font-semibold">{Math.round(forecast.confidence * 100)}%</div>
              </div>
            </div>

            <div className="mt-4" style={{ width: "100%", height: 160 }}>
              <ResponsiveContainer>
                <AreaChart data={monthlyExpenses}>
                  <defs>
                    <linearGradient id="predGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.06} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.06)" }} />
                  <Area type="monotone" dataKey="expense" stroke="#06B6D4" fill="url(#predGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 text-xs text-[#94A3B8]">
              <strong>AI:</strong> Predicted spend is a dotted forecast line (confidence area shown). Reduce food deliveries to improve confidence.
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-[#94A3B8]">Weekly Spend Pattern</div>
                <div className="text-lg font-semibold">Spot high-spend weeks</div>
              </div>
              <div className="text-xs text-[#94A3B8]">AI Suggestion: Spend peaks Fri–Sun</div>
            </div>

            <div style={{ width: "100%", height: 160 }}>
              <ResponsiveContainer>
                <BarChart data={weeklySpend}>
                  <CartesianGrid stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="week" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip contentStyle={{ background: "#0F172A" }} />
                  <Bar dataKey="value" fill="#6366F1" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right column: category donut + AI insights + goals */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[#94A3B8]">Where Your Money Goes</div>
                <div className="text-lg font-semibold">Category breakdown</div>
              </div>
              <div className="text-xs text-[#94A3B8]">Top: Food (28%)</div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div style={{ width: 160, height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={64} paddingAngle={3}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex-1">
                {categoryData.map((c, i) => (
                  <div key={c.name} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div style={{ width: 12, height: 12, background: COLORS[i], borderRadius: 4 }} />
                      <div className="text-sm">{c.name}</div>
                    </div>
                    <div className="text-sm text-[#94A3B8]">₹{c.value}</div>
                  </div>
                ))}
                <div className="mt-4 text-xs text-[#94A3B8]">AI Tip: Consider a weekly meal budget to reduce Food spend.</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-[#94A3B8]">OptiBrain Highlights</div>
                <div className="text-lg font-semibold">AI-powered actionable insights</div>
              </div>
              <div className="text-xs text-[#94A3B8]">AI-Generated · Real-Time</div>
            </div>

            <div className="space-y-3 text-sm text-[#E6EEF8]">
              <div>💡 "You're overspending on Food this month (28% ↑). Consider reducing Zomato orders."</div>
              <div>📉 "Travel expenses trending down — good control this month."</div>
              <div>🧾 "3 receipts were scanned using OCR. All categorized under Food & Bills."</div>
              <div>💰 "You can save an additional ₹1,500 by sticking to a daily limit of ₹300 for the next 10 days."</div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowInsightModal(true)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-sm"
              >
                View Full OptiBrain Report
              </button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-[#94A3B8]">Savings & Goal Performance</div>
                <div className="text-lg font-semibold">Save ₹10,000 in 3 months</div>
              </div>
              <div className="text-xs text-[#94A3B8]">AI predicts 90% at current pace</div>
            </div>

            <div>
              <div className="text-sm text-[#94A3B8]">Progress</div>
              <div className="mt-2 w-full bg-[#0F172A] rounded-full h-3 overflow-hidden border border-white/6">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: `${(savingsProgress.saved / 10000) * 100}%`,
                    background: "linear-gradient(90deg,#6366F1,#06B6D4)",
                    boxShadow: "0 6px 16px rgba(99,102,241,0.12)",
                  }}
                />
              </div>
              <div className="mt-2 text-sm font-medium">₹{savingsProgress.saved.toLocaleString()} saved — {Math.round((savingsProgress.saved / 10000) * 100)}%</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Comparison Tool */}
      <div className="mt-8 bg-[#1E293B]/60 rounded-2xl p-4 border border-white/6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-sm text-[#94A3B8]">Compare</div>
          <select className="bg-transparent border border-white/6 px-3 py-2 rounded-full text-sm">
            <option>October</option>
            <option>November</option>
            <option>September</option>
          </select>
          <span className="text-sm text-[#94A3B8]">vs</span>
          <select className="bg-transparent border border-white/6 px-3 py-2 rounded-full text-sm">
            <option>November</option>
            <option>October</option>
            <option>September</option>
          </select>
        </div>

        <div className="text-sm text-[#94A3B8]">Category filter</div>
      </div>

      {/* Insight Modal (Glass blur) */}
      <AnimatePresence>
        {showInsightModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowInsightModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0F172A]/80 border border-white/6 rounded-2xl p-6 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">OptiBrain — Full Report</h3>
                  <p className="text-sm text-[#94A3B8]">Deeper insights & action plan.</p>
                </div>
                <button onClick={() => setShowInsightModal(false)} className="text-[#94A3B8]">
                  Close
                </button>
              </div>

              <div className="space-y-4 text-sm text-[#E6EEF8]">
                <div>• Your Food spend increased 28% month-over-month. Top drivers: Zomato orders, dine-outs.</div>
                <div>• Travel down 12% — keep up the good work.</div>
                <div>• OCR scanned receipts: 12 this month — 3 mis-categorized; learn from corrections?</div>
                <div>• Suggested rules: auto-apply "Dining" for vendors containing "Zomato|Swiggy|Domino".</div>
                <div>• Actionable: Turn on "Daily limit" of ₹300 for 10 days to save ~₹1500.</div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 rounded-full mr-3 border border-white/10">Dismiss</button>
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]">Apply Suggestions</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
