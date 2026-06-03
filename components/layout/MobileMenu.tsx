"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname() || "";

  if (!open) return null;

  return (
    <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl">
      <div className="px-4 py-4 space-y-3">
        <Link
          href="/"
          onClick={onClose}
          className={`block transition-colors py-2 font-medium ${
            pathname === "/" ? "text-purple-400" : "text-slate-300 hover:text-white"
          }`}
        >
          Home
        </Link>
        <Link
          href="/products"
          onClick={onClose}
          className={`block transition-colors py-2 font-medium ${
            pathname.startsWith("/products") ? "text-purple-400" : "text-slate-300 hover:text-white"
          }`}
        >
          Products
        </Link>

        <div className="pt-3 border-t border-white/10">
          {isAuthenticated && user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Image
                  src={user.image}
                  alt={user.firstName}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-400/50"
                />
                <div>
                  <p className="text-sm font-medium text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full text-left text-sm text-red-400 hover:text-red-300 py-2 font-medium cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                onClick={onClose}
                className="block text-center py-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="block text-center py-2 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
