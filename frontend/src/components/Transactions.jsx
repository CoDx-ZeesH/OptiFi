import React, { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCamera,
  FiX,
  FiUser,
  FiSettings,
  FiLogOut,
  FiBell,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { assets } from "../assets/assets";

export default function Transactions() {
  const location = useLocation();

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "12 Nov 2025",
      description: "Pizza Hut",
      category: "Food",
      amount: -450,
      aiTagged: true,
      note: "Dinner with friends",
    },
    {
      id: 2,
      date: "10 Nov 2025",
      description: "Salary",
      category: "Income",
      amount: 20000,
      aiTagged: false,
      note: "",
    },
  ]);
  const profilePic = 'https://i.pravatar.cc/150?img=32';
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const [form, setForm] = useState({
    amount: "",
    type: "Expense",
    category: "Food",
    description: "",
    date: "",
    note: "",
  });

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/analytics" },
    { name: "Goals", path: "/goals" },
    { name: "Transactions", path: "/transactions" },
    { name: "OptiBrain Insights", path: "/optibrain" },
    { name: "Profile", path: "/profile" },
  ];

  const handleAdd = () => {
    if (!form.amount || !form.description || !form.date) return;

    const newItem = {
      id: Date.now(),
      date: form.date,
      description: form.description,
      category: form.category,
      amount:
        form.type === "Expense" ? -Math.abs(form.amount) : Math.abs(form.amount),
      aiTagged: true,
      note: form.note,
    };

    setTransactions([newItem, ...transactions]);
    setShowAddModal(false);
    setForm({
      amount: "",
      type: "Expense",
      category: "Food",
      description: "",
      date: "",
      note: "",
    });
  };

  const handleUpdate = () => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === showEditModal.id ? { ...showEditModal, ...form } : t
      )
    );
    setShowEditModal(null);
  };

  const handleDelete = () => {
    setTransactions((prev) =>
      prev.filter((t) => t.id !== showDeleteModal.id)
    );
    setShowDeleteModal(null);
  };

  const filteredTransactions = transactions.filter((t) =>
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="grid grid-cols-12 gap-6 p-6">
        {/* ======================= SIDEBAR ====================== */}
        <aside
          className="col-span-2 bg-gradient-to-b from-[#4b6ff5] to-[#06B6D4] 
          rounded-tr-3xl rounded-br-3xl p-6 sticky top-6 h-[calc(100vh-48px)]
          shadow-[inset_0_0_30px_rgba(0,0,0,0.25)] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-10">
              <img
                src={assets.logo}
                alt="OptiFi Logo"
                className="w-20 h-20 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]"
              />
              <div>
                <h1 className="font-bold text-lg text-white tracking-tight">
                  OptiFi
                </h1>
                <p className="text-xs text-white/70">Personal Finance</p>
              </div>
            </div>

            <nav className="space-y-3">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-[#071030] text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <FiUser />
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/30">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/10 transition"
            >
              <FiSettings />
              <span className="text-sm">Settings</span>
            </Link>

            <Link
              to="/auth"
              className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/10 transition"
            >
              <FiLogOut />
              <span className="text-sm">Logout</span>
            </Link>
          </div>
        </aside>

        {/* ======================= MAIN CONTENT ====================== */}
        <main className="col-span-10">
          {/* HEADER */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold">Transactions</h1>
              <p className="text-sm text-[#94A3B8]">
                Review, search, and manage all your expenses.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  className="bg-[#1E293B]/60 border border-white/10 rounded-full px-4 py-2 text-sm
                  placeholder:text-[#94A3B8] focus:outline-none"
                  placeholder="Search..."
                />
                <FiSearch className="absolute right-3 top-2.5 text-[#94A3B8]" />
              </div>

              <FiBell className="text-xl cursor-pointer hover:text-cyan-400 transition" />

              <img
                src={profilePic}
                className="w-10 h-10 rounded-full border-2 border-cyan-400 shadow-lg"
                alt="profile"
              />
            </div>
          </header>

          {/* ADD BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-between mb-10">
            <div></div>

            <div className="flex gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <FiPlus /> Add Transaction
              </button>

              <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1E293B]/70 border border-white/10">
                <FiCamera /> Upload Receipt
              </button>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="bg-[#1E293B]/60 rounded-2xl p-5 mb-10 border border-white/10 backdrop-blur-xl flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[220px]">
              <FiSearch className="absolute left-3 top-3 text-[#94A3B8]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transactions..."
                className="w-full bg-[#0F172A]/60 border border-white/10 pl-10 pr-3 py-2 rounded-full"
              />
            </div>

            <select className="bg-[#0F172A]/60 border-white/10 border rounded-full px-3 py-2">
              <option>This Month</option>
              <option>Last 3 Months</option>
            </select>

            <select className="bg-[#0F172A]/60 border-white/10 border rounded-full px-3 py-2">
              <option>All Categories</option>
              <option>Food</option>
              <option>Travel</option>
            </select>
          </div>

          {/* TABLE (DESKTOP) */}
          <div className="hidden md:block bg-[#1E293B]/60 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0F172A]/50 text-[#94A3B8]">
                <tr className="text-sm uppercase">
                  <th className="p-4">Date</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4">AI Tag</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="border-t border-white/10">
                    <td className="p-4">{t.date}</td>
                    <td className="p-4">{t.description}</td>
                    <td className="p-4">{t.category}</td>
                    <td
                      className={`p-4 text-right ${
                        t.amount < 0 ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {t.amount < 0 ? "-" : "+"}₹{Math.abs(t.amount)}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          t.aiTagged
                            ? "text-cyan-400 border border-cyan-400"
                            : "text-amber-400 border border-amber-400"
                        }`}
                      >
                        {t.aiTagged ? "AI Tagged" : "Edited"}
                      </span>
                    </td>

                    <td className="p-4 flex gap-3 justify-center text-[#94A3B8]">
                      <FiEdit2
                        onClick={() => {
                          setShowEditModal(t);
                          setForm(t);
                        }}
                        className="cursor-pointer hover:text-cyan-400"
                      />

                      <FiTrash2
                        onClick={() => setShowDeleteModal(t)}
                        className="cursor-pointer hover:text-red-400"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden grid gap-4">
            {filteredTransactions.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1E293B]/70 p-4 rounded-2xl border border-white/10"
              >
                <div className="flex justify-between mb-2">
                  <span
                    className={`font-semibold ${
                      t.amount < 0 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {t.amount < 0 ? "-" : "+"}₹{Math.abs(t.amount)}
                  </span>

                  <span className="text-xs text-[#94A3B8]">{t.date}</span>
                </div>

                <div className="font-medium">{t.description}</div>

                <div className="flex justify-between items-center mt-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      t.aiTagged
                        ? "text-cyan-400 border border-cyan-400"
                        : "text-amber-400 border border-amber-400"
                    }`}
                  >
                    {t.aiTagged ? "AI Tagged" : "Edited"}
                  </span>

                  <div className="flex gap-4 text-[#94A3B8]">
                    <FiEdit2
                      className="cursor-pointer hover:text-cyan-400"
                      onClick={() => {
                        setShowEditModal(t);
                        setForm(t);
                      }}
                    />
                    <FiTrash2
                      className="cursor-pointer hover:text-red-400"
                      onClick={() => setShowDeleteModal(t)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ============ MODALS ============ */}
          <AnimatePresence>
            {showAddModal && (
              <Modal
                title="Add New Transaction"
                onClose={() => setShowAddModal(false)}
              >
                <TransactionForm form={form} setForm={setForm} />
                <ModalActions
                  onCancel={() => setShowAddModal(false)}
                  onSave={handleAdd}
                />
              </Modal>
            )}

            {showEditModal && (
              <Modal
                title="Edit Transaction"
                onClose={() => setShowEditModal(null)}
              >
                <TransactionForm form={form} setForm={setForm} />
                <ModalActions
                  onCancel={() => setShowEditModal(null)}
                  onSave={handleUpdate}
                  update
                />
              </Modal>
            )}

            {showDeleteModal && (
              <Modal
                title="Delete Transaction?"
                onClose={() => setShowDeleteModal(null)}
              >
                <p className="text-[#94A3B8] mb-4">
                  This action cannot be undone. This transaction will be
                  permanently deleted.
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10"
                    onClick={() => setShowDeleteModal(null)}
                  >
                    Cancel
                  </button>

                  <button
                    className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700"
                    onClick={handleDelete}
                  >
                    Delete Forever
                  </button>
                </div>
              </Modal>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* =======================================================
   MODAL
======================================================= */
function Modal({ children, title, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1E293B] w-full max-w-lg rounded-2xl p-6 border border-white/10 shadow-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <FiX className="text-xl cursor-pointer" onClick={onClose} />
        </div>

        {children}
      </motion.div>
    </motion.div>
  );
}

/* =======================================================
   FORM FIELDS
======================================================= */
function TransactionForm({ form, setForm }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm">Amount (₹)</label>
        <input
          type="number"
          className="w-full bg-[#0F172A] border border-white/10 rounded-lg p-2 mt-1"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm">Type</label>
        <select
          className="w-full bg-[#0F172A] border border-white/10 rounded-lg p-2 mt-1"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Income</option>
          <option>Expense</option>
        </select>
      </div>

      <div>
        <label className="text-sm">Category</label>
        <select
          className="w-full bg-[#0F172A] border border-white/10 rounded-lg p-2 mt-1"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
        </select>
      </div>

      <div>
        <label className="text-sm">Description</label>
        <input
          className="w-full bg-[#0F172A] border border-white/10 rounded-lg p-2 mt-1"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm">Date</label>
        <input
          type="date"
          className="w-full bg-[#0F172A] border border-white/10 rounded-lg p-2 mt-1"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm">Note (optional)</label>
        <textarea
          className="w-full bg-[#0F172A] border border-white/10 rounded-lg p-2 mt-1"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        ></textarea>
      </div>
    </div>
  );
}

/* =======================================================
   MODAL ACTION BUTTONS
======================================================= */
function ModalActions({ onCancel, onSave, update }) {
  return (
    <div className="flex justify-end gap-3 pt-4">
      <button
        className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10"
        onClick={onCancel}
      >
        Cancel
      </button>

      <button
        onClick={onSave}
        className="px-5 py-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.3)]"
      >
        {update ? "Update Transaction" : "Save Transaction"}
      </button>
    </div>
  );
}
