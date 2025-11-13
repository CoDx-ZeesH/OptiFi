// utils/chartGradients.jsx
export const chartGradients = (
  <defs>
    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#22C55E" stopOpacity={0.7} />
      <stop offset="100%" stopColor="#22C55E" stopOpacity={0.05} />
    </linearGradient>

    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#EF4444" stopOpacity={0.7} />
      <stop offset="100%" stopColor="#EF4444" stopOpacity={0.05} />
    </linearGradient>

    <linearGradient id="balanceGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
      <stop offset="100%" stopColor="#06B6D4" stopOpacity={1} />
    </linearGradient>

    <linearGradient id="aiGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
      <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.9} />
    </linearGradient>
  </defs>
);
