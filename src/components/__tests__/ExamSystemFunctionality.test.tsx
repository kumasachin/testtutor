import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Mock fetch globally
global.fetch = jest.fn();

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
import LifeInUkPage from "../../app/lifeInUk/page";
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
                {
                  id: "domain-2",
                  name: "Driving Theory",
                  displayName: "Driving Theory",
                  description: "UK driving theory tests",
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
                    description: "Official practice test for UK citizenship",
                    _count: {
                      questions: 24,
                      attempts: 150,
                    },
                  },
                  {
                    id: "test-2",
                    title: "Life in UK Practice Test 2",
                    description: "Additional practice questions",
                    _count: {
                      questions: 24,
                      attempts: 98,
                    },
                  },
                ],
              },
            }),
        });
      }

      return Promise.reject(new Error("Unknown URL"));
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Homepage Test Discovery", () => {
    test("displays SEO-friendly test listings", async () => {
      render(<HomePage />);

      // Check that popular tests section is visible
      expect(screen.getByText("Popular Practice Tests")).toBeInTheDocument();
      expect(screen.getByText("Browse Tests by Category")).toBeInTheDocument();

      // Verify Life in UK tests are prominently displayed
      expect(screen.getAllByText(/Life in UK Test/)).toHaveLength(5);
    });

    test("provides direct navigation to test categories", () => {
      render(<HomePage />);

      // Check navigation links work - use getAllByRole for multiple matches
      expect(
        screen.getByRole("link", { name: /Life in UK Tests/i })
      ).toBeInTheDocument();
      expect(
        screen.getAllByRole("link", { name: /Driving Theory/i })
      ).toHaveLength(3); // Navigation + popular tests + footer
      expect(screen.getAllByRole("link", { name: /All Tests/i })).toHaveLength(
        2
      ); // Navigation + popular tests
    });

    test("loads test domains and statistics", async () => {
      render(<HomePage />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("/api/domains");
        expect(global.fetch).toHaveBeenCalledWith("/api/tests");
      });
    });
  });

  describe("Life in UK Test Functionality", () => {
    test("renders test selection interface", () => {
      render(<LifeInUkPage />);

      expect(screen.getByText("Life in the UK Tests")).toBeInTheDocument();
      expect(screen.getByText("Test Type")).toBeInTheDocument();
      expect(screen.getByText("Exam Mode")).toBeInTheDocument();
    });

    test("fetches and displays available tests", async () => {
      render(<LifeInUkPage />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "/api/tests-mock?domainName=Life in UK"
        );
      });

      await waitFor(() => {
        expect(
          screen.getByText("Life in UK Practice Test 1")
        ).toBeInTheDocument();
        expect(
          screen.getByText("Life in UK Practice Test 2")
        ).toBeInTheDocument();
      });
    });

    test("shows test statistics and metadata", async () => {
      render(<LifeInUkPage />);

      await waitFor(() => {
        // Check question counts - use getAllByText for multiple matches
        expect(screen.getAllByText("24 questions")).toHaveLength(2); // Two tests with 24 questions each

        // Check attempt counts
        expect(screen.getByText("150 attempts")).toBeInTheDocument();
        expect(screen.getByText("98 attempts")).toBeInTheDocument();
      });
    });

    test("provides exam format information", () => {
      render(<LifeInUkPage />);

      expect(
        screen.getByText(/24 questions per official test/)
      ).toBeInTheDocument();
      expect(screen.getByText(/45 minutes time limit/)).toBeInTheDocument();
      expect(screen.getByText(/75% pass rate required/)).toBeInTheDocument();
      expect(screen.getByText(/Multiple choice questions/)).toBeInTheDocument();
    });

    test("offers study tips and guidance", () => {
      render(<LifeInUkPage />);

      expect(screen.getByText(/Test Tips/)).toBeInTheDocument();
      expect(
        screen.getByText(/Take practice tests regularly/)
      ).toBeInTheDocument();
      expect(screen.getByText(/Focus on weak areas/)).toBeInTheDocument();
      expect(
        screen.getByText(/Read explanations carefully/)
      ).toBeInTheDocument();
    });

    test("provides test categorization", () => {
      render(<LifeInUkPage />);

      expect(screen.getByText("Test Categories")).toBeInTheDocument();
      expect(screen.getByText(/All Tests/)).toBeInTheDocument();
      expect(screen.getByText(/British History/)).toBeInTheDocument();
      expect(screen.getByText(/Government & Law/)).toBeInTheDocument();
      expect(screen.getByText(/Culture & Traditions/)).toBeInTheDocument();
    });

    test("handles test type selection", async () => {
      render(<LifeInUkPage />);

      // Find the test type dropdown
      const testTypeButton = screen.getByRole("button", {
        name: /Practice Test/i,
      });
      expect(testTypeButton).toBeInTheDocument();

      // Click should work without errors
      fireEvent.click(testTypeButton);

      // Page should remain functional
      expect(screen.getByText("Life in the UK Tests")).toBeInTheDocument();
    });

    test("provides start test functionality", async () => {
      render(<LifeInUkPage />);

      await waitFor(() => {
        // Should have "Start Test" links for each test
        const startTestLinks = screen.getAllByText("Start Test");
        expect(startTestLinks.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Error Handling and Resilience", () => {
    test("handles API failures gracefully", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      render(<LifeInUkPage />);

      // Page should still render basic content
      expect(screen.getByText("Life in the UK Tests")).toBeInTheDocument();
      expect(screen.getByText(/Test Tips/)).toBeInTheDocument();
    });

    test("displays loading states appropriately", () => {
      render(<LifeInUkPage />);

      // Should show loading indicator initially
      expect(screen.getByText("Loading tests...")).toBeInTheDocument();
    });
  });

  describe("Navigation and User Experience", () => {
    test("provides breadcrumb navigation", () => {
      render(<LifeInUkPage />);

      expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
      expect(screen.getByText("Life in UK")).toBeInTheDocument();
    });

    test("includes essential navigation links", () => {
      render(<LifeInUkPage />);

      expect(
        screen.getByRole("link", { name: /Contact Us/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Login/i })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Sign Up/i })
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility and Usability", () => {
    test("has proper heading structure", () => {
      render(<LifeInUkPage />);

      // Check main page heading
      expect(
        screen.getByRole("heading", { name: /Life in the UK Tests/i })
      ).toBeInTheDocument();

      // Check section headings
      expect(screen.getByText("Test Categories")).toBeInTheDocument();
      expect(screen.getByText(/Test Tips/)).toBeInTheDocument();
    });

    test("provides clear test descriptions", async () => {
      render(<LifeInUkPage />);

      await waitFor(() => {
        expect(
          screen.getByText("Official practice test for UK citizenship")
        ).toBeInTheDocument();
        expect(
          screen.getByText("Additional practice questions")
        ).toBeInTheDocument();
      });
    });
  });
});
