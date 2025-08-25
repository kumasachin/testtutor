import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import LifeInUkPage from "../../app/lifeInUk/page";

// Mock fetch globally
global.fetch = jest.fn();

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
          success: true,
          data: {
            tests: [
              {
                id: "test-1",
                title: "Life in UK Practice Test 1",
                description: "Official practice test for UK citizenship",
                _count: {
                  questions: 24,
                  attempts: 150,
                },
              },
            ],
          },
        }),
    });
  });

  test("renders page and displays main content", () => {
    render(<LifeInUkPage />);
    expect(screen.getByText("Life in the UK Tests")).toBeInTheDocument();
  });

  test("fetches tests from API", async () => {
    render(<LifeInUkPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/tests-mock?domainName=Life in UK"
      );
    });
  });

  test("displays exam information", () => {
    render(<LifeInUkPage />);
    expect(
      screen.getByText(/24 questions per official test/)
    ).toBeInTheDocument();
  });

  test("shows navigation links", () => {
    render(<LifeInUkPage />);
    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
  });
});
