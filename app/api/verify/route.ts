import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { verifyToken, createToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();

    const loginToken = request.headers
      .get("cookie")
      ?.split("; ")
      .find((cookie) => cookie.startsWith("login_token="))
      ?.split("=")[1];

    if (!loginToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Session expired.",
        },
        { status: 401 }
      );
    }

    const payload = await verifyToken(loginToken);

    const customer = await prisma.customer.findUnique({
      where: {
        id: payload.customerId as string,
      },
      include: {
        application: true,
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found.",
        },
        { status: 404 }
      );
    }

    const validPin = await bcrypt.compare(
      pin,
      customer.application.pin
    );

    if (!validPin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid PIN.",
        },
        { status: 401 }
      );
    }

    const authToken = await createToken({
      customerId: customer.id,
      authenticated: true,
    });

    const response = NextResponse.json({
      success: true,
      message: "Verification successful.",
    });

    response.cookies.set("auth_token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    response.cookies.delete("login_token");

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Verification failed.",
      },
      { status: 500 }
    );
  }
}
