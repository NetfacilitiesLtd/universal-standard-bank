import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentCustomer } from "@/lib/currentCustomer";

export async function POST(request: Request) {
  try {
    const customer = await getCurrentCustomer();

    const { transferCode } = await request.json();

    if (!transferCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Transfer code is required.",
        },
        {
          status: 400,
        }
      );
    }

    const transfer = await prisma.internationalTransfer.findFirst({
      where: {
        customerId: customer.id,
        status: "Pending Transfer Code",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
console.log("Transfer selected:", transfer);
console.log("Entered code:", transferCode);
    if (!transfer) {
      return NextResponse.json(
        {
          success: false,
          message: "No pending transfer was found.",
        },
        {
          status: 404,
        }
      );
    }

    if (transfer.transferCode !== transferCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid transfer code.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.internationalTransfer.update({
      where: {
        id: transfer.id,
      },
      data: {
        status: "Processing",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Transfer verified successfully.",
    });
  } catch (error) {
    console.error("Transfer Code Verification Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to verify transfer code.",
      },
      {
        status: 500,
      }
    );
  }
}