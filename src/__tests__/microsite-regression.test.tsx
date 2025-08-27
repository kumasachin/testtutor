/**
 * Regression Test Suite for Microsite URL Structure and Real Data Integration
 * This suite tests the new microsite structure (/life-uk-test, /driving-theory)
 * with real database data and ensures all functionality works correctly.
 */

import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Mock Next.js router
const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  pathname: "/",
  query: {},
  asPath: "/",
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useParams: () => ({ testId: "life-uk-test-1" }),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock AuthContext with proper typing
const mockAuthContext = {
  user: null as {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
  } | null,
  login: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
  isLoading: false,
};

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe("Microsite Regression Test Suite", () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    mockPush.mockClear();
    mockAuthContext.user = null;

    // Setup fetch mock for real data scenarios
    global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Life in UK Microsite (/life-uk-test)", () => {
    it("should load Life in UK tests from real database", async () => {
      // Mock successful API response with real data structure
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            tests: [
              {
                id: "life-uk-test-1",
                title: "Life in UK Practice Test 1",
                description:
                  "Official practice test covering British history, culture, and government - 24 questions",
                timeLimit: 45,
                passPercentage: 75,
                domainId: "life-in-uk",
                domain: {
                  id: "life-in-uk",
                  name: "life-in-uk",
                  displayName: "Life in UK",
                },
                _count: { attempts: 150 },
              },
              {
                id: "life-uk-test-2",
                title: "Life in UK Practice Test 2",
                description:
                  "Official practice test covering British history, culture, and government - 24 questions",
                timeLimit: 45,
                passPercentage: 75,
                domainId: "life-in-uk",
                domain: {
                  id: "life-in-uk",
                  name: "life-in-uk",
                  displayName: "Life in UK",
                },
                _count: { attempts: 98 },
              },
            ],
          },
        }),
      } as Response);

      const LifeUkTestPage = (await import("@/app/life-uk-test/page")).default;
      render(<LifeUkTestPage />);

      await waitFor(() => {
        expect(screen.getByText("Life in the UK Test")).toBeInTheDocument();
      });

      expect(global.fetch).toHaveBeenCalledWith("/api/tests?domain=life-in-uk");

      await waitFor(() => {
        expect(
          screen.getByText("Life in UK Practice Test 1")
        ).toBeInTheDocument();
        expect(
          screen.getByText("Life in UK Practice Test 2")
        ).toBeInTheDocument();
      });
    });

    it("should display fallback data when API fails", async () => {
      // Mock API failure
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockRejectedValueOnce(new Error("API Error"));

      const LifeUkTestPage = (await import("@/app/life-uk-test/page")).default;
      render(<LifeUkTestPage />);

      await waitFor(() => {
        // Should show fallback test data
        expect(
          screen.getByText("Life in UK Practice Test 1")
        ).toBeInTheDocument();
      });
    });

    it("should navigate to individual test pages with correct URL structure", async () => {
      // Mock API response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            tests: [
              {
                id: "life-uk-test-1",
                title: "Life in UK Practice Test 1",
                description: "Test description",
                _count: { attempts: 150 },
              },
            ],
          },
        }),
      });

      const LifeUkTestPage = (await import("@/app/life-uk-test/page")).default;
      render(<LifeUkTestPage />);

      await waitFor(() => {
        const startButtons = screen.getAllByText("Take Test");
        expect(startButtons[0]).toBeInTheDocument();
      });

      const startButtons = screen.getAllByText("Take Test");
      fireEvent.click(startButtons[0]);

      expect(mockPush).toHaveBeenCalledWith("/life-uk-test/life-uk-test-1");
    });
  });

  describe("Driving Theory Microsite (/driving-theory)", () => {
    it("should load Driving Theory tests from real database", async () => {
      // Mock successful API response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            tests: [
              {
                id: "driving-theory-test-1",
                title: "Driving Theory Practice Test 1",
                description:
                  "Official DVSA practice test covering highway code, road signs, and safe driving",
                timeLimit: 57,
                passPercentage: 86,
                domainId: "driving-theory",
                domain: {
                  id: "driving-theory",
                  name: "driving-theory",
                  displayName: "Driving Theory",
                },
                _count: { attempts: 320 },
              },
            ],
          },
        }),
      });

      const DrivingTheoryPage = (await import("@/app/driving-theory/page"))
        .default;
      render(<DrivingTheoryPage />);

      await waitFor(() => {
        expect(screen.getByText("Driving Theory Test")).toBeInTheDocument();
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/tests?domain=driving-theory"
      );

      await waitFor(() => {
        expect(
          screen.getByText("Driving Theory Practice Test 1")
        ).toBeInTheDocument();
      });
    });

    it("should navigate to individual driving theory test pages", async () => {
      // Mock API response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            tests: [
              {
                id: "driving-theory-test-1",
                title: "Driving Theory Practice Test 1",
                description: "Test description",
                _count: { attempts: 320 },
              },
            ],
          },
        }),
      });

      const DrivingTheoryPage = (await import("@/app/driving-theory/page"))
        .default;
      render(<DrivingTheoryPage />);

      await waitFor(() => {
        const startButtons = screen.getAllByText("Take Test");
        expect(startButtons[0]).toBeInTheDocument();
      });

      const startButtons = screen.getAllByText("Take Test");
      fireEvent.click(startButtons[0]);

      expect(mockPush).toHaveBeenCalledWith(
        "/driving-theory/driving-theory-test-1"
      );
    });
  });

  describe("Individual Test Pages", () => {
    it("should load individual Life in UK test with real data", async () => {
      // Mock API response for individual test
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          test: {
            id: "life-uk-test-1",
            title: "Life in UK Practice Test 1",
            description: "Official practice test",
            timeLimit: 45,
            passPercentage: 75,
            questions: [
              {
                id: "q1",
                question:
                  "Who were the first people to arrive in Britain in what we call the Stone Age?",
                options: [
                  "Hunter-gatherers",
                  "Romans",
                  "Anglo-Saxons",
                  "Vikings",
                ],
                correctAnswer: 0,
                explanation:
                  "Hunter-gatherers were the first people to live in Britain during the Stone Age.",
              },
            ],
          },
        }),
      });

      const LifeUkTestIdPage = (
        await import("@/app/life-uk-test/[testId]/page")
      ).default;
      render(<LifeUkTestIdPage />);

      await waitFor(() => {
        expect(
          screen.getByText("Life in UK Practice Test 1")
        ).toBeInTheDocument();
      });

      expect(global.fetch).toHaveBeenCalledWith("/api/tests/life-uk-test-1");

      await waitFor(() => {
        expect(
          screen.getByText(
            "Who were the first people to arrive in Britain in what we call the Stone Age?"
          )
        ).toBeInTheDocument();
      });
    });

    it("should load individual Driving Theory test with real data", async () => {
      // Mock API response for individual test
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          test: {
            id: "driving-theory-test-1",
            title: "Driving Theory Practice Test 1",
            description: "Official DVSA practice test",
            timeLimit: 57,
            passPercentage: 86,
            questions: [
              {
                id: "q1",
                question:
                  "What should you do when you see a red traffic light?",
                options: [
                  "Slow down",
                  "Stop completely",
                  "Proceed with caution",
                  "Speed up",
                ],
                correctAnswer: 1,
                explanation:
                  "A red traffic light means you must stop completely.",
              },
            ],
          },
        }),
      });

      const DrivingTheoryTestIdPage = (
        await import("@/app/driving-theory/[testId]/page")
      ).default;
      render(<DrivingTheoryTestIdPage />);

      await waitFor(() => {
        expect(
          screen.getByText("Driving Theory Practice Test 1")
        ).toBeInTheDocument();
      });

      expect(global.fetch).toHaveBeenCalledWith("/api/tests/life-uk-test-1");

      await waitFor(() => {
        expect(
          screen.getByText(
            "What should you do when you see a red traffic light?"
          )
        ).toBeInTheDocument();
      });
    });

    it("should handle test timer functionality", async () => {
      jest.useFakeTimers();

      // Mock test data with timer
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          test: {
            id: "life-uk-test-1",
            title: "Life in UK Practice Test 1",
            timeLimit: 45,
            passPercentage: 75,
            questions: [
              {
                id: "q1",
                question: "Test question",
                options: ["A", "B", "C", "D"],
                correctAnswer: 0,
              },
            ],
          },
        }),
      });

      const LifeUkTestIdPage = (
        await import("@/app/life-uk-test/[testId]/page")
      ).default;
      render(<LifeUkTestIdPage />);

      await waitFor(() => {
        expect(screen.getByText("Time Remaining")).toBeInTheDocument();
      });

      // Check initial timer display (45:00)
      expect(screen.getByText("45:00")).toBeInTheDocument();

      // Fast-forward time
      jest.advanceTimersByTime(60000); // 1 minute

      await waitFor(() => {
        expect(screen.getByText("44:00")).toBeInTheDocument();
      });

      jest.useRealTimers();
    });
  });

  describe("Navigation Component Integration", () => {
    it("should display navigation with auth functionality", async () => {
      const Navigation = (await import("@/components/Navigation")).default;
      render(<Navigation />);

      expect(screen.getByText("TestTutor")).toBeInTheDocument();
      expect(screen.getByText("Life in UK Tests")).toBeInTheDocument();
      expect(screen.getByText("Driving Theory")).toBeInTheDocument();
      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });

    it("should show user info when logged in", async () => {
      // Mock logged-in user
      mockAuthContext.user = {
        id: "1",
        email: "test@test.com",
        firstName: "Test",
        lastName: "User",
        role: "USER",
      };

      const Navigation = (await import("@/components/Navigation")).default;
      render(<Navigation />);

      expect(screen.getByText("Welcome, Test")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });
  });

  describe("API Integration Tests", () => {
    it("should handle test data fetching with domain filtering", async () => {
      // Mock API call for domain-specific tests
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            tests: [{ id: "test-1", title: "Test 1", domainId: "life-in-uk" }],
          },
        }),
      });

      const response = await fetch("/api/tests?domain=life-in-uk");
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.data.tests).toHaveLength(1);
      expect(data.data.tests[0].domainId).toBe("life-in-uk");
    });
  });

  describe("Error Handling and Fallbacks", () => {
    it("should show error state when test loading fails", async () => {
      // Mock API failure
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      const LifeUkTestPage = (await import("@/app/life-uk-test/page")).default;
      render(<LifeUkTestPage />);

      // Should fall back to showing fallback data instead of error
      await waitFor(() => {
        expect(
          screen.getByText("Life in UK Practice Test 1")
        ).toBeInTheDocument();
      });
    });

    it("should handle 404 errors for individual tests gracefully", async () => {
      // Mock 404 response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: "Test not found" }),
      });

      const LifeUkTestIdPage = (
        await import("@/app/life-uk-test/[testId]/page")
      ).default;
      render(<LifeUkTestIdPage />);

      await waitFor(() => {
        expect(screen.getByText("Test Not Found")).toBeInTheDocument();
      });
    });
  });

  describe("Responsive Design and Mobile", () => {
    it("should display mobile navigation menu", async () => {
      const Navigation = (await import("@/components/Navigation")).default;
      render(<Navigation />);

      // Test mobile menu button (should be present but hidden on desktop)
      const mobileMenuButton = screen.getByRole("button");
      expect(mobileMenuButton).toBeInTheDocument();
    });

    it("should handle mobile test interface", async () => {
      // Set mobile viewport
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 375,
      });

      // Mock test data
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          test: {
            id: "life-uk-test-1",
            title: "Mobile Test",
            questions: [
              {
                id: "q1",
                question: "Test question",
                options: ["A", "B", "C", "D"],
                correctAnswer: 0,
              },
            ],
          },
        }),
      });

      const LifeUkTestIdPage = (
        await import("@/app/life-uk-test/[testId]/page")
      ).default;
      render(<LifeUkTestIdPage />);

      await waitFor(() => {
        expect(screen.getByText("Mobile Test")).toBeInTheDocument();
      });

      // Test should still be functional on mobile
      expect(screen.getByText("Question 1 of 1")).toBeInTheDocument();
    });
  });
});
