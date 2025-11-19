// ProfileSettingsPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiEdit,
  FiCamera,
  FiSave,
  FiUpload,
  FiSettings,
  FiLogOut,
  FiUser,
  FiBell,
  FiSearch,
} from "react-icons/fi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { assets } from "../assets/assets"; // adjust path if needed
import profilePic from "../assets/group_profile.png"; // fallback avatar if used

// ------- Theme constants -------
const BG_GRADIENT = "bg-gradient-to-b from-[#0F172A] via-[#0F172A] to-[#090714]";
const CARD_BG = "bg-[#1E293B]/60";
const CARD_BORDER = "border border-[rgba(255,255,255,0.08)]";
const SIDEBAR_GRADIENT = "bg-gradient-to-b from-[#4b6ff5] to-[#06B6D4]";

// ------- Toggle component -------
const Toggle = ({ enabled, onToggle, activeColor = "#22C55E", aria }) => (
  <button
    aria-label={aria || "toggle"}
    onClick={() => onToggle(!enabled)}
    className="relative inline-flex items-center h-6 w-12 rounded-full p-1 transition-colors duration-200"
    style={{ background: enabled ? activeColor : "#475569" }}
  >
    <span
      className="block w-4 h-4 bg-white rounded-full transform transition-transform duration-200"
      style={{
        transform: enabled ? "translateX(22px)" : "translateX(0px)",
      }}
    />
  </button>
);

