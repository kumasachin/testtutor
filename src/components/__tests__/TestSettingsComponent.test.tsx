import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import TestSettingsComponent from "../TestSettingsComponent";

const mockTestInfo = {
  title: "Sample Test",
  description: "A sample test for unit testing",
  questionCount: 10,
  timeLimit: 30,
  passingScore: 70,
};

const mockInitialSettings = {
  showResultsMode: "end" as const,
  shuffleQuestions: false,
  shuffleAnswers: false,
  allowReview: true,
};

describe("TestSettingsComponent", () => {
  const mockOnSettingsChange = jest.fn();
  const mockOnStartTest = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders test information correctly", () => {
    render(
      <TestSettingsComponent
        testInfo={mockTestInfo}
        initialSettings={mockInitialSettings}
        onSettingsChange={mockOnSettingsChange}
        onStartTest={mockOnStartTest}
      />
    );

    expect(screen.getByText("Sample Test")).toBeInTheDocument();
    expect(
      screen.getByText("A sample test for unit testing")
    ).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("30 minutes")).toBeInTheDocument();
    expect(screen.getByText("70%")).toBeInTheDocument();
  });

  it("handles immediate feedback mode selection", () => {
    render(
      <TestSettingsComponent
        testInfo={mockTestInfo}
        initialSettings={mockInitialSettings}
        onSettingsChange={mockOnSettingsChange}
        onStartTest={mockOnStartTest}
      />
    );

    const immediateRadio = screen.getByDisplayValue("immediate");
    fireEvent.click(immediateRadio);

    expect(mockOnSettingsChange).toHaveBeenCalled();
  });

  it("handles shuffle questions toggle", () => {
    render(
      <TestSettingsComponent
        testInfo={mockTestInfo}
        initialSettings={mockInitialSettings}
        onSettingsChange={mockOnSettingsChange}
        onStartTest={mockOnStartTest}
      />
    );

    const shuffleQuestionsCheckbox = screen.getByLabelText(
      /shuffle question order/i
    );
    fireEvent.click(shuffleQuestionsCheckbox);

    expect(mockOnSettingsChange).toHaveBeenCalled();
  });

  it("handles shuffle answers toggle", () => {
    render(
      <TestSettingsComponent
        testInfo={mockTestInfo}
        initialSettings={mockInitialSettings}
        onSettingsChange={mockOnSettingsChange}
        onStartTest={mockOnStartTest}
      />
    );

    const shuffleAnswersCheckbox = screen.getByLabelText(
      /shuffle answer options/i
    );
    fireEvent.click(shuffleAnswersCheckbox);

    expect(mockOnSettingsChange).toHaveBeenCalled();
  });

  it("calls onStartTest when start button is clicked", () => {
    render(
      <TestSettingsComponent
        testInfo={mockTestInfo}
        initialSettings={mockInitialSettings}
        onSettingsChange={mockOnSettingsChange}
        onStartTest={mockOnStartTest}
      />
    );

    const startButton = screen.getByText("Start Test");
    fireEvent.click(startButton);

    expect(mockOnStartTest).toHaveBeenCalled();
  });

  it("formats time correctly for no limit", () => {
    const testInfoNoLimit = { ...mockTestInfo, timeLimit: undefined };

    render(
      <TestSettingsComponent
        testInfo={testInfoNoLimit}
        initialSettings={mockInitialSettings}
        onSettingsChange={mockOnSettingsChange}
        onStartTest={mockOnStartTest}
      />
    );

    expect(screen.getByText("No limit")).toBeInTheDocument();
  });

  it("formats time correctly for hours and minutes", () => {
    const testInfoWithHours = { ...mockTestInfo, timeLimit: 90 }; // 1h 30m

    render(
      <TestSettingsComponent
        testInfo={testInfoWithHours}
        initialSettings={mockInitialSettings}
        onSettingsChange={mockOnSettingsChange}
        onStartTest={mockOnStartTest}
      />
    );

    expect(screen.getByText("1h 30m")).toBeInTheDocument();
  });
});
