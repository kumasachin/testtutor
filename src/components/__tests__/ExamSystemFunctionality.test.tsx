import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";

// Mock fetch globally
global.fetch = jest.fn();

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: "/",
    query: {},
  }),
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

// Mock AuthContext
jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
    isLoading: false,
  }),
}));

// Mock Next.js components
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = "MockLink";
  return MockLink;
});

// Import test components
import LifeUkTestHomePage from "../../app/life-uk-test/page";
import HomePage from "../../app/page";

describe("Test and Exam System Functionality", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock API responses for domains
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes("/api/domains")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              data: [
                {
                  id: "domain-1",
                  name: "Life in UK",
                  displayName: "Life in UK",
                  description: "UK citizenship tests",
                },
              ],
            }),
        });
      }

      if (url.includes("/api/tests")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              data: {
                tests: [
                  {
                    id: "test-1",
                    title: "Life in UK Practice Test 1",
                    description:
                      "Official practice test for UK citizenship - covering British history, traditions, and government",
                    _count: {
                      questions: 24,
                      attempts: 150,
                    },
                  },
                ],
              },
            }),
        });
      }

      // Add fallback for unknown URLs to prevent test failures
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, data: [] }),
      });
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Homepage", () => {
    test("loads test domains and statistics", async () => {
      await act(async () => {
        render(<HomePage />);
      });

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("/api/domains");
        expect(global.fetch).toHaveBeenCalledWith("/api/tests");
      });
    });
  });

  describe("Life in UK Test Page", () => {
    test("renders test selection interface", async () => {
      await act(async () => {
        render(<LifeUkTestHomePage />);
      });

      expect(screen.getByText("Life in the UK Test")).toBeInTheDocument();
      expect(
        screen.getByText("Why Choose Our Life in UK Tests?")
      ).toBeInTheDocument();
    });

    test("fetches and displays available tests", async () => {
      await act(async () => {
        render(<LifeUkTestHomePage />);
      });

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "/api/tests?domainName=life-in-uk"
        );
      });

      await waitFor(() => {
        expect(
          screen.getByText("Life in UK Practice Test 1")
        ).toBeInTheDocument();
      });
    });

    test("shows test format information", async () => {
      await act(async () => {
        render(<LifeUkTestHomePage />);
      });

      await waitFor(() => {
        expect(screen.getByText("🇬🇧 Official Format")).toBeInTheDocument();
        expect(screen.getByText("⏰ 45 Minutes")).toBeInTheDocument();
        expect(screen.getByText("📊 75% Pass Rate")).toBeInTheDocument();
        expect(screen.getByText("🎯 24 Questions")).toBeInTheDocument();
      });
    });

    test("provides take test functionality", async () => {
      render(<LifeUkTestHomePage />);

      await waitFor(() => {
        const takeTestButtons = screen.getAllByText("Take Test");
        expect(takeTestButtons.length).toBeGreaterThan(0);
      });
    });
  });
});
