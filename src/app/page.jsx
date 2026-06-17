'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-mono selection:bg-zinc-800 selection:text-white">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-black">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-white text-black font-bold text-sm">
              QR
            </span>
            <span className="font-semibold text-base tracking-tight text-white">
              Smart QR Attendance
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#problem" className="hover:text-white transition-colors">Problem</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#users" className="hover:text-white transition-colors">Users</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-zinc-300 hover:text-white transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200 transition"
            >
              Register
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white md:hidden transition"
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-900 bg-black px-4 py-4 space-y-2">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              Home
            </a>
            <a
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              Problem
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              How It Works
            </a>
            <a
              href="#users"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              Users
            </a>
            <div className="h-px bg-zinc-900 my-2" />
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full justify-center rounded border border-zinc-800 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full justify-center rounded bg-white py-2 text-sm font-semibold text-black hover:bg-zinc-200"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </header>

      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
                Smart QR Attendance Management System
              </h1>
              <p className="mx-auto lg:mx-0 max-w-2xl text-sm text-zinc-400 leading-relaxed">
                A web-based system that helps lecturers generate QR codes for class attendance while students scan and mark attendance instantly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/register"
                  className="w-full sm:w-auto rounded bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-200 transition text-center animate-pulse"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto rounded border border-zinc-800 bg-black px-6 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition text-center"
                >
                  Login
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded border border-zinc-850 bg-black p-6 shadow-2xl max-w-[420px] mx-auto">
                <div className="border-b border-zinc-900 pb-3 mb-4">
                  <span className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">Active session display</span>
                </div>

                <div className="space-y-4">
                  <div className="rounded bg-black p-3 border border-zinc-900">
                    <span className="block text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Course</span>
                    <p className="text-sm font-bold text-white">CS-401 Compiler Construction</p>
                  </div>

                  <div className="rounded bg-black p-3 border border-zinc-900">
                    <span className="block text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Attendance Session</span>
                    <p className="text-xs text-zinc-300">Generated: 10:00 AM | Expiration: 15 minutes</p>
                  </div>

                  <div className="flex justify-center p-4 bg-white rounded border border-zinc-900 max-w-[180px] mx-auto">
                    <svg viewBox="0 0 100 100" className="w-28 h-28 text-black">
                      <rect x="0" y="0" width="22" height="22" fill="currentColor" />
                      <rect x="6" y="6" width="10" height="10" fill="white" />
                      <rect x="0" y="78" width="22" height="22" fill="currentColor" />
                      <rect x="6" y="84" width="10" height="10" fill="white" />
                      <rect x="78" y="0" width="22" height="22" fill="currentColor" />
                      <rect x="84" y="6" width="10" height="10" fill="white" />
                      <rect x="78" y="78" width="10" height="10" fill="currentColor" />
                      <rect x="30" y="30" width="40" height="8" fill="currentColor" />
                      <rect x="30" y="48" width="12" height="12" fill="currentColor" />
                      <rect x="52" y="48" width="20" height="12" fill="currentColor" />
                      <rect x="30" y="70" width="30" height="8" fill="currentColor" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between text-xs border-t border-zinc-900 pt-3">
                    <span className="text-zinc-500">Status</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-white font-semibold">
                      Active QR Code
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="py-20 border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Problem Statement</h2>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                The Inefficiency of Manual Attendance Sheet Circulation
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Traditional paper registers consume valuable lecture time when passed from student to student. They are vulnerable to proxy attendance (where students sign on behalf of absent classmates) and create substantial work for lecturers, who must manually copy the written data into spreadsheets at a later time.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Proposed Solution</h2>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Dynamic Validation and Digital Logging
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                This system is designed to reduce the stress of manual attendance taking, prevent proxy attendance, and help lecturers generate accurate attendance records. By using dynamic QR codes linked directly to temporary user session codes, attendance is registered instantly in a centralized database as soon as a student scans the QR code.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">System Capabilities</h2>
            <h3 className="text-2xl font-bold text-white sm:text-3xl mt-1">
              Key Features
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded border border-zinc-900 bg-black p-5">
              <h4 className="text-sm font-bold text-white mb-2">QR Code Generation</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Lecturers create unique, timed attendance sessions. The system generates a corresponding QR image containing a temporary verification link.
              </p>
            </div>

            <div className="rounded border border-zinc-900 bg-black p-5">
              <h4 className="text-sm font-bold text-white mb-2">Student Attendance Marking</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Students scan the QR code using a mobile browser, checking their auth cookie to log their presence directly in the active session.
              </p>
            </div>

            <div className="rounded border border-zinc-900 bg-black p-5">
              <h4 className="text-sm font-bold text-white mb-2">Duplicate Prevention</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Database-level constraints verify that a student cannot mark attendance twice in a single session, preventing proxy logs.
              </p>
            </div>

            <div className="rounded border border-zinc-900 bg-black p-5">
              <h4 className="text-sm font-bold text-white mb-2">Attendance Reports</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Lecturers access complete registers for each course. The details display names, emails, and exact timestamps.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Workflow</h2>
            <h3 className="text-2xl font-bold text-white sm:text-3xl mt-1">
              System Operations
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded bg-black p-5 border border-zinc-900">
              <span className="text-xs font-bold text-zinc-500 uppercase block mb-1">Step 1</span>
              <h4 className="text-xs font-bold text-white mb-2">Course Setup</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The lecturer creates a course card by entering the course title and code on the dashboard.
              </p>
            </div>

            <div className="rounded bg-black p-5 border border-zinc-900">
              <span className="text-xs font-bold text-zinc-500 uppercase block mb-1">Step 2</span>
              <h4 className="text-xs font-bold text-white mb-2">Generate QR Code</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The lecturer clicks generate on a course. The system logs a temporary verification code in MongoDB.
              </p>
            </div>

            <div className="rounded bg-black p-5 border border-zinc-900">
              <span className="text-xs font-bold text-zinc-500 uppercase block mb-1">Step 3</span>
              <h4 className="text-xs font-bold text-white mb-2">Scan Code</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The student scans the code with their mobile device. The interface reads the parameter code.
              </p>
            </div>

            <div className="rounded bg-black p-5 border border-zinc-900">
              <span className="text-xs font-bold text-zinc-500 uppercase block mb-1">Step 4</span>
              <h4 className="text-xs font-bold text-white mb-2">Verification</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The API verifies the code matches an active, unexpired session and validates the student role access.
              </p>
            </div>

            <div className="rounded bg-black p-5 border border-zinc-900">
              <span className="text-xs font-bold text-zinc-500 uppercase block mb-1">Step 5</span>
              <h4 className="text-xs font-bold text-white mb-2">Record Checked</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The student checks in and the timestamp is logged. Double submissions are rejected by the system.
              </p>
            </div>

            <div className="rounded bg-black p-5 border border-zinc-900">
              <span className="text-xs font-bold text-zinc-500 uppercase block mb-1">Step 6</span>
              <h4 className="text-xs font-bold text-white mb-2">Audit List</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The lecturer opens the course reports page to review the populated table registry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="users" className="py-20 border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Role Matrix</h2>
            <h3 className="text-2xl font-bold text-white sm:text-3xl mt-1">
              System Users
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded border border-zinc-900 p-6 bg-black">
              <h4 className="text-base font-bold text-white mb-3">Lecturer Access</h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-zinc-650">•</span>
                  Create and manage multiple courses.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-650">•</span>
                  Generate timed attendance sessions.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-650">•</span>
                  Monitor active session expiration.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-650">•</span>
                  Retrieve list reports for specific course modules.
                </li>
              </ul>
            </div>

            <div className="rounded border border-zinc-900 p-6 bg-black">
              <h4 className="text-base font-bold text-white mb-3">Student Access</h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-zinc-650">•</span>
                  Authenticate securely using role assignments.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-650">•</span>
                  Scan lecturer QR codes to submit presence.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-650">•</span>
                  Monitor checklist logs showing course code and check-in times.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-zinc-900 bg-black">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl max-w-2xl mx-auto">
            Ready to simplify attendance management?
          </h2>
          <p className="text-zinc-500 text-xs max-w-md mx-auto">
            Sign up or login to access the system portals as a lecturer or a student.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="w-full sm:w-auto rounded bg-white px-6 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200 transition text-center"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto rounded border border-zinc-800 bg-black px-6 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition text-center"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-900 bg-black py-10 text-zinc-500 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-white text-black font-bold text-xs">
                QR
              </span>
              <span className="font-semibold text-zinc-300">Smart QR Attendance Management System</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-zinc-500 font-mono">
              <span>Final Year Software Project</span>
              <span className="hidden sm:inline text-zinc-800">|</span>
              <span>Department of Computer Science</span>
            </div>

            <p className="text-zinc-650 text-center md:text-right font-mono">
              &copy; {new Date().getFullYear()} Smart QR Attendance. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
