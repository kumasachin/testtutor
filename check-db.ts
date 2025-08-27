import { prisma } from "./src/lib/prisma";

async function checkDatabase() {
  try {
    console.log("Checking database...");

    const domains = await prisma.domain.findMany();
    console.log("Domains found:", domains.length);
    domains.forEach((domain) => {
      console.log(`- ${domain.name}: ${domain.displayName}`);
    });

    const tests = await prisma.test.findMany({
      include: {
        domain: true,
        questions: true,
      },
    });
    console.log("\nTests found:", tests.length);
    tests.slice(0, 3).forEach((test) => {
      console.log(
        `- ${test.title} (Domain: ${test.domain.displayName}, Questions: ${test.questions.length})`
      );
    });

    const users = await prisma.user.findMany();
    console.log("\nUsers found:", users.length);
    users.forEach((user) => {
      console.log(`- ${user.email} (${user.role})`);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
