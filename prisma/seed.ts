import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lifeInUKTests = [
  {
    id: "life-uk-test-1",
    title: "Life in the UK Test - Practice 1",
    description:
      "Official practice test for UK citizenship covering British history, culture, and values",
    timeLimit: 45,
    passPercentage: 75,
    questions: [
      {
        stem: "What is the capital city of England?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "London has been the capital of England for over 1000 years.",
        order: 1,
        points: 1,
        options: [
          { label: "London", isCorrect: true, order: 1 },
          { label: "Manchester", isCorrect: false, order: 2 },
          { label: "Birmingham", isCorrect: false, order: 3 },
          { label: "Liverpool", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year did the UK join the European Economic Community (EEC)?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The UK joined the EEC in 1973 under Prime Minister Edward Heath.",
        order: 2,
        points: 1,
        options: [
          { label: "1971", isCorrect: false, order: 1 },
          { label: "1972", isCorrect: false, order: 2 },
          { label: "1973", isCorrect: true, order: 3 },
          { label: "1974", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the minimum age to serve on a jury in England and Wales?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The minimum age for jury service in England and Wales is 18 years old.",
        order: 3,
        points: 1,
        options: [
          { label: "16", isCorrect: false, order: 1 },
          { label: "17", isCorrect: false, order: 2 },
          { label: "18", isCorrect: true, order: 3 },
          { label: "21", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which of these is a British overseas territory?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Falkland Islands are a British overseas territory in the South Atlantic.",
        order: 4,
        points: 1,
        options: [
          { label: "Cyprus", isCorrect: false, order: 1 },
          { label: "Malta", isCorrect: false, order: 2 },
          { label: "Falkland Islands", isCorrect: true, order: 3 },
          { label: "Iceland", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What percentage of the UK population has a disability?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Around 20% of the UK population has some form of disability.",
        order: 5,
        points: 1,
        options: [
          { label: "10%", isCorrect: false, order: 1 },
          { label: "15%", isCorrect: false, order: 2 },
          { label: "20%", isCorrect: true, order: 3 },
          { label: "25%", isCorrect: false, order: 4 },
        ],
      },
    ],
  },
  {
    id: "life-uk-test-2",
    title: "Life in the UK Test - Practice 2",
    description:
      "Comprehensive practice test covering British traditions, government, and law",
    timeLimit: 45,
    passPercentage: 75,
    questions: [
      {
        stem: "Who was the first woman Prime Minister of the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Margaret Thatcher was the first woman Prime Minister, serving from 1979 to 1990.",
        order: 1,
        points: 1,
        options: [
          { label: "Margaret Thatcher", isCorrect: true, order: 1 },
          { label: "Theresa May", isCorrect: false, order: 2 },
          { label: "Elizabeth II", isCorrect: false, order: 3 },
          { label: "Liz Truss", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the approximate population of the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation: "The UK population is approximately 67 million people.",
        order: 2,
        points: 1,
        options: [
          { label: "55 million", isCorrect: false, order: 1 },
          { label: "60 million", isCorrect: false, order: 2 },
          { label: "67 million", isCorrect: true, order: 3 },
          { label: "75 million", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year did women get the right to vote on the same terms as men?",
        type: "SINGLE_CHOICE" as const,
        explanation: "Women gained equal voting rights with men in 1928.",
        order: 3,
        points: 1,
        options: [
          { label: "1918", isCorrect: false, order: 1 },
          { label: "1925", isCorrect: false, order: 2 },
          { label: "1928", isCorrect: true, order: 3 },
          { label: "1930", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the maximum amount of time you can be held by police without being charged?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Police can hold someone for up to 96 hours (4 days) without charge in most cases.",
        order: 4,
        points: 1,
        options: [
          { label: "24 hours", isCorrect: false, order: 1 },
          { label: "48 hours", isCorrect: false, order: 2 },
          { label: "72 hours", isCorrect: false, order: 3 },
          { label: "96 hours", isCorrect: true, order: 4 },
        ],
      },
      {
        stem: "Which flower is associated with England?",
        type: "SINGLE_CHOICE" as const,
        explanation: "The rose is the national flower of England.",
        order: 5,
        points: 1,
        options: [
          { label: "Rose", isCorrect: true, order: 1 },
          { label: "Thistle", isCorrect: false, order: 2 },
          { label: "Daffodil", isCorrect: false, order: 3 },
          { label: "Shamrock", isCorrect: false, order: 4 },
        ],
      },
    ],
  },
];

async function main() {
  try {
    console.log("🌱 Starting database seed...");

    // Create or find the Life in UK domain
    const lifeInUKDomain = await prisma.domain.upsert({
      where: { name: "life-in-uk" },
      update: {},
      create: {
        name: "life-in-uk",
        displayName: "Life in UK",
        description: "Official Life in the UK citizenship test preparation",
        icon: "🇬🇧",
        config: {
          categories: ["history", "culture", "government", "law"],
          difficulty: "medium",
          language: "en",
        },
        isActive: true,
      },
    });

    console.log(`✅ Created/found domain: ${lifeInUKDomain.displayName}`);

    // Create or find a default user for tests
    const defaultUser = await prisma.user.upsert({
      where: { email: "admin@testtutor.com" },
      update: {},
      create: {
        email: "admin@testtutor.com",
        name: "Test Admin",
        role: "ADMIN",
      },
    });

    console.log(`✅ Created/found user: ${defaultUser.name}`);

    // Create tests with questions
    for (const testData of lifeInUKTests) {
      console.log(`📝 Creating test: ${testData.title}`);

      // Create or update the test
      const test = await prisma.test.upsert({
        where: { id: testData.id },
        update: {
          title: testData.title,
          description: testData.description,
          timeLimit: testData.timeLimit,
          passPercentage: testData.passPercentage,
          status: "PUBLISHED",
          isPublic: true,
          publishedAt: new Date(),
        },
        create: {
          id: testData.id,
          title: testData.title,
          description: testData.description,
          domainId: lifeInUKDomain.id,
          creatorId: defaultUser.id,
          timeLimit: testData.timeLimit,
          passPercentage: testData.passPercentage,
          status: "PUBLISHED",
          isPublic: true,
          publishedAt: new Date(),
          config: {
            showExplanations: true,
            allowReview: true,
            randomizeQuestions: true,
          },
        },
      });

      // Delete existing questions for this test
      await prisma.question.deleteMany({
        where: { testId: test.id },
      });

      // Create questions
      for (const questionData of testData.questions) {
        await prisma.question.create({
          data: {
            testId: test.id,
            stem: questionData.stem,
            explanation: questionData.explanation,
            type: questionData.type,
            order: questionData.order,
            points: questionData.points,
            options: {
              create: questionData.options.map((option) => ({
                label: option.label,
                isCorrect: option.isCorrect,
                order: option.order,
              })),
            },
          },
        });

        console.log(
          `  ➕ Added question: ${questionData.stem.substring(0, 50)}...`
        );
      }

      console.log(
        `✅ Test created: ${test.title} with ${testData.questions.length} questions`
      );
    }

    console.log("\n🎉 Database seed completed successfully!");
    console.log(`📊 Created ${lifeInUKTests.length} tests with real data`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
