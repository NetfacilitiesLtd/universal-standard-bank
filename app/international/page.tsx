import Link from "next/link";
import {
  Globe2,
  ArrowRight,
  CheckCircle2,
  Banknote,
  RefreshCw,
  Headphones,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Global Transfers",
    description:
      "Send and receive funds across borders with international banking solutions designed for your global financial needs.",
    icon: Globe2,
  },
  {
    title: "Foreign Exchange",
    description:
      "Access currency exchange services to help you manage financial transactions involving different currencies.",
    icon: RefreshCw,
  },
  {
    title: "Multi-Currency Banking",
    description:
      "Manage financial needs involving multiple currencies with convenient international banking solutions.",
    icon: Banknote,
  },
  {
    title: "International Support",
    description:
      "Get assistance with your international banking needs and access support when managing cross-border finances.",
    icon: Headphones,
  },
];

const benefits = [
  "International payment solutions",
  "Foreign currency services",
  "Multi-currency banking support",
  "Cross-border financial assistance",
];

export default function InternationalBankingPage() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-36 pb-24">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="uppercase tracking-[5px] text-red-600 text-sm font-semibold">
              International Banking
            </p>

            <h1 className="mt-5 text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Banking Beyond
              <br />
              Borders
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-8 max-w-2xl">
              International banking solutions designed to help you manage
              cross-border finances, global payments and transactions involving
              multiple currencies.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-4 font-semibold text-white transition hover:bg-red-700"
              >
                Open an Account
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-4 font-semibold text-white transition hover:bg-slate-800"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="uppercase tracking-[4px] text-red-600 text-sm font-semibold">
                Global Financial Services
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Stay connected
                <br />
                across borders
              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-8">
                Whether you are receiving funds from abroad, making
                international payments or managing finances across different
                currencies, our international banking services are designed to
                support your financial needs.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-red-600 flex-shrink-0"
                    />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-100 p-10 md:p-12">
              <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center">
                <Globe2 size={30} className="text-white" />
              </div>

              <h3 className="mt-7 text-2xl font-bold text-slate-900">
                Banking without borders
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Manage international financial activities with banking
                services designed to provide convenient access to global
                payment and currency solutions.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-7 font-semibold text-red-600 hover:gap-3 transition-all"
              >
                Speak with us
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="uppercase tracking-[5px] text-red-600 text-sm font-semibold">
              International Services
            </p>

            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
              Global banking
              <br />
              made convenient
            </h2>

            <p className="mt-5 text-lg text-gray-600 leading-8">
              Explore services designed to support your international financial
              activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="bg-white border border-gray-200 rounded-2xl p-7 hover:-translate-y-1 hover:border-red-600 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center">
                    <Icon size={28} className="text-red-600" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <div className="w-12 h-1 bg-red-600 rounded-full mt-3" />

                  <p className="mt-5 text-gray-600 leading-7">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-red-600 px-8 py-14 md:px-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Take your banking global
            </h2>

            <p className="mt-4 text-red-100 text-lg leading-7 max-w-2xl mx-auto">
              Explore international banking solutions designed to support your
              cross-border financial needs.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 rounded-xl bg-white px-7 py-4 font-semibold text-red-600 transition hover:bg-slate-100"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}