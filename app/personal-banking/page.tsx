import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function PersonalBankingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Personal Banking
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-slate-900">
              Banking designed around your everyday life.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Manage your money with secure accounts, convenient banking
              services, and the tools you need to reach your financial goals.
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
              Personal Banking Services
            </h2>

            <p className="mt-4 text-slate-600">
              Simple and reliable banking solutions for your personal
              financial needs.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900">
                Checking Accounts
              </h3>
              <p className="mt-3 text-slate-600 leading-7">
                Convenient everyday banking with easy access to your money.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900">
                Savings Accounts
              </h3>
              <p className="mt-3 text-slate-600 leading-7">
                Save toward your goals while keeping your money secure and
                accessible.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900">
                Online Banking
              </h3>
              <p className="mt-3 text-slate-600 leading-7">
                Access your account, review transactions, and manage your
                banking securely online.
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
            Open your Universal Standard Bank account today.
          </p>

          <Link
            href="/apply"
            className="inline-block mt-8 rounded-lg bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Open an Account
          </Link>
        </div>
      </section>
    </main>
  );
}