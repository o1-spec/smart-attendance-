'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push(
          data.user.role === 'LECTURER'
            ? '/dashboard/lecturer'
            : '/dashboard/student'
        );
      }
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded border border-zinc-900 bg-zinc-950 font-mono">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded bg-white text-black font-bold text-lg mb-4">
          QR
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white uppercase">
          Create Account
        </h1>
        <p className="text-zinc-500 mt-2 text-xs">
          Sign up as a lecturer or a student to get started
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded border border-zinc-900 bg-zinc-950 text-white text-xs flex items-start gap-3">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full px-4 py-3 rounded border border-zinc-900 bg-black text-white focus:outline-none focus:border-white transition text-xs"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded border border-zinc-900 bg-black text-white focus:outline-none focus:border-white transition text-xs"
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2" htmlFor="password">
            Password (min 6 chars)
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              className="w-full pl-4 pr-12 py-3 rounded border border-zinc-900 bg-black text-white focus:outline-none focus:border-white transition text-xs"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-500 hover:text-white transition"
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2" htmlFor="role">
            Account Role
          </label>
          <div className="relative">
            <select
              id="role"
              className="w-full px-4 py-3 rounded border border-zinc-900 bg-black text-white focus:outline-none focus:border-white transition text-xs appearance-none cursor-pointer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="STUDENT">Student</option>
              <option value="LECTURER">Lecturer</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded bg-white text-black font-semibold hover:bg-zinc-200 disabled:opacity-50 transition active:scale-[0.98] text-xs uppercase tracking-wider mt-2"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-8 text-center text-xs text-zinc-500">
        Already have an account?{' '}
        <Link
          href={`/login${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
          className="font-medium text-white hover:underline transition"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <Suspense fallback={<div className="text-zinc-500 text-xs font-mono">Loading registration form...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
