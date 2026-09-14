"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentCustomer } from "@/lib/auth";

export async function verifyRecipient(accountNumber: string) {
  const customer = await prisma.customer.findUnique({
    where: {
      accountNumber,
    },
    include: {
      application: true,
    },
  });

  if (!customer) {
    return {
      success: false,
      message: "Account number not found.",
    };
  }

  if (customer.accountStatus !== "Active") {
    return {
      success: false,
      message: "This account is not active.",
    };
  }

  return {
    success: true,
    customer: {
      id: customer.id,
      accountNumber: customer.accountNumber,
      fullName: `${customer.application.firstName} ${customer.application.lastName}`,
    },
  };
}

export async function transferMoney(
  recipientAccountNumber: string,
  amount: number,
  description: string
) {
  const sender = await getCurrentCustomer();

  if (!sender) {
    return {
      success: false,
      message: "You must be logged in.",
    };
  }

  const senderAccount = await prisma.customer.findUnique({
  where: {
    id: sender.id,
  },
  include: {
    application: true,
  },
});

  if (!senderAccount) {
    return {
      success: false,
      message: "Sender account not found.",
    };
  }

  if (senderAccount.accountStatus !== "Active") {
    return {
      success: false,
      message: "Your account is not active.",
    };
  }

  const recipient = await prisma.customer.findUnique({
  where: {
    accountNumber: recipientAccountNumber,
  },
  include: {
    application: true,
  },
});

if (!recipient) {
  return {
    success: false,
    message: "Recipient account not found.",
  };
}

if (recipient.accountStatus !== "Active") {
  return {
    success: false,
    message: "Recipient account is not active.",
  };
}
if (senderAccount.id === recipient.id) {
  return {
    success: false,
    message: "You cannot transfer money to your own account.",
  };
}

if (amount <= 0) {
  return {
    success: false,
    message: "Please enter a valid transfer amount.",
  };
}

if (senderAccount.balance < amount) {
  return {
    success: false,
    message: "Insufficient balance.",
  };
}
await prisma.$transaction(async (tx) => {
  await tx.customer.update({
    where: {
      id: senderAccount.id,
    },
    data: {
      balance: {
        decrement: amount,
      },
    },
  });

  await tx.customer.update({
    where: {
      id: recipient.id,
    },
    data: {
      balance: {
        increment: amount,
      },
    },
  });

  await tx.transaction.create({
    data: {
      customerId: senderAccount.id,
      reference: `IT-${Date.now()}-OUT`,
      type: "Transfer Out",
      amount,
      currency: senderAccount.application.preferredCurrency,
      status: "Completed",
      description:
        description ||
        `Transfer to ${recipient.application.firstName} ${recipient.application.lastName}`,
    },
 });
 await tx.transaction.create({
  data: {
    customerId: recipient.id,
    reference: `IT-${Date.now()}-IN`,
    type: "Transfer In",
    amount,
    currency: recipient.application.preferredCurrency,
    status: "Completed",
    description:
      description ||
      `Transfer from ${senderAccount.accountNumber}`,
  },
});
});

return {
  success: true,
  message: "Transfer completed successfully.",
};
}