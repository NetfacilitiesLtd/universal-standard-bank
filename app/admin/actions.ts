"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomInt } from "crypto";

async function generateAccountNumber() {
  while (true) {
    // Generate 9 random digits after the 210 prefix
    const randomDigits = randomInt(0, 1_000_000_000)
      .toString()
      .padStart(9, "0");

    // Final account number is exactly 12 digits
    const accountNumber = `210${randomDigits}`;

    // Check if the account number already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        accountNumber,
      },
    });

    // Only use the number if it is unique
    if (!existingCustomer) {
      return accountNumber;
    }
  }
}

export async function approveApplication(applicationId: string) {
  try {
    console.log("Approving application:", applicationId);

    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },
    });

    if (!application) {
      console.error("Application not found.");
      redirect("/admin");
    }

    if (application.status === "Approved") {
      console.log("Application is already approved.");
      redirect("/admin");
    }

    // Automatically generate a unique 12-digit account number
    const accountNumber = await generateAccountNumber();

    await prisma.$transaction(async (tx) => {
      // Approve the application
      await tx.application.update({
        where: {
          id: applicationId,
        },
        data: {
          status: "Approved",
        },
      });

      // Create the customer account
      await tx.customer.create({
        data: {
          applicationId: application.id,
          accountNumber,
          balance: 0,
          accountStatus: "Active",
        },
      });
    });

    console.log("Application approved successfully.");
    console.log("Customer account created:", accountNumber);

    revalidatePath("/admin");
    revalidatePath(`/admin/applications/${applicationId}`);
    revalidatePath("/admin/customers");
  } catch (error) {
    console.error("Approval failed:", error);
  }

  redirect("/admin");
}

export async function rejectApplication(applicationId: string) {
  try {
    console.log("Rejecting application:", applicationId);

    await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        status: "Rejected",
      },
    });

    console.log("Application rejected successfully.");

    revalidatePath("/admin");
    revalidatePath(`/admin/applications/${applicationId}`);
  } catch (error) {
    console.error("Rejection failed:", error);
  }

  redirect("/admin");
}