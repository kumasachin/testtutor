import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createSystemUser() {
  console.log("Creating system user...");

  try {
    // Check if system user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "system@examkit.com" },
    });

    if (existingUser) {
      console.log("System user already exists:", existingUser.id);
      return existingUser.id;
    }

    // Create system user
    const systemUser = await prisma.user.create({
      data: {
        email: "system@examkit.com",
        name: "System",
        password: "system-password-placeholder",
        role: "SUPER_ADMIN",
      },
    });

    console.log("System user created:", systemUser.id);
    return systemUser.id;
  } catch (error) {
    console.error("Error creating system user:", error);
    throw error;
  }
}

async function main() {
  const userId = await createSystemUser();
  console.log("System user ID:", userId);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("Failed:", error);
  process.exit(1);
});