// ------- Main component -------
export default function ProfileSettingsPage() {
  const location = useLocation();

  // form state
  const [form, setForm] = useState({
    fullName: "Neha Verma",
    email: "neha.verma@gmail.com",
    dob: "2001-02-10",
    gender: "Male",
    nationality: "India",
    address: "Lucknow, India",
    incomeRange: "₹50,000 – ₹1,00,000",
    displayName: "anshi_agrawal",
    language: "English",
    timeZone: "GMT+5:30",
  });

  const [twoFA, setTwoFA] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [aiNudges, setAiNudges] = useState(true);
  const [emailReports, setEmailReports] = useState(false);
  const [ocrSync, setOcrSync] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [insightFreq, setInsightFreq] = useState("Weekly");
  const [currency, setCurrency] = useState("INR");

  const [accounts, setAccounts] = useState([
    { id: 1, type: "Bank Account", name: "Axis Bank (UPI Linked)", status: "connected" },
    { id: 2, type: "Wallet", name: "Paytm Wallet", status: "reconnect" },
    { id: 3, type: "Credit Card", name: "HDFC CC", status: "connected" },
    { id: 4, type: "Google Pay", name: "Google Pay", status: "connected" },
  ]);

  const [uploadFiles, setUploadFiles] = useState([]);
  const [ocrAccuracy, setOcrAccuracy] = useState(92);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // small helpers
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function reconnectAll() {
    setAccounts((prev) => prev.map((a) => ({ ...a, status: "connected" })));
  }

  function handleFiles(files) {
    if (!files) return;
    const arr = Array.from(files);
    setUploadFiles((prev) => [...prev, ...arr]);
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  async function handleSave(e) {
    e && e.preventDefault();
    setSaving(true);
    setSaved(false);

    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1300);
  }

  // Nav links for sidebar (matching Dashboard)
  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/analytics" },
    { name: "Goals", path: "/goals" },
    { name: "Transactions", path: "/transactions" },
    { name: "OptiBrain Insights", path: "/optibrain" },
    { name: "Profile", path: "/profile" },
  ];

  // Reset uploads on unmount (optional)
  useEffect(() => {
    return () => setUploadFiles([]);
  }, []);

  // ---------- Render ----------
  return (
    <div className={`min-h-screen text-[#F1F5F9] ${BG_GRADIENT} px-6 py-6`}>
      <div className="max-w-full mx-auto grid grid-cols-12 gap-6">

        {/* ============ SIDEBAR ============ */}
        <aside className={`col-span-2 ${SIDEBAR_GRADIENT} rounded-tr-3xl rounded-br-3xl p-6 sticky top-6 h-[calc(100vh-48px)] shadow-[inset_0_0_30px_rgba(0,0,0,0.2)] flex flex-col justify-between`}>
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-10">
              <img src={assets.logo} alt="OptiFi Logo" className="w-20 h-20 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]" />
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
            <Link to="/profile" className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/10 transition">
              <FiSettings />
              <span className="text-sm">Settings</span>
            </Link>

            <Link to="/auth" className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/10 transition">
              <FiLogOut />
              <span className="text-sm">Logout</span>
            </Link>
          </div>
        </aside>

        {/* ============ MAIN ============ */}
        <main className="col-span-10">

          {/* Header */}
          <div className="flex items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-semibold">Profile Settings</h1>
              <p className="text-sm text-[#94A3B8] mt-1 max-w-xl">Manage account, connected banks, preferences, security and AI settings.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <input className="bg-[#1E293B]/60 border border-white/10 rounded-full px-4 py-2 text-sm placeholder:text-[#94A3B8]" placeholder="Search..." />
                <FiSearch className="absolute right-3 top-2.5 text-[#94A3B8]" />
              </div>

              <FiBell className="text-xl hover:text-cyan-400 transition" />
              <img src="https://i.pravatar.cc/150?img=32" alt="avatar" className="w-10 h-10 rounded-full border-2 border-cyan-400 object-cover shadow-[0_0_10px_rgba(6,182,212,0.25)]" />
            </div>
          </div>

          {/* Grid layout similar to Dashboard: left summary column + right large form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left column: profile overview + connected accounts */}
            <div className="lg:col-span-1 space-y-6">

              {/* Overview Card */}
              <div className={`${CARD_BG} ${CARD_BORDER} backdrop-blur-xl rounded-2xl p-6 shadow-[0_6px_20px_rgba(6,182,212,0.04)]`}>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src="https://i.pravatar.cc/150?img=32" alt="avatar" className="w-20 h-20 rounded-full object-cover border-2 border-transparent" />
                    <button title="Change avatar" className="absolute -bottom-2 -right-2 bg-[#0F172A] p-2 rounded-full border border-[rgba(255,255,255,0.06)] shadow-[0_0_8px_rgba(99,102,241,0.08)]">
                      <FiCamera className="text-[#F1F5F9]" />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">{form.fullName}</h2>
                      <span className="inline-flex items-center gap-1 text-xs bg-[#22C55E]/15 text-[#22C55E] px-2 py-1 rounded-full border border-[rgba(255,255,255,0.04)]">
                        <HiOutlineCheckCircle /> Verified
                      </span>
                    </div>
                    <div className="text-sm text-[#94A3B8]">{form.email}</div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="text-xs bg-[#FACC15]/12 text-[#FACC15] px-2 py-1 rounded-full border border-[rgba(255,255,255,0.04)]">Premium Member</span>
                      <span className="text-xs bg-[#6366F1]/10 text-[#6366F1] px-2 py-1 rounded-full border border-[rgba(255,255,255,0.04)]">AI-Insights Enabled</span>
                      <span className="text-xs bg-[#06B6D4]/10 text-[#06B6D4] px-2 py-1 rounded-full border border-[rgba(255,255,255,0.04)]">Expense Sync Active</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button onClick={() => alert("Edit profile (placeholder)")} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "linear-gradient(135deg,#6366F1,#06B6D4)", boxShadow: "0 6px 18px rgba(99,102,241,0.16)" }}>
                    <FiEdit /> Edit Profile
                  </button>
                </div>

                <div className="mt-6 text-sm text-[#94A3B8] space-y-2">
                  <div><strong className="text-[#F1F5F9]">Member Since:</strong> Aug 2024</div>
                  <div><strong className="text-[#F1F5F9]">Last Login:</strong> 9 Nov 2025</div>
                </div>
              </div>

              {/* Connected Accounts */}
              <div className={`${CARD_BG} ${CARD_BORDER} backdrop-blur-xl rounded-2xl p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Connected Accounts</h3>
                  <button onClick={reconnectAll} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "linear-gradient(135deg,#6366F1,#06B6D4)", boxShadow: "0 6px 18px rgba(99,102,241,0.12)" }}>Reconnect All</button>
                </div>

                <ul className="space-y-3">
                  {accounts.map((acc) => (
                    <li key={acc.id} className="flex items-center justify-between p-3 rounded-lg bg-[#0F172A]/30 border border-[rgba(255,255,255,0.04)]">
                      <div className="text-sm">
                        <div className="font-medium text-[#F1F5F9]">{acc.name}</div>
                        <div className="text-xs text-[#94A3B8]">{acc.type}</div>
                      </div>
                      <div>
                        {acc.status === "connected" ? (
                          <span className="text-xs bg-[#22C55E]/12 text-[#22C55E] px-2 py-1 rounded-full border border-[rgba(255,255,255,0.04)]">✅ Connected</span>
                        ) : (
                          <button onClick={() => setAccounts(prev => prev.map(a => a.id === acc.id ? { ...a, status: "connected" } : a))} className="text-xs px-3 py-1 rounded-full bg-[#FACC15]/12 text-[#FACC15] border border-[rgba(255,255,255,0.04)]">Reconnect</button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* CSV Upload */}
                <div className="mt-4">
                  <label className="block text-sm text-[#94A3B8] mb-2">Upload CSV / Receipts</label>
                  <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="flex items-center gap-3 p-4 rounded-lg bg-[#0F172A]/30 border border-dashed border-[rgba(255,255,255,0.04)] text-sm text-[#94A3B8]">
                    <FiUpload className="text-[#38BDF8]" />
                    <div className="flex-1">
                      <div>Drag & drop CSV or receipts here, or</div>
                      <input id="file" type="file" accept=".csv,image/*,application/pdf" multiple onChange={(e) => handleFiles(e.target.files)} className="mt-1 text-xs text-[#94A3B8]" />
                    </div>
                  </div>

                  {uploadFiles.length > 0 && (
                    <div className="mt-3 text-xs text-[#94A3B8] space-y-1">
                      {uploadFiles.map((f, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span>{f.name}</span>
                          <span className="text-[#94A3B8] text-xs">{(f.size / 1024).toFixed(1)} KB</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right column: big form area */}
            <div className="lg:col-span-2 space-y-6">

              {/* Profile Information panel */}
              <form onSubmit={handleSave} className="space-y-6">
                <div className={`${CARD_BG} ${CARD_BORDER} backdrop-blur-xl rounded-2xl p-6`}>
                  <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[#94A3B8]">Full Name</label>
                      <input name="fullName" value={form.fullName} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-lg bg-[#0F172A]/60 border border-[rgba(255,255,255,0.06)] text-[#F1F5F9]" />
                    </div>

                    <div>
                      <label className="text-sm text-[#94A3B8]">Email</label>
                      <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full mt-1 px-4 py-2 rounded-lg bg-[#0F172A]/60 border border-[rgba(255,255,255,0.06)] text-[#F1F5F9]" />
                    </div>

                    <div>
                      <label className="text-sm text-[#94A3B8]">Date of Birth</label>
                      <input name="dob" value={form.dob} onChange={handleChange} type="date" className="w-full mt-1 px-4 py-2 rounded-lg bg-[#0F172A]/60 border border-[rgba(255,255,255,0.06)] text-[#F1F5F9]" />
                    </div>

                    <div>
                      <label className="text-sm text-[#94A3B8]">Gender</label>
                      <select name="gender" value={form.gender} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-lg bg-[#0F172A]/60 border border-[rgba(255,255,255,0.06)] text-[#F1F5F9]">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-[#94A3B8]">Nationality</label>
                      <input name="nationality" value={form.nationality} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-lg bg-[#0F172A]/60 border border-[rgba(255,255,255,0.06)] text-[#F1F5F9]" />
                    </div>

                    <div>
                      <label className="text-sm text-[#94A3B8]">Address</label>
                      <input name="address" value={form.address} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-lg bg-[#0F172A]/60 border border-[rgba(255,255,255,0.06)] text-[#F1F5F9]" />
                    </div>

                    <div>
                      <label className="text-sm text-[#94A3B8]">Income Range</label>
                      <select name="incomeRange" value={form.incomeRange} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-lg bg-[#0F172A]/60 border border-[rgba(255,255,255,0.06)] text-[#F1F5F9]">
                        <option>₹0 - ₹50,000</option>
                        <option>₹50,000 – ₹1,00,000</option>
                        <option>₹1,00,000+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className={`${CARD_BG} ${CARD_BORDER} backdrop-blur-xl rounded-2xl p-6`}>
                  <h3 className="text-lg font-semibold mb-4">Account Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[#94A3B8]">Display Name</label>
                      <input name="displayName" value={form.displayName} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-lg bg-[#0F172A]/60 border border-[rgba(255,255,255,0.06)] text-[#F1F5F9]" />
                    </div>

                    <div>
                      <label className="text-sm text-[#94A3B8]">Member Since</label>
                      <div className="mt-1 text-[#94A3B8]">Aug 2024</div>
                    </div>

                    <div>
                      <label className="text-sm text-[#94A3B8]">Last Login</label>
                      <div className="mt-1 text-[#94A3B8]">9 Nov 2025</div>
                    </div>

                    <div>
                      <label className="text-sm text-[#94A3B8]">Language</label>
                      <select name="language" value={form.language} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-lg bg-[#0F172A]/60 border border-[rgba(255,255,255,0.06)] text-[#F1F5F9]">
                        <option>English</option>
                        <option>Hindi</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-[#94A3B8]">Time Zone</label>
                      <select name="timeZone" value={form.timeZone} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-lg bg-[#0F172A]/60 border border-[rgba(255,255,255,0.06)] text-[#F1F5F9]">
                        <option>GMT+5:30</option>
                        <option>GMT+0</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className={`${CARD_BG} ${CARD_BORDER} backdrop-blur-xl rounded-2xl p-6`}>
                  <h3 className="text-lg font-semibold mb-4">Security Settings</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[#94A3B8]">Change Password</label>
                      <div className="flex gap-2 mt-1">
                        <input type="password" placeholder="••••••••" className="flex-1 px-4 py-2 rounded-lg bg-[#0F172A]/60 border border-[rgba(255,255,255,0.06)] text-[#F1F5F9]" />
                        <button className="px-4 py-2 rounded-lg font-semibold" style={{ background: "linear-gradient(135deg,#6366F1,#06B6D4)" }}>Update</button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-[#94A3B8]">Two-Factor Authentication</label>
                      <div className="mt-2">
                        <Toggle enabled={twoFA} onToggle={setTwoFA} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-[#94A3B8]">Login Notifications</label>
                      <div className="mt-2">
                        <Toggle enabled={loginNotifications} onToggle={setLoginNotifications} activeColor="#38BDF8" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-[#94A3B8]">Connected Devices</label>
                      <div className="mt-2 text-[#94A3B8]">3 Active Devices — <button className="text-[#06B6D4]">Manage</button></div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-sm text-[#94A3B8]">Recent Login Activity</label>
                      <div className="mt-2 text-[#94A3B8]">No suspicious activity detected</div>
                    </div>
                  </div>
                </div>

                {/* Preferences & AI */}
                <div className={`${CARD_BG} ${CARD_BORDER} backdrop-blur-xl rounded-2xl p-6`}>
                  <h3 className="text-lg font-semibold mb-4">Preferences & AI</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[#94A3B8]">AI Nudges / Smart Alerts</div>
                        <div className="text-xs text-[#6B7280]">Get proactive saving tips & nudges</div>
                      </div>
                      <Toggle enabled={aiNudges} onToggle={setAiNudges} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[#94A3B8]">Email Reports</div>
                        <div className="text-xs text-[#6B7280]">Monthly spending summaries</div>
                      </div>
                      <Toggle enabled={emailReports} onToggle={setEmailReports} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[#94A3B8]">OCR Receipts Sync</div>
                        <div className="text-xs text-[#6B7280]">Auto-scan receipts for expenses</div>
                      </div>
                      <Toggle enabled={ocrSync} onToggle={setOcrSync} />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="text-sm text-[#94A3B8]">Expense Insights Frequency</label>
                        <select value={insightFreq} onChange={(e) => setInsightFreq(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0F172A]/60 border border-[rgba(255,255,255,0.06)]">
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>

                      <div className="w-48">
                        <label className="text-sm text-[#94A3B8]">Currency</label>
                        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0F172A]/60 border border-[rgba(255,255,255,0.06)]">
                          <option>INR</option>
                          <option>USD</option>
                          <option>EUR</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-[#0F172A]/40 px-4 py-3 rounded-lg border border-[rgba(255,255,255,0.05)]">
                      <div>
                        <div className="text-sm text-[#94A3B8]">Theme Mode</div>
                        <div className="text-xs text-[#6B7280]">Toggle between dark & light</div>
                      </div>
                      <button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} className="px-4 py-2 rounded-lg" style={{ background: "linear-gradient(135deg,#6366F1,#06B6D4)", boxShadow: "0 6px 18px rgba(99,102,241,0.12)" }}>
                        {theme === "dark" ? "Light Mode" : "Dark Mode"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between gap-4 pt-4">
                  <div>
                    <div className="text-sm text-[#94A3B8]">All settings are securely saved and encrypted 🔒</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => { setForm({ ...form }); setSaved(false); }} className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/6">Reset</button>

                    <button type="submit" disabled={saving} className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold" style={{ background: "linear-gradient(135deg,#6366F1,#06B6D4)", boxShadow: "0 10px 30px rgba(99,102,241,0.18)", opacity: saving ? 0.9 : 1 }}>
                      {saving ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="4" fill="none" />
                            <path d="M22 12a10 10 0 00-10-10" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
                          </svg>
                          Saving...
                        </>
                      ) : saved ? (
                        <>
                          <HiOutlineCheckCircle className="w-5 h-5" />
                          Saved
                        </>
                      ) : (
                        <>
                          <FiSave className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
