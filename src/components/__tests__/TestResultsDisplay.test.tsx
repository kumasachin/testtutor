import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMockTestResults } from "../../test-helpers";
import TestResultsDisplay from "../TestResultsDisplay";

const mockResults = createMockTestResults({
  percentage: 85,
  score: 8,
  totalQuestions: 10,
  correctAnswers: 8,
  incorrectAnswers: 2,
  timeSpent: 1800, // 30 minutes
  passed: true,
  questions: [
    {
      questionId: "1",
      question: "What is 2 + 2?",
      userAnswers: [1],
      correctAnswers: [1],
      isCorrect: true,
      explanation: "Simple addition",
      options: [
        { label: "3", isCorrect: false },
        { label: "4", isCorrect: true },
        { label: "5", isCorrect: false },
      ],
      points: 1,
      timeSpent: 30,
    },
    {
      questionId: "2",
      question: "What is the capital of France?",
      userAnswers: [0],
      correctAnswers: [1],
      isCorrect: false,
      explanation: "Paris is the capital of France",
      options: [
        { label: "Berlin", isCorrect: false },
        { label: "Paris", isCorrect: true },
        { label: "Madrid", isCorrect: false },
      ],
      points: 1,
      timeSpent: 45,
    },
  ],
});

describe("TestResultsDisplay", () => {
  const mockOnRetake = jest.fn();
  const mockOnBackToHome = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders test results overview correctly", () => {
    render(
      <TestResultsDisplay
        results={mockResults}
        onRetake={mockOnRetake}
        onBackToHome={mockOnBackToHome}
      />
    );

    expect(screen.getByText("Congratulations!")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText(/8\/.*points/)).toBeInTheDocument();
    expect(screen.getAllByText("30:00").length).toBeGreaterThan(0);
    expect(screen.getByText("PASSED")).toBeInTheDocument();
  });

  it("displays correct score color for high score", () => {
    render(
      <TestResultsDisplay
        results={mockResults}
        onRetake={mockOnRetake}
        onBackToHome={mockOnBackToHome}
      />
    );

    const scoreElement = screen.getByText("85%");
    expect(scoreElement).toHaveClass("text-green-600");
  });

  it("displays correct score color for medium score", () => {
    const mediumScoreResults = createMockTestResults({ percentage: 65 });
    render(
      <TestResultsDisplay
        results={mediumScoreResults}
        onRetake={mockOnRetake}
        onBackToHome={mockOnBackToHome}
      />
    );

    // Find the score element with yellow color for medium score
    const scoreElements = screen.getAllByText(/65/);
    const yellowScoreElement = scoreElements.find((el) =>
      el.classList.contains("text-yellow-600")
    );
    expect(yellowScoreElement).toBeDefined();
  });

  it("displays correct score color for low score", () => {
    const lowScoreResults = createMockTestResults({
      percentage: 45,
      passed: false,
    });
    render(
      <TestResultsDisplay
        results={lowScoreResults}
        onRetake={mockOnRetake}
        onBackToHome={mockOnBackToHome}
      />
    );

    // Find the score element with red color for failing score
    const scoreElements = screen.getAllByText(/45/);
    const redScoreElement = scoreElements.find((el) =>
      el.classList.contains("text-red-600")
    );
    expect(redScoreElement).toBeDefined();
    expect(screen.getByText(/Test Complete/)).toBeInTheDocument();
  });

  it("switches to review tab when clicked", () => {
    render(
      <TestResultsDisplay
        results={mockResults}
        onRetake={mockOnRetake}
        onBackToHome={mockOnBackToHome}
      />
    );

    const reviewTab = screen.getByText(/Review Questions/);
    fireEvent.click(reviewTab);

    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
    expect(
      screen.getByText("What is the capital of France?")
    ).toBeInTheDocument();
  });

  it("filters questions by wrong answers", () => {
    render(
      <TestResultsDisplay
        results={mockResults}
        onRetake={mockOnRetake}
        onBackToHome={mockOnBackToHome}
      />
    );

    const reviewTab = screen.getByText(/Review Questions/);
    fireEvent.click(reviewTab);

    const wrongFilter = screen.getByText(/Incorrect \(/);
    fireEvent.click(wrongFilter);

    expect(
      screen.getByText("What is the capital of France?")
    ).toBeInTheDocument();
    expect(screen.queryByText("What is 2 + 2?")).not.toBeInTheDocument();
  });

  it("filters questions by correct answers", () => {
    render(
      <TestResultsDisplay
        results={mockResults}
        onRetake={mockOnRetake}
        onBackToHome={mockOnBackToHome}
      />
    );

    const reviewTab = screen.getByText(/Review Questions/);
    fireEvent.click(reviewTab);

    const correctFilter = screen.getByText(/Correct \(/);
    fireEvent.click(correctFilter);

    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
    expect(
      screen.queryByText("What is the capital of France?")
    ).not.toBeInTheDocument();
  });

  it("calls onRetake when retake button is clicked", () => {
    render(
      <TestResultsDisplay
        results={mockResults}
        onRetake={mockOnRetake}
        onBackToHome={mockOnBackToHome}
      />
    );

    const retakeButton = screen.getByText("Take Test Again");
    fireEvent.click(retakeButton);

    expect(mockOnRetake).toHaveBeenCalled();
  });

  it("calls onBackToHome when home button is clicked", () => {
    render(
      <TestResultsDisplay
        results={mockResults}
        onRetake={mockOnRetake}
        onBackToHome={mockOnBackToHome}
      />
    );

    const homeButton = screen.getByText("Back to Tests");
    fireEvent.click(homeButton);

    expect(mockOnBackToHome).toHaveBeenCalled();
  });

  it("formats time correctly", () => {
    const customTimeResults = createMockTestResults({ timeSpent: 3665 }); // 1h 1m 5s
    render(
      <TestResultsDisplay
        results={customTimeResults}
        onRetake={mockOnRetake}
        onBackToHome={mockOnBackToHome}
      />
    );

    expect(screen.getByText("61:05")).toBeInTheDocument();
  });

  it("renders without optional handlers", () => {
    render(<TestResultsDisplay results={mockResults} />);

    expect(screen.getByText("Congratulations!")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
  });
});
