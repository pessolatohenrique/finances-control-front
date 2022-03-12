import {
  render,
  screen,
  fireEvent,
  waitForElement,
  waitForDomChange,
  waitFor,
} from "@testing-library/react";
import {
  REQUIRED_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
} from "../../constants/messages";
import RegisterContainer from "./RegisterContainer";

describe("Register Container", () => {
  it("should generate snapshot", () => {
    const { container } = render(<RegisterContainer />);
    expect(container).toMatchSnapshot();
  });

  it("should validate fields when in blank", async () => {
    render(<RegisterContainer />);
    const submitBtn = screen.getByTestId("submit-button");

    fireEvent.click(submitBtn);

    await waitFor(() => expect(screen.getAllByText(REQUIRED_MESSAGE)));
  });

  it("should not register when user already exists", async () => {
    render(<RegisterContainer />);
    const username = screen.getByTestId("username");
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    const confirmPassword = screen.getByTestId("confirmPassword");
    const submitBtn = screen.getByTestId("submit-button");

    fireEvent.input(username, {
      target: { value: process.env.REACT_APP_API_DEFAULT_USER },
    });

    fireEvent.input(email, {
      target: { value: process.env.REACT_APP_API_DEFAULT_EMAIL },
    });

    fireEvent.input(password, {
      target: { value: process.env.REACT_APP_API_DEFAULT_PASSWORD },
    });

    fireEvent.input(confirmPassword, {
      target: { value: process.env.REACT_APP_API_DEFAULT_PASSWORD },
    });

    fireEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByText("Cadastro")));
  });

  it("should not register when password mismatch", async () => {
    render(<RegisterContainer />);
    const password = screen.getByTestId("password");
    const confirmPassword = screen.getByTestId("confirmPassword");
    const submitBtn = screen.getByTestId("submit-button");

    fireEvent.input(password, {
      target: { value: process.env.REACT_APP_API_DEFAULT_PASSWORD },
    });

    fireEvent.input(confirmPassword, {
      target: { value: "outraqualquer" },
    });

    fireEvent.click(submitBtn);

    await waitFor(() => expect(screen.getAllByText(PASSWORD_MISMATCH_MESSAGE)));
  });
});
