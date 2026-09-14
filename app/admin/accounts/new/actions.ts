"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function generateAccountNumber() {
  while (true) {
    // Generate a random 12-digit account number starting with 210
    const randomDigits = Math.floor(
      100000000 + Math.random() * 900000000
    );

    const accountNumber = `210${randomDigits}`;

    const existingCustomer = await prisma.customer.findUnique({
      where: {
        accountNumber,
      },
    });

    if (!existingCustomer) {
      return accountNumber;
    }
  }
}

export async function createAccount(formData: FormData) {
  const customerId = formData.get("customerId")?.toString();
  const accountNumberInput = formData
    .get("accountNumber")
    ?.toString()
    .trim();
  const accountType = formData.get("accountType")?.toString();
  const currency = formData.get("currency")?.toString();
  const initialBalanceInput = formData
    .get("initialBalance")
    ?.toString()
    .trim();

  if (!customerId) {
    throw new Error("Please select a customer.");
  }

  if (!accountType) {
    throw new Error("Please select an account type.");
  }

  if (!currency) {
    throw new Error("Please select a currency.");
  }

  const initialBalance = initialBalanceInput
    ? Number(initialBalanceInput)
    : 0;

  if (Number.isNaN(initialBalance) || initialBalance < 0) {
    throw new Error("Invalid initial balance.");
  }

  let accountNumber: string;

  if (accountNumberInput) {
    // Manual account number must be exactly 12 digits
    if (!/^\d{12}$/.test(accountNumberInput)) {
      throw new Error(
        "Account number must contain exactly 12 digits."
      );
    }

    // Check if another customer already has this account number
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        accountNumber: accountNumberInput,
      },
    });

    if (
      existingCustomer &&
      existingCustomer.id !== customerId
    ) {
      throw new Error(
        "This account number is already assigned to another customer."
      );
    }

    accountNumber = accountNumberInput;
  } else {
    // Automatically generate a unique 12-digit number
    accountNumber = await generateAccountNumber();
  }

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    throw new Error("Customer not found.");
  }

  await prisma.$transaction(async (tx) => {
    await tx.application.update({
      where: {
        id: customer.applicationId,
      },
      data: {
        accountType,
        preferredCurrency: currency,
      },
    });

    await tx.customer.update({
      where: {
        id: customerId,
      },
      data: {
        accountNumber,
        balance: initialBalance,
        accountStatus: "Active",
      },
    });
  });

  revalidatePath("/admin/accounts");
  revalidatePath("/admin/accounts/new");
  revalidatePath(`/admin/accounts/${customerId}`);
  revalidatePath("/admin/customers");

  redirect("/admin/accounts");
}