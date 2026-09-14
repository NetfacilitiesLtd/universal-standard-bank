import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { accountNumber, password } = await request.json();

    const customer = await prisma.customer.findUnique({
      where: {
        accountNumber,
      },
      include: {
        application: true,
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid account number or password.",
        },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(
      password,
      customer.application.password
    );

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid account number or password.",
        },
        { status: 401 }
      );
    }

    const token = await createToken({
      customerId: customer.id,
      verified: false,
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    });

    response.cookies.set("login_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Login failed.",
      },
      { status: 500 }
    );
  }
}