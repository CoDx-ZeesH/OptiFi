import { useQuery } from "@tanstack/react-query";

export const useDashboardData = () => {
  // Return fallback data since backend API is not implemented
  const fallbackData = {
    monthlyData: [
      { month: "Jan", income: 4200, expenses: 3100 },
      { month: "Feb", income: 4800, expenses: 3400 },
      { month: "Mar", income: 5200, expenses: 2900 },
      { month: "Apr", income: 6100, expenses: 3600 },
      { month: "May", income: 6800, expenses: 4100 },
      { month: "Jun", income: 7200, expenses: 3900 },
    ],
    transactions: [
      { id: 1, merchant: "Amazon", category: "Shopping", amount: -52, time: "2h ago" },
      { id: 2, merchant: "Salary", category: "Income", amount: 2450.5, time: "1d ago" },
      { id: 3, merchant: "Zomato", category: "Food", amount: -12.4, time: "3d ago" },
    ],
  };

  return {
    data: fallbackData,
    isLoading: false,
    error: null,
  };
};
