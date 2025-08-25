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
  {
    id: "life-uk-test-3",
    title: "Life in UK Official Test - January 2024",
    description:
      "Official Life in the UK test covering British history and traditions",
    duration: 45,
    totalQuestions: 5,
    passingScore: 75,
    maxAttempts: 3,
    difficultyLevel: "MEDIUM",
    isPublic: true,
    questions: [
      {
        stem: "What is the capital city of Scotland?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Edinburgh is the capital city of Scotland, where the Scottish Parliament is located.",
        order: 1,
        points: 1,
        options: [
          { label: "Glasgow", isCorrect: false, order: 1 },
          { label: "Edinburgh", isCorrect: true, order: 2 },
          { label: "Aberdeen", isCorrect: false, order: 3 },
          { label: "Dundee", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When did women get the right to vote in the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Women over 30 got the vote in 1918, and all women over 21 got the vote in 1928.",
        order: 2,
        points: 1,
        options: [
          { label: "1918", isCorrect: true, order: 1 },
          { label: "1920", isCorrect: false, order: 2 },
          { label: "1928", isCorrect: false, order: 3 },
          { label: "1945", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the name of the British national anthem?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "God Save the King (or Queen) is the national anthem of the United Kingdom.",
        order: 3,
        points: 1,
        options: [
          { label: "Rule Britannia", isCorrect: false, order: 1 },
          { label: "God Save the King", isCorrect: true, order: 2 },
          { label: "Jerusalem", isCorrect: false, order: 3 },
          { label: "Land of Hope and Glory", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which of these is a traditional British food?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Fish and chips is a traditional British dish that became popular in the 19th century.",
        order: 4,
        points: 1,
        options: [
          { label: "Fish and chips", isCorrect: true, order: 1 },
          { label: "Pasta", isCorrect: false, order: 2 },
          { label: "Tacos", isCorrect: false, order: 3 },
          { label: "Sushi", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the currency of the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The pound sterling is the official currency of the United Kingdom.",
        order: 5,
        points: 1,
        options: [
          { label: "Euro", isCorrect: false, order: 1 },
          { label: "Dollar", isCorrect: false, order: 2 },
          { label: "Pound sterling", isCorrect: true, order: 3 },
          { label: "Franc", isCorrect: false, order: 4 },
        ],
      },
    ],
  },
  {
    id: "life-uk-test-4",
    title: "Life in UK Official Test - December 2023",
    description:
      "Official Life in the UK test covering British culture and society",
    duration: 45,
    totalQuestions: 5,
    passingScore: 75,
    maxAttempts: 3,
    difficultyLevel: "MEDIUM",
    isPublic: true,
    questions: [
      {
        stem: "What is the population of the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation: "The UK population is approximately 67 million people.",
        order: 1,
        points: 1,
        options: [
          { label: "50 million", isCorrect: false, order: 1 },
          { label: "67 million", isCorrect: true, order: 2 },
          { label: "80 million", isCorrect: false, order: 3 },
          { label: "100 million", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Church of England also known as?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Church of England is also known as the Anglican Church.",
        order: 2,
        points: 1,
        options: [
          { label: "Catholic Church", isCorrect: false, order: 1 },
          { label: "Anglican Church", isCorrect: true, order: 2 },
          { label: "Methodist Church", isCorrect: false, order: 3 },
          { label: "Baptist Church", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When is Christmas Day celebrated?",
        type: "SINGLE_CHOICE" as const,
        explanation: "Christmas Day is celebrated on 25 December each year.",
        order: 3,
        points: 1,
        options: [
          { label: "24 December", isCorrect: false, order: 1 },
          { label: "25 December", isCorrect: true, order: 2 },
          { label: "26 December", isCorrect: false, order: 3 },
          { label: "1 January", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the minimum age to vote in UK elections?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "You must be 18 years old or over to vote in UK elections.",
        order: 4,
        points: 1,
        options: [
          { label: "16", isCorrect: false, order: 1 },
          { label: "17", isCorrect: false, order: 2 },
          { label: "18", isCorrect: true, order: 3 },
          { label: "21", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What do the letters BBC stand for?",
        type: "SINGLE_CHOICE" as const,
        explanation: "BBC stands for British Broadcasting Corporation.",
        order: 5,
        points: 1,
        options: [
          {
            label: "British Broadcasting Corporation",
            isCorrect: true,
            order: 1,
          },
          { label: "British Business Corporation", isCorrect: false, order: 2 },
          { label: "British Book Company", isCorrect: false, order: 3 },
          { label: "British Banking Corporation", isCorrect: false, order: 4 },
        ],
      },
    ],
  },
  {
    id: "life-uk-test-5",
    title: "Life in UK Official Test - November 2023",
    description:
      "Official Life in the UK test covering British geography and landmarks",
    duration: 45,
    totalQuestions: 5,
    passingScore: 75,
    maxAttempts: 3,
    difficultyLevel: "MEDIUM",
    isPublic: true,
    questions: [
      {
        stem: "Which is the longest river in the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The River Severn is the longest river in the UK at 220 miles (354 km).",
        order: 1,
        points: 1,
        options: [
          { label: "River Thames", isCorrect: false, order: 1 },
          { label: "River Severn", isCorrect: true, order: 2 },
          { label: "River Trent", isCorrect: false, order: 3 },
          { label: "River Mersey", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the name of the British flag?",
        type: "SINGLE_CHOICE" as const,
        explanation: "The British flag is called the Union Flag or Union Jack.",
        order: 2,
        points: 1,
        options: [
          { label: "St George's Cross", isCorrect: false, order: 1 },
          { label: "Union Jack", isCorrect: true, order: 2 },
          { label: "Red Ensign", isCorrect: false, order: 3 },
          { label: "Royal Standard", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "How many countries make up the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The UK is made up of four countries: England, Scotland, Wales, and Northern Ireland.",
        order: 3,
        points: 1,
        options: [
          { label: "Three", isCorrect: false, order: 1 },
          { label: "Four", isCorrect: true, order: 2 },
          { label: "Five", isCorrect: false, order: 3 },
          { label: "Six", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the highest mountain in the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Ben Nevis in Scotland is the highest mountain in the UK at 1,345 metres.",
        order: 4,
        points: 1,
        options: [
          { label: "Snowdon", isCorrect: false, order: 1 },
          { label: "Scafell Pike", isCorrect: false, order: 2 },
          { label: "Ben Nevis", isCorrect: true, order: 3 },
          { label: "Helvellyn", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which city is known as the 'Second City' of the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Birmingham is often referred to as the 'Second City' of the UK due to its size and importance.",
        order: 5,
        points: 1,
        options: [
          { label: "Manchester", isCorrect: false, order: 1 },
          { label: "Birmingham", isCorrect: true, order: 2 },
          { label: "Liverpool", isCorrect: false, order: 3 },
          { label: "Leeds", isCorrect: false, order: 4 },
        ],
      },
    ],
  },
  {
    id: "life-uk-test-6",
    title: "Life in UK Official Test - October 2023",
    description:
      "Official Life in the UK test covering British sports and traditions",
    duration: 45,
    totalQuestions: 5,
    passingScore: 75,
    maxAttempts: 3,
    difficultyLevel: "MEDIUM",
    isPublic: true,
    questions: [
      {
        stem: "What is the most popular sport in the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation: "Football (soccer) is the most popular sport in the UK.",
        order: 1,
        points: 1,
        options: [
          { label: "Cricket", isCorrect: false, order: 1 },
          { label: "Rugby", isCorrect: false, order: 2 },
          { label: "Football", isCorrect: true, order: 3 },
          { label: "Tennis", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When is Burns Night celebrated?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Burns Night is celebrated on 25 January each year to honor the Scottish poet Robert Burns.",
        order: 2,
        points: 1,
        options: [
          { label: "25 January", isCorrect: true, order: 1 },
          { label: "1 March", isCorrect: false, order: 2 },
          { label: "23 April", isCorrect: false, order: 3 },
          { label: "30 November", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the famous tennis tournament held in London?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Wimbledon is the famous tennis tournament held in London every summer.",
        order: 3,
        points: 1,
        options: [
          { label: "Wimbledon", isCorrect: true, order: 1 },
          { label: "Queens", isCorrect: false, order: 2 },
          { label: "Eastbourne", isCorrect: false, order: 3 },
          { label: "Birmingham", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the traditional Sunday lunch in Britain?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Sunday roast is the traditional Sunday lunch, typically consisting of roasted meat with vegetables.",
        order: 4,
        points: 1,
        options: [
          { label: "Fish and chips", isCorrect: false, order: 1 },
          { label: "Sunday roast", isCorrect: true, order: 2 },
          { label: "Shepherd's pie", isCorrect: false, order: 3 },
          { label: "Bangers and mash", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What does 'Boxing Day' commemorate?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Boxing Day (26 December) traditionally was when servants received gifts from their employers.",
        order: 5,
        points: 1,
        options: [
          { label: "A boxing match", isCorrect: false, order: 1 },
          { label: "Giving gifts to servants", isCorrect: true, order: 2 },
          { label: "Opening boxes", isCorrect: false, order: 3 },
          { label: "A religious ceremony", isCorrect: false, order: 4 },
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
