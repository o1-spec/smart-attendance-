"use client";

import { useEffect, useState } from "react";

export function SessionCountdownBadge({ expiresAt, active }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    if (!active) {
      setStatus("deactivated");
      return;
    }

    const calculateTime = () => {
      const diff = new Date(expiresAt).getTime() - new Date().getTime();
      if (diff <= 0) {
        setStatus("expired");
        setTimeLeft("");
        return false;
      }
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${mins}m ${secs}s`);
      setStatus("active");
      return true;
    };

    const isCurrentActive = calculateTime();
    if (!isCurrentActive) return;

    const interval = setInterval(() => {
      const isCurrentActive = calculateTime();
      if (!isCurrentActive) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, active]);

  if (status === "deactivated") {
    return (
      <div className="mb-6 py-2 px-4 rounded-full bg-zinc-950 border border-zinc-850 text-zinc-500 text-xs font-semibold inline-flex items-center gap-1.5 justify-center w-full">
        <svg className="w-4 h-4 shrink-0 text-zinc-550" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        <span>QR code is deactivated</span>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="mb-6 py-2 px-4 rounded-full bg-zinc-950 border border-zinc-850 text-zinc-500 text-xs font-semibold inline-flex items-center gap-1.5 justify-center w-full">
        <svg className="w-4 h-4 shrink-0 text-zinc-550" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        <span>QR code has expired</span>
      </div>
    );
  }

  return (
    <div className="mb-6 py-2 px-4 rounded-full bg-zinc-900 border border-zinc-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 justify-center w-full">
      <svg className="w-4 h-4 shrink-0 animate-pulse text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>QR code expires in {timeLeft || "15 minutes"}</span>
    </div>
  );
}
