import { prisma } from "@/lib/prisma";
import { getCurrentCustomer } from "@/lib/currentCustomer";
import NotificationsClient from "@/components/dashboard/NotificationsClient";

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
    <NotificationsClient
      notifications={notifications.map((notification) => ({
        id: notification.id,
        title: notification.title,
        message: notification.message,
        createdAt: notification.createdAt,
      }))}
    />
  );
}