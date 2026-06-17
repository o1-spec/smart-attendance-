"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function AttendanceMarkContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [courseInfo, setCourseInfo] = useState({ title: "", code: "" });
  const [markedTime, setMarkedTime] = useState("");

  useEffect(() => {
    if (!code) {
      setStatus("error");
      setMessage("Attendance code is missing. Please scan a valid QR code.");
      return;
    }

    const verifyAndMark = async () => {
      try {
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();

        if (!meRes.ok) {
          const callbackUrl = `/attendance/mark?code=${code}`;
          router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
          return;
        }

        if (meData.user.role !== "STUDENT") {
          setStatus("error");
          setMessage(
            "Access Forbidden: Only student accounts can mark attendance.",
          );
          return;
        }

        const markRes = await fetch("/api/attendance/mark", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        const markData = await markRes.json();

        if (!markRes.ok) {
          throw new Error(markData.error || "Failed to mark attendance");
        }

        setStatus("success");
        setCourseInfo({
          title: markData.courseTitle,
          code: markData.courseCode,
        });
        setMarkedTime(new Date(markData.markedAt).toLocaleTimeString());
      } catch (err) {
        setStatus("error");
        setMessage(err.message);
      }
    };

    verifyAndMark();
  }, [code, router]);

  if (status === "loading") {
    return (
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-900 text-center space-y-4">
        <div className="flex justify-center">
          <svg
            className="animate-spin h-10 w-10 text-purple-600"
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
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          Registering Attendance
        </h2>
        <p className="text-zinc-500 text-sm">
          Please wait while we log your presence in the course session...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-900 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 mb-6">
          <svg
            className="w-8 h-8"
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
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
          Check-in Failed
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          {message}
        </p>
        <Link
          href="/dashboard/student"
          className="inline-flex w-full items-center justify-center py-2.5 px-4 rounded-xl text-white font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition active:scale-[0.98] text-sm shadow animate-pulse"
        >
          Go to Student Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-900 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 mb-6">
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
        Attendance Marked!
      </h2>
      <p className="text-zinc-500 text-xs mb-6">
        Your check-in has been successfully registered
      </p>

      <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/30 text-left mb-6 space-y-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-zinc-400">
            Course Code
          </span>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {courseInfo.code}
          </p>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-zinc-400">
            Course Name
          </span>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {courseInfo.title}
          </p>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-zinc-400">
            Marked At
          </span>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {markedTime}
          </p>
        </div>
      </div>

      <Link
        href="/dashboard/student"
        className="inline-flex w-full items-center justify-center py-2.5 px-4 rounded-xl text-white font-medium bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-95 transition active:scale-[0.98] text-sm shadow"
      >
        Go to Student Dashboard
      </Link>
    </div>
  );
}

export default function AttendanceMarkPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-linear-to-br from-indigo-50/40 via-purple-50/40 to-pink-50/40 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <Suspense
        fallback={
          <div className="text-zinc-500 text-sm">Verifying parameters...</div>
        }
      >
        <AttendanceMarkContent />
      </Suspense>
    </div>
  );
}
