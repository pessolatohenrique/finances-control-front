import React from "react";
import moment from "moment";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { StyledTableCell } from "../../constants/CustomStyles";

export function ExpenseTable({ budget }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Descrição</StyledTableCell>
            <StyledTableCell>Categoria</StyledTableCell>
            <StyledTableCell>Valor</StyledTableCell>
            <StyledTableCell>Data</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budget?.Expenses.map((row) => {
            return (
              <TableRow key={row?.id} data-testid="row-table">
                <TableCell>{row?.Expense?.name}</TableCell>
                <TableCell>
                  {row?.Expense?.userExpenseCategory?.Category?.name}
                </TableCell>
                <TableCell>{row?.value}</TableCell>
                <TableCell>
                  {moment(row?.UserExpense?.transaction_date).format(
                    "DD/MM/YYYY"
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
