import { prisma } from "@/lib/prisma";
import { getCurrentCustomer } from "@/lib/currentCustomer";
import { KeyRound, Lock } from "lucide-react";
import DeleteNotificationButton from "@/components/customer/DeleteNotificationButton";

export default async function NotificationsPage() {
  const customer = await getCurrentCustomer();

  const notifications = await prisma.notification.findMany({
    where: {
      customerId: customer.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  await prisma.notification.updateMany({
    where: {
      customerId: customer.id,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">
        Notifications
      </h1>

      <p className="text-slate-500">
        View your recent account notifications.
      </p>

      <div className="mt-8">
        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              No notifications yet
            </h2>

            <p className="mt-2 text-slate-500">
              We'll notify you here whenever there's activity on your account.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {notification.title === "Password Changed" ? (
                      <Lock className="h-5 w-5 shrink-0 text-red-600" />
                    ) : notification.title === "PIN Changed" ? (
                      <KeyRound className="h-5 w-5 shrink-0 text-red-600" />
                    ) : null}

                    <h2 className="text-lg font-semibold text-slate-900">
                      {notification.title}
                    </h2>
                  </div>

                  <DeleteNotificationButton
                    notificationId={notification.id}
                  />
                </div>

                <p className="mt-2 text-slate-600">
                  {notification.message}
                </p>

                <p className="mt-3 text-sm text-slate-400">
                  {notification.createdAt.toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}