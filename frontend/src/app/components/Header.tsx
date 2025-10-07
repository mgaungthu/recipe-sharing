'use client';
import Link from 'next/link';
import { colors } from '../theme';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/authSlice';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useAppRouter } from '@/utils/navigation';

export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
    const { goHome } = useAppRouter();


  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove('token');
    toast.success('Logged out successfully!');
        goHome(); // ✅ Redirect to home after logout

  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/">
          <h1
            className="font-sans text-2xl font-bold"
            style={{ color: colors.primary }}
          >
            RecipeSharing
          </h1>
        </Link>

        <nav className="space-x-4 flex items-center">
          <Link
            href="/"
            className="text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Home
          </Link>

          {user ? (
            // ✅ Logged-in menu
            <>
              <Link
                href="/recipe/create"
                className="text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Create Recipe
              </Link>
              <span className="text-gray-600 font-medium">
                {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 px-3 py-2 rounded-md hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            // 🚪 Logged-out menu
            <>
              <Link
                href="/login"
                className="text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-md font-semibold text-white"
                style={{ backgroundColor: colors.primary }}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
