import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// Sample component for testing setup
function TestComponent() {
  return <div>Test Setup Working</div>;
}

describe("Test Setup", () => {
  it("renders test component", () => {
    render(<TestComponent />);
    expect(screen.getByText("Test Setup Working")).toBeInTheDocument();
  });
});
