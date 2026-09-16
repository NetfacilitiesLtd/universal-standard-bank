"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateTransaction(formData: FormData) {
  const id = formData.get("id") as string;

  const reference = formData.get("reference") as string;
  const status = formData.get("status") as string;
  const amount = Number(formData.get("amount"));
  const description = formData.get("description") as string;

  const transactionDate = formData.get("transactionDate") as string;
  const transactionTime = formData.get("transactionTime") as string;

  if (!transactionDate || !transactionTime) {
    throw new Error("Transaction date and time are required.");
  }

  const combinedTransactionDate = new Date(
    `${transactionDate}T${transactionTime}:00`
  );

  if (isNaN(combinedTransactionDate.getTime())) {
    throw new Error("Invalid transaction date or time.");
  }

  await prisma.transaction.update({
    where: {
      id,
    },
    data: {
      reference,
      status,
      amount,
      description,
      transactionDate: combinedTransactionDate,
    },
  });

  revalidatePath("/admin/transactions");
  revalidatePath(`/admin/transactions/${id}`);
  revalidatePath("/dashboard/accounts");
  revalidatePath("/dashboard/transactions");

  redirect(`/admin/transactions/${id}`);
}