"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { colors } from "../theme";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // TODO: connect to backend API
    console.log({ name, email, password });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[70vh] px-6 pt-10">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2
            className="text-2xl font-bold text-center mb-6"
            style={{ color: colors.primary }}
          >
            Create Your Account ✨
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: colors.primary }}
              />
            </div>

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
                style={{ borderColor: colors.primary }}
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
                style={{ borderColor: colors.primary }}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: colors.primary }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 rounded-md font-semibold text-white transition"
              style={{ backgroundColor: colors.primary }}
            >
              Sign Up
            </button>
          </form>

          {/* Extra links */}
          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium"
              style={{ color: colors.primary }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}