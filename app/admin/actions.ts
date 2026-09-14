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

    // Check if the account number already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        accountNumber,
      },
    });

    // If it's unique, return it
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
      return;
    }

    if (application.status === "Approved") {
      console.log("Application is already approved.");
      redirect("/admin");
    }

    const accountNumber = await generateAccountNumber();

    await prisma.$transaction(async (tx: any) => {
      await tx.application.update({
        where: {
          id: applicationId,
        },
        data: {
          status: "Approved",
        },
      });

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

  redirect("/admin");
}