"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({
  showLogo = true,
}: {
  showLogo?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Personal Banking", href: "/personal-banking" },
    { name: "Business Banking", href: "/business-banking" },
    { name: "About Us", href: "/#about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {showLogo && (
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-transparent.png"
                alt="Universal Standard Bank"
                width={170}
                height={48}
                priority
                className="mix-blend-multiply"
              />
            </Link>
          )}

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[15px] font-medium transition-colors duration-300 ${
                  link.name === "Home"
                    ? "text-red-600"
                    : "text-slate-700 hover:text-red-600"
                }`}
              >
                {link.name}

                {link.name === "Home" && (
                  <span className="absolute left-0 -bottom-2 h-[2px] w-full rounded-full bg-red-600"></span>
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/apply"
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Open Account
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-red-600 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
            >
              Login
            </Link>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="rounded-xl bg-white shadow-lg border border-gray-200 p-6 lg:hidden">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-medium text-slate-700"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/apply"
                className="rounded-lg bg-red-600 py-3 text-center font-semibold text-white"
              >
                Open Account
              </Link>

              <Link
                href="/login"
                className="rounded-lg border border-red-600 py-3 text-center font-semibold text-red-600"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}