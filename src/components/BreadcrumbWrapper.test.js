import { render, screen } from "@testing-library/react";
import BreadcrumbsWrapper from "./BreadcrumbsWrapper";

describe("BreadcrumbWrapper", () => {
  it("should generate snapshot", () => {
    const { container } = render(
      <BreadcrumbsWrapper childrenLabel="Autores" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render when there is a level", () => {
    render(<BreadcrumbsWrapper childrenLabel="Autores" />);

    expect(screen.getByTestId("bread-firstlevel")).toHaveTextContent("Início");
    expect(screen.getByTestId("bread-lastlevel")).toHaveTextContent("Autores");
  });

  it("should render when there is two levels", () => {
    render(
      <BreadcrumbsWrapper
        parentLink={{ link: "autores", label: "Autores" }}
        childrenLabel="Novo"
      />
    );

    expect(screen.getByTestId("bread-firstlevel")).toHaveTextContent("Início");
    expect(screen.getByTestId("bread-secondlevel")).toHaveTextContent(
      "Autores"
    );
    expect(screen.getByTestId("bread-lastlevel")).toHaveTextContent("Novo");
  });
});
