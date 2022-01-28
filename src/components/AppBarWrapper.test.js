import { render, screen, fireEvent } from "@testing-library/react";
import AppBarWrapper from "./AppBarWrapper";
import { PROJECT_NAME } from "../constants/default_settings";

describe("AppBarWrapper", () => {
  it("should generate snapshot", () => {
    const { container } = render(<AppBarWrapper />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render app name", () => {
    render(<AppBarWrapper />);
    expect(screen.getByTestId("project-name")).toHaveTextContent(PROJECT_NAME);
  });

  it("should open menu", () => {
    const { container } = render(<AppBarWrapper />);
    const menuBtn = screen.getByTestId("menu-button");
    fireEvent.click(menuBtn);
    expect(container.getElementsByClassName("MuiList-root")).toHaveLength(1);
  });
});
