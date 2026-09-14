"use server";

import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";
import { redirect } from "next/navigation";

export async function updateCustomer(formData: FormData) {
  const customerId = formData.get("customerId") as string;

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
    include: {
      application: true,
    },
  });

  if (!customer) {
    throw new Error("Customer not found.");
  }

  await prisma.application.update({
    where: {
      id: customer.application.id,
    },
    data: {
      firstName: formData.get("firstName") as string,
      middleName: (formData.get("middleName") as string) || null,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      occupation: formData.get("occupation") as string,
      employer: (formData.get("employer") as string) || null,
      residentialAddress: formData.get("residentialAddress") as string,
      country: formData.get("country") as string,
      state: formData.get("state") as string,
      city: formData.get("city") as string,
      postalCode: formData.get("postalCode") as string,
      preferredCurrency: formData.get("preferredCurrency") as string,
    },
  });

  await prisma.customer.update({
    where: {
      id: customerId,
    },
    data: {
      accountStatus: formData.get("accountStatus") as string,
    },
  });

  redirect(`/admin/customers/${customerId}`);
}

export async function depositMoney(formData: FormData) {
  const customerId = formData.get("customerId") as string;

  const amount = Number(formData.get("amount"));

  const description =
    (formData.get("description") as string) || "Cash Deposit";

  if (!customerId) {
    throw new Error("Customer not found.");
  }

  if (isNaN(amount) || amount <= 0) {
    throw new Error("Invalid deposit amount.");
  }

  const customer = await prisma.customer.findUnique({
  where: {
    id: customerId,
  },
  include: {
    application: true,
  },
});

  if (!customer) {
    throw new Error("Customer not found.");
  }

  await prisma.$transaction([
    prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    }),

    prisma.transaction.create({
  data: {
    customerId,
    reference: `TXN-${Date.now()}`,
    type: "Deposit",
    amount,
    currency: customer.application.preferredCurrency,
    status: "Completed",
    description,
  },
}),
]);
await createNotification({
  customerId,
  title: "Deposit Received",
  message: `${customer.application.preferredCurrency} ${amount.toLocaleString()} has been credited to your account.`,
});
  redirect(`/admin/customers/${customerId}`);
}

export async function withdrawMoney(formData: FormData) {
  const customerId = formData.get("customerId") as string;

  const amount = Number(formData.get("amount"));

  const description =
    (formData.get("description") as string) || "Cash Withdrawal";

  if (!customerId) {
    throw new Error("Customer not found.");
  }

  if (isNaN(amount) || amount <= 0) {
    throw new Error("Invalid withdrawal amount.");
  }

  const customer = await prisma.customer.findUnique({
  where: {
    id: customerId,
  },
  include: {
    application: true,
  },
});

  if (!customer) {
    throw new Error("Customer not found.");
  }

  if (customer.balance < amount) {
    throw new Error("Insufficient account balance.");
  }

  await prisma.$transaction([
    prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    }),

    prisma.transaction.create({
  data: {
    customerId,
    reference: `TXN-${Date.now()}`,
    type: "Withdrawal",
    amount,
    currency: customer.application.preferredCurrency,
    status: "Completed",
    description,
  },
}),
]);
await createNotification({
  customerId,
  title: "Withdrawal Successful",
  message: `${customer.application.preferredCurrency} ${amount.toLocaleString()} has been debited from your account.`,
});
  redirect(`/admin/customers/${customerId}`);
}

export async function updateAccountStatus(formData: FormData) {
  const customerId = formData.get("customerId") as string;
  const accountStatus = formData.get("accountStatus") as string;

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    throw new Error("Customer not found.");
  }

  await prisma.customer.update({
    where: {
      id: customerId,
    },
    data: {
      accountStatus,
    },
  });

  redirect(`/admin/accounts/${customerId}`);
}
export async function generateTransferCode(formData: FormData) {
  const transferId = formData.get("transferId") as string;

  const randomNumber = Math.floor(100000 + Math.random() * 900000);

const code = `INT-${new Date().getFullYear()}-${randomNumber}`;

  await prisma.internationalTransfer.update({
    where: {
      id: transferId,
    },
    data: {
      transferCode: code,
    },
  });

  redirect(`/admin/international-transfers/${transferId}`);
}
export async function updateTransferStatus(formData: FormData) {
  const transferId = formData.get("transferId") as string;
  const status = formData.get("status") as string;

  await prisma.internationalTransfer.update({
    where: {
      id: transferId,
    },
    data: {
      status,
    },
  });

  redirect(`/admin/international-transfers/${transferId}`);
}
export async function verifyTransferCode(formData: FormData) {
  const transferId = formData.get("transferId") as string;
  const code = formData.get("code") as string;

  const transfer = await prisma.internationalTransfer.findUnique({
    where: {
      id: transferId,
    },
  });

  if (!transfer) {
    throw new Error("Transfer not found.");
  }

  if (transfer.transferCode !== code) {
    redirect(`/dashboard/transfers/${transferId}?error=invalid-code`);
  }

  await prisma.internationalTransfer.update({
    where: {
      id: transferId,
    },
    data: {
      status: "Processing",
    },
  });

  redirect(`/dashboard/transfers/${transferId}?success=true`);
}