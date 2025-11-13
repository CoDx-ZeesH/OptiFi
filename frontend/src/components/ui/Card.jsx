export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-[#1E293B]/70 border border-white/5 shadow-[0_4px_20px_rgba(59,130,246,0.06)] backdrop-blur-md p-5 ${className}`}
    >
      {children}
    </div>
  );
}
