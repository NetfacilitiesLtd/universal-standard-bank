import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentCustomer } from "@/lib/currentCustomer";

export async function DELETE(request: Request) {
  try {
    const customer = await getCurrentCustomer();

    const { notificationId } = await request.json();

    if (!notificationId) {
      return NextResponse.json(
        { error: "Notification ID is required" },
        { status: 400 }
      );
    }

    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        customerId: customer.id,
      },
    });

    if (!notification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    await prisma.notification.delete({
      where: {
        id: notification.id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Delete notification error:", error);

    return NextResponse.json(
      { error: "Unable to delete notification" },
      { status: 500 }
    );
  }
}