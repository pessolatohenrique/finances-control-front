import moment from "moment";
import { render, screen } from "@testing-library/react";
import { EarningList } from "./EarningList";

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
    const { container } = render(<EarningList budget={budget} />);
    expect(container).toMatchSnapshot();
  });

  it("should generate table", () => {
    render(<EarningList budget={budget} />);
    const rowTable = screen.getAllByTestId("card-item");
    expect(rowTable.length).toBe(2);
  });
});
