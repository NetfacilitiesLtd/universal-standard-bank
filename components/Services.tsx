import Link from "next/link";
import {
  Landmark,
  BriefcaseBusiness,
  CreditCard,
  Globe2,
  ArrowRight,
  Check,
} from "lucide-react";

const services = [
  {
    title: "Personal Banking",
    icon: Landmark,
    href: "/personal-banking",
    description:
      "Flexible banking solutions designed to help you manage your everyday finances with confidence.",
    items: [
      "Savings Accounts",
      "Current Accounts",
      "Personal Loans",
      "Mobile Banking",
    ],
  },
  {
    title: "Business Banking",
    icon: BriefcaseBusiness,
    href: "/business-banking",
    description:
      "Reliable financial solutions to help businesses manage operations, growth and payments.",
    items: [
      "Business Accounts",
      "Payroll Solutions",
      "Trade Finance",
      "Merchant Services",
    ],
  },
  {
    title: "Cards & Payments",
    icon: CreditCard,
    href: "/cards",
    description:
      "Convenient and secure payment solutions for your everyday purchases and transactions.",
    items: [
      "Debit Cards",
      "Credit Cards",
      "Online Payments",
      "Contactless Banking",
    ],
  },
  {
    title: "International Banking",
    icon: Globe2,
    href: "/international",
    description:
      "Banking solutions designed for international transfers, currencies and cross-border needs.",
    items: [
      "Global Transfers",
      "Foreign Exchange",
      "Multi-Currency",
      "International Support",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="uppercase tracking-[5px] text-red-600 text-sm font-semibold">
            Our Banking Solutions
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            Banking Products
            <br />
            <span className="text-red-600">For Every Need</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Discover secure and reliable banking solutions designed to support
            your everyday finances, business growth and international banking
            needs.
          </p>

        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-xl"
              >

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center transition-all duration-300 group-hover:bg-red-600">
                  <Icon
                    size={28}
                    strokeWidth={1.8}
                    className="text-red-600 transition-colors duration-300 group-hover:text-white"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {service.title}
                </h3>

                {/* Red Accent */}
                <div className="w-12 h-1 bg-red-600 rounded-full mt-3" />

                {/* Description */}
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>

                {/* Services List */}
                <ul className="mt-5 space-y-3">

                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-600"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                        <Check
                          size={13}
                          strokeWidth={2.5}
                          className="text-red-600"
                        />
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}

                </ul>

                {/* Learn More */}
                <div className="mt-auto pt-7">

                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 font-semibold text-red-600 transition-all duration-300 group-hover:gap-3"
                  >
                    Learn More
                    <ArrowRight size={18} />
                  </Link>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}