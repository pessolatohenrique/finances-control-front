import {
  render,
  screen,
  fireEvent,
  waitForElement,
  waitForDomChange,
  waitFor,
} from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { PROJECT_NAME } from "../../constants/default_settings";
import {
  USER_NOT_EXISTS_MESSAGE,
  WRONG_PASSWORD_MESSAGE,
} from "../../constants/messages";
import App from "../../App";
import LoginForm from "./LoginForm";
import useToken from "../../hooks/useToken";

describe("Login Form", () => {
  it("should generate snapshot", () => {
    const { setToken } = renderHook(() => useToken());
    const { container } = render(<LoginForm setToken={setToken} />);
    expect(container).toMatchSnapshot();
  });

  it("should login when using valid credentials", async () => {
    render(<App />);
    const submitBtn = screen.getByTestId("submit-button");
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");

    fireEvent.input(username, {
      target: { value: process.env.REACT_APP_API_DEFAULT_USER },
    });
    fireEvent.input(password, {
      target: { value: process.env.REACT_APP_API_DEFAULT_PASSWORD },
    });
    fireEvent.click(submitBtn);

    await waitForElement(() => screen.getByText(PROJECT_NAME));
  });

  it("should not login when user not exists", async () => {
    const { setToken } = renderHook(() => useToken());
    render(<LoginForm setToken={setToken} />);

    const submitBtn = screen.getByTestId("submit-button");
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");

    fireEvent.input(username, {
      target: { value: "usuarioquenaoexiste" },
    });
    fireEvent.input(password, {
      target: { value: process.env.REACT_APP_API_DEFAULT_PASSWORD },
    });
    fireEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByText(USER_NOT_EXISTS_MESSAGE)));
  });

  it("should not login when password is invalid", async () => {
    const { setToken } = renderHook(() => useToken());
    render(<LoginForm setToken={setToken} />);

    const submitBtn = screen.getByTestId("submit-button");
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");

    fireEvent.input(username, {
      target: { value: process.env.REACT_APP_API_DEFAULT_USER },
    });
    fireEvent.input(password, {
      target: { value: "incorrectpassword" },
    });
    fireEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByText(WRONG_PASSWORD_MESSAGE)));
  });
});
