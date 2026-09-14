export const dynamic = "force-dynamic";
import {
  Users,
  Landmark,
  DollarSign,
  ArrowLeftRight,
  UserPlus,
  CreditCard,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import ApplicationsTable from "@/components/admin/ApplicationsTable";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminDashboard() {
  const [
    totalApplications,
    pendingApplications,
    approvedApplications,
    rejectedApplications,
    applications,
  ] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({
      where: {
        status: "Pending",
      },
    }),
    prisma.application.count({
      where: {
        status: "Approved",
      },
    }),
    prisma.application.count({
      where: {
        status: "Rejected",
      },
    }),
    prisma.application.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        accountType: true,
        preferredCurrency: true,
        status: true,
      },
    }),
  ]);

  const stats = [
    {
      title: "Applications",
      value: totalApplications.toString(),
      icon: Users,
    },
    {
      title: "Pending",
      value: pendingApplications.toString(),
      icon: Landmark,
    },
    {
      title: "Approved",
      value: approvedApplications.toString(),
      icon: DollarSign,
    },
    {
      title: "Rejected",
      value: rejectedApplications.toString(),
      icon: ArrowLeftRight,
    },
  ];

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Bank Operations Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor customers, applications and bank performance.
          </p>
        </div>

        <LogoutButton />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500 text-sm">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {stat.value}
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                  <Icon
                    size={28}
                    className="text-red-600"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-5">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <button className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition text-left">
            <UserPlus className="text-red-600 mb-4" size={30} />

            <h3 className="font-semibold text-lg">
              Add Customer
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Register a new customer profile.
            </p>
          </button>

          <button className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition text-left">
            <Landmark className="text-red-600 mb-4" size={30} />

            <h3 className="font-semibold text-lg">
              Open Account
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Create a new bank account.
            </p>
          </button>

          <button className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition text-left">
            <ArrowLeftRight className="text-red-600 mb-4" size={30} />

            <h3 className="font-semibold text-lg">
              View Transactions
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Review customer activity.
            </p>
          </button>

          <button className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition text-left">
            <CreditCard className="text-red-600 mb-4" size={30} />

            <h3 className="font-semibold text-lg">
              Issue Card
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Assign a debit or credit card.
            </p>
          </button>

        </div>
      </div>

      <ApplicationsTable applications={applications} />

    </div>
  );
}