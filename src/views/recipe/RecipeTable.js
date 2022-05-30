import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { StyledTableCell } from "../../constants/CustomStyles";

export function RecipeTable({ budget }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Categoria</StyledTableCell>
            <StyledTableCell>Esperado (R$)</StyledTableCell>
            <StyledTableCell>Gasto (R$)</StyledTableCell>
            <StyledTableCell>Esperado (%)</StyledTableCell>
            <StyledTableCell>Gasto (%)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budget?.recipe_comparative.map((row) => {
            return (
              <TableRow key={row.percentage} data-testid="row-table">
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.value_expected.toFixed(2)}</TableCell>
                <TableCell>{row.value_spent.toFixed(2)}</TableCell>
                <TableCell>{row.percentage.toFixed(2)}</TableCell>
                <TableCell>{row.percentage_spent.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
