import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function AIInsights() {
  const aiData = [
    { name: "Jan", actual: 4200 },
    { name: "Feb", actual: 4800 },
    { name: "Mar", actual: 5100 },
    { name: "Apr", actual: 6000 },
    { name: "May", actual: 6600 },
    { name: "Jun", actual: 7100 },
  ];

  return (
    <div className="bg-[#1E293B]/60 rounded-2xl p-6 border border-white/5 shadow-[0_8px_30px_rgba(99,102,241,0.05)] backdrop-blur-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">AI Insights</h3>
        <button className="text-sm text-gray-400 hover:text-white transition">View all</button>
      </div>

      <div className="w-full h-[240px]">
        <ResponsiveContainer>
          <BarChart data={aiData} margin={{ left: -12 }}>
            <defs>
              <linearGradient id="aiBarGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.95} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              tick={{ fill: "#94A3B8", fontSize: 12 }}
            />
            <YAxis stroke="#9CA3AF" tick={{ fill: "#94A3B8", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0F172A",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
                color: "#F1F5F9",
              }}
            />
            <Bar dataKey="actual" barSize={18} fill="url(#aiBarGrad)" radius={[6, 6, 0, 0]}>
              {aiData.map((_, idx) => (
                <Cell key={`cell-${idx}`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AI Suggestion box */}
      <div className="mt-4 text-sm text-gray-300 bg-[#0F172A]/50 rounded-xl p-4 border border-white/5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[#06B6D4] text-lg">🤖</span>
          <span className="font-semibold">OptiBrain Suggestion</span>
        </div>
        <p className="text-gray-400">
          Reduce dining expenses by <span className="text-[#22C55E] font-semibold">12%</span> to save{" "}
          <span className="text-[#22C55E] font-semibold">$120</span> next month.
        </p>
        <p className="text-xs text-[#94A3B8] mt-1">Confidence: 82%</p>
      </div>
    </div>
  );
}
