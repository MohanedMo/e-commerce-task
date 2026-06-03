"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function DesktopNav() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const pathname = usePathname() || "";

  return (
    <div className="hidden md:flex items-center gap-6">
      <Link
        href="/"
        className={`transition-colors text-sm font-medium ${
          pathname === "/" ? "text-purple-400" : "text-slate-300 hover:text-white"
        }`}
      >
        Home
      </Link>
      <Link
        href="/products"
        className={`transition-colors text-sm font-medium ${
          pathname.startsWith("/products") ? "text-purple-400" : "text-slate-300 hover:text-white"
        }`}
      >
        Products
      </Link>

      {isLoading ? (
        <div className="w-20 h-8 rounded-lg bg-slate-700/50 animate-pulse" aria-busy="true" />
      ) : isAuthenticated && user ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-white/10">
            <Image
              src={user.image}
              alt={user.firstName}
              width={24}
              height={24}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-purple-400/50"
            />
            <span className="text-sm text-slate-200 font-medium">
              {user.firstName}
            </span>
          </div>
          <button
            onClick={logout}
            className="text-sm text-slate-400 hover:text-red-400 transition-colors font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-slate-300 hover:text-white transition-colors font-medium"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm px-4 py-2 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
