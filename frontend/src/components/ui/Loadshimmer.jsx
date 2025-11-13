import React from "react";

export default function LoadShimmer({ height = "300px", rounded = "1rem" }) {
  return (
    <div
      className="w-full relative overflow-hidden bg-[#1E293B]/60 border border-white/5"
      style={{ height, borderRadius: rounded }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
