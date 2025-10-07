'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import toast from 'react-hot-toast';

import Cookies from 'js-cookie';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { login } from '@/store/authSlice';

import Layout from '../components/Layout';
import { colors } from '../theme';
import { isValidEmail } from '@/utils/validators';
import { useAppRouter } from '@/utils/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { goTo } = useAppRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/'; // fallback to home


  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector(
    (state: RootState) => state.auth
  );

  const isToastActive = (id: string) => {
    // @ts-ignore
    return typeof toast.isActive === 'function' ? toast.isActive(id) : false;
  };

  useEffect(() => {
    const notice = Cookies.get('auth_notice');
    if (notice === 'login_required') {
      Cookies.remove('auth_notice');

      const toastId = 'login_required_notice';

      if (!isToastActive(toastId)) {
        toast('Please log in to continue.', { id: toastId });
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      const result = await dispatch(login({ email, password })).unwrap();
      toast.success(`Welcome back, ${result.user.name || 'User'}!`);
      goTo(redirectTo);
    } catch (err: any) {
      console.log(err)
      toast.error(err || 'Login failed. Please try again.');
    }
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
              <label
                className="block mb-2 font-medium"
                style={{ color: colors.textPrimary }}
              >
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
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block mb-2 font-medium"
                style={{ color: colors.textPrimary }}
              >
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
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 rounded-md font-semibold text-white transition"
              style={{ backgroundColor: colors.primary }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
          </form>

          {/* Extra links */}
          <p className="text-center text-sm mt-6 text-gray-600">
            Don’t have an account?{' '}
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
