import moment from "moment";
import { render, screen } from "@testing-library/react";
import { ExpenseTable } from "./ExpenseTable";

const budget = {
  Expenses: [
    {
      id: 1,
      name: "Internet",
      userExpenseCategory: { Category: { name: "Essencial" } },
      UserExpense: {
        value: 300,
        transaction_date: moment().format("YYYY-MM-DD"),
      },
    },
    {
      id: 2,
      name: "Camisetas",
      userExpenseCategory: { Category: { name: "Livre estou" } },
      UserExpense: {
        value: 90,
        transaction_date: moment().format("YYYY-MM-DD"),
      },
    },
  ],
};

describe("Earning Table", () => {
  it("should generate snapshot", () => {
    const { container } = render(<ExpenseTable budget={budget} />);
    expect(container).toMatchSnapshot();
  });

  it("should generate table", () => {
    render(<ExpenseTable budget={budget} />);
    const rowTable = screen.getAllByTestId("row-table");
    expect(rowTable.length).toBe(2);
  });
});
