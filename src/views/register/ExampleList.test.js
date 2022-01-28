import { render, screen, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useView from "../../hooks/useView";
import ViewListToggle from "../../components/ViewListToggle";
import ExampleList from "./ExampleList";

describe("ExampleList", () => {
  it("should generate snapshot", () => {
    const { container } = render(<ExampleList />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render screen", () => {
    render(<ExampleList />);
    expect(screen.getAllByText("Livros")).toHaveLength(2);
  });

  it("should render table when toggle", () => {
    const { container } = render(<ExampleList />);

    const tableBtn = screen.getByTestId("view-table");
    fireEvent.click(tableBtn);

    expect(container.getElementsByClassName("MuiTable-root")).toHaveLength(1);
  });

  it("should render list when toggle", () => {
    const { container } = render(<ExampleList />);

    const tableBtn = screen.getByTestId("view-card");
    fireEvent.click(tableBtn);

    expect(
      container.getElementsByClassName("MuiGrid-spacing-xs-2")
    ).toHaveLength(1);
  });
});
