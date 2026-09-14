"use server";
import { createNotification } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";
import { getCurrentCustomer } from "@/lib/currentCustomer";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function updatePassword(formData: FormData) {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error("Please fill in all password fields.");
  }

  if (newPassword !== confirmPassword) {
  redirect("/dashboard/settings?error=password-mismatch");
}

  const customer = await getCurrentCustomer();

  const application = await prisma.application.findUnique({
    where: {
      id: customer.applicationId,
    },
  });

  if (!application) {
    throw new Error("Customer not found.");
  }

  const passwordMatches = await bcrypt.compare(
    currentPassword,
    application.password
  );

  if (!passwordMatches) {
  redirect("/dashboard/settings?error=wrong-password");
}

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.application.update({
    where: {
      id: application.id,
    },
    data: {
      password: hashedPassword,
    },
  });
await createNotification({
  customerId: customer.id,
  title: "Password Changed",
  message:
    "Your online banking password was changed successfully.",
});
  redirect("/dashboard/settings?success=password");
}

export async function updatePin(formData: FormData) {
  const currentPin = formData.get("currentPin") as string;
  const newPin = formData.get("newPin") as string;
  const confirmPin = formData.get("confirmPin") as string;

  if (!currentPin || !newPin || !confirmPin) {
    throw new Error("Please fill in all PIN fields.");
  }

  if (newPin !== confirmPin) {
  redirect("/dashboard/settings?error=pin-mismatch");
}

  if (!/^\d{6}$/.test(newPin)) {
  redirect("/dashboard/settings?error=invalid-pin");
}

  const customer = await getCurrentCustomer();

  const application = await prisma.application.findUnique({
    where: {
      id: customer.applicationId,
    },
  });

  if (!application) {
    throw new Error("Customer not found.");
  }

  const pinMatches = await bcrypt.compare(
    currentPin,
    application.pin
  );

  if (!pinMatches) {
  redirect("/dashboard/settings?error=wrong-pin");
}

  const hashedPin = await bcrypt.hash(newPin, 10);

  await prisma.application.update({
    where: {
      id: application.id,
    },
    data: {
      pin: hashedPin,
    },
  });
await createNotification({
  customerId: customer.id,
  title: "PIN Changed",
  message:
    "Your transaction PIN was changed successfully.",
});
  redirect("/dashboard/settings?success=pin");
}