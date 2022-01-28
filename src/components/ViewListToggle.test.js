import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import ViewListToggle from "./ViewListToggle";
import useView from "../hooks/useView";

describe("ViewListToggle", () => {
  it("should generate snapshot", () => {
    const { result } = renderHook(() => useView());
    const [isTable, isList, switchFormat] = result.current;

    const { container } = render(
      <ViewListToggle
        isTable={isTable}
        isList={isList}
        switchFormat={switchFormat}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should change style on table click", () => {
    const { result } = renderHook(() => useView());
    const [isTable, isList, switchFormat] = result.current;

    render(
      <ViewListToggle
        isTable={isTable}
        isList={isList}
        switchFormat={switchFormat}
      />
    );

    const tableBtn = screen.getByTestId("view-table");
    fireEvent.click(tableBtn);

    expect(screen.getByTestId("view-table")).toHaveClass(
      "MuiButton-containedPrimary"
    );
  });

  it("should change style on card click", () => {
    const { result } = renderHook(() => useView());
    const [isTable, isList, switchFormat] = result.current;

    render(
      <ViewListToggle
        isTable={isTable}
        isList={isList}
        switchFormat={switchFormat}
      />
    );

    const cardBtn = screen.getByTestId("view-card");

    fireEvent.click(cardBtn);

    waitFor(() => {
      expect(screen.getByTestId("view-card")).toHaveClass(
        "MuiButton-containedPrimary"
      );
    });
  });
});
