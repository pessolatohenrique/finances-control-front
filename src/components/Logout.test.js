import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PROJECT_NAME } from "../constants/default_settings";
import App from "../App";

describe("Logout", () => {
  beforeAll(async () => {
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

    await waitFor(() => screen.getByText(PROJECT_NAME));
  });

  it("should logout by menu", async () => {
    const logoutBtn = screen.getByTestId("logout-button");

    global.window = Object.create(window);
    const url = "http://localhost:3000";
    Object.defineProperty(window, "location", {
      value: {
        href: url,
      },
    });

    fireEvent.click(logoutBtn);
  });
});
