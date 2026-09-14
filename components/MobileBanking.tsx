import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MobileBanking() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-28">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        <p className="uppercase tracking-[6px] text-red-400 text-sm font-semibold">
          Start Your Banking Journey
        </p>

        <h2 className="mt-6 text-5xl lg:text-6xl font-bold text-white leading-tight">
          Ready to Bank
          <br />
          With Confidence?
        </h2>

        <p className="mt-8 text-xl text-slate-300 leading-9 max-w-3xl mx-auto">
          Open an account with Universal Standard Bank and experience
          secure, modern banking designed for individuals, businesses
          and clients around the world.
        </p>

        <Link
          href="/apply"
          className="inline-flex items-center gap-3 mt-12 bg-red-600 hover:bg-red-700 text-white font-semibold px-10 py-5 rounded-xl transition-all duration-300 hover:gap-5 shadow-2xl"
        >
          Open Account
          <ArrowRight size={20} />
        </Link>

      </div>

    </section>
  );
}