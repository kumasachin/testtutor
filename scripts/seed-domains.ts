import { prisma } from "../src/lib/prisma";

async function seedDomains() {
  console.log("Seeding domains...");

  // Life in UK domain
  const lifeInUkDomain = await prisma.domain.upsert({
    where: { name: "life-in-uk" },
    update: {},
    create: {
      name: "life-in-uk",
      displayName: "Life in the UK",
      description:
        "Official Life in the UK test preparation for British citizenship",
      config: {
        passingScore: 75,
        questionLimit: 24,
        timeLimit: 45,
      },
      isActive: true,
    },
  });

  // Driving Theory domain
  const drivingTheoryDomain = await prisma.domain.upsert({
    where: { name: "driving-theory" },
    update: {},
    create: {
      name: "driving-theory",
      displayName: "Driving Theory Test",
      description:
        "UK driving theory test preparation for cars and motorcycles",
      config: {
        passingScore: 86,
        questionLimit: 50,
        timeLimit: 57,
      },
      isActive: true,
    },
  });

  console.log("Domains seeded successfully:", {
    lifeInUk: lifeInUkDomain.id,
    drivingTheory: drivingTheoryDomain.id,
  });

  return { lifeInUkDomain, drivingTheoryDomain };
}

export default seedDomains;

// Run directly if this file is executed
if (require.main === module) {
  seedDomains()
    .then(() => {
      console.log("Seeding completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
