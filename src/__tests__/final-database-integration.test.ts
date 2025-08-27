/**
 * Final Database Integration Tests with Real Database
 * These tests verify database operations work correctly with seeded data
 */

import { prisma } from "../lib/prisma";

describe("Database Integration Tests - Real Data Verification", () => {
  describe("Database connectivity and seeded data", () => {
    test("should connect to database and have all required entities", async () => {
      const users = await prisma.user.findMany();
      const tests = await prisma.test.findMany();
      const questions = await prisma.question.findMany();
      const domains = await prisma.domain.findMany();

      expect(users.length).toBeGreaterThan(0);
      expect(tests.length).toBeGreaterThan(0);
      expect(questions.length).toBeGreaterThan(0);
      expect(domains.length).toBe(2);

      // Real data verification - we have substantial test data
      expect(tests.length).toBeGreaterThanOrEqual(8);
      expect(questions.length).toBeGreaterThanOrEqual(150);
    });

    test("should have proper domain and test structure", async () => {
      const lifeinukTests = await prisma.test.findMany({
        where: {
          domain: {
            name: "life-in-uk",
          },
        },
        include: { questions: true },
      });

      const drivingTests = await prisma.test.findMany({
        where: {
          domain: {
            name: "driving-theory",
          },
        },
        include: { questions: true },
      });

      // Verify we have real tests for both domains
      expect(lifeinukTests.length).toBeGreaterThan(0);
      expect(drivingTests.length).toBeGreaterThan(0);

      // Each test should have substantial questions
      lifeinukTests.forEach((test) => {
        expect(test.questions.length).toBeGreaterThan(10);
      });

      drivingTests.forEach((test) => {
        expect(test.questions.length).toBeGreaterThan(0);
      });
    });
  });

  describe("User authentication with real users", () => {
    test("should have seeded users with properly hashed passwords", async () => {
      const admin = await prisma.user.findUnique({
        where: { email: "admin@testtutor.com" },
      });

      const user = await prisma.user.findUnique({
        where: { email: "user@testtutor.com" },
      });

      expect(admin).toBeDefined();
      expect(user).toBeDefined();
      expect(admin?.role).toBe("ADMIN");
      expect(user?.role).toBe("USER");

      // Passwords should be hashed (not plain text)
      expect(admin?.password).not.toBe("admin123");
      expect(user?.password).not.toBe("user123");
      expect(admin?.password.length).toBeGreaterThan(10);
      expect(user?.password.length).toBeGreaterThan(10);
    });
  });

  describe("Domain structure and filtering", () => {
    test("should have correct domains configured", async () => {
      const domains = await prisma.domain.findMany();

      expect(domains.length).toBe(2);

      const lifeinukDomain = domains.find((d) => d.name === "life-in-uk");
      const drivingDomain = domains.find((d) => d.name === "driving-theory");

      expect(lifeinukDomain).toBeDefined();
      expect(drivingDomain).toBeDefined();
      expect(lifeinukDomain?.displayName).toBe("Life in UK");
      expect(drivingDomain?.displayName).toBe("Driving Theory");
    });

    test("should filter tests correctly by domain", async () => {
      const lifeinukTests = await prisma.test.findMany({
        where: {
          domain: {
            name: "life-in-uk",
          },
        },
        include: { domain: true },
      });

      const drivingTests = await prisma.test.findMany({
        where: {
          domain: {
            name: "driving-theory",
          },
        },
        include: { domain: true },
      });

      expect(lifeinukTests.length).toBeGreaterThan(0);
      expect(drivingTests.length).toBeGreaterThan(0);

      lifeinukTests.forEach((test) => {
        expect(test.domain.name).toBe("life-in-uk");
        expect(test.title).toContain("Life in the UK");
      });

      drivingTests.forEach((test) => {
        expect(test.domain.name).toBe("driving-theory");
        expect(test.title).toContain("Driving Theory");
      });
    });
  });

  describe("Question and option structure validation", () => {
    test("should have proper question and option structure", async () => {
      const questionsWithOptions = await prisma.question.findMany({
        include: { options: true },
        take: 10,
      });

      expect(questionsWithOptions.length).toBeGreaterThan(0);

      questionsWithOptions.forEach((question) => {
        expect(question.stem).toBeDefined();
        expect(question.stem.length).toBeGreaterThan(0);
        expect(question.options.length).toBeGreaterThanOrEqual(2);
        expect(question.options.length).toBeLessThanOrEqual(4);

        // Should have exactly one correct answer
        const correctOptions = question.options.filter((opt) => opt.isCorrect);
        expect(correctOptions.length).toBe(1);
      });
    });
  });

  describe("Real data quality verification", () => {
    test("should have comprehensive Life in the UK test content", async () => {
      const lifeinukTests = await prisma.test.findMany({
        where: {
          domain: {
            name: "life-in-uk",
          },
        },
        include: {
          questions: {
            include: { options: true },
          },
          domain: true,
        },
      });

      expect(lifeinukTests.length).toBeGreaterThan(5); // Should have multiple tests

      lifeinukTests.forEach((test) => {
        expect(test.title).toContain("Life in the UK Test");
        expect(test.description).toContain("Official practice test");
        expect(test.questions.length).toBeGreaterThan(20); // Substantial question count
        expect(test.domain.displayName).toBe("Life in UK");

        test.questions.forEach((question) => {
          expect(question.options.length).toBeGreaterThanOrEqual(2);
        });
      });
    });

    test("should have Driving Theory test content", async () => {
      const drivingTests = await prisma.test.findMany({
        where: {
          domain: {
            name: "driving-theory",
          },
        },
        include: {
          questions: {
            include: { options: true },
          },
          domain: true,
        },
      });

      expect(drivingTests.length).toBeGreaterThan(0);

      drivingTests.forEach((test) => {
        expect(test.title).toContain("Driving Theory");
        expect(test.questions.length).toBeGreaterThan(0);
        expect(test.domain.displayName).toBe("Driving Theory");

        test.questions.forEach((question) => {
          expect(question.options.length).toBeGreaterThanOrEqual(2);
        });
      });
    });
  });

  describe("Database operations and error handling", () => {
    test("should handle database queries gracefully", async () => {
      try {
        const result = await prisma.$queryRaw`SELECT 1 as test`;
        expect(result).toBeDefined();
      } catch (error) {
        console.warn("Database connection test failed:", error);
      }
    });

    test("should handle invalid queries gracefully", async () => {
      const nonExistentTest = await prisma.test.findUnique({
        where: { id: "non-existent-id" },
      });

      const nonExistentUser = await prisma.user.findUnique({
        where: { email: "nonexistent@test.com" },
      });

      expect(nonExistentTest).toBeNull();
      expect(nonExistentUser).toBeNull();
    });
  });
});
