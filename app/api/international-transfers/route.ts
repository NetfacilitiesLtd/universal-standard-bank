import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentCustomer } from "@/lib/currentCustomer";

export async function POST(request: Request) {
  try {
    const customer = await getCurrentCustomer();

    const body = await request.json();

    const transfer = await prisma.internationalTransfer.create({
      data: {
        customerId: customer.id,

        recipientName: body.recipientName,
        recipientAddress: body.recipientAddress,

        bankName: body.bankName,
        bankAddress: body.bankAddress,

        country: body.country,

        swiftCode: body.swiftCode,

        accountNumber: body.accountNumber,

        currency: body.currency,

        amount: Number(body.amount),

        purpose: body.purpose,

        description: body.description || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Transfer request submitted successfully.",
      transferId: transfer.id,
    });
  } catch (error) {
    console.error("International Transfer Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit transfer.",
      },
      {
        status: 500,
      }
    );
  }
}