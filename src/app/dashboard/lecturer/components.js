"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LecturerNavbar({ userName }) {
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
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-white text-black font-bold text-sm">
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
              <span className="text-xs text-zinc-400">Lecturer Account</span>
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
              Are you sure you want to log out of your lecturer account?
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

export function CourseCreationForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create course");
      }

      setSuccess("Course created successfully!");
      setTitle("");
      setCode("");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-900 p-6 shadow-xl shadow-zinc-100/50 dark:shadow-none">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
        Add New Course
      </h3>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider"
            htmlFor="course-title"
          >
            Course Title
          </label>
          <input
            id="course-title"
            type="text"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 transition-all text-sm"
            placeholder="e.g. Advanced Software Engineering"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label
            className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider"
            htmlFor="course-code"
          >
            Course Code
          </label>
          <input
            id="course-code"
            type="text"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 transition-all text-sm"
            placeholder="e.g. CS-401"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl text-black font-semibold bg-white hover:bg-zinc-200 disabled:opacity-50 transition active:scale-[0.98] text-sm shadow-md"
        >
          {loading ? 'Creating...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
}

export function CourseCard({ course }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionData, setSessionData] = useState(null);

  const handleGenerateQR = async () => {
    setLoading(true);
    setError("");
    setSessionData(null);

    try {
      const res = await fetch("/api/attendance/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: course._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate QR Code");
      }

      setSessionData(data);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="group rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-900 p-6 hover:shadow-lg dark:hover:shadow-none hover:border-purple-500/20 dark:hover:border-purple-500/20 transition-all">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-flex items-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
              {course.code}
            </span>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-white line-clamp-1">
              {course.title}
            </h4>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={handleGenerateQR}
            disabled={loading}
            className="w-full py-2.5 px-3 rounded-xl text-white font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition active:scale-[0.98] text-xs shadow flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-3.5 w-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Generating...</span>
              </>
            ) : (
              "Generate QR"
            )}
          </button>
          <Link
            href={`/dashboard/lecturer/reports/${course._id}`}
            className="w-full py-2.5 px-3 rounded-xl text-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition text-xs font-semibold text-center flex items-center justify-center"
          >
            View Records
          </Link>
        </div>
      </div>

      {sessionData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 animate-in fade-in zoom-in-95 duration-250 text-center">
            <button
              onClick={() => {
                setSessionData(null);
                router.refresh();
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-650 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <span className="inline-flex items-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
              {course.code}
            </span>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
              {course.title}
            </h3>

            <div className="mx-auto w-64 h-64 border border-zinc-200/50 dark:border-zinc-800 rounded-2xl bg-white p-4 shadow flex items-center justify-center mb-6">
              <img
                src={sessionData.qrImage}
                alt="Attendance QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mb-6 py-2 px-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-medium inline-flex items-center gap-1.5">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>QR code expires in 15 minutes</span>
            </div>

            <div className="space-y-4 text-sm text-zinc-500">
              <div className="text-xs">
                Expires at:{" "}
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {new Date(sessionData.expiresAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200/30">
                <p className="text-xs font-medium text-zinc-400 mb-1">
                  Attendance Link
                </p>
                <a
                  href={sessionData.attendanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline break-all"
                >
                  {sessionData.attendanceUrl}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
