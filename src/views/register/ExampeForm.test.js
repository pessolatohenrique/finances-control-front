import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ExampleForm from "./ExampleForm";

describe("Example Form", () => {
  it("should generate snapshot", () => {
    const { container } = render(<ExampleForm />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should validate fields when in blank", async () => {
    const { container } = render(<ExampleForm />);
    const submitBtn = screen.getByTestId("submit-button");

    fireEvent.click(submitBtn);

    setTimeout(() => {
      expect(
        container.getElementsByClassName("Mui-error").length
      ).toBeGreaterThan(0);
    }, 500);
  });

  it("should submit form", () => {
    const { container } = render(<ExampleForm />);
    const submitBtn = screen.getByTestId("submit-button");
    const firstName = screen.getByTestId("firstName");
    const lastName = screen.getByTestId("lastName");

    fireEvent.input(firstName, { target: { value: "Henrique" } });
    fireEvent.input(lastName, { target: { value: "Henrique" } });
    fireEvent.click(submitBtn);

    expect(container.getElementsByClassName("Mui-error")).toHaveLength(0);
  });

  it("should load dependent selectbox", () => {
    render(<ExampleForm />);
    const parentSelect = screen.getByTestId("author");

    fireEvent.input(parentSelect, { target: { value: "jkrowling" } });

    expect(parentSelect.value).toBe("jkrowling");
  });
});
