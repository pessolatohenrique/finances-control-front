import moment from "moment";
import { render, screen } from "@testing-library/react";
import { EarningTable } from "./EarningTable";

const budget = {
  Earnings: [
    {
      id: 1,
      name: "Salário",
      UserEarning: {
        value: 1000,
        transaction_date: moment().format("YYYY-MM-DD"),
      },
    },
    {
      id: 2,
      name: "Dividendos",
      UserEarning: {
        value: 500,
        transaction_date: moment().format("YYYY-MM-DD"),
      },
    },
  ],
};

describe("Earning Table", () => {
  it("should generate snapshot", () => {
    const { container } = render(<EarningTable budget={budget} />);
    expect(container).toMatchSnapshot();
  });

  it("should generate table", () => {
    render(<EarningTable budget={budget} />);
    const rowTable = screen.getAllByTestId("row-table");
    expect(rowTable.length).toBe(2);
  });
});
