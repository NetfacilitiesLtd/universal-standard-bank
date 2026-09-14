import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { getCurrentCustomer } from "@/lib/currentCustomer";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // API requests should return JSON instead of redirecting to /login.
    if (!token) {
      return NextResponse.json(
        { unreadNotifications: 0 },
        { status: 401 }
      );
    }

    const customer = await getCurrentCustomer();

    const unreadNotifications = await prisma.notification.count({
      where: {
        customerId: customer.id,
        isRead: false,
      },
    });

    return NextResponse.json({
      unreadNotifications,
    });
  } catch (error) {
    console.error("Unread notifications error:", error);

    return NextResponse.json(
      { unreadNotifications: 0 },
      { status: 401 }
    );
  }
}