import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import assets, { teamData, testi_1, testi_2, testi_3, testi_4, badge_secure } from "../../assets/assets";
import { FaBrain, FaChartLine, FaWallet } from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineRocket, AiOutlinePieChart, AiFillNotification } from "react-icons/ai";
import { FiRepeat, FiClock, FiTarget } from "react-icons/fi";
import { BsBell, BsGeoAlt, BsLightbulb, BsReceipt, BsShieldCheck } from "react-icons/bs";

// Navbar Component
const Navbar = ({ theme, setTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-100 ${
        isScrolled
          ? "backdrop-blur-md bg-black/60 dark:bg-gray-900/60 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-8 py-3">
        {/* Logo section */}
        <div className="flex items-center gap-0.1 cursor-pointer select-none">
          <img
            src={assets.logo}
            alt="Optifi Logo"
            className="w-20 sm:w-22"
          />
          <span className="font-poppins font-semibold text-2xl sm:text-3xl text-white tracking-tight [drop-shadow:_0_0_14px_rgba(255,255,255,0.55)]">
            Optifi
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-800 dark:text-gray-100">
          <a href="#home" className="hover:text-primary transition-colors">
            Home
          </a>
          <a href="#services" className="hover:text-primary transition-colors">
            Services
          </a>
          <a href="#our-work" className="hover:text-primary transition-colors">
            Our Work
          </a>
          <a href="#contact-us" className="hover:text-primary transition-colors">
            Contact
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-3 w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-700 hover:scale-110 transition-all"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Connect Button */}
          <a
            href="#contact-us"
            className="bg-primary text-white px-5 py-2 rounded-full hover:scale-105 transition-all text-xs sm:text-sm"
          >
            Connect
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <div
            className="w-6 h-6 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: menuOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 80 }}
        className="fixed top-0 right-0 h-screen w-2/3 bg-black dark:bg-gray-900 text-gray-800 dark:text-white shadow-lg flex flex-col items-start justify-center gap-6 px-10 z-40 md:hidden"
      >
        <div
          className="w-6 h-6 absolute top-6 right-6 cursor-pointer"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </div>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#our-work" onClick={() => setMenuOpen(false)}>Our Work</a>
        <a href="#contact-us" onClick={() => setMenuOpen(false)}>Contact</a>
        <a
          href="#contact-us"
          className="bg-primary text-black px-5 py-2 rounded-full hover:scale-105 transition-all"
          onClick={() => setMenuOpen(false)}
        >
          Connect
        </a>
      </motion.div>
    </motion.nav>
  );
};

// FeatureCard Component
const FeatureCard = ({ icon, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ y: 30, opacity: 0, rotateY: 0 }}
    whileInView={{ y: 0, opacity: 1, rotateY: 8 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="bg-white/6 dark:bg-white/4 backdrop-blur-xl border border-white/6 dark:border-white/6 rounded-2xl p-6 flex flex-col gap-4 shadow-xl neon-glow"
  >
    <div className="text-primary text-3xl">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-300">{desc}</p>
  </motion.div>
);

// Contact Component
const Contact = () => {
  return (
    <section id="contact-us" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-white mb-4">Contact Us</h3>
        <p className="text-gray-300 mb-6">Have questions or want to partner? Send us a message.</p>
        <motion.form
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/6 backdrop-blur-xl rounded-2xl p-6 neon-glow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              className="p-3 rounded-md bg-transparent border border-white/6 text-white placeholder-gray-400" 
              placeholder="Your name" 
            />
            <input 
              className="p-3 rounded-md bg-transparent border border-white/6 text-white placeholder-gray-400" 
              placeholder="Email address" 
            />
          </div>
          <textarea 
            className="w-full mt-4 p-3 rounded-md bg-transparent border border-white/6 h-40 text-white placeholder-gray-400" 
            placeholder="Message" 
          />
          <div className="mt-4 flex items-center gap-4">
            <button className="bg-primary text-black px-6 py-2 rounded-full font-semibold">
              Send message
            </button>
            <div className="text-sm text-gray-300">We reply within 24 hours.</div>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

// Main LandingPage Component
export default function LandingPage({ theme, setTheme }) {

  return (
    <div className="relative overflow-x-hidden">
      <Navbar theme={theme} setTheme={setTheme} />
      
      {/* Animated background blobs + particles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#07020b] to-black" />
        <div className="absolute -left-96 -top-40 w-[66rem] h-[66rem] rounded-full blur-[220px] opacity-30 bg-gradient-to-r from-violet-600 to-cyan-400 animate-slow-blob"></div>
        <div className="absolute right-[-22rem] top-10 w-[50rem] h-[50rem] rounded-full blur-[200px] opacity-20 bg-gradient-to-tr from-pink-500 to-indigo-600 animate-slow-blob-2"></div>
        {/* <div className="absolute inset-0 pointer-events-none">
          <canvas id="particle-canvas" className="w-full h-full" />
        </div> */}
      </div>

{/* Hero */}
<header className="pt-28 pb-16 text-center max-w-6xl mx-auto px-6 relative overflow-hidden">
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="max-w-4xl mx-auto"
  >
    <div className="inline-flex items-center gap-3 bg-[#2d0746]/50 text-sm rounded-full px-4 py-2 text-white/80 mb-6">
      <span className="rounded-full bg-[#6f2bd4] w-2 h-2 inline-block mr-2 mb-3 shadow-sm" />
      Built for the Future of Personal Finance • Powered by AI & Data Science
    </div>

    <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] drop-shadow-[0_0_20px_rgba(0,0,0,0.6)]">
      Smarter Way to Track, Save & Grow Your Money with AI
    </h1>

    <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-lg">
      An AI-based expense tracker that not only records your spending — it helps you save smarter.
    </p>

    <div className="mt-8 flex items-center justify-center gap-4">
      <a
        href="/auth"
        className="glow-btn bg-primary text-white/80 px-4 py-3 rounded-full border border-white/10 font-normal shadow-lg hover:bg-white/10 transition"
      >
        Get Started — Free
      </a>
      <a
        href="#features"
        className="glow-btn bg-primar px-4 py-3 rounded-full border border-white/10 text-white/80 hover:bg-white/10 transition"
      >
        Explore Features
      </a>
    </div>

    <div className="mt-12 flex items-center justify-center gap-6">
      <img src={badge_secure} alt="secure" className="w-14 h-14" />
      <div>
        <div className="text-sm text-gray-300">Securely connected</div>
        <div className="text-white font-semibold">Bank-level security</div>
      </div>
    </div>
  </motion.div>

  {/* ✅ Hero Image with Lighting Effect */}
  <div className="relative mt-16 flex justify-center">
    <img
      src={assets.optifi_hero}
      alt="Optifi Hero"
      className="w-full max-w-3xl mx-auto rounded-2xl relative z-10 shadow-1xl shadow-cyan-900/30"
    />
   
  </div>
</header>


    {/* WHY OPTIFI SECTION */}
<section
  id="why"
  className="relative py-24 px-6 sm:px-12 lg:px-32 overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#111C2E] to-[#0A1120]"
>
  {/* Soft Blue-Purple Gradient Glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[400px] bg-gradient-to-r from-[#6366F1]/30 via-[#8B5CF6]/20 to-[#06B6D4]/20 blur-[180px] rounded-full"></div>

  {/* Content Grid */}
  <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
    {/* Left Text */}
    <div className="text-left space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold text-[#F1F5F9]"
      >
        Why <span className="bg-gradient-to-r from-[#6366F1]  to-[#06B6D4] bg-clip-text text-transparent">OptiFi?</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[#94A3B8] text-lg leading-relaxed max-w-lg"
      >
        Traditional expense trackers just record what you spend.{" "}
        <span className="text-[#38BDF8] font-medium">OptiFi goes beyond —</span> understanding your habits,
        predicting future trends, and helping you spend smarter and save faster.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 bg-gradient-to-r from-[#6366F1]  to-[#06B6D4] text-white px-6 py-3 rounded-full font-semibold shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all"
      >
        See How It Works →
      </motion.button>
    </div>

    {/* Right Feature Cards */}
    <div className="grid sm:grid-cols-3 gap-6">
      {[
        {
          icon: <FaBrain className="text-4xl text-[#38BDF8]" />,
          title: "AI-Powered Insights",
          desc: "OptiFi analyzes spending patterns and predicts your next expenses automatically.",
        },
        {
          icon: <FaChartLine className="text-4xl text-[#22C55E]" />,
          title: "Smart Forecasting",
          desc: "Plan ahead with real-time forecasts and trend visualizations powered by AI.",
        },
        {
          icon: <FaWallet className="text-4xl text-[#FACC15]" />,
          title: "Personalized Budgeting",
          desc: "Get tailored budgets based on your lifestyle and goals, not just transactions.",
        },
      ].map((feature, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -6, scale: 1.05 }}
          className="p-6 bg-[#1E293B]/60 backdrop-blur-lg rounded-2xl border border-[rgba(255,255,255,0.08)] shadow-[0_0_15px_rgba(99,102,241,0.15)] hover:bg-[rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-all"
        >
          <div className="mb-3">{feature.icon}</div>
          <h3 className="text-[#F1F5F9] text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-[#94A3B8] text-sm leading-relaxed">{feature.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


   {/* HOW OPTIFI WORKS — USER JOURNEY */}
<section className="relative py-28 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-[#0F172A] via-[#111C2E] to-[#0F172A] overflow-hidden">
  {/* Decorative gradient glow */}
  <div className="absolute inset-0 -z-10 opacity-50 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.25),transparent_70%)]" />

  {/* Section Header */}
  <div className="text-center mb-16">
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#6366F1]  to-[#06B6D4] bg-clip-text text-transparent"
    >
      How OptiFi Works
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-[#94A3B8] mt-4 text-lg max-w-2xl mx-auto"
    >
      See how OptiFi turns your everyday transactions into intelligent financial insights — all in three simple steps.
    </motion.p>
  </div>

  {/* Steps Container */}
  <div className="max-w-7xl mx-auto relative flex flex-col lg:flex-row items-center justify-between gap-12">
    {/* Step 1 */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-[#1E293B]/60 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] shadow-[0_0_15px_rgba(99,102,241,0.15)] hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-all duration-300 w-full lg:w-1/3"
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#06B6D4]/20 border border-[#38BDF8] mb-6 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
        <span className="text-[#38BDF8] text-3xl">⚙️</span>
      </div>
      <h4 className="text-[#F1F5F9] text-xl font-semibold mb-3">Quick Start & Onboarding</h4>
      <p className="text-[#94A3B8] text-sm leading-relaxed">
        Sign up and set up in seconds. Connect your UPI or enter transactions manually. OptiFi learns your behavior to personalize your finance journey.
      </p>
      <div className="absolute -right-8 top-1/2 hidden lg:block">
        <div className="w-16 h-[2px] bg-gradient-to-r from-[#38BDF8] to-[#FACC15] animate-pulse" />
      </div>
    </motion.div>

    {/* Step 2 */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-[#1E293B]/60 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] shadow-[0_0_15px_rgba(99,102,241,0.15)] hover:shadow-[0_0_25px_rgba(250,204,21,0.25)] transition-all duration-300 w-full lg:w-1/3"
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#FACC15]/15 border border-[#FACC15] mb-6 shadow-[0_0_15px_rgba(250,204,21,0.25)]">
        <span className="text-[#FACC15] text-3xl">🧾</span>
      </div>
      <h4 className="text-[#F1F5F9] text-xl font-semibold mb-3">Smart Expense Tracking + OCR Magic</h4>
      <p className="text-[#94A3B8] text-sm leading-relaxed">
        Upload receipts or log expenses — OptiFi’s OCR instantly reads, tags, and organizes everything for you. AI handles the chaos so you can relax.
      </p>
      <div className="absolute -right-8 top-1/2 hidden lg:block">
        <div className="w-16 h-[2px] bg-gradient-to-r from-[#FACC15] to-[#6366F1] animate-pulse" />
      </div>
    </motion.div>

    {/* Step 3 */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#1E293B]/60 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] shadow-[0_0_15px_rgba(99,102,241,0.15)] hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-all duration-300 w-full lg:w-1/3"
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4] mb-6 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
        <span className="text-white text-3xl">🧠</span>
      </div>
      <h4 className="text-[#F1F5F9] text-xl font-semibold mb-3">AI Insights, Reports & Goals</h4>
      <p className="text-[#94A3B8] text-sm leading-relaxed">
        Your AI finance companion, <span className="text-[#38BDF8] font-medium">OptiBrain</span>, studies your spending and delivers smart insights, forecasts, and savings goals.
      </p>
    </motion.div>
  </div>

  {/* Connecting line for mobile */}
  <div className="lg:hidden flex flex-col items-center mt-10 space-y-2">
    <div className="w-[2px] h-8 bg-gradient-to-b from-[#38BDF8] to-[#FACC15] animate-pulse" />
    <div className="w-[2px] h-8 bg-gradient-to-b from-[#FACC15] to-[#6366F1] animate-pulse" />
  </div>
</section>

{/* 🌌 FEATURES SECTION (Full Width + Soft Glow) */}
<section
  id="features"
  className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-gradient-to-b from-[#0F172A] via-[#0F172A] to-[#0A1120] overflow-hidden"
>
  {/* ✨ Subtle Background Lighting */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/3 w-[300px] h-[300px] bg-[#6366F1]/10 blur-[120px] rounded-full"></div>
    <div className="absolute bottom-0 right-1/3 w-[250px] h-[250px] bg-[#06B6D4]/8 blur-[100px] rounded-full"></div>
  </div>

  {/* 🌟 Section Header */}
  <div className="relative text-center mb-16 z-10">
    <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#6366F1]  to-[#06B6D4] bg-clip-text text-transparent">
      Powerful Features
    </h2>
    <p className="text-[#94A3B8] text-lg max-w-3xl mx-auto leading-relaxed">
      Everything you need to track, analyze, and optimize your spending —
      all in one intelligent dashboard.
    </p>
  </div>

  {/* ⚡ Feature Grid */}
  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
    <FeatureCard
      icon={<AiOutlinePieChart className="text-4xl text-[#38BDF8]" />}
      title="Visual Dashboard"
      desc="Graphs, category breakdowns, and forecast analysis."
      delay={0.05}
    />
    <FeatureCard
      icon={<FiRepeat className="text-4xl text-[#06B6D4]" />}
      title="Smart Expense Tracking"
      desc="Auto-categorize and track every transaction easily."
      delay={0.15}
    />
    <FeatureCard
      icon={<BsLightbulb className="text-4xl text-[#FACC15]" />}
      title="AI-Powered Insights"
      desc="Understand habits, predict trends, and get smart alerts."
      delay={0.25}
    />
    <FeatureCard
      icon={<BsBell className="text-4xl text-[#8B5CF6]" />}
      title="Reports & Notifications"
      desc="Get instant alerts and monthly summaries."
      delay={0.35}
    />
    <FeatureCard
      icon={<FiTarget className="text-4xl text-[#22C55E]" />}
      title="Goal Tracking"
      desc="Set savings goals, track progress, and stay motivated."
      delay={0.45}
    />
    <FeatureCard
      icon={<BsReceipt className="text-4xl text-[#38BDF8]" />}
      title="Smart Receipt Scan"
      desc="Snap photos of receipts to log expenses automatically."
      delay={0.55}
    />
  </div>

  {/* 💬 Footer Tagline */}
  <h3 className="relative text-xl sm:text-2xl font-medium mt-20 text-[#F1F5F9] text-center z-10">
    Let <span className="text-[#06B6D4] font-semibold">AI</span> handle your money insights.
  </h3>
</section>


      {/* ⚙️ FOLD 4 — OptiFi Dashboard Preview */}
      <section className="relative w-full bg-[#0B1120] py-28 px-6 sm:px-12 lg:px-24 overflow-hidden text-gray-300">
        {/* Background gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[160px]"></div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Your Smart Dashboard —{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
              Data Meets Decisions
            </span>
          </h2>

          {/* Tagline */}
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            OptiFi turns complex numbers into clear, actionable insights. Every graph, goal, and alert is powered by AI intelligence — helping you make smarter financial moves.
          </p>

          {/* Dashboard Mockup */}
          <div className="relative mt-12 w-full max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#06B6D4]/20 via-[#3B82F6]/10 to-transparent rounded-3xl blur-2xl animate-pulse"></div>
            <div className="relative backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] overflow-hidden hover:scale-[1.02] transition-transform duration-700">
              <img src={assets.dashboard} alt="OptiFi Dashboard Preview" className="rounded-3xl w-full h-auto object-cover" />
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 text-left w-full">
            {[
              { icon: "📊", title: "Visual Spending Overview", desc: "Track income vs expenses with interactive AI-powered graphs." },
              { icon: "🧠", title: "OptiBrain Insights", desc: "Receive personalized saving tips and predictive forecasts." },
              { icon: "🎯", title: "Goal Progress Ring", desc: "Set and achieve financial goals with real-time AI tracking." },
              { icon: "🔔", title: "Smart Alerts", desc: "Get notified when spending spikes or saving milestones hit." },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#3B82F6]/30 hover:shadow-[0_0_25px_#3B82F6]/20 transition-all duration-500"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h4 className="text-white font-semibold text-lg mb-2">{f.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-16 flex flex-wrap gap-5 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-medium rounded-full shadow-[0_0_20px_#06B6D4]/30 hover:shadow-[0_0_30px_#3B82F6]/40 transition-all">
              Try OptiFi Now
            </button>
            <button className="px-8 py-3 border border-[#06B6D4]/50 text-[#06B6D4] font-medium rounded-full hover:bg-[#06B6D4]/10 transition-all">
              Watch Demo →
            </button>
          </div>
        </div>
      </section>

      {/* 💬 FOLD 5 — Trusted by Users, Built for the Future */}
      <section className="relative w-full bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-gray-300 py-28 px-6 sm:px-12 lg:px-24 overflow-hidden">
        {/* Background accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#3B82F6]/10 blur-[180px] rounded-full"></div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center space-y-16">
          {/* 🗣️ Top: Testimonials */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Loved by Early Users,{" "}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                Trusted by Students & Creators
              </span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
              From college students to side hustlers — everyone's using OptiFi to understand their money smarter. Here's what our early users are saying:
            </p>

            {/* Testimonials Grid */}
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                {
                  name: "Aarav Mehta",
                  role: "B.Tech Student",
                  img: testi_1,
                  text: "OptiFi helped me realize I was overspending 22% on food — now I actually save every week.",
                },
                {
                  name: "Isha Verma",
                  role: "MBA Intern",
                  img: testi_2,
                  text: "The AI insights feel like having a personal finance coach. It's clean, clear, and so useful.",
                },
                {
                  name: "Rohan Patel",
                  role: "Freelancer",
                  img: testi_3,
                  text: "Finally, a tracker that doesn't just track — it teaches you how to improve.",
                },
                {
                  name: "Sara Khan",
                  role: "Startup Founder",
                  img: testi_4,
                  text: "OptiFi turned my messy expenses into something I can actually understand.",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-8 bg-white/5 border border-white/10 rounded-3xl shadow-[0_0_25px_rgba(59,130,246,0.08)] hover:shadow-[0_0_35px_rgba(59,130,246,0.2)] hover:-translate-y-1 transition-all duration-500 flex flex-col items-center text-center"
                >
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#06B6D4]/60 shadow-[0_0_15px_rgba(6,182,212,0.4)] mb-4"
                  />
                  <h3 className="text-white font-semibold text-lg">{t.name}</h3>
                  <p className="text-gray-400 text-sm mb-5">{t.role}</p>
                  <p className="text-gray-300 text-sm italic leading-relaxed">"{t.text}"</p>
                </div>
              ))}
            </div>
          </div>
          </div>
          </section>
{/* 🌙 FINAL SECTION — FAQ + CONTACT + FOOTER */}
<section
  id="faq-contact"
  className="relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E1E2A] to-[#0A1120] overflow-hidden py-28 px-6 sm:px-12 lg:px-24"
>
  {/* Subtle Background Lighting */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#6366F1]/10 blur-[150px] rounded-full" />
    <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#06B6D4]/10 blur-[120px] rounded-full" />
  </div>

  {/* 🧭 FAQ Section */}
  <div className="relative max-w-4xl mx-auto text-center z-10">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-[#6366F1]  to-[#06B6D4] bg-clip-text text-transparent"
    >
      Frequently Asked Questions
    </motion.h2>

    <div className="space-y-4 mt-10 text-left">
      {[
        {
          q: "Is OptiFi secure?",
          a: "Absolutely. We use bank-grade AES encryption, tokenized connections, and privacy-first storage to ensure your data stays safe."
        },
        {
          q: "Can I export reports?",
          a: "Yes — download detailed spending reports in CSV or PDF format for any time range with one click."
        },
        {
          q: "Do you offer support?",
          a: "We provide 24/7 chat support for all users and priority onboarding for enterprise clients."
        },
      ].map((item, index) => (
        <motion.details
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-6 py-4 transition-all hover:border-[#6366F1]/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]"
        >
          <summary className="cursor-pointer text-lg font-semibold text-[#F1F5F9] flex justify-between items-center">
            {item.q}
            <span className="text-[#8B5CF6] group-open:rotate-180 transition-transform">⌄</span>
          </summary>
          <p className="text-[#94A3B8] mt-3 leading-relaxed">{item.a}</p>
        </motion.details>
      ))}
    </div>
  </div>

  {/* 💌 CONTACT SECTION */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative max-w-5xl mx-auto mt-28 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 text-center shadow-[0_0_30px_rgba(99,102,241,0.15)] z-10"
  >
    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#06B6D4] to-[#6366F1] bg-clip-text text-transparent">
      Let’s Connect ✉️
    </h3>
    <p className="text-[#94A3B8] mb-10 max-w-2xl mx-auto">
      Have a question, feedback, or partnership idea? Drop us a message — our team will respond within 24 hours.
    </p>

    {/* Contact Form */}
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
      <div>
        <label className="block text-sm text-gray-300 mb-2">Full Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#6366F1]/50 transition"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-2">Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#06B6D4]/50 transition"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm text-gray-300 mb-2">Message</label>
        <textarea
          rows="5"
          placeholder="Write your message..."
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6]/50 transition resize-none"
        ></textarea>
      </div>
      <div className="sm:col-span-2 text-center">
        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-[#6366F1] to-[#06B6D4] text-white font-semibold px-10 py-3 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all"
        >
          Send Message
        </button>
      </div>
    </form>
  </motion.div>

  {/* 🌌 Footer */}
  <footer className="relative mt-24 text-center border-t border-white/10 pt-8 z-10">
    <p className="text-sm text-[#94A3B8]">
      © {new Date().getFullYear()} <span className="text-[#8B5CF6] font-semibold">OptiFi</span>  All rights reserved.
    </p>
  </footer>
</section>
</div>
  );
}