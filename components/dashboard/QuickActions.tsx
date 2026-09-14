import Link from "next/link";
import {
  ArrowLeftRight,
  FileText,
} from "lucide-react";

type QuickActionsProps = {
  customer: unknown;
};

const actions = [
  {
    title: "Transfer Money",
    description: "Send funds securely",
    href: "/dashboard/transfers",
    icon: ArrowLeftRight,
    color: "bg-red-600",
  },
 {
  title: "Statements",
  description: "Download statements",
  href: "/api/statement",
  icon: FileText,
  color: "bg-amber-500",
},
];

export default function QuickActions({
  customer,
}: QuickActionsProps) {
  return (
    <section className="px-10 mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="text-slate-500">
          Frequently used banking services
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center`}
              >
                <Icon size={28} className="text-white" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {action.title}
              </h3>

              <p className="mt-2 text-slate-500">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}