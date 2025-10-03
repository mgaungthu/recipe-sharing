import Link from "next/link";
import { colors } from "../theme";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-gray-600">
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          © {new Date().getFullYear()} RecipeSharing. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link href="/about" className="hover:opacity-80">
            About
          </Link>
          <Link href="/contact" className="hover:opacity-80">
            Contact
          </Link>
          <Link href="/privacy" className="hover:opacity-80">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}