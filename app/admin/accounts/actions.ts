"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCustomer(customerId: string) {
  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    throw new Error("Customer not found.");
  }

  await prisma.internationalTransfer.deleteMany({
    where: {
      customerId,
    },
  });

  await prisma.transaction.deleteMany({
    where: {
      customerId,
    },
  });

  await prisma.customer.delete({
    where: {
      id: customerId,
    },
  });

  await prisma.application.delete({
    where: {
      id: customer.applicationId,
    },
  });

  revalidatePath("/admin/customers");
  revalidatePath("/admin/accounts");
  revalidatePath("/admin/applications");
}