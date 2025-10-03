"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { colors } from "../theme";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend API
    console.log({ email, password });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[70vh] px-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2
            className="font-sans text-2xl font-bold text-center mb-6"
            style={{ color: colors.primary }}
          >
            Welcome Back!
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{
                  borderColor: colors.primary,
                  focusRing: colors.primary,
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{
                  borderColor: colors.primary,
                  focusRing: colors.primary,
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 rounded-md font-semibold text-white transition"
              style={{ backgroundColor: colors.primary }}
            >
              Login
            </button>
          </form>

          {/* Extra links */}
          <p className="text-center text-sm mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium"
              style={{ color: colors.primary }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}