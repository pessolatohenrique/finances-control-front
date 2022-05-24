import React from "react";
import moment from "moment";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { StyledTableCell } from "../../constants/CustomStyles";

export function ExpenseTable({ budget, onShowModal, onSetSelectedId }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: 100 }}>#</StyledTableCell>
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
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    component="span"
                    onClick={() => window.location.replace(`/gasto/${row?.id}`)}
                  >
                    <EditIcon href={`/gasto/${row?.id}`} />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    component="span"
                    onClick={() => {
                      onSetSelectedId(row?.id);
                      onShowModal();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
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
