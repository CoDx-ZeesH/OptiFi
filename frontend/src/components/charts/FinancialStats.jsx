import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function FinancialStats({ data, gradients }) {
  return (
    <div className="bg-[#1E293B]/60 rounded-2xl p-6 border border-white/5 shadow-[0_16px_40px_rgba(59,130,246,0.06)] backdrop-blur-lg relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Financial Statistics</h3>
        <span className="text-sm text-gray-400">Last 6 months</span>
      </div>

      <div className="w-full h-[320px]">
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
            {gradients}
            <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="month"
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
            <Area
              type="monotone"
              dataKey="income"
              stroke="#22C55E"
              strokeWidth={2.4}
              fill="url(#incomeGrad)"
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#EF4444"
              strokeWidth={2.4}
              fill="url(#expenseGrad)"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
