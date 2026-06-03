import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 w-full relative">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-1/4 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full bg-pink-600/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Glow border effect */}
        <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-purple-600/20 to-pink-600/20 blur-xl" />

        {/* Card container */}
        <div className="relative rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
