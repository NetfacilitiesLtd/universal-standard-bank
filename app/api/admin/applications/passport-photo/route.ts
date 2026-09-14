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
    const applicationId = searchParams.get("applicationId");

    if (!applicationId) {
      return new NextResponse("Application ID is required", {
        status: 400,
      });
    }

    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },
    });

    if (!application?.passportPhoto) {
      return new NextResponse("Passport photo not found", {
        status: 404,
      });
    }

    const passportPhoto = application.passportPhoto;

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
        "Content-Type": result.blob.contentType || "image/jpeg",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Admin passport photo error:", error);

    return new NextResponse("Unable to load passport photo", {
      status: 500,
    });
  }
}