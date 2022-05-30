import React from "react";
import moment from "moment";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export function ExpenseList({ budget }) {
  return (
    <Grid container spacing={2}>
      {budget?.Expenses.map((row) => {
        return (
          <Grid item xs={4} key={row?.id}>
            <Card data-testid="card-item">
              <CardContent>
                <Typography variant="h6" component="div" color="text.secondary">
                  {row?.Expense?.name}
                </Typography>
                <List variant="body2">
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">
                        {row?.Expense?.userExpenseCategory?.Category?.name}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">R$ {row?.value}</Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">
                        {moment(row?.transaction_date).format("DD/MM/YYYY")}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
