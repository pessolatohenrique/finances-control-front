import {
  render,
  screen,
  fireEvent,
  waitForElement,
  waitForDomChange,
  waitFor,
} from "@testing-library/react";
import { REQUIRED_MESSAGE } from "../../constants/messages";
import App from "../../App";
import EarningForm from "./EarningForm";

describe("Dashboard Container", () => {
  beforeAll(() => {
    render(<App />);
    const submitBtn = screen.getByTestId("submit-button");
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");

    fireEvent.input(username, {
      target: { value: process.env.REACT_APP_API_DEFAULT_EMAIL },
    });
    fireEvent.input(password, {
      target: {
        value: process.env.REACT_APP_API_DEFAULT_PASSWORD,
      },
    });
    fireEvent.click(submitBtn);
  });

  it("should generate snapshot", () => {
    const { container } = render(<EarningForm />);
    expect(container).toMatchSnapshot();
  });

  it("should not send form when field is empty", async () => {
    render(<EarningForm />);
    const submitBtn = screen.getByTestId("submit-button");
    const name = screen.getByTestId("name");

    fireEvent.input(name, {
      target: { value: "Teste descrição" },
    });

    fireEvent.click(submitBtn);

    await waitForElement(() => screen.getAllByText(REQUIRED_MESSAGE));
  });

  it("should send form when field is fullfiled", async () => {
    render(<EarningForm />);
    const submitBtn = screen.getByTestId("submit-button");
    const name = screen.getByTestId("name");
    const value = screen.getByTestId("value");

    fireEvent.input(name, {
      target: { value: "Teste descrição" },
    });

    fireEvent.input(value, {
      target: { value: "1500" },
    });

    fireEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByTestId("snackbar")));
  });
});
