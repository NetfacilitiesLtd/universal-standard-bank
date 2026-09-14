"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function loginAdmin(
  username: string,
  password: string
) {
  const admin = await prisma.admin.findUnique({
    where: {
      username,
    },
  });

  if (!admin) {
    return {
      success: false,
      message: "Invalid username or password.",
    };
  }

  const validPassword = await bcrypt.compare(
    password,
    admin.password
  );

  if (!validPassword) {
    return {
      success: false,
      message: "Invalid username or password.",
    };
  }

  const token = await createToken({
    adminId: admin.id,
    type: "admin",
  });

  const cookieStore = await cookies();

  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return {
    success: true,
  };
}