import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const payload = await verifyToken(token);

    const customerId = payload.customerId as string;

    if (!customerId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
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
      return new NextResponse("Customer not found", {
        status: 404,
      });
    }

    const passportPhoto = customer.application?.passportPhoto;

    if (!passportPhoto) {
      return new NextResponse("No passport photo", {
        status: 404,
      });
    }

    const pathname = (
  passportPhoto.startsWith("http")
    ? new URL(passportPhoto).pathname
    : passportPhoto
).replace(/^\/+/, "");

    const result = await get(pathname, {
  access: "private",
  token: process.env.BLOB_READ_WRITE_TOKEN,
});

    if (!result || result.statusCode !== 200) {
      return new NextResponse("Passport photo not found", {
        status: 404,
      });
    }

    return new NextResponse(result.stream, {
      status: 200,
      headers: {
        "Content-Type":
          result.blob.contentType || "image/jpeg",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Passport photo error:", error);

    return new NextResponse(
      "Unable to load passport photo",
      {
        status: 500,
      }
    );
  }
}