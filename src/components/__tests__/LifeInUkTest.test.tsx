import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import LifeInUkPage from "../../app/life-uk-test/page";

// Mock fetch globally
global.fetch = jest.fn();

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock AuthContext
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
    loading: false,
  }),
}));

// Mock Next.js Link
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

describe("Life in UK Tests Functionality", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          tests: [
            {
              id: "life-uk-test-1",
              title: "Life in UK Practice Test 1",
              description: "Official practice test",
              timeLimit: 45,
              passPercentage: 75,
              domainId: "life-in-uk",
              domain: {
                id: "life-in-uk",
                name: "life-in-uk",
                displayName: "Life in UK",
              },
              _count: { attempts: 0 },
            },
          ],
        }),
    });
  });

  test("renders page and displays main content", async () => {
    render(<LifeInUkPage />);

    // Wait for content to load
    await waitFor(() => {
      expect(
        screen.getByText("Why Choose Our Life in UK Tests?")
      ).toBeInTheDocument();
    });
  });

  test("fetches tests from API", async () => {
    render(<LifeInUkPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/tests?domain=life-in-uk");
    });
  });

  test("displays exam information", async () => {
    render(<LifeInUkPage />);

    await waitFor(() => {
      expect(screen.getByText(/24 questions in total/)).toBeInTheDocument();
    });
  });

  test("shows navigation links", async () => {
    render(<LifeInUkPage />);

    await waitFor(() => {
      expect(screen.getByText("Life in UK Tests")).toBeInTheDocument();
    });
  });
});
