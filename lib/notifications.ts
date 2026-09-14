import { prisma } from "@/lib/prisma";

type NotificationData = {
  customerId: string;
  title: string;
  message: string;
};

export async function createNotification({
  customerId,
  title,
  message,
}: NotificationData) {
  await prisma.notification.create({
    data: {
      customerId,
      title,
      message,
    },
  });
}