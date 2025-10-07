"use client";

import { useState, useEffect } from "react";
import { isRequired, isValidEmail, isStrongPassword, isMatchingPasswords, isValidUsername } from "@/utils/validators";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Layout from "../components/Layout";
import { colors } from "../theme";
import { socket } from "@/utils/socket";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailTaken, setEmailTaken] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (isValidEmail(value)) {
      socket.emit('checkEmail', value);
    } else {
       setEmailTaken(false);
    }
  };

  useEffect(() => {
    socket.connect();
    
    const handleEmailStatus = (status: { email: string; exists: boolean }) => {
      if (status.email === email) {
        if (status.exists) {
          setEmailTaken(true);
        } else {
          setEmailTaken(false);
        }
      }
    };

    socket.on("emailStatus", handleEmailStatus);
    socket.on("connect", () => console.log("✅ Connected to WS server"));
    socket.on("disconnect", () => console.log("❌ Disconnected from WS server"));
    socket.on("connect_error", (err) => console.error("⚠️ WS Error:", err.message));

    return () => {
      socket.off("emailStatus", handleEmailStatus);
      socket.disconnect();
    };
  }, [isValidEmail(email)]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (!isRequired(name)) {
      toast.error("Name is required.");
      return;
    }
    if (!isValidUsername(name)) {
      toast.error("Username must be at least 3 characters and contain only letters, numbers, underscores, or periods.");
      return;
    }
    if (!isRequired(email)) {
      toast.error("Email is required.");
      return;
    }
    if (emailTaken) {
      toast.error("Email already exists.");
      return;
    }
    if (!isRequired(password)) {
      toast.error("Password is required.");
      return;
    }
    if (!isRequired(confirmPassword)) {
      toast.error("Please confirm your password.");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!isStrongPassword(password)) {
      toast.error("Password is not strong enough.");
      return;
    }
    if (!isMatchingPasswords(password, confirmPassword)) {
      toast.error("Passwords do not match.");
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
            Create Your Account
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
                onChange={handleEmailChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: colors.primary }}
              />
              {emailTaken && (
                <p className="text-red-600 text-sm mt-1">
                  This email is already taken.
                </p>
              )}
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