"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname() || "";
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="backdrop-blur-xl bg-slate-900/70 border-b border-white/10 shadow-lg shadow-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ShopVibe
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-6">
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

              {/* Auth Section */}
              {isLoading ? (
                <div className="w-20 h-8 rounded-lg bg-slate-700/50 animate-pulse" />
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
          </div>
        </div>
      </nav>
    </header>
  );
}
