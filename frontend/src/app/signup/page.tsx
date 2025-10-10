'use client';
import { useState, useEffect, useRef } from 'react';
import {
  isRequired,
  isValidEmail,
  isStrongPassword,
  isMatchingPasswords,
  isValidUsername,
} from '@/utils/validators';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import Layout from '../components/Layout';
import { colors } from '../theme';
import { socket } from '@/utils/socket';
import { useSearchParams } from 'next/navigation';
import { useAppRouter } from '@/utils/navigation';
import { useAppDispatch } from '@/store/hooks';
import { register } from '@/store/authSlice';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailTaken, setEmailTaken] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const { goTo, goHome } = useAppRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  const emailRef = useRef(email);
  useEffect(() => {
    emailRef.current = email;
  }, [email]);

  const dispatch = useAppDispatch();

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
      if (status.email === emailRef.current) {
        setEmailTaken(status.exists);
      }
    };

    socket.on('emailStatus', handleEmailStatus);
    socket.on('connect', () => console.log('✅ Connected to WS server'));
    socket.on('disconnect', () =>
      console.log('❌ Disconnected from WS server')
    );
    socket.on('connect_error', (err) =>
      console.error('⚠️ WS Error:', err.message)
    );

    return () => {
      socket.off('emailStatus', handleEmailStatus);
      socket.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Validation
    if (!isRequired(name)) {
      toast.error('Name is required.');
      return;
    }
    if (!isValidUsername(name)) {
      toast.error(
        'Username must be at least 3 characters and contain only letters, numbers, underscores, or periods.'
      );
      return;
    }
    if (!isRequired(email)) {
      toast.error('Email is required.');
      return;
    }
    if (emailTaken) {
      toast.error('Email already exists.');
      return;
    }
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!isRequired(password)) {
      toast.error('Password is required.');
      return;
    }
    if (!isRequired(confirmPassword)) {
      toast.error('Please confirm your password.');
      return;
    }
    if (!isStrongPassword(password)) {
      toast.error('Password is not strong enough.');
      return;
    }
    if (!isMatchingPasswords(password, confirmPassword)) {
      toast.error('Passwords do not match.');
      return;
    }
    if (!agreed) {
      toast.error(
        'You must agree to the Terms and Conditions before signing up.'
      );
      return;
    }

    try {
      setLoading(true);

      const resultAction = await dispatch(register({ name, email, password }));
      if (register.fulfilled.match(resultAction)) {
        toast.success('Account created successfully!');
        setTimeout(() => {
          if (redirectPath && redirectPath !== '/') goTo(redirectPath);
          else goHome();
        }, 1200);
      } else {
        toast.error(resultAction.payload as string);
      }
    } finally {
      setLoading(false);
    }
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
              <label
                className="block mb-2 font-medium"
                style={{ color: colors.textPrimary }}
              >
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
              <label
                className="block mb-2 font-medium"
                style={{ color: colors.textPrimary }}
              >
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
                style={{ borderColor: colors.primary }}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="block mb-2 font-medium"
                style={{ color: colors.textPrimary }}
              >
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

            {/* Terms Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className={`w-4 h-4 border rounded appearance-none cursor-pointer transition-colors ${
                  agreed ? 'bg-[#007bff] border-[#007bff]' : 'border-gray-400'
                }`}
                style={{
                  backgroundColor: agreed ? colors.primary : 'transparent',
                  borderColor: agreed ? colors.primary : '#ccc',
                }}
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-semibold text-white transition ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              style={{ backgroundColor: colors.primary }}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          {/* Extra links */}
          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{' '}
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
