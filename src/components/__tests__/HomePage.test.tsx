import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import HomePage from "../../app/page";

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
  MockLink.displayName = "MockLink";
  return MockLink;
});

// Mock fetch
global.fetch = jest.fn();

describe("HomePage", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();

    // Mock domains API response
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: async () => ({
          success: true,
          data: [
            {
              id: "1",
              name: "Life in UK",
              displayName: "Life in UK Test",
              description: "British citizenship test",
            },
            {
              id: "2",
              name: "Driving Theory Test",
              displayName: "Driving Theory Test",
              description: "UK driving theory exam",
            },
            {
              id: "3",
              name: "General Knowledge",
              displayName: "General Knowledge",
              description: "General knowledge tests",
            },
            {
              id: "4",
              name: "English Language",
              displayName: "English Language",
              description: "English language assessments",
            },
          ],
        }),
      })
      // Mock tests API response
      .mockResolvedValueOnce({
        json: async () => ({
          success: true,
          data: {
            tests: [
              {
                id: "1",
                title: "Life in UK Test 1",
                description: "First practice test",
                domainId: "1",
                domain: {
                  name: "Life in UK",
                  displayName: "Life in UK Test",
                },
                _count: { attempts: 100 },
              },
            ],
          },
        }),
      });
  });

  it("renders the main heading", async () => {
    render(<HomePage />);
    expect(screen.getByText("Ace Your")).toBeInTheDocument();
    expect(screen.getAllByText("Tests")).toHaveLength(2); // One in nav, one in hero
  });

  it("renders the hero description", () => {
    render(<HomePage />);
    expect(
      screen.getByText(
        /Practice for Life in UK tests, Driving Theory exams, and more/
      )
    ).toBeInTheDocument();
  });

  it("renders community message", () => {
    render(<HomePage />);
    expect(
      screen.getByText(/Community Driven & Completely Free/)
    ).toBeInTheDocument();
    expect(screen.getByText(/100% Free Forever/)).toBeInTheDocument();
    expect(screen.getByText(/Community Supported/)).toBeInTheDocument();
    expect(screen.getByText(/Real Exam Questions/)).toBeInTheDocument();
  });

  it("renders test categories", () => {
    render(<HomePage />);
    expect(screen.getAllByText("Life in UK Test")).toHaveLength(2); // Navigation + category card
    expect(screen.getByText("Driving Theory Test")).toBeInTheDocument();
    expect(screen.getByText("Academic Tests")).toBeInTheDocument();
  });

  it("loads and displays test categories", async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getAllByText("Life in UK Test")).toHaveLength(2); // Navigation + category card
      expect(screen.getByText("Driving Theory Test")).toBeInTheDocument();
      expect(screen.getByText("Academic Tests")).toBeInTheDocument();
      expect(screen.getByText("Coming Soon")).toBeInTheDocument();
    });
  });

  it("renders test category descriptions", () => {
    render(<HomePage />);

    expect(screen.getByText("15+ Practice Tests")).toBeInTheDocument();
    expect(screen.getByText("Multiple Categories")).toBeInTheDocument();
    expect(
      screen.getByText(/Practice for your British citizenship test/)
    ).toBeInTheDocument();
  });

  it("renders statistics", () => {
    render(<HomePage />);

    expect(screen.getByText("800+")).toBeInTheDocument();
    expect(screen.getByText("Practice Questions")).toBeInTheDocument();
    expect(screen.getByText("12K+")).toBeInTheDocument();
    expect(screen.getByText("Users Helped")).toBeInTheDocument();
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Always")).toBeInTheDocument();
  });

  it("renders navigation and footer", () => {
    render(<HomePage />);

    expect(screen.getAllByText("TestTutor")).toHaveLength(2); // Header + footer
    expect(screen.getAllByText("Contact Us")).toHaveLength(2); // Header + footer
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
    expect(screen.getByText("Community Driven")).toBeInTheDocument();
  });

  it("makes API calls to fetch domains and tests", () => {
    render(<HomePage />);
    expect(fetch).toHaveBeenCalledWith("/api/domains");
    expect(fetch).toHaveBeenCalledWith("/api/tests");
  });
});
