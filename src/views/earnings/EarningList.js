import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useForm } from "react-hook-form";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export function EarningList({ budget }) {
  return (
    <Grid container spacing={2}>
      {budget?.Earnings.map((row) => {
        return (
          <Grid item xs={4} key={row.id}>
            <Card data-testid="card-item">
              <CardContent>
                <Typography variant="h6" component="div" color="text.secondary">
                  {row.name}
                </Typography>
                <List variant="body2">
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">
                        R$ {row.UserEarning.value}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">
                        {moment(row.UserEarning.transaction_date).format(
                          "DD/MM/YYYY"
                        )}
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
