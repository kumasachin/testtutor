import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import TestTakingInterface from "../TestTakingInterface";

const mockTest = {
  id: "test-1",
  title: "Sample Test",
  description: "A test for unit testing",
  timeLimit: 30,
  passPercentage: 70,
  questions: [
    {
      id: "q1",
      stem: "What is 2 + 2?",
      type: "SINGLE_CHOICE" as const,
      options: [
        { id: "a", label: "3", isCorrect: false },
        { id: "b", label: "4", isCorrect: true },
        { id: "c", label: "5", isCorrect: false },
      ],
      explanation: "2 + 2 equals 4",
      points: 1,
      order: 1,
    },
    {
      id: "q2",
      stem: "Select all even numbers:",
      type: "MULTIPLE_CHOICE" as const,
      options: [
        { id: "a", label: "2", isCorrect: true },
        { id: "b", label: "3", isCorrect: false },
        { id: "c", label: "4", isCorrect: true },
        { id: "d", label: "5", isCorrect: false },
      ],
      explanation: "2 and 4 are even numbers",
      points: 2,
      order: 2,
    },
  ],
};

const mockSettings = {
  showResultsMode: "end" as const,
  showExplanations: true,
  showCorrectAnswers: true,
  allowReview: true,
  shuffleQuestions: false,
  shuffleAnswers: false,
};

describe("TestTakingInterface", () => {
  const mockOnComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock timers for testing time-related functionality
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders test interface with first question", () => {
    render(
      <TestTakingInterface
        test={mockTest}
        onComplete={mockOnComplete}
        initialSettings={mockSettings}
      />
    );

    expect(screen.getByText("Sample Test")).toBeInTheDocument();
    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
    expect(screen.getByText("Question 1 of 2")).toBeInTheDocument();
  });

  it("displays timer when time limit is set", () => {
    const testWithTimer = {
      ...mockTest,
      timeLimit: 30,
    };

    render(
      <TestTakingInterface test={testWithTimer} onComplete={mockOnComplete} />
    );

    expect(screen.getByText(/30:00/)).toBeInTheDocument();
  });

  it("allows selecting single choice answer", () => {
    render(
      <TestTakingInterface
        test={mockTest}
        onComplete={mockOnComplete}
        initialSettings={mockSettings}
      />
    );

    const option = screen.getByText("4");
    fireEvent.click(option);

    expect(option.closest("button")).toHaveClass("border-blue-500");
  });

  it("navigates to next question", () => {
    render(
      <TestTakingInterface
        test={mockTest}
        onComplete={mockOnComplete}
        initialSettings={mockSettings}
      />
    );

    // Select an answer first
    const option = screen.getByText("4");
    fireEvent.click(option);

    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);

    expect(screen.getByText("Select all even numbers:")).toBeInTheDocument();
    expect(screen.getByText("Question 2 of 2")).toBeInTheDocument();
  });

  it("navigates back to previous question", () => {
    render(
      <TestTakingInterface
        test={mockTest}
        onComplete={mockOnComplete}
        initialSettings={mockSettings}
      />
    );

    // Select an answer first
    const option = screen.getByText("4");
    fireEvent.click(option);

    // Go to second question
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);

    // Go back to first question
    const backButton = screen.getByText("← Previous");
    fireEvent.click(backButton);

    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
    expect(screen.getByText("Question 1 of 2")).toBeInTheDocument();
  });

  it("allows selecting multiple choice answers", () => {
    render(
      <TestTakingInterface
        test={mockTest}
        onComplete={mockOnComplete}
        initialSettings={mockSettings}
      />
    );

    // Select an answer first
    const option = screen.getByText("4");
    fireEvent.click(option);

    // Navigate to multiple choice question
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);

    // Select multiple options
    const option2 = screen.getByText("2");
    const option4 = screen.getByText("4");

    fireEvent.click(option2);
    fireEvent.click(option4);

    expect(option2.closest("button")).toHaveClass("border-blue-500");
    expect(option4.closest("button")).toHaveClass("border-blue-500");
  });

  it("submits test and calls onComplete", async () => {
    render(
      <TestTakingInterface
        test={mockTest}
        onComplete={mockOnComplete}
        initialSettings={mockSettings}
      />
    );

    // Answer first question
    const option = screen.getByText("4");
    fireEvent.click(option);

    // Navigate to second question
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);

    // Answer second question
    const option2 = screen.getByText("2");
    const option4 = screen.getByText("4");
    fireEvent.click(option2);
    fireEvent.click(option4);

    // Submit test
    const submitButton = screen.getByText("✅ Submit Test");
    fireEvent.click(submitButton);

    // Confirm submission
    const confirmButton = screen.getByText("🚀 Submit with Confidence!");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalled();
    });
  });

  it("shows immediate feedback when enabled", () => {
    const immediateSettings = {
      ...mockSettings,
      showResultsMode: "immediate" as const,
    };

    render(
      <TestTakingInterface
        test={mockTest}
        onComplete={mockOnComplete}
        initialSettings={immediateSettings}
      />
    );

    const option = screen.getByText("4");
    fireEvent.click(option);

    // Should show feedback immediately
    expect(
      screen.getByText("🎉 Excellent! That's absolutely correct!")
    ).toBeInTheDocument();
  });

  it("shows progress correctly", () => {
    render(
      <TestTakingInterface
        test={mockTest}
        onComplete={mockOnComplete}
        initialSettings={mockSettings}
      />
    );

    // Should show 0% progress initially
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "0");

    // Answer first question and move to next
    const option = screen.getByText("4");
    fireEvent.click(option);

    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);

    // Should show 50% progress
    expect(progressBar).toHaveAttribute("aria-valuenow", "50");
  });

  it("handles timer expiration", async () => {
    const shortTimeTest = { ...mockTest, timeLimit: 1 }; // 1 minute

    render(
      <TestTakingInterface
        test={shortTimeTest}
        onComplete={mockOnComplete}
        initialSettings={mockSettings}
      />
    );

    // Fast-forward time to expire the timer
    jest.advanceTimersByTime(61000); // 61 seconds

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalled();
    });
  });

  it("renders without time limit", () => {
    const noTimeTest = { ...mockTest, timeLimit: undefined };

    render(
      <TestTakingInterface
        test={noTimeTest}
        onComplete={mockOnComplete}
        initialSettings={mockSettings}
      />
    );

    expect(screen.queryByText(/\d+:\d+/)).not.toBeInTheDocument();
  });
});
