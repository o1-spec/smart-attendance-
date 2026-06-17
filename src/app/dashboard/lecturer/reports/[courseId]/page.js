import { redirect } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import AttendanceRecord from "@/models/AttendanceRecord";
import User from "@/models/User";
import { getSessionUser } from "@/lib/auth";
import { ExportButton } from "../../components";

export const dynamic = "force-dynamic";

export default async function LecturerCourseReportPage({ params }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "LECTURER") {
    redirect("/dashboard/student");
  }

  await dbConnect();

  const { courseId } = await params;

  const course = await Course.findById(courseId);
  if (!course) {
    redirect("/dashboard/lecturer");
  }

  if (course.lecturerId.toString() !== user._id.toString()) {
    redirect("/dashboard/lecturer");
  }

  const records = await AttendanceRecord.find({ courseId })
    .populate({
      path: "studentId",
      model: User,
      select: "name email",
    })
    .sort({ markedAt: -1 });

  const totalRecords = records.length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/40 bg-white/85 dark:bg-black/85 backdrop-blur-xl dark:border-zinc-800/40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-white text-black font-bold text-sm">
              QR
            </span>
            <span className="font-bold text-zinc-900 dark:text-white">
              SmartAttendance
            </span>
          </div>
          <Link
            href="/dashboard/lecturer"
            className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition active:scale-[0.98]"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/dashboard/lecturer"
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:underline inline-flex items-center gap-1"
          >
            <span>← Back to Lecturer Dashboard</span>
          </Link>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-2 border border-zinc-200 dark:border-zinc-800">
              {course.code}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {course.title}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              Complete attendance register for this module.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-900 px-6 py-4 shadow-sm w-fit shrink-0">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5">
              Total Check-ins
            </p>
            <p className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              {totalRecords}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Student Register List
            </h2>
            <ExportButton records={JSON.parse(JSON.stringify(records))} courseName={course.title} />
          </div>

          {records.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center bg-zinc-50/20 dark:bg-zinc-900/20">
              <svg
                className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                No check-ins registered yet
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-455 max-w-xs mx-auto">
                Attendance logs will populate here as soon as students scan
                active session QR codes.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-semibold">
                    <th className="pb-3 pr-4">Student Name</th>
                    <th className="pb-3 px-4">Student Email</th>
                    <th className="pb-3 pl-4">Date & Time Marked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-150 dark:divide-zinc-850">
                  {records.map((record) => (
                    <tr
                      key={record._id.toString()}
                      className="text-zinc-800 dark:text-zinc-200"
                    >
                      <td className="py-4 pr-4 font-semibold text-zinc-950 dark:text-white">
                        {record.studentId?.name || "Unknown Student"}
                      </td>
                      <td className="py-4 px-4 font-medium text-zinc-500 dark:text-zinc-400">
                        {record.studentId?.email || "N/A"}
                      </td>
                      <td className="py-4 pl-4 text-zinc-500 dark:text-zinc-400 text-xs">
                        {new Date(record.markedAt).toLocaleDateString()} at{" "}
                        {new Date(record.markedAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
