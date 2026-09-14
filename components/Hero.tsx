import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[850px] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
      }}
    >
      {/* Light overlay on the left side */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto min-h-[850px] px-6 lg:px-12 flex items-center">
        <div className="max-w-[620px] pt-2">

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/60 px-5 py-2 text-sm font-medium text-red-600 mb-5">
            <ShieldCheck size={18} />
            <span>Banking with confidence</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-6xl font-black leading-[0.92] tracking-tight text-slate-900">
            Your Trusted
            <br />
            Partner
            <br />
            for a{" "}
            <span className="text-red-600">Better</span>
            <br />
            <span className="text-red-600">Financial</span>
            <br />
            <span className="text-red-600">Future</span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-[600px] text-lg lg:text-xl leading-7 text-slate-700">
            Universal Standard Bank provides secure and reliable financial
            services designed to help individuals, families, and businesses
            manage, grow, and protect their finances.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mt-6">
            <Link
              href="/apply"
              className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-semibold px-9 py-4 rounded-xl shadow-lg"
            >
              Open an Account
            </Link>

            <Link
              href="#services"
              className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 font-semibold px-9 py-4 rounded-xl"
            >
              Internet Banking
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}