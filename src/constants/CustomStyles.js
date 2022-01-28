import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { TableCell } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: "1.1em",
    fontWeight: 300,
  },
}));
