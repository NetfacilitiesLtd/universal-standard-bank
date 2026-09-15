import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function BusinessBankingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Business Banking
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-slate-900">
              Banking solutions built for your business.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Manage your business finances with dependable banking services
              designed to support your operations, growth, and long-term goals.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Open a Business Account
              </Link>

              <Link
                href="/contact"
                className="rounded-lg border border-red-600 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Business Banking Services
            </h2>

            <p className="mt-4 text-slate-600">
              Flexible banking solutions to help businesses manage their
              finances efficiently.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900">
                Business Accounts
              </h3>
              <p className="mt-3 text-slate-600 leading-7">
                Reliable account solutions for managing everyday business
                transactions and finances.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900">
                Business Payments
              </h3>
              <p className="mt-3 text-slate-600 leading-7">
                Convenient ways to manage payments and keep your business
                transactions organized.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900">
                International Banking
              </h3>
              <p className="mt-3 text-slate-600 leading-7">
                Banking services designed to support businesses with
                international financial needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Grow your business with confidence.
          </h2>

          <p className="mt-4 text-slate-300">
            Speak with Universal Standard Bank about your business banking
            needs.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-8 rounded-lg bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}