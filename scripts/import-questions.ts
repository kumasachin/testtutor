import fs from "fs";
import path from "path";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface QuestionData {
  stem: string;
  options: Array<{
    label: string;
    isCorrect: boolean;
    feedback?: string;
  }>;
  explanation?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  tags?: string[];
  type?: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "TRUE_FALSE";
}

interface ImportedTest {
  domainName: string;
  testTitle: string;
  testDescription?: string;
  passPercentage?: number;
  timeLimit?: number;
  questions: QuestionData[];
}

async function importTestFromJSON(
  filePath: string,
  creatorId: string = "system"
) {
  console.log(`📥 Importing test from ${filePath}...`);

  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8")) as ImportedTest;

    // Find or create domain
    let domain = await prisma.domain.findUnique({
      where: { name: data.domainName },
    });

    if (!domain) {
      console.log(`📝 Creating domain: ${data.domainName}`);
      domain = await prisma.domain.create({
        data: {
          name: data.domainName,
          displayName: data.domainName,
          description: `Tests for ${data.domainName}`,
          config: {
            defaultTimeLimit: data.timeLimit || 60,
            defaultPassPercentage: data.passPercentage || 75,
            allowAnonymous: true,
          },
        },
      });
    }

    // Create test
    console.log(`� Creating test: ${data.testTitle}`);
    const test = await prisma.test.create({
      data: {
        title: data.testTitle,
        description: data.testDescription || `Test for ${data.domainName}`,
        domainId: domain.id,
        creatorId: creatorId,
        status: "PUBLISHED", // Auto-publish imported tests
        passPercentage: data.passPercentage || 75,
        timeLimit: data.timeLimit,
        config: {
          shuffleQuestions: true,
          shuffleAnswers: true,
          showExplanations: true,
        },
        isPublic: true,
        publishedAt: new Date(),
      },
    });

    // Import questions
    let importedCount = 0;
    for (let i = 0; i < data.questions.length; i++) {
      const questionData = data.questions[i];

      try {
        await prisma.question.create({
          data: {
            testId: test.id,
            stem: questionData.stem,
            explanation: questionData.explanation,
            type: questionData.type || "SINGLE_CHOICE",
            difficulty: questionData.difficulty || "MEDIUM",
            order: i + 1,
            tags: questionData.tags ? questionData.tags.join(",") : null,
            options: {
              create: questionData.options.map((option, index) => ({
                label: option.label,
                isCorrect: option.isCorrect,
                feedback: option.feedback,
                order: index + 1,
              })),
            },
          },
        });

        importedCount++;
        console.log(
          `✅ Imported question ${i + 1}: ${questionData.stem.substring(
            0,
            50
          )}...`
        );
      } catch (error) {
        console.error(
          `❌ Error importing question ${i + 1}: ${questionData.stem.substring(
            0,
            50
          )}...`,
          error
        );
      }
    }

    console.log(
      `🎉 Successfully imported test "${data.testTitle}" with ${importedCount} questions`
    );
  } catch (error) {
    console.error(`❌ Error processing file ${filePath}:`, error);
  }
}

async function importFromDirectory(
  directoryPath: string,
  creatorId: string = "system"
) {
  console.log(`📁 Scanning directory: ${directoryPath}`);

  const files = fs.readdirSync(directoryPath);
  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  if (jsonFiles.length === 0) {
    console.log("⚠️  No JSON files found in directory");
    return;
  }

  for (const file of jsonFiles) {
    await importTestFromJSON(path.join(directoryPath, file), creatorId);
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
🔧 ExamKit Test Importer

Usage:
  npx tsx scripts/import-questions.ts <file-or-directory> [creator-id]
  
Examples:
  npx tsx scripts/import-questions.ts ./data/life-in-uk-test.json
  npx tsx scripts/import-questions.ts ./data/ user123
  
Expected JSON format:
{
  "domainName": "Life in UK",
  "testTitle": "Official Life in UK Test",
  "testDescription": "Practice test for the Life in UK exam",
  "passPercentage": 75,
  "timeLimit": 45,
  "questions": [
    {
      "stem": "When did the Battle of Hastings take place?",
      "options": [
        { "label": "1066", "isCorrect": true },
        { "label": "1067", "isCorrect": false },
        { "label": "1068", "isCorrect": false },
        { "label": "1069", "isCorrect": false }
      ],
      "explanation": "The Battle of Hastings took place in 1066...",
      "difficulty": "MEDIUM",
      "type": "SINGLE_CHOICE",
      "tags": ["history", "medieval"]
    }
  ]
}
    `);
    return;
  }

  const target = args[0];
  const creatorId = args[1] || "system";
  const targetPath = path.resolve(target);

  if (!fs.existsSync(targetPath)) {
    console.error(`❌ Path not found: ${targetPath}`);
    return;
  }

  const stats = fs.statSync(targetPath);

  if (stats.isDirectory()) {
    await importFromDirectory(targetPath, creatorId);
  } else if (stats.isFile() && targetPath.endsWith(".json")) {
    await importTestFromJSON(targetPath, creatorId);
  } else {
    console.error(
      "❌ Please provide a JSON file or directory containing JSON files"
    );
  }

  await prisma.$disconnect();
  console.log("🎉 Import process completed!");
}

main().catch((error) => {
  console.error("❌ Import failed:", error);
  process.exit(1);
});
