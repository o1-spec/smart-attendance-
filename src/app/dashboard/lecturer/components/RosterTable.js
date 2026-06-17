"use client";

import { useState } from "react";
import { ExportButton } from "./ExportButton";

export function RosterTable({ records }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = records.filter((record) => {
    const student = record.studentId || {};
    const name = (student.name || "").toLowerCase();
    const email = (student.email || "").toLowerCase();
    const matric = (student.matricNo || "").toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      name.includes(query) || email.includes(query) || matric.includes(query);

    let matchesDate = true;
    if (dateFilter) {
      const d = new Date(record.markedAt);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const recordLocalDate = `${year}-${month}-${day}`;
      matchesDate = recordLocalDate === dateFilter;
    }

    return matchesSearch && matchesDate;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentPageSafe = Math.min(Math.max(currentPage, 1), totalPages || 1);
  
  const indexOfLastItem = currentPageSafe * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setDateFilter("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 max-w-2xl">
          <div>
            <label htmlFor="search" className="block text-[10px] uppercase font-bold text-zinc-400 mb-1.5">Search Students</label>
            <input
              id="search"
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 transition"
              placeholder="Search by name, email, matric..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-[10px] uppercase font-bold text-zinc-400 mb-1.5">Filter by Date</label>
            <input
              id="date"
              type="date"
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 transition"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {(searchQuery || dateFilter) && (
            <button
              onClick={handleClearFilters}
              className="px-3 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
            >
              Clear
            </button>
          )}
          <ExportButton records={filtered} courseName="Filtered_Register" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-semibold">
              <th className="pb-3 pr-4">Student Name</th>
              <th className="pb-3 px-4">Matric Number</th>
              <th className="pb-3 px-4">Student Email</th>
              <th className="pb-3 pl-4">Date & Time Marked</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-150 dark:divide-zinc-850">
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-xs text-zinc-500">
                  No matching student records found.
                </td>
              </tr>
            ) : (
              currentItems.map((record) => (
                <tr key={record._id.toString()} className="text-zinc-800 dark:text-zinc-200">
                  <td className="py-4 pr-4 font-semibold text-zinc-950 dark:text-white">
                    {record.studentId?.name || "Unknown Student"}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-zinc-900 dark:text-zinc-100">
                    {record.studentId?.matricNo || "N/A"}
                  </td>
                  <td className="py-4 px-4 font-medium text-zinc-500 dark:text-zinc-400">
                    {record.studentId?.email || "N/A"}
                  </td>
                  <td className="py-4 pl-4 text-zinc-500 dark:text-zinc-400 text-xs">
                    {new Date(record.markedAt).toLocaleDateString()} at{" "}
                    {new Date(record.markedAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-zinc-150 dark:border-zinc-850 pt-4 text-xs font-semibold">
          <button
            onClick={() => handlePageChange(currentPageSafe - 1)}
            disabled={currentPageSafe === 1}
            className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-750 dark:text-zinc-300 disabled:opacity-40 transition"
          >
            Previous
          </button>
          <span className="text-zinc-500">
            Page {currentPageSafe} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPageSafe + 1)}
            disabled={currentPageSafe === totalPages}
            className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-750 dark:text-zinc-300 disabled:opacity-40 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
