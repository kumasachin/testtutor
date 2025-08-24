import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { createMockTestResults } from "../../test-helpers";
import TestReviewComponent from "../TestReviewComponent";

const mockResults = createMockTestResults();

describe("TestReviewComponent", () => {
  const mockOnRetakeTest = jest.fn();
  const mockOnBackToTests = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders test review with summary", () => {
    render(
      <TestReviewComponent
        results={mockResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    expect(screen.getByText("Question Review")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(
      screen.getByText("Correct").previousElementSibling
    ).toHaveTextContent("3"); // Correct count
    expect(screen.getByText("20:00")).toBeInTheDocument();
    expect(screen.getByText("🎉 PASSED")).toBeInTheDocument();
  });

  it("displays first question by default", () => {
    render(
      <TestReviewComponent
        results={mockResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
    expect(screen.getByText("✓ Correct")).toBeInTheDocument();
    expect(screen.getByText("Simple addition: 2 + 2 = 4")).toBeInTheDocument();
  });

  it("navigates to next question", () => {
    render(
      <TestReviewComponent
        results={mockResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);

    expect(
      screen.getByText("What is the capital of France?")
    ).toBeInTheDocument();
    expect(screen.getByText("✗ (Your answer)")).toBeInTheDocument();
    expect(screen.getByText("✓ (Correct)")).toBeInTheDocument();
  });

  it("navigates to previous question", () => {
    render(
      <TestReviewComponent
        results={mockResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    // Go to second question
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);

    // Go back to first question
    const prevButton = screen.getByText("← Previous");
    fireEvent.click(prevButton);

    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
  });

  it("shows only incorrect answers when filter is enabled", () => {
    render(
      <TestReviewComponent
        results={mockResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    const filterCheckbox = screen.getByLabelText(
      /Show only incorrect answers/i
    );
    fireEvent.click(filterCheckbox);

    // Should only show the incorrect question
    expect(
      screen.getByText("What is the capital of France?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Question 1 of 1 (incorrect only)")
    ).toBeInTheDocument();
  });

  it("displays correct indicators for correct answers", () => {
    render(
      <TestReviewComponent
        results={mockResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    expect(screen.getByText("✓ Correct")).toBeInTheDocument();
  });

  it("displays incorrect indicators for wrong answers", () => {
    render(
      <TestReviewComponent
        results={mockResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    // Navigate to incorrect question
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);

    expect(screen.getByText("✗ Incorrect")).toBeInTheDocument();
  });

  it("calls onRetakeTest when retake button is clicked", () => {
    render(
      <TestReviewComponent
        results={mockResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    const retakeButton = screen.getByText("🔄 Retake Test");
    fireEvent.click(retakeButton);

    expect(mockOnRetakeTest).toHaveBeenCalled();
  });

  it("calls onBackToTests when back button is clicked", () => {
    render(
      <TestReviewComponent
        results={mockResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    const backButton = screen.getByText("📚 Back to Tests");
    fireEvent.click(backButton);

    expect(mockOnBackToTests).toHaveBeenCalled();
  });

  it("shows correct score colors for different ranges", () => {
    const highScoreResults = createMockTestResults({ percentage: 85 });
    const { rerender } = render(
      <TestReviewComponent
        results={highScoreResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    let scoreContainer = screen.getByText(/85%/).closest(".text-green-600");
    expect(scoreContainer).toBeInTheDocument();

    const mediumScoreResults = createMockTestResults({ percentage: 65 });
    rerender(
      <TestReviewComponent
        results={mediumScoreResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    scoreContainer = screen.getByText(/65%/).closest(".text-yellow-600");
    expect(scoreContainer).toBeInTheDocument();

    const lowScoreResults = createMockTestResults({
      percentage: 45,
      passed: false,
    });
    rerender(
      <TestReviewComponent
        results={lowScoreResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    scoreContainer = screen.getByText(/45%/).closest(".text-red-600");
    expect(scoreContainer).toBeInTheDocument();
    expect(screen.getByText("❌ FAILED")).toBeInTheDocument();
  });

  it("handles edge case with no questions", () => {
    const emptyResults = createMockTestResults({
      questions: [],
      totalQuestions: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
    });

    render(
      <TestReviewComponent
        results={emptyResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    expect(screen.getByText("Question Review")).toBeInTheDocument();
    expect(
      screen.getByText("Great job! You got all questions correct.")
    ).toBeInTheDocument();
  });

  it("formats time correctly for different durations", () => {
    const customTimeResults = createMockTestResults({ timeSpent: 3665 }); // 1h 1m 5s
    render(
      <TestReviewComponent
        results={customTimeResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    expect(screen.getByText("61:05")).toBeInTheDocument();
  });

  it("disables navigation buttons appropriately", () => {
    render(
      <TestReviewComponent
        results={mockResults}
        onRetakeTest={mockOnRetakeTest}
        onBackToTests={mockOnBackToTests}
      />
    );

    // Previous button should be disabled on first question
    const prevButton = screen.getByText("← Previous");
    expect(prevButton).toBeDisabled();

    // Navigate to last question
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    // Next button should be disabled on last question
    expect(nextButton).toBeDisabled();
  });
});
