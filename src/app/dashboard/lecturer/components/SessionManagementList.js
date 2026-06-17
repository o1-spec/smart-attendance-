"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SessionManagementList({ sessions }) {
  const router = useRouter();
  const [deactivating, setDeactivating] = useState({});

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
                    <td className="py-3 px-4 text-zinc-505 dark:text-zinc-400">
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
                      {isActive && (
                        <button
                          onClick={() => handleDeactivate(session._id)}
                          disabled={deactivating[session._id]}
                          className="px-2.5 py-1 text-[10px] font-semibold text-white bg-black hover:bg-zinc-800 border border-zinc-800 rounded transition disabled:opacity-50"
                        >
                          {deactivating[session._id] ? "Deactivating..." : "Deactivate"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
