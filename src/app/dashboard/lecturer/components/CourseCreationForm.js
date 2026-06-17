"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CourseCreationForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, code, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create course");
      }

      setSuccess("Course created successfully!");
      setTitle("");
      setCode("");
      setDescription("");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-900 p-6 shadow-xl shadow-zinc-100/50 dark:shadow-none">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
        Add New Course
      </h3>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider"
            htmlFor="course-title"
          >
            Course Title
          </label>
          <input
            id="course-title"
            type="text"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 transition-all text-sm"
            placeholder="e.g. Advanced Software Engineering"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label
            className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider"
            htmlFor="course-code"
          >
            Course Code
          </label>
          <input
            id="course-code"
            type="text"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 transition-all text-sm"
            placeholder="e.g. CS-401"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div>
          <label
            className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider"
            htmlFor="course-description"
          >
            Course Description
          </label>
          <textarea
            id="course-description"
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 transition-all text-sm resize-none"
            placeholder="Enter short description of the course module..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl text-black font-semibold bg-white hover:bg-zinc-200 disabled:opacity-50 transition active:scale-[0.98] text-sm shadow-md"
        >
          {loading ? 'Creating...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
}
