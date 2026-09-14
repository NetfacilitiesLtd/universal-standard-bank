import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token")?.value;

    if (!adminToken) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const payload = await verifyToken(adminToken);

    if (!payload.adminId || payload.type !== "admin") {
      return new NextResponse("Forbidden", {
        status: 403,
      });
    }

    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");

    if (!customerId) {
      return new NextResponse("Customer ID is required", {
        status: 400,
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

    if (!customer?.application?.governmentId) {
      return new NextResponse("Government ID not found", {
        status: 404,
      });
    }

    const governmentId = customer.application.governmentId;

const pathname = (
  governmentId.startsWith("http")
    ? new URL(governmentId).pathname
    : governmentId
).replace(/^\/+/, "");

const result = await get(pathname, {
  access: "private",
  token: process.env.BLOB_READ_WRITE_TOKEN,
});

    if (!result || result.statusCode !== 200) {
      return new NextResponse("Government ID not found", {
        status: 404,
      });
    }

    return new NextResponse(result.stream, {
      status: 200,
      headers: {
        "Content-Type":
          result.blob.contentType || "application/octet-stream",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Admin government ID error:", error);

    return new NextResponse("Unable to load government ID", {
      status: 500,
    });
  }
}