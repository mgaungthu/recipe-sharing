import Link from 'next/link';
import { colors } from '../theme';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href={'/'}>
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
            className="text-gray-700 px-3 py-2 rounded-md hover:bg-[${colors.primary}] hover:text-black transition"
          >
            Home
          </Link>
          <Link
            href="/login"
            className="text-gray-700 px-3 py-2 rounded-md hover:bg-[${colors.primary}] hover:text-black transition"
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
        </nav>
      </div>
    </header>
  );
}
