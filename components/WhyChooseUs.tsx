import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Globe2,
  Clock3,
  Users,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
  },
  {
    icon: Globe2,
    title: "Trusted International Banking",
  },
  {
    icon: Clock3,
    title: "24/7 Digital Banking",
  },
  {
    icon: Users,
    title: "Dedicated Relationship Managers",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="about"
      className="bg-gray-50 py-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT SIDE */}
          <div>

            <p className="uppercase tracking-[5px] text-red-600 text-sm font-semibold">
              Why Choose Universal Standard Bank
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1]">
              Banking Built on
              <br />
              Trust, Security
              <br />
              <span className="text-red-600">& Innovation</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              We combine innovative digital banking, personalized financial
              expertise and world-class security to help individuals,
              families and businesses achieve their financial goals
              with confidence.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7 mt-10">

              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="flex items-center gap-4"
                  >

                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-red-100 shadow-sm flex items-center justify-center">
                      <Icon
                        size={22}
                        strokeWidth={1.8}
                        className="text-red-600"
                      />
                    </div>

                    <span className="font-semibold text-slate-800 leading-6">
                      {feature.title}
                    </span>

                  </div>
                );
              })}

            </div>

            {/* Button */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-11 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Learn More
              <ArrowRight size={18} />
            </Link>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative">

            {/* Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">

              <Image
                src="/images/banking-advisor.jpg"
                alt="Universal Standard Bank banking advisor"
                width={700}
                height={750}
                className="w-full h-[520px] lg:h-[600px] object-cover"
                priority
              />

              {/* Subtle image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />

            </div>

            {/* Experience Card */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white rounded-2xl shadow-xl px-7 py-5">

              <p className="text-4xl font-bold text-red-600 leading-none">
                25+
              </p>

              <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium">
                Years of Trusted Banking
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}