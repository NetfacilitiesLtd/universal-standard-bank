import Link from "next/link";
import {
  CreditCard,
  ShieldCheck,
  Smartphone,
  ShoppingCart,
  Globe2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Debit Cards",
    description:
      "Convenient payment cards for everyday purchases, withdrawals and access to your available funds.",
    icon: CreditCard,
  },
  {
    title: "Credit Cards",
    description:
      "Flexible card solutions designed to provide convenient access to credit for eligible customers.",
    icon: ShieldCheck,
  },
  {
    title: "Online Payments",
    description:
      "Make online purchases and payments conveniently through secure digital payment services.",
    icon: ShoppingCart,
  },
  {
    title: "Contactless Banking",
    description:
      "Enjoy convenient contactless payment options for eligible cards and supported payment terminals.",
    icon: Smartphone,
  },
];

const benefits = [
  "Convenient everyday payments",
  "Secure card transactions",
  "Online payment support",
  "International payment capability",
];

export default function CardsPage() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-36 pb-24">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="uppercase tracking-[5px] text-red-600 text-sm font-semibold">
              Cards & Payments
            </p>

            <h1 className="mt-5 text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Simple, Secure
              <br />
              Ways to Pay
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-8 max-w-2xl">
              Convenient card and payment solutions designed to help you make
              everyday purchases, manage payments and stay connected to your
              finances.
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
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-4 font-semibold text-white transition hover:bg-slate-800"
              >
                Online Banking
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
                Card & Payment Solutions
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Payment solutions
                <br />
                for everyday life
              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-8">
                From everyday purchases to online transactions, our card and
                payment solutions are designed to give you convenient ways to
                manage your spending and make payments.
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
                <CreditCard size={30} className="text-white" />
              </div>

              <h3 className="mt-7 text-2xl font-bold text-slate-900">
                Cards made convenient
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Use your eligible banking cards for everyday purchases and
                access convenient payment options designed for modern banking.
              </p>

              <Link
                href="/security"
                className="inline-flex items-center gap-2 mt-7 font-semibold text-red-600 hover:gap-3 transition-all"
              >
                Learn about security
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
              Cards & Payments
            </p>

            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
              Payment options
              <br />
              built for convenience
            </h2>

            <p className="mt-5 text-lg text-gray-600 leading-8">
              Explore convenient card and payment services designed for
              everyday financial needs.
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

      {/* Security */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="uppercase tracking-[4px] text-red-600 text-sm font-semibold">
                Secure Payments
              </p>

              <h2 className="mt-4 text-4xl font-bold text-slate-900">
                Designed with security in mind
              </h2>

              <p className="mt-5 text-lg text-gray-600 leading-8 max-w-3xl">
                Protecting your financial information is an important part of
                modern banking. Always keep your card details, passwords and
                PIN confidential and use secure channels when making payments.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900 p-8 text-white">
              <ShieldCheck size={34} />

              <h3 className="mt-5 text-xl font-bold">
                Protect your account
              </h3>

              <p className="mt-3 text-slate-300 leading-7">
                Learn more about security practices for protecting your online
                banking and payment information.
              </p>

              <Link
                href="/security"
                className="inline-flex items-center gap-2 mt-6 font-semibold text-white hover:gap-3 transition-all"
              >
                Security Center
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-red-600 px-8 py-14 md:px-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready for convenient banking?
            </h2>

            <p className="mt-4 text-red-100 text-lg leading-7 max-w-2xl mx-auto">
              Open an account and access convenient banking and payment
              solutions.
            </p>

            <Link
              href="/apply"
              className="inline-flex items-center gap-2 mt-8 rounded-xl bg-white px-7 py-4 font-semibold text-red-600 transition hover:bg-slate-100"
            >
              Open an Account
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}