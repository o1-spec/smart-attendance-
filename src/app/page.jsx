'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-sm shadow-lg shadow-blue-500/20">
              QR
            </span>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              SmartAttendance
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#stats" className="hover:text-white transition-colors">Stats</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98]"
            >
              Register
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white md:hidden transition"
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
          <div className="md:hidden border-b border-zinc-900 bg-zinc-950 px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-5 duration-200">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              How It Works
            </a>
            <a
              href="#stats"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              Stats
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              About
            </a>
            <div className="h-px bg-zinc-900 my-2" />
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full justify-center rounded-xl border border-zinc-800 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-zinc-900"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full justify-center rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </header>

      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-12 right-1/4 w-[35%] h-[35%] rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 ring-1 ring-inset ring-blue-500/20 mb-2">
                Next-Gen Academic Productivity Tool
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
                Automated Attendance Tracking with{' '}
                <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
                  QR Codes
                </span>
              </h1>
              <p className="mx-auto lg:mx-0 max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed">
                Generate secure QR codes, record attendance instantly, and eliminate manual attendance sheets. A modern solution designed for fast-paced educational environments.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/register"
                  className="w-full sm:w-auto rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 hover:shadow-blue-500/30 transition-all active:scale-[0.98] text-center"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur px-6 py-3.5 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition active:scale-[0.98] text-center"
                >
                  Login
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-[500px] lg:max-w-none">
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full bg-red-500/80" />
                      <span className="h-3.5 w-3.5 rounded-full bg-yellow-500/80" />
                      <span className="h-3.5 w-3.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-zinc-500 font-mono select-none">lecturer_dashboard.exe</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="rounded-xl bg-zinc-950/60 border border-zinc-800/50 p-3">
                      <span className="block text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Courses</span>
                      <span className="text-lg font-bold text-white">12</span>
                    </div>
                    <div className="rounded-xl bg-zinc-950/60 border border-zinc-800/50 p-3">
                      <span className="block text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Active</span>
                      <span className="text-lg font-bold text-emerald-450">2</span>
                    </div>
                    <div className="rounded-xl bg-zinc-950/60 border border-zinc-800/50 p-3">
                      <span className="block text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Records</span>
                      <span className="text-lg font-bold text-blue-400">1,248</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-xl bg-zinc-950/40 border border-zinc-800/40 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">CS</div>
                        <div>
                          <p className="text-xs font-semibold text-white">CS-401 Compiler Construction</p>
                          <p className="text-[10px] text-zinc-500">Lecturer: Dr. Allison</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-semibold">Active</span>
                    </div>
                    
                    <div className="rounded-xl bg-zinc-950/40 border border-zinc-800/40 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xs">SE</div>
                        <div>
                          <p className="text-xs font-semibold text-white">SE-302 Software Architecture</p>
                          <p className="text-[10px] text-zinc-500">Lecturer: Dr. Allison</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-zinc-850 text-zinc-400 px-2 py-0.5 rounded-full font-semibold">Inactive</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-10 -right-6 md:-right-10 w-48 rounded-2xl border border-zinc-800/90 bg-zinc-900 p-4 shadow-2xl flex flex-col items-center justify-center gap-3 animate-bounce [animation-duration:8s]">
                  <div className="w-32 h-32 rounded-xl bg-white p-2 flex items-center justify-center shadow-lg">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                      <rect x="0" y="0" width="20" height="20" fill="currentColor" />
                      <rect x="0" y="80" width="20" height="20" fill="currentColor" />
                      <rect x="80" y="0" width="20" height="20" fill="currentColor" />
                      <rect x="80" y="80" width="10" height="10" fill="currentColor" />
                      <rect x="25" y="25" width="50" height="10" fill="currentColor" />
                      <rect x="25" y="45" width="15" height="15" fill="currentColor" />
                      <rect x="50" y="45" width="25" height="15" fill="currentColor" />
                      <rect x="25" y="70" width="40" height="10" fill="currentColor" />
                      <rect x="75" y="70" width="10" height="10" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                    14:59 Expiring
                  </span>
                </div>

                <div className="absolute -bottom-8 -left-6 md:-left-10 rounded-2xl border border-zinc-800/90 bg-zinc-900/95 p-4 shadow-2xl flex items-center gap-3 max-w-[240px]">
                  <div className="h-9 w-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-450 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Attendance Logged</p>
                    <p className="text-[10px] text-zinc-400">Sarah Jenkins checked in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 border-t border-zinc-900 bg-zinc-950/40 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest">Core Capabilities</h2>
            <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Engineered for Seamless Attendance Tracking
            </p>
            <p className="text-zinc-500 text-sm sm:text-base">
              A breakdown of key features designed to increase security, validation speed, and course metrics analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-6 hover:border-blue-500/30 transition-all hover:translate-y-[-2px] duration-300">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white mb-2">QR Code Attendance</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Lecturers generate unique attendance QR codes instantly, refreshing them dynamically for each course session.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-6 hover:border-blue-500/30 transition-all hover:translate-y-[-2px] duration-300">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white mb-2">Real-Time Recording</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Attendance is recorded instantly. Both students and lecturers see live check-in registration updates on dashboards.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-6 hover:border-blue-500/30 transition-all hover:translate-y-[-2px] duration-300">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white mb-2">Secure Validation</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Robust validation parameters prevent duplicate student attendance logs, session hijacking, or expired logins.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-6 hover:border-blue-500/30 transition-all hover:translate-y-[-2px] duration-300">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H3a2 2 0 01-2-2V5a2 2 0 012-2h18a2 2 0 012 2v14a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white mb-2">Attendance Reports</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                View and analyze detailed attendance lists easily. Quickly audit lecture attendance rates course-by-course.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 border-t border-zinc-900 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest">Workflow</h2>
            <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              How the System Operates
            </p>
            <p className="text-zinc-500 text-sm sm:text-base">
              A simple, 5-step operational loop that connects instructors and students cleanly.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-[43px] left-8 right-8 h-0.5 bg-gradient-to-r from-blue-500/10 via-blue-500/50 to-blue-500/10" />

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
              <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group">
                <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 text-blue-400 flex items-center justify-center text-lg font-bold group-hover:border-blue-500 transition-all duration-300 relative z-10">
                  1
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Create Course</h3>
                <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                  Lecturers create course cards on their dashboard by specifying the academic module code and description.
                </p>
              </div>

              <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group">
                <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 text-blue-400 flex items-center justify-center text-lg font-bold group-hover:border-blue-500 transition-all duration-300 relative z-10">
                  2
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Generate QR</h3>
                <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                  Lecturers generate session QR codes. The system constructs a cryptographically secure, timed endpoint.
                </p>
              </div>

              <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group">
                <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 text-blue-400 flex items-center justify-center text-lg font-bold group-hover:border-blue-500 transition-all duration-300 relative z-10">
                  3
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Student Scans</h3>
                <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                  Students scan the live QR code using a mobile device camera to route to the check-in confirmation view.
                </p>
              </div>

              <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group">
                <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 text-blue-400 flex items-center justify-center text-lg font-bold group-hover:border-blue-500 transition-all duration-300 relative z-10">
                  4
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Auto Record</h3>
                <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                  The API verifies the student session and timestamps the database. A verification message displays.
                </p>
              </div>

              <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group">
                <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 text-blue-400 flex items-center justify-center text-lg font-bold group-hover:border-blue-500 transition-all duration-300 relative z-10">
                  5
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Review Reports</h3>
                <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                  Lecturers load dynamic reports sorted by date to audit the student list and class attendance logs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="py-20 border-t border-zinc-900 bg-zinc-900/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="text-center space-y-2">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white">45+</span>
              <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest">Courses Managed</span>
            </div>
            <div className="text-center space-y-2">
              <span className="block text-4xl sm:text-5xl font-extrabold text-blue-500">620+</span>
              <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest">Attendance Sessions</span>
            </div>
            <div className="text-center space-y-2">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white">1,850+</span>
              <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest">Students Registered</span>
            </div>
            <div className="text-center space-y-2">
              <span className="block text-4xl sm:text-5xl font-extrabold text-blue-500">24,000+</span>
              <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest">Attendance Records</span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 border-t border-zinc-900 bg-zinc-950/20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest">Project Background</h2>
              <h3 className="text-3xl font-extrabold text-white sm:text-4xl leading-tight">
                Modernizing Academic Classrooms
              </h3>
            </div>
            <div className="lg:col-span-7">
              <p className="text-zinc-400 text-base leading-relaxed">
                The Smart QR Attendance Management System is designed to modernize classroom attendance management by replacing manual attendance sheets with secure QR code technology. Our software eliminates attendance sheet circulation delays, prevents proxy sign-ins, and generates immediate reports. It is built as a highly responsive, modern application that aligns educational administration with premium SaaS standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-zinc-900 bg-linear-to-b from-zinc-950 to-zinc-900 relative">
        <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl max-w-2xl mx-auto">
            Ready to simplify attendance management?
          </h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            Get started right now. Register a lecturer or student account to experience the system.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="w-full sm:w-auto rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition shadow-lg shadow-blue-500/10 text-center"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto rounded-xl border border-zinc-800 bg-zinc-900/40 px-6 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition text-center"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 text-zinc-500 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-white font-extrabold text-xs">
                QR
              </span>
              <span className="font-bold text-sm text-zinc-300">Smart QR Attendance System</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-zinc-500">
              <span>Final Year Project</span>
              <span className="hidden sm:inline text-zinc-850">|</span>
              <span>Department of Computer Science</span>
            </div>

            <p className="text-zinc-650 text-center md:text-right">
              &copy; {new Date().getFullYear()} Smart QR Attendance System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
