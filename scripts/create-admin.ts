import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.admin.create({
    data: {
      fullName: "System Administrator",
      username: "admin",
      password: hashedPassword,
      role: "Administrator",
      status: "Active",
    },
  });

  console.log("Admin created successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });