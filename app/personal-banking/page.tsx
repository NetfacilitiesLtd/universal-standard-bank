import Link from "next/link";
import Image from "next/image";
import {
  Landmark,
  PiggyBank,
  WalletCards,
  Smartphone,
  CreditCard,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Savings Accounts",
    description:
      "Build your savings with secure accounts designed to help you manage your money and plan for the future.",
    icon: PiggyBank,
  },
  {
    title: "Current Accounts",
    description:
      "Enjoy convenient everyday banking with access to the services you need to manage your finances.",
    icon: Landmark,
  },
  {
    title: "Personal Loans",
    description:
      "Access financing options designed to support personal goals, planned purchases and important expenses.",
    icon: WalletCards,
  },
  {
    title: "Mobile Banking",
    description:
      "Manage your banking securely and conveniently wherever you are using digital banking services.",
    icon: Smartphone,
  },
];

const benefits = [
  "Secure everyday banking",
  "Convenient digital access",
  "Flexible account options",
  "Personal financial support",
];

export default function PersonalBankingPage() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[760px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/personal-banking.png"
            alt="Personal banking customer using mobile banking"
            fill
            priority
            className="object-cover object-center"
          />

          {/* White gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/45 via-25% to-transparent" />

          {/* Soft lower fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-48 pb-28 min-h-[760px] flex items-center">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[5px] text-red-600 text-sm font-semibold">
              Personal Banking
            </p>

            <h1 className="mt-5 text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Banking Designed
              <br />
              Around <span className="text-red-600">You</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-8 max-w-2xl">
              Secure and convenient banking solutions to help you manage your
              everyday finances, save for the future and achieve your personal
              financial goals.
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
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-white/80 px-7 py-4 font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
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
                Your Financial Partner
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Banking that fits
                <br />
                your everyday life
              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-8">
                From managing your daily expenses to building long-term
                savings, our personal banking services are designed to give
                you convenient access to the financial tools you need.
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
                Simple, secure banking
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Access your accounts, monitor your finances and manage your
                banking needs through secure channels designed for
                convenience.
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
              Personal Banking Services
            </p>

            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
              Solutions for your
              <br />
              financial needs
            </h2>

            <p className="mt-5 text-lg text-gray-600 leading-8">
              Choose from a range of personal banking services created to make
              managing your finances easier.
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
              Ready to get started?
            </h2>

            <p className="mt-4 text-red-100 text-lg leading-7 max-w-2xl mx-auto">
              Open a personal account and experience convenient banking
              designed around your needs.
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