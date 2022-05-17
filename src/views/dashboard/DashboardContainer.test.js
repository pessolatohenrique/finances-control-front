import {
  render,
  screen,
  fireEvent,
  waitForElement,
  waitForDomChange,
  waitFor,
} from "@testing-library/react";
import App from "../../App";
import DashboardContainer from "./DashboardContainer";

describe("Dashboard Container", () => {
  beforeAll(() => {
    console.log("JEST", process.env.JEST_WORKER_ID);

    render(<App />);
    const submitBtn = screen.getByTestId("submit-button");
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");

    fireEvent.input(username, {
      target: { value: process.env.REACT_APP_API_DEFAULT_USER_WITHOUT_RECIPE },
    });
    fireEvent.input(password, {
      target: {
        value: process.env.REACT_APP_API_DEFAULT_PASSWORD_WITHOUT_RECIPE,
      },
    });
    fireEvent.click(submitBtn);
  });

  it("should generate snapshot", () => {
    const { container } = render(<DashboardContainer />);
    expect(container).toMatchSnapshot();
  });

  it("should show alert when don't have a recipe", async () => {
    render(<DashboardContainer />);
    const associateBtn = screen.getByTestId("associate-button");
    expect(associateBtn).toBeInTheDocument();
  });

  it("should not show alert when have a recipe", async () => {
    render(<App />);
    const submitBtn = screen.getByTestId("submit-button");
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");

    fireEvent.input(username, {
      target: { value: process.env.REACT_APP_API_DEFAULT_USER },
    });
    fireEvent.input(password, {
      target: {
        value: process.env.REACT_APP_API_DEFAULT_PASSWORD,
      },
    });
    fireEvent.click(submitBtn);

    await waitFor(() =>
      expect(screen.queryByText("Associar")).not.toBeInTheDocument()
    );
  });

  it("should load indicators cards", async () => {
    render(<DashboardContainer />);
    const indicatorCard = screen.getAllByTestId("indicator-card");
    expect(indicatorCard.length).toBe(3);
  });
});
