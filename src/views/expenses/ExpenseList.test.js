import moment from "moment";
import { render, screen } from "@testing-library/react";
import { ExpenseList } from "./ExpenseList";

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

describe("Expense List", () => {
  it("should generate snapshot", () => {
    const { container } = render(<ExpenseList budget={budget} />);
    expect(container).toMatchSnapshot();
  });

  it("should generate table", () => {
    render(<ExpenseList budget={budget} />);
    const rowTable = screen.getAllByTestId("card-item");
    expect(rowTable.length).toBe(2);
  });
});
