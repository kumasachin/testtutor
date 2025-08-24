import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import HomePage from "../../app/page";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href, ...props }: any) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock fetch
global.fetch = jest.fn();

describe("HomePage", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    (fetch as jest.Mock).mockResolvedValue({
      json: async () => ({
        success: true,
        data: [
          {
            id: "programming",
            name: "programming",
            displayName: "Programming",
          },
          {
            id: "mathematics",
            name: "mathematics",
            displayName: "Mathematics",
          },
          { id: "science", name: "science", displayName: "Science" },
          {
            id: "language-arts",
            name: "language-arts",
            displayName: "Language Arts",
          },
        ],
      }),
    });
  });

  it("renders the main heading", async () => {
    render(<HomePage />);
    expect(screen.getByText("Ace Your")).toBeInTheDocument();
    expect(screen.getByText("Tests")).toBeInTheDocument();
  });

  it("renders the hero description", () => {
    render(<HomePage />);
    expect(
      screen.getByText(
        /Practice for Life in UK tests, Driving Theory exams, and more/
      )
    ).toBeInTheDocument();
  });

  it("renders test categories", () => {
    render(<HomePage />);
    expect(screen.getAllByText("Life in UK Test")).toHaveLength(4); // Multiple instances
    expect(screen.getByText("Driving Theory Test")).toBeInTheDocument();
    expect(screen.getByText("Academic Tests")).toBeInTheDocument();
  });

  it("loads and displays test categories", async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getAllByText("Life in UK Test")).toHaveLength(4); // Multiple instances
      expect(screen.getByText("Driving Theory Test")).toBeInTheDocument();
      expect(screen.getByText("Academic Tests")).toBeInTheDocument();
      expect(screen.getByText("Coming Soon")).toBeInTheDocument();
    });
  });

  it("renders feature cards", () => {
    render(<HomePage />);

    expect(screen.getByText("Real Questions")).toBeInTheDocument();
    expect(screen.getByText("Study Anywhere")).toBeInTheDocument();
    expect(screen.getByText("See Your Progress")).toBeInTheDocument();
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

  it("renders testimonials", () => {
    render(<HomePage />);

    expect(
      screen.getByText(/Passed my Life in UK test on the second try/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The driving theory practice helped me learn/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Good practice tests and it's free/)
    ).toBeInTheDocument();
  });

  it("renders get started button", () => {
    render(<HomePage />);

    const getStartedButton = screen.getByText("🇬🇧 Start Life in UK Test →");
    expect(getStartedButton).toBeInTheDocument();
  });

  it("renders feature descriptions", () => {
    render(<HomePage />);

    expect(
      screen.getByText(/Questions based on official exam patterns/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Use on any device, anytime/)).toBeInTheDocument();
    expect(
      screen.getByText(/Keep track of your improvement/)
    ).toBeInTheDocument();
  });

  it("makes API call to fetch domains", () => {
    render(<HomePage />);
    expect(fetch).toHaveBeenCalledWith("/api/domains");
  });
});
