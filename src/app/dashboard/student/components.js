"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function StudentNavbar({ userName, userEmail }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/40 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl dark:border-zinc-800/40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-sm shadow">
              QR
            </span>
            <span className="font-bold text-zinc-900 dark:text-white">
              SmartAttendance
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end text-sm">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {userName}
              </span>
              <span className="text-xs text-zinc-400">{userEmail}</span>
            </div>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition active:scale-[0.98]"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-sm p-6 rounded-2xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 text-center animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Sign Out
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Are you sure you want to log out of your student account?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl transition disabled:opacity-50"
              >
                {loggingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

