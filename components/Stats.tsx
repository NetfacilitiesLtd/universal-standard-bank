import {
  Users,
  Globe,
  Building2,
  ShieldCheck,
} from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: Users,
      number: "50K+",
      title: "Happy Customers",
    },
    {
      icon: Globe,
      number: "25+",
      title: "Countries Served",
    },
    {
      icon: Building2,
      number: "120+",
      title: "Business Partners",
    },
    {
      icon: ShieldCheck,
      number: "24/7",
      title: "Digital Banking",
    },
  ];

  return (
    <section className="relative -mt-36 z-30 px-4">
      <div className="max-w-[95%] mx-auto">

        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden">

          <div className="grid grid-cols-2 lg:grid-cols-4">

            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-5 px-8 py-8 ${
                    index !== stats.length - 1
                      ? "lg:border-r border-gray-200"
                      : ""
                  }`}
                >
                  <Icon
                    size={34}
                    className="text-red-600 flex-shrink-0"
                  />

                  <div>
                    <h2 className="text-4xl font-bold text-slate-900 leading-none">
                      {stat.number}
                    </h2>

                    <p className="mt-2 text-gray-600 font-medium">
                      {stat.title}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}