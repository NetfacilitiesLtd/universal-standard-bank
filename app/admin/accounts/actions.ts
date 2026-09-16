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

  await prisma.$transaction(async (tx) => {
    // Delete notifications belonging to the customer
    await tx.notification.deleteMany({
      where: {
        customerId,
      },
    });

    // Delete international transfers belonging to the customer
    await tx.internationalTransfer.deleteMany({
      where: {
        customerId,
      },
    });

    // Delete transactions belonging to the customer
    await tx.transaction.deleteMany({
      where: {
        customerId,
      },
    });

    // Delete the customer account
    await tx.customer.delete({
      where: {
        id: customerId,
      },
    });

    // Delete the related application
    await tx.application.delete({
      where: {
        id: customer.applicationId,
      },
    });
  });

  revalidatePath("/admin/customers");
  revalidatePath("/admin/accounts");
  revalidatePath("/admin/applications");
}