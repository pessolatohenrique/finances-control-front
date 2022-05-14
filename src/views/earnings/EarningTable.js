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

export function EarningTable({ budget }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Descrição</StyledTableCell>
            <StyledTableCell>Valor</StyledTableCell>
            <StyledTableCell>Data</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budget?.Earnings.map((row) => {
            return (
              <TableRow key={row.id} data-testid="row-table">
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.UserEarning.value}</TableCell>
                <TableCell>
                  {moment(row.UserEarning.transaction_date).format(
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
