"use client";

import {
  Bell,
  Search,
} from "lucide-react";

export default function Header() {
  return (
    <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      {/* Welcome */}

      <div>

        <p className="text-sm text-slate-500">
          Welcome Back
        </p>

        <h1 className="text-2xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="hidden lg:flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-3 w-80">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-sm"
          />

        </div>

        {/* Notifications */}

        <button className="relative w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">

          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-600"></span>

        </button>

        {/* Admin Profile */}

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
            A
          </div>

          <div className="hidden md:block">

            <p className="font-semibold">
              Administrator
            </p>

            <p className="text-sm text-slate-500">
              Universal Standard Bank
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}