import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CardsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Cards & Payments
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-slate-900">
              Simple and secure ways to pay.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Access convenient payment solutions designed to help you manage
              everyday purchases, transfers, and financial transactions
              securely.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Open an Account
              </Link>

              <Link
                href="/login"
                className="rounded-lg border border-red-600 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                Online Banking
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
              Cards & Payment Services
            </h2>

            <p className="mt-4 text-slate-600">
              Convenient payment options for your everyday banking needs.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900">
                Debit Cards
              </h3>

              <p className="mt-3 text-slate-600 leading-7">
                Convenient access to your account for everyday purchases and
                eligible transactions.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900">
                Secure Payments
              </h3>

              <p className="mt-3 text-slate-600 leading-7">
                Make payments with security features designed to help protect
                your banking information.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900">
                Payment Management
              </h3>

              <p className="mt-3 text-slate-600 leading-7">
                Review and manage eligible card and payment activity through
                your online banking account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to get started?
          </h2>

          <p className="mt-4 text-slate-300">
            Open an account and explore convenient payment solutions with
            Universal Standard Bank.
          </p>

          <Link
            href="/apply"
            className="inline-block mt-8 rounded-lg bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Open an Account
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}