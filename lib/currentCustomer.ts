import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function getCurrentCustomer() {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const payload = await verifyToken(token);

    const customer = await prisma.customer.findUnique({
      where: {
        id: payload.customerId as string,
      },
      include: {
        application: true,
        transactions: {
  orderBy: {
    transactionDate: "desc",
  },
},
      },
    });

    if (!customer) {
      redirect("/login");
    }

    return customer;
  } catch (error) {
    console.error("Authentication Error:", error);

    redirect("/login");
  }
}