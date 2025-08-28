import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST() {
  try {
    console.log("🌱 Starting database seed via API...");

    // Clear existing data
    await prisma.testAttempt.deleteMany({});
    await prisma.option.deleteMany({});
    await prisma.question.deleteMany({});
    await prisma.test.deleteMany({});
    await prisma.domainAccess.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.domain.deleteMany({});

    console.log("🧹 Cleared existing data");

    // Create Life in UK domain
    const lifeInUKDomain = await prisma.domain.upsert({
      where: { name: "life-in-uk" },
      update: {},
      create: {
        name: "life-in-uk",
        displayName: "Life in the UK",
        description: "Official Life in the UK Test preparation",
        icon: "🇬🇧",
        config: {
          categories: ["history", "culture", "government", "law"],
          difficulty: "medium",
        },
      },
    });

    // Create users
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const testUser = await prisma.user.upsert({
      where: { email: "admin@testtutor.com" },
      update: {},
      create: {
        email: "admin@testtutor.com",
        name: "Test Admin",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    // Test configurations
    const testConfigs = [
      {
        id: "life-uk-test-1",
        title: "Life in the UK Test 1",
        description:
          "Official practice test covering British history, culture, and government - 24 questions",
        timeLimit: 45,
        passPercentage: 75,
        config: {
          showResultsMode: "end",
          showExplanations: true,
          showCorrectAnswers: true,
          allowReview: true,
          shuffleQuestions: false,
          shuffleAnswers: false,
          timeLimit: 45,
          passingScore: 75,
          questionTimeLimit: null,
          allowQuestionNavigation: true,
        },
      },
      {
        id: "life-uk-test-2",
        title: "Life in the UK Test 2",
        description:
          "Official practice test covering Tudor period, Reformation, and British Empire - 24 questions",
        timeLimit: 30,
        passPercentage: 70,
        config: {
          showResultsMode: "immediate",
          showExplanations: true,
          showCorrectAnswers: true,
          allowReview: true,
          shuffleQuestions: true,
          shuffleAnswers: true,
          timeLimit: 30,
          passingScore: 70,
          questionTimeLimit: 90,
          allowQuestionNavigation: false,
        },
      },
      {
        id: "life-uk-test-3",
        title: "Life in the UK Test 3",
        description:
          "Official practice test covering Industrial Revolution and Victorian Britain - 24 questions",
        timeLimit: null,
        passPercentage: 80,
        config: {
          showResultsMode: "end",
          showExplanations: true,
          showCorrectAnswers: true,
          allowReview: true,
          shuffleQuestions: true,
          shuffleAnswers: false,
          timeLimit: null,
          passingScore: 80,
          questionTimeLimit: null,
          allowQuestionNavigation: true,
        },
      },
      {
        id: "life-uk-test-4",
        title: "Life in the UK Test 4",
        description:
          "Official practice test covering 20th century Britain and World Wars - 24 questions",
        timeLimit: 60,
        passPercentage: 75,
        config: {
          showResultsMode: "immediate",
          showExplanations: false,
          showCorrectAnswers: false,
          allowReview: false,
          shuffleQuestions: false,
          shuffleAnswers: true,
          timeLimit: 60,
          passingScore: 75,
          questionTimeLimit: 120,
          allowQuestionNavigation: true,
        },
      },
      {
        id: "life-uk-test-5",
        title: "Life in the UK Test 5",
        description:
          "Official practice test covering modern Britain and contemporary society - 24 questions",
        timeLimit: 40,
        passPercentage: 85,
        config: {
          showResultsMode: "never",
          showExplanations: true,
          showCorrectAnswers: true,
          allowReview: true,
          shuffleQuestions: true,
          shuffleAnswers: true,
          timeLimit: 40,
          passingScore: 85,
          questionTimeLimit: 60,
          allowQuestionNavigation: false,
        },
      },
      {
        id: "life-uk-test-6",
        title: "Life in the UK Test 6",
        description:
          "Official practice test covering British government, law, and citizenship - 24 questions",
        timeLimit: 35,
        passPercentage: 90,
        config: {
          showResultsMode: "end",
          showExplanations: true,
          showCorrectAnswers: true,
          allowReview: true,
          shuffleQuestions: false,
          shuffleAnswers: false,
          timeLimit: 35,
          passingScore: 90,
          questionTimeLimit: 45,
          allowQuestionNavigation: true,
        },
      },
    ];

    // Create simplified tests with configurations
    for (const testConfig of testConfigs) {
      console.log(`📝 Creating test: ${testConfig.title}`);

      const test = await prisma.test.create({
        data: {
          id: testConfig.id,
          slug: testConfig.id,
          title: testConfig.title,
          description: testConfig.description,
          domainId: lifeInUKDomain.id,
          creatorId: testUser.id,
          status: "PUBLISHED",
          config: testConfig.config,
          passPercentage: testConfig.passPercentage,
          timeLimit: testConfig.timeLimit,
          shuffleQuestions: testConfig.config.shuffleQuestions,
          shuffleAnswers: testConfig.config.shuffleAnswers,
          isPublic: true,
          publishedAt: new Date(),
        },
      });

      // Add a few sample questions for each test
      for (let i = 1; i <= 5; i++) {
        await prisma.question.create({
          data: {
            testId: test.id,
            stem: `Sample question ${i} for ${testConfig.title}?`,
            explanation: `This is the explanation for question ${i}.`,
            type: "SINGLE_CHOICE",
            order: i,
            points: 1,
            difficulty: "MEDIUM",
            tags: ["sample"],
            options: {
              create: [
                { label: "Option A", isCorrect: true, order: 1 },
                { label: "Option B", isCorrect: false, order: 2 },
                { label: "Option C", isCorrect: false, order: 3 },
                { label: "Option D", isCorrect: false, order: 4 },
              ],
            },
          },
        });
      }

      console.log(`✅ Test created: ${testConfig.title} with 5 questions`);
    }

    console.log("🎉 Database seed completed successfully!");

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with test configurations",
      testsCreated: testConfigs.length,
    });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
