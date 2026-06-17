"use client";

export function ExportButton({ records, courseName }) {
  const handleExport = () => {
    if (!records || records.length === 0) return;

    const headers = ["Student Name", "Matric Number", "Student Email", "Marked Date", "Marked Time"];
    const rows = records.map((record) => {
      const dateObj = new Date(record.markedAt);
      return [
        record.studentId?.name || "Unknown Student",
        record.studentId?.matricNo || "N/A",
        record.studentId?.email || "N/A",
        dateObj.toLocaleDateString(),
        dateObj.toLocaleTimeString(),
      ];
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_${courseName.replace(/\s+/g, "_").toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      disabled={!records || records.length === 0}
      className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition active:scale-[0.98] disabled:opacity-50"
    >
      Export CSV
    </button>
  );
}
