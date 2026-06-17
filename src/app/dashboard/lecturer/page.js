import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import AttendanceSession from '@/models/AttendanceSession';
import AttendanceRecord from '@/models/AttendanceRecord';
import User from '@/models/User';
import { getSessionUser } from '@/lib/auth';
import { LecturerNavbar, CourseCreationForm, CourseCard, SessionManagementList, RosterTable } from './components';

export const dynamic = 'force-dynamic';

export default async function LecturerDashboardPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect('/login');
  }

  if (user.role !== 'LECTURER') {
    redirect('/dashboard/student');
  }

  await dbConnect();

  const courses = await Course.find({ lecturerId: user._id }).sort({ createdAt: -1 });
  const courseIds = courses.map(c => c._id);

  const totalCourses = courses.length;
  
  const activeSessions = await AttendanceSession.countDocuments({
    courseId: { $in: courseIds },
    active: true,
    expiresAt: { $gt: new Date() },
  });

  const totalRecords = await AttendanceRecord.countDocuments({
    courseId: { $in: courseIds },
  });

  const sessions = await AttendanceSession.find({
    courseId: { $in: courseIds }
  })
    .populate({
      path: 'courseId',
      model: Course,
      select: 'title code'
    })
    .sort({ createdAt: -1 })
    .limit(10);

  const records = await AttendanceRecord.find({ courseId: { $in: courseIds } })
    .populate({
      path: 'studentId',
      model: User,
      select: 'name email matricNo',
    })
    .populate({
      path: 'courseId',
      model: Course,
      select: 'title code',
    })
    .sort({ markedAt: -1 });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col">
      <LecturerNavbar userName={user.name} staffId={user.staffId} />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Lecturer Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Create academic courses, generate QR codes, and review student attendance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-10">
          <div className="rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              Total Courses
            </p>
            <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">
              {totalCourses}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              Active Sessions
            </p>
            <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">
              {activeSessions}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              Total Records
            </p>
            <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">
              {totalRecords}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
            <CourseCreationForm />
          </div>

          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Your Courses
                </h2>
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  Sorted by most recent
                </span>
              </div>

              {courses.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center bg-white dark:bg-zinc-900">
                  <svg className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                    No courses created yet
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-450 max-w-xs mx-auto">
                    Get started by adding your first academic course in the course creator panel.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course) => (
                    <CourseCard key={course._id.toString()} course={JSON.parse(JSON.stringify(course))} />
                  ))}
                </div>
              )}
            </div>

            <SessionManagementList sessions={JSON.parse(JSON.stringify(sessions))} />

            <div className="rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-900 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
                All Course Check-ins
              </h2>
              {records.length === 0 ? (
                <div className="rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center bg-zinc-50/20 dark:bg-zinc-900/20">
                  <svg className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                    No check-ins registered yet
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-455 max-w-xs mx-auto">
                    Attendance logs will populate here as soon as students scan active sessions.
                  </p>
                </div>
              ) : (
                <RosterTable records={JSON.parse(JSON.stringify(records))} showCourse={true} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
