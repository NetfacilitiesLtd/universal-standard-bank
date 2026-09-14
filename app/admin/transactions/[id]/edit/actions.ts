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

  await prisma.transaction.update({
    where: {
      id,
    },
    data: {
      reference,
      status,
      amount,
      description,
      transactionDate: new Date(transactionDate),
    },
  });

  revalidatePath("/admin/transactions");
  revalidatePath(`/admin/transactions/${id}`);

  redirect(`/admin/transactions/${id}`);
}