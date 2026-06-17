"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import qrcode from "qrcode";
import { SessionCountdownBadge } from "./SessionCountdownBadge";

export function SessionManagementList({ sessions }) {
  const router = useRouter();
  const [deactivating, setDeactivating] = useState({});
  const [modalSession, setModalSession] = useState(null);
  const [qrImage, setQrImage] = useState("");

  const handleDeactivate = async (sessionId) => {
    setDeactivating((prev) => ({ ...prev, [sessionId]: true }));
    try {
      const res = await fetch("/api/attendance/deactivate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to deactivate session:", err);
    } finally {
      setDeactivating((prev) => ({ ...prev, [sessionId]: false }));
    }
  };

  const handleViewQR = async (session) => {
    try {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      const attendanceUrl = `${appUrl}/attendance/mark?code=${session.code}`;
      const url = await qrcode.toDataURL(attendanceUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrImage(url);
      setModalSession(session);
    } catch (err) {
      console.error("Failed to generate QR code", err);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">
        Generated Sessions
      </h3>

      {sessions.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-450 text-center py-4">
          No generated sessions found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 pr-4">Course</th>
                <th className="pb-3 px-4">Code</th>
                <th className="pb-3 px-4">Expires At</th>
                <th className="pb-3 px-4 text-center">Status</th>
                <th className="pb-3 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-150 dark:divide-zinc-850">
              {sessions.map((session) => {
                const isExpired = new Date(session.expiresAt) < new Date();
                const isActive = session.active && !isExpired;

                return (
                  <tr key={session._id} className="text-zinc-800 dark:text-zinc-200">
                    <td className="py-3 pr-4 font-semibold text-zinc-955 dark:text-white">
                      {session.courseId?.code || "N/A"}
                    </td>
                    <td className="py-3 px-4 font-mono">{session.code}</td>
                    <td className="py-3 px-4 text-zinc-550 dark:text-zinc-405">
                      {new Date(session.expiresAt).toLocaleTimeString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isActive ? (
                        <span className="inline-flex items-center rounded bg-black text-white border border-zinc-800 font-semibold px-2 py-0.5 text-[10px]">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded bg-zinc-950 text-zinc-500 px-2 py-0.5 text-[10px]">
                          {session.active ? "Expired" : "Deactivated"}
                        </span>
                      )}
                    </td>
                    <td className="py-3 pl-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewQR(session)}
                          className="px-2.5 py-1 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded transition"
                        >
                          View QR
                        </button>
                        {isActive && (
                          <button
                            onClick={() => handleDeactivate(session._id)}
                            disabled={deactivating[session._id]}
                            className="px-2.5 py-1 text-[10px] font-semibold text-white bg-black hover:bg-zinc-800 border border-zinc-800 rounded transition disabled:opacity-50"
                          >
                            {deactivating[session._id] ? "Deactivating..." : "Deactivate"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {modalSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-205">
          <div className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 text-center animate-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setModalSession(null);
                setQrImage("");
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-250 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
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

            <span className="inline-flex items-center rounded bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-2 border border-zinc-200 dark:border-zinc-700">
              {modalSession.courseId?.code || "N/A"}
            </span>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
              {modalSession.courseId?.title || "Course Session"}
            </h3>

            <div className="mx-auto w-64 h-64 border border-zinc-200/50 dark:border-zinc-800 rounded-2xl bg-white p-4 shadow flex items-center justify-center mb-6">
              {qrImage ? (
                <img
                  src={qrImage}
                  alt="Attendance QR Code"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-zinc-400 text-xs font-mono">Generating...</span>
              )}
            </div>

            <SessionCountdownBadge expiresAt={modalSession.expiresAt} active={modalSession.active} />

            <div className="space-y-4 text-sm text-zinc-500">
              <div className="text-xs">
                Expires at:{" "}
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {new Date(modalSession.expiresAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200/30">
                <p className="text-xs font-medium text-zinc-400 mb-1">
                  Attendance Link
                </p>
                <a
                  href={`${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/attendance/mark?code=${modalSession.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 underline hover:no-underline break-all"
                >
                  {`${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/attendance/mark?code=${modalSession.code}`}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
